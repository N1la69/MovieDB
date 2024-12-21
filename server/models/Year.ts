import mongoose, { Schema, Document, Model } from "mongoose";

export interface IYear extends Document {
  year: number;
  movies: mongoose.Types.ObjectId[];
  collectionId: mongoose.Types.ObjectId;
}

const YearSchema = new Schema<IYear>({
  year: {
    type: Number,
    required: true,
    default: () => new Date().getFullYear(),
  },
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie", default: [] }],
  collectionId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Collection",
  },
});

const Year: Model<IYear> = mongoose.model<IYear>("Year", YearSchema);

export default Year;
