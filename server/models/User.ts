import mongoose, { Schema, Document, Model } from "mongoose";
//import Collection from "./Collection";

// IUser interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  collections: mongoose.Types.ObjectId[];
}

// User schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    collections: {
      type: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// User model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
