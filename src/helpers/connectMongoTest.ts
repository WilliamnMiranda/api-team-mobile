import mongoose, { ConnectOptions } from "mongoose";
require("dotenv").config({ path: ".env.test" });
async function connectToDatabase() {
	try {
		await mongoose.connect(
			process.env.DATABASE as string,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			} as ConnectOptions,
		);
	} catch (error) {}
}

export default connectToDatabase;
