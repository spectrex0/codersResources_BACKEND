import { model } from "mongoose";
import userSchema from "../schemas/user.js";

const userModel = model("users", userSchema);

export default userModel;
