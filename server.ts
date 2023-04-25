import mongoose from "mongoose";

const express = require("express");
const app = express();
const PORT = 8001;

mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("conectado ao banco");
		return "conectado ao banco";
	})
	.catch((e) => {
		console.log("error");
		console.log(e);
		return e;
	});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
