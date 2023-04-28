import { Router } from "express";

import { create, login } from "../controllers/UserController";

const userRouter = Router();

userRouter.post("/create", create);
userRouter.post("/login", login);

export default userRouter;
