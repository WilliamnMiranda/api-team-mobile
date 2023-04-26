import { Router } from "express";

import { create } from "../controllers/UserController";

const userRouter = Router();

userRouter.post("/create", create);

export default userRouter;
