import { Router } from "express";

import {
  create,
  deleteProject,
  getAllUserProjects,
  getOneUserProject,
  recents,
} from "../controllers/ProjectController";
import ValidateToken from "../middlewares/ValidateToken";

const projectRouter = Router();
projectRouter.post("/create", ValidateToken, create);
projectRouter.delete("/:id", ValidateToken, deleteProject);
projectRouter.get("/user", ValidateToken, getAllUserProjects);
projectRouter.get("/recent", recents);
projectRouter.get("/:id", ValidateToken, getOneUserProject);

export default projectRouter;
