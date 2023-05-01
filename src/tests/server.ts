import bodyParser from "body-parser";
import express from "express";
import connectToDatabase from "../helpers/connectMongo";
// import routes
import userRouter from "../routes/UserRoutes";
import projectRouter from "../routes/ProjectRoutes";

// configs
const app = express();
const PORT = process.env.PORT || 8002;
require("dotenv").config();
//server
connectToDatabase();
// midlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// routes
app.use("/user", userRouter);
app.use("/project", projectRouter);
export const server = app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
