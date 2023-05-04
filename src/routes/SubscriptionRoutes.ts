import { Router } from "express";

import {
	requestSubscription,
	updateSubscription,
	getUserSubscriptions,
	getAllSubscriptionProject,
} from "../controllers/SubscriptionController";
import ValidateToken from "../middlewares/ValidateToken";

const subscriptionRouter = Router();

subscriptionRouter.post("/create", ValidateToken, requestSubscription);
subscriptionRouter.put("/change", ValidateToken, updateSubscription);
subscriptionRouter.get("/user/:id", getUserSubscriptions);
subscriptionRouter.get(
	"/project/:projectId",
	ValidateToken,
	getAllSubscriptionProject,
);
export default subscriptionRouter;
