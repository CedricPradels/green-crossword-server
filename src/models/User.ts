import mongoose, { Schema } from "mongoose";

interface User {
  email: string;
  token: string;
  hash: string;
  salt: string;
}

const schema: Schema<User> = new mongoose.Schema({
  email: { type: String },
  token: { type: String },
  hash: { type: String },
  salt: { type: String },
});

const User = mongoose.model("User", schema);

export default User;
