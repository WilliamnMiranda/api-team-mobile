import mongoose from "mongoose";
import bcrypt from "bcryptjs";

interface IUser extends mongoose.Document {
  name: String;
  username: String;
  cpf: Number;
  email: String;
  password: String;
  comparePassword(password: string): Promise<boolean>;
  encryptPassword(password: string): Promise<void>;
  projects: String[];
  subscriptions: String[];
  interests: String[];
  worksWith: String;
}

const UserModel = new mongoose.Schema(
  {
    name: String,
    interests: {
      type: [String],
    },
    worksWith: {
      type: String,
      default: "none",
    },
    cpf: {
      type: Number,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    projects: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Project",
    },
  },
  {
    timestamps: true,
  }
);

UserModel.methods.encryptPassword = async function (password: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  this.set("password", hash);
};

UserModel.methods.comparePassword = async function (password: string) {
  const result = await bcrypt.compare(password, this.password);
  console.log(result);
  return result;
};

export default mongoose.model<IUser>("User", UserModel);
