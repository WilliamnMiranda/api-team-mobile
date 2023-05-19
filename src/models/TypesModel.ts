import mongoose from "mongoose";

interface ITypes {
  name: string;
}

const TypesModel = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
});

export default mongoose.model<ITypes>("Types", TypesModel);
