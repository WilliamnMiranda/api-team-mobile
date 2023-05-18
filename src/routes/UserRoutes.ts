import { Router } from "express";
import AuthenticateUser from "../middlewares/Authenticate";
import { create, login, authUser } from "../controllers/UserController";

const userRouter = Router();

userRouter.post("/create", create);
userRouter.post("/login", login);
userRouter.post("/auth", AuthenticateUser, authUser);
export default userRouter;
