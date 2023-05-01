import { Response } from "express";
import ProjectModel from "../models/ProjectModel";
import { RequestProjectWithAuthentication } from "../interfaces/ProjectInterface";

export const create = async (
	req: RequestProjectWithAuthentication,
	res: Response,
) => {
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
		owner: req.user?._id,
	});

	try {
		await project.save();
		res.status(200).json(project);
	} catch (e) {
		res.status(500).json("Error no servidor");
	}
};

export const deleteProject = async (
	req: RequestProjectWithAuthentication,
	res: Response,
) => {
	const { id } = req.params;

	const project = await ProjectModel.findById(id);

	if (project) {
		if (project.owner.toString() !== req.user?._id?.toString()) {
			return res.status(401).json({
				response: false,
				message: "Você não tem autorização para deletar este projeto",
			});
		}

		await ProjectModel.findByIdAndDelete(id);

		return res.status(200).json({
			response: true,
			message: "Projeto deletado com sucesso",
		});
	} else {
		return res.status(404).json({
			response: false,
			message: "Não foi possível localizar o projeto",
		});
	}
};

export const getAllUserProjects = async (
	req: RequestProjectWithAuthentication,
	res: Response,
) => {
	const { id } = req.params;
	const projects = await ProjectModel.find({
		owner: id,
	});

	if (!projects)
		return res.status(404).json({
			response: false,
			message: "O usuario nao tem nenhum projeto criado",
		});

	res.status(200).json(projects);
};

export const getOneUserProject = async (
	req: RequestProjectWithAuthentication,
	res: Response,
) => {
	const { id } = req.params;
	const project = await ProjectModel.findById(id);

	if (!project)
		return res.status(404).json({
			response: false,
			message: "Nenhum projeto encontrado",
		});

	return res.status(200).json(project);
};
