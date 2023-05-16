import { Router } from "express";
import AuthenticateUser from "../middlewares/Authenticate";
import { create, login, auth } from "../controllers/UserController";

const userRouter = Router();

userRouter.post("/create", create);
userRouter.post("/login", login);
userRouter.post("/auth", AuthenticateUser, auth);
export default userRouter;
