import { Router } from "express";

import { requestSubscription } from "../controllers/SubscriptionController";
import ValidateToken from "../middlewares/ValidateToken";

const subscriptionRouter = Router();

subscriptionRouter.post("/create", ValidateToken, requestSubscription);

export default subscriptionRouter;
