import { Router } from "express";

import { create, login } from "../controllers/UserController";
import AuthenticateUser from "../middlewares/Authenticate";

const userRouter = Router();

userRouter.post("/create", AuthenticateUser, create);
userRouter.post("/login", login);

export default userRouter;
