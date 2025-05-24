import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
  FeedbackAuthor:{
    type: String,
    required: true
  },
    FeedbackContent:{
    type: String,
    required: true
  },
})

export default FeedbackSchema