import mongoose from "mongoose";
import { IUser } from "../interfaces/UserInterface";

interface IProject extends mongoose.Document {
	name: String;
	owner: String;
	team: String[];
	technologies: String[];
	likes: Number;
	description: String;
	participants: IUser[];
}

const ProjectModel = new mongoose.Schema(
	{
		participants: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
		},
		subscriptions: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
		},
		name: String,
		owner: mongoose.Schema.Types.ObjectId,
		team: [mongoose.Schema.Types.ObjectId],
		technologies: [String],
		likes: Number,
		description: {
			type: String,
			require: true,
		},
		type: String,
	},
	{
		timestamps: true,
	},
);

export default mongoose.model<IProject>("Project", ProjectModel);
