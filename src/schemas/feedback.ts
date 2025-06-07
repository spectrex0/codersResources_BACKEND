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
  Likes: {
    type: Number,
    required: true
  },
  Reports: {
    type: Number,
    required: true
  }
})

export default FeedbackSchema