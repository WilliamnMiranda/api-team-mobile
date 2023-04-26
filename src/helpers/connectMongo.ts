import mongoose, { ConnectOptions } from "mongoose";
async function connectToDatabase() {
	try {
		await mongoose.connect(
			process.env.DATABASE as string,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			} as ConnectOptions,
		);
		console.log("Conectado ao banco");
	} catch (error) {
		console.log("Erro ao conectar ao banco:");
	}
}

export default connectToDatabase;
