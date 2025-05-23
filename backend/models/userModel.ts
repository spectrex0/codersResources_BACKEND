import { model } from "mongoose";
import userSchema from "../schemas/user";

const userModel = model('users', userSchema)

export default userModel;