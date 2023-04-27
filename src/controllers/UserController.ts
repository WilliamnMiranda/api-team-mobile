import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
export const create = async (req: Request, res: Response) => {
	const { name, email, password, cpf } = req.body;
	if (!name || !email || !cpf || !password)
		res.status(406).json({ error: "Todos os campos sao obrigatorios" });
	const user = new UserModel({ name, email, password, cpf });
	try {
		await user.save();
		const token = jwt.sign({ email }, process.env.SECRET as string, {
			expiresIn: 300000000,
		});
		const userLogged = { name, email, token, cpf };
		res.status(200).json(userLogged);
	} catch (e) {
		console.log(e);
		res.status(422).json({ error: "Email ou CPF ja cadastrado" });
	}
};
