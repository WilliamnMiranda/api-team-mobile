import { Types } from "mongoose";
import { RequestProjectWithAuthentication } from "../interfaces/ProjectInterface";
import ProjectModel from "../models/ProjectModel";
import SubscriptionModel from "../models/SubscriptionModel";
import { Response, Request } from "express";

export const requestSubscription = async (
	req: RequestProjectWithAuthentication,
	res: Response,
) => {
	const { projectId } = req.body;
	const existingSubscription = await SubscriptionModel.findOne({
		user: req.user?._id,
		project: projectId,
	});

	const project = await ProjectModel.findById(projectId);

	if (!project)
		return res.status(404).json({ message: "Projeto nao encontrado" });

	if (project.owner.toString() === req.user?._id.toString())
		res.status(401).json("Voce nao pode se inscrever nos propios projetos");

	if (existingSubscription) {
		return res
			.status(400)
			.json({ message: "Voce ja se inscreveu para esse projeto" });
	}

	const newSubscription = new SubscriptionModel({
		user: req.user?._id,
		project: projectId,
	});

	await newSubscription.save();

	res.status(201).json({ message: "Inscricao enviada ao lider do projeto" });
};

export const updateSubscription = async (
	req: RequestProjectWithAuthentication,
	res: Response,
) => {
	const { subscriptionId, statusSubscription } = req.body;

	if (!Types.ObjectId.isValid(subscriptionId)) {
		return res.status(400).json({ message: "ID de assinatura inválido." });
	}

	try {
		const subscription = await SubscriptionModel.findOneAndUpdate(
			{
				_id: subscriptionId,
			},
			{ status: statusSubscription },
			{ new: true },
		);

		if (!subscription) {
			return res.status(404).json({ message: "Assinatura não encontrada." });
		}

		const project = await ProjectModel.findById(subscription.project);

		if (project?.owner.toString() !== req.user?._id.toString())
			return res
				.status(401)
				.json("Apenas o lider do projeto pode alterar o status");

		subscription.save();
		res.status(200).json({
			message: `Assinatura alterada para ${statusSubscription}.`,
			data: subscription,
		});
	} catch (e) {
		res
			.status(500)
			.json({ message: "Ocorreu um erro ao modificar a assinatura." });
	}
};

export const getUserSubscriptions = async (
	req: RequestProjectWithAuthentication,
	res: Response,
) => {
	try {
		const { id } = req.params;
		const subscriptions = await SubscriptionModel.find({
			user: id,
		}).populate("project");
		if (!subscriptions)
			return res.status(404).json({
				error: "Não foi possível encontrar assinaturas para este usuário",
			});
		res.json(subscriptions);
	} catch (err) {
		res
			.status(500)
			.json({ message: "Ocorreu um erro ao modificar a assinatura." });
	}
};
