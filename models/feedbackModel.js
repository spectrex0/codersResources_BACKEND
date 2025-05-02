import mongoose from "mongoose";
import feedback from "../schema/feedbacks.js";
const feedbackModel = mongoose.model('feedbacks', feedback)

export default feedbackModel

