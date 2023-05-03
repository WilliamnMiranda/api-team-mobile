import { Router } from "express";

import {
	requestSubscription,
	updateSubscription,
	getUserSubscriptions,
} from "../controllers/SubscriptionController";
import ValidateToken from "../middlewares/ValidateToken";

const subscriptionRouter = Router();

subscriptionRouter.post("/create", ValidateToken, requestSubscription);
subscriptionRouter.put("/change", ValidateToken, updateSubscription);
subscriptionRouter.get("/all/:id", getUserSubscriptions);
export default subscriptionRouter;
