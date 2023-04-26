import UserModel from "../models/UserModel";
import { Request, Response } from "express";
export const create = async (req: Request, res: Response) => {
	console.log("a");
	res.status(200).send("teste");
};
