import mongoose, { Schema, Document, Model } from "mongoose";

export interface IYear extends Document {
  year: number;
  movies: mongoose.Types.ObjectId[]; // References to Movie documents
}

const YearSchema = new Schema<IYear>({
  year: { type: Number, required: true },
  movies: [{ type: Schema.Types.ObjectId, ref: "Movie", default: [] }], // Use Schema.Types.ObjectId
});

const Year: Model<IYear> = mongoose.model<IYear>("Year", YearSchema);

export default Year;
