import { RequestProjectWithAuthentication } from "../interfaces/ProjectInterface";
import Subscription from "../models/SubscriptionModel";
import { Response } from "express";
export const requestSubscription = async (
	req: RequestProjectWithAuthentication,
	res: Response,
) => {
	const { projectId } = req.body;
	const existingSubscription = await Subscription.findOne({
		user: req.user?._id,
		project: projectId,
	});

	if (existingSubscription) {
		return res
			.status(400)
			.json({ message: "Voce ja se inscreveu para esse projeto" });
	}

	const newSubscription = new Subscription({
		user: req.user?._id,
		project: projectId,
	});

	await newSubscription.save();

	res.status(201).json({ message: "Inscricao enviada ao lider do projeto" });
};
