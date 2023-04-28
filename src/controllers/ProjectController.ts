import { Request, Response } from "express";
import ProjectModel from "../models/ProjectModel";

export const create = async (req: Request, res: Response) => {
	const { name, technologies, description } = req.body;
	if (!name) res.status(422).json("O nome do projeto e obrigatorio");
	if (!description)
		res.status(422).json("A descricao do projeto e obrigatoria");
	if (!technologies)
		res.status(422).json("As tecnologias do projeto sao obrigatorias");

	const project = new ProjectModel({
		name,
		technologies,
		description,
	});

	try {
		await project.save();
		res.status(200).json(project);
	} catch (e) {
		res.status(500).json("Error no servidor");
	}
};
