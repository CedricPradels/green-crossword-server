import mongoose, { Schema, Document } from "mongoose";

const schema: Schema = new mongoose.Schema({
  title: { type: String },
  grade: { type: String },
  answers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Answer" }],
  grid: [[{ type: String }]],
  definitions: [{ word: { type: String }, definition: { type: String } }],
});

interface ICrossword extends Document {
  title: string;
  grade: string;
  answers: string[]; // Add IAnswer interface when created
  grid: string[][];
  definitions: { word: string; definition: string }[];
}

const Crossword = mongoose.model<ICrossword>("Crossword", schema);

export default Crossword;
