import mongoose, { Schema, Document } from "mongoose";

const schema: Schema = new mongoose.Schema({
  crossword: { type: mongoose.Schema.Types.ObjectId, ref: "Crossword" },
  student: {
    lastName: { type: String },
    firstName: { type: String },
  },
  grid: [[{ type: String }]],
  time: {
    start: Date,
    end: Date,
    duration: Number,
  },
  rating: {
    correct: { type: Number },
    over: { type: Number },
  },
});

interface IAnswer extends Document {
  crossword: string;
  student: { lastName: string; firstName: string };
  grid: string[][];
  time: {
    start: string;
    end: string;
    duration: string;
  };
  rating: {
    correct: number;
    over: number;
  };
}

const Answer = mongoose.model<IAnswer>("Answer", schema);

export default Answer;
