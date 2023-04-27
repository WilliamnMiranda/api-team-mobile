import mongoose from "mongoose";

interface IUser {
	name: string;
	cpf: number;
	email: string;
	password: string;
}
const UserModel = new mongoose.Schema({
	name: String,
	cpf: {
		type: Number,
		require: true,
		unique: true,
	},
	email: {
		type: String,
		require: true,
		unique: true,
	},
	password: {
		type: String,
		require: true,
	},
});

export default mongoose.model("User", UserModel);
