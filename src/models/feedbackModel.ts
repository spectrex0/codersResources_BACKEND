import { model } from "mongoose";
import FeedbackSchema from "../schemas/feedback.js";

const feedbackModel = model("Feedbacks", FeedbackSchema);

export default feedbackModel;
