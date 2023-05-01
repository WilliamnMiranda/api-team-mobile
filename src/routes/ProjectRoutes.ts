import { Router } from "express";

import { create, deleteProject } from "../controllers/ProjectController";
import AuthenticateUser from "../middlewares/Authenticate";
import ValidateToken from "../middlewares/ValidateToken";

const projectRouter = Router();

projectRouter.post("/create", ValidateToken, create);
projectRouter.delete("/:id", ValidateToken, deleteProject);

export default projectRouter;
