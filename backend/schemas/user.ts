import { model, Schema, Document } from "mongoose";

export interface IUser extends Document {
  userName: string;
  userPassword: string;
}

const userSchema = new Schema({
  userName: { type: String, required: true, unique: true },
  userPassword: { type: String, required: true },
});

export default userSchema
