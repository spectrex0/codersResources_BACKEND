import { Elysia, t } from "elysia";
import feedbackModel from "../../../models/feedbackModel.js";

const addLike = new Elysia();

addLike.post(
  '/like',
  async ({ body }) => {
    const { id } = body;
    const updatedFeedback = await feedbackModel.findByIdAndUpdate(
      id,
      { $inc: { Likes: 1 } },
      { new: true }
    );
    return updatedFeedback;
  },
  {
    body: t.Object({
      id: t.String()
    })
  }
);

export default addLike;