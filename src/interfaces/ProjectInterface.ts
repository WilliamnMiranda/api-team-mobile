import { Request } from "express";
import mongoose from "mongoose";
import { IUser } from "./UserInterface";

export interface IProject extends mongoose.Document {
	name: String;
	owner: String;
	team: String[];
	technologies: String[];
	likes: Number;
	description: String;
}

export interface RequestProjectWithAuthentication extends Request {
	user?: IUser;
}
