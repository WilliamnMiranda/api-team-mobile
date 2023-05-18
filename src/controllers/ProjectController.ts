import { Response } from "express";
import ProjectModel from "../models/ProjectModel";
import { RequestProjectWithAuthentication } from "../interfaces/ProjectInterface";
import UserModel from "../models/UserModel";

export const create = async (
  req: RequestProjectWithAuthentication,
  res: Response
) => {
  const {
    name,
    technologies,
    description,
    coreTechnology,
    ownerLinkedin,
    level /*functions*/,
  } = req.body;
  if (!name) res.status(422).json("O nome do projeto e obrigatorio");
  if (!description)
    res.status(422).json("A descricao do projeto e obrigatoria");
  if (!technologies)
    res.status(422).json("As tecnologias do projeto sao obrigatorias");

  try {
    const user = await UserModel.findById(req.user?._id);
    if (!user) {
      res.status(404).json("Usuario nao encontrado");
      return;
    }

    const project = new ProjectModel({
      name,
      technologies,
      description,
      coreTechnology,
      level,
      /*functions,*/
      owner: user._id,
      ownerLinkedin,
    });

    await project.save();

    user.projects.push(project._id);
    await user.save();

    res.status(200).json(project);
  } catch (e) {
    console.log(e);
    res.status(500).json("Error no servidor");
  }
};

export const deleteProject = async (
  req: RequestProjectWithAuthentication,
  res: Response
) => {
  const { id } = req.params;

  const project = await ProjectModel.findById(id);

  if (project) {
    const userId = req.user?._id?.toString();

    // Remove o ID do projeto da lista de projetos do usuário
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        response: false,
        message: "Não foi possível localizar o usuário",
      });
    }
    user.projects = user.projects.filter((p) => p.toString() !== id);
    await user.save();

    if (project.owner.toString() !== userId) {
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
  res: Response
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
  res: Response
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

export const signUpForTheProject = async (
  req: RequestProjectWithAuthentication,
  res: Response
) => {
  const { projectId } = req.body;
  const project = await ProjectModel.findById(projectId);
  if (!project) return res.status(404).json("Projeto nao encontrado");

  // Check if user is already subscribed
  const isAlreadySubscribed = project.subscriptions.includes(req.user?._id);
  if (isAlreadySubscribed) {
    return res.status(400).json("Usuario ja esta inscrito neste projeto");
  }

  try {
    project.subscriptions.push(req.user?._id);
    await project.save();
    res.status(200).json(project);
  } catch (e) {
    res.status(500).json({
      response: false,
      message: "Error interno no servidor",
    });
  }
};

export const acceptOrRejectOrders = async (
  req: RequestProjectWithAuthentication,
  res: Response
) => {
  const { userId } = req.body;
};

export const getRelevanteProjects = async (
  req: RequestProjectWithAuthentication,
  res: Response
) => {
  const user = await UserModel.findById(req.body._id); // busca o usuário pelo id

  const interests = user!.interests; // obtém os interesses do usuário

  const projects = await ProjectModel.aggregate([
    { $match: { technologies: { $in: interests } } },
    { $sort: { views: -1 } },
    { $limit: 10 },
  ]);
};
