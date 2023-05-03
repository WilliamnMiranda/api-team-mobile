import { RequestProjectWithAuthentication } from "../interfaces/ProjectInterface";
import ProjectModel from "../models/ProjectModel";
import SubscriptionModel from "../models/SubscriptionModel";
import { Response } from "express";
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
