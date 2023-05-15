import mongoose from "mongoose";
import { IUser } from "../interfaces/UserInterface";

interface IProject extends mongoose.Document {
  name: String;
  owner: String;
  team: String[];
  technologies: String[];
  likes: Number;
  description: String;
  participants: IUser[];
  subscriptions: [String];
  views: Number;
  coreTechnology: String;
  level: String;
  functions: String[];
}

const ProjectModel = new mongoose.Schema(
  {
    participants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
    },
    name: String,
    owner: mongoose.Schema.Types.ObjectId,
    technologies: [String],
    likes: Number,
    level: {
      type: String,
      required: true,
    },
    coreTechnology: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: true,
    },
    type: String,
    functions: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Types",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IProject>("Project", ProjectModel);
