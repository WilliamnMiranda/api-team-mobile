import mongoose from "mongoose";

const UserModel = new mongoose.Schema({
	name: String,
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

export default UserModel;
