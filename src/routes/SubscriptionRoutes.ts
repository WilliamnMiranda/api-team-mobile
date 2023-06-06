import { Router } from "express";

import {
  requestSubscription,
  updateSubscription,
  getUserSubscriptions,
  getAllSubscriptionProject,
  getAllSubscriptionsUser,
} from "../controllers/SubscriptionController";
import ValidateToken from "../middlewares/ValidateToken";

const subscriptionRouter = Router();

subscriptionRouter.post("/create", ValidateToken, requestSubscription);
subscriptionRouter.put("/change", ValidateToken, updateSubscription);
subscriptionRouter.get("/user", ValidateToken, getUserSubscriptions);
subscriptionRouter.get(
  "/user/projects",
  ValidateToken,
  getAllSubscriptionProject
);
subscriptionRouter.get("/projects", ValidateToken, getAllSubscriptionsUser);
export default subscriptionRouter;
