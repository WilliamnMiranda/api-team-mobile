import mongoose from "mongoose";

interface IProject extends mongoose.Document {
	name: String;
	owner: String;
	team: String[];
	technologies: String[];
	likes: Number;
	description: String;
}

const ProjectModel = new mongoose.Schema({
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
});

export default mongoose.model<IProject>("Project", ProjectModel);
