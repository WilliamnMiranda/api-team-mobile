import { Router } from "express";

import { create } from "../controllers/UserController";

const userRouter = Router();

userRouter.post("/register", create);

export default userRouter;
