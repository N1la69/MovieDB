import mongoose, { Schema, Document } from "mongoose";

// collections
interface ICollection {
  name: string;
  years: number[];
}

// IUser interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  collections: ICollection[];
}

// collections schema
const CollectionSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    years: {
      type: [Number],
      default: [],
    },
  },
  { _id: false }
);

// User schema
const UserSchema: Schema = new Schema(
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
      type: [CollectionSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
