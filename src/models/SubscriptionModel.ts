import mongoose from "mongoose";

interface ISubscription {
	user: string;
	project: string;
	status: string;
}
const SubscriptionModel = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	project: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Project",
		required: true,
	},
	status: {
		type: String,
		enum: ["pending", "approved", "rejected"],
		default: "pending",
	},
});

export default mongoose.model<ISubscription>("Subscription", SubscriptionModel);
