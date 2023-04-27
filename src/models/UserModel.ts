import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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

UserModel.pre("save", async function (next) {
	return bcrypt
		.genSalt(10)
		.then((salt: any) =>
			bcrypt.hash(this.password as any, salt).then((hash: any) => {
				this.password = hash;
				next();
			}),
		)
		.catch(next);
});

UserModel.methods.comparePassword = async function (password: string) {
	const result = await bcrypt.compare(password, this.password);
	return result;
};

export default mongoose.model("User", UserModel);
