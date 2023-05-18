// import libs
import mongoose, { ConnectOptions } from "mongoose";
import bodyParser from "body-parser";
import express from "express";
import connectToDatabase from "./helpers/connectMongo";
const cors = require("cors");
// import routes
import userRouter from "./routes/UserRoutes";
import projectRouter from "./routes/ProjectRoutes";
import subscriptionRouter from "./routes/SubscriptionRoutes";
import optionsRouter from "./routes/OptionsRoutes";

// configs
const app = express();
const PORT = process.env.PORT || 8081;
require("dotenv").config();
//server
connectToDatabase();
// midlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// routes
app.use("/user", userRouter);
app.use("/project", projectRouter);
app.use("/subscription", subscriptionRouter);
app.use("/options", optionsRouter);
export const server = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
