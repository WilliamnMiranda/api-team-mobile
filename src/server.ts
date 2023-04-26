// import libs
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import connectToDatabase from "./helpers/connectMongo";
// import routes
import userRouter from "./routes/UserRoutes";

// configs
const app = express();
const PORT = process.env.PORT || 8081;
require("dotenv").config();
//server
connectToDatabase();
// midlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// routes
app.use("/user", userRouter);
export const server = app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
