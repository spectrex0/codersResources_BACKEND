import { Elysia, t } from "elysia";
import feedbackModel from "../../models/feedbackModel.js";

export const feedbackSendRoute = new Elysia().post(
  "/send",
  async ({ body }: {body: {FeedbackAuthor: String, FeedbackContent: String, Likes: Number, Reports: Number}}) => {
    try {
      const { FeedbackAuthor, FeedbackContent, Likes, Reports} = body;
      const SaveData = new feedbackModel({ FeedbackAuthor, FeedbackContent, Likes, Reports});
      await SaveData.save();

      return {
        message: "Feedback Saved! 😁",
      };
    } catch (error) {
      console.error("Error saving feedback:", error);
      return {
        message: "Something went wrong, please try again later.",
        error: error instanceof Error ? error.message : String(error),
      };
    }
  },
);
