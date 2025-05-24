import Elysia from "elysia";
import feedbackModel from "../../models/feedbackModel";

const FeedbackRouteGet = new Elysia()

FeedbackRouteGet.get('/feedbacks/get', async () => {
  try {
    const data = await feedbackModel.find({})
    return data
  } catch {
    return {
      message: "Something is wrong, please check logs 🤷‍♂️"
    }
  }
})

export default FeedbackRouteGet