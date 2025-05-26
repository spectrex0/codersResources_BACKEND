import { Elysia, t } from "elysia";
import feedbackModel from "../../models/feedbackModel.js";

export const feedbackDeleteRoute = new Elysia().delete("/delete", async ({body}) => {
  const {FeedbackContent} = body
  try {
    const deleteFeedback = await feedbackModel.findOneAndDelete({FeedbackContent})
    return{
      deleteFeedback,
      message: "Feedback deleted ✔"
    }
  } catch (error) {
    return{
      message: "error deleting feedback"
    }
  }
}, {
  body: t.Object({
    FeedbackContent: t.String(),
  }),
});
