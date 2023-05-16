import User from "../models/UserModel";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces/UserInterface";
const jwt = require("jsonwebtoken");

interface ResquestAuthenticateUser extends Request {
  user?: IUser;
}

const AuthenticateUser = async (
  req: ResquestAuthenticateUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["x-access-token"];
  if (!token) return res.status(500).json("no token provider");
  jwt.verify(
    token,
    process.env.SECRET,
    async function (err: any, decoded: any) {
      if (err)
        return res
          .status(500)
          .json({ message: "Failed to authenticate token." });
      req.user = await User.findOne({ email: decoded.email });
      next();
    }
  );
};

export default AuthenticateUser;
