import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICollection extends Document {
  name: string;
  userId: mongoose.Types.ObjectId;
  years: mongoose.Types.ObjectId[];
}

const CollectionSchema = new Schema<ICollection>({
  name: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  years: [{ type: Schema.Types.ObjectId, ref: "Year", default: [] }],
});

const Collection: Model<ICollection> = mongoose.model<ICollection>(
  "Collection",
  CollectionSchema
);

export default Collection;
