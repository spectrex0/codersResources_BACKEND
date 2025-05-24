import { Elysia } from "elysia";
import feedbackModel from "../../models/feedbackModel.js";

export const feedbackGetRoute = new Elysia().get("/get", async () => {
  try {
    const data = await feedbackModel.find({});
    return data;
  } catch {
    return {
      message: "Something is wrong, please check logs 🤷‍♂️",
    };
  }
});
