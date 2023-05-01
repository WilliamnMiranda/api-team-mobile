import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/UserInterface";
import User from "../models/UserModel";
const jwt = require("jsonwebtoken");

export interface RequestWithAuthentication extends Request {
	user?: IUser | null;
}

const ValidateToken = async (
	req: RequestWithAuthentication,
	res: Response,
	next: NextFunction,
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
			const user = await User.findOne({ email: decoded.email });
			if (!user) {
				return res.status(401).json({ message: "User not found." });
			}
			req.user = user;
			next();
		},
	);
};

export default ValidateToken;
