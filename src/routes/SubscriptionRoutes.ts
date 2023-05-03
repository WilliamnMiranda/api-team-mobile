import { Router } from "express";

import {
	requestSubscription,
	updateSubscription,
} from "../controllers/SubscriptionController";
import ValidateToken from "../middlewares/ValidateToken";

const subscriptionRouter = Router();

subscriptionRouter.post("/create", ValidateToken, requestSubscription);
subscriptionRouter.put("/change", ValidateToken, updateSubscription);

export default subscriptionRouter;
