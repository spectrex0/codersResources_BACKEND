import { model } from "mongoose";
import FeedbackSchema from "../schemas/feedback";

const feedbackModel =  model("Feedbacks", FeedbackSchema)

export default feedbackModel