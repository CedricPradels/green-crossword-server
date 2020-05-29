import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  email: string;
  token: string;
  hash: string;
  salt: string;
}

const schema: Schema = new mongoose.Schema({
  email: { type: String },
  token: { type: String },
  hash: { type: String },
  salt: { type: String },
});

const User = mongoose.model<IUser>("User", schema);

export default User;
