import { Router } from "express";
import AuthenticateUser from "../middlewares/Authenticate";
import { create, getOptions } from "../controllers/OptionsController";

const optionsRouter = Router();

optionsRouter.post("/", create);
optionsRouter.get("/", getOptions);
export default optionsRouter;
