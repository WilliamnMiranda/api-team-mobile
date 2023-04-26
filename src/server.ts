import mongoose, { ConnectOptions } from "mongoose";
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8081;
require("dotenv").config();
mongoose
	.connect(
		process.env.DATABASE as string,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as ConnectOptions,
	)
	.then(() => console.log("conectado ao banco"))
	.catch((e) => console.log("error"));

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
