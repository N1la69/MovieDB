import mongoose, { Document, Schema } from "mongoose";

// Movie interface
export interface IMovie extends Document {
  title: string;
  description: string;
  cast: string[];
  duration: number; // in minutes
  releaseDate: Date;
  genre: string[];
  language: string;
  posterUrl: string; // URL for movie poster
  createdAt?: Date;
  updatedAt?: Date;
  rating?: number;
}

// Movie Schema
const MovieSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    cast: { type: [String], required: true },
    duration: { type: Number, required: true }, // in minutes
    releaseDate: { type: Date, required: true },
    genre: { type: [String], required: true },
    language: { type: String, required: true },
    posterUrl: { type: String, required: true },
    rating: { type: Number, min: 0, max: 10 },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model<IMovie>("Movie", MovieSchema);
export default Movie;
