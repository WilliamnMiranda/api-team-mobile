import UserModel from "../models/UserModel";
import { Request, Response } from "express";
export const create = async (req: Request, res: Response) => {
	const { name, email, password, cpf } = req.body;
	const user = new UserModel({ name, email, password, cpf });
	try {
		await user.save();
		res.status(200).json(user);
	} catch (e) {
		console.log(e);
		res.status(422).json({ error: "Email ou CPF ja cadastrados" });
	}
};
