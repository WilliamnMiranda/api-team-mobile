import mongoose from "mongoose";

export interface IUser extends mongoose.Document {
	name: String;
	username: String;
	cpf: Number;
	email: String;
	password: String;
	comparePassword(password: string): Promise<boolean>;
	projects: [String];
}
