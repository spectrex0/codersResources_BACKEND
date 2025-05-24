import { Elysia } from "elysia";
import userModel from "../../models/userModel.js";

export const userGetRoute = new Elysia().get("/get", async () => {
  try {
    const data = await userModel.find({});
    return { data };
  } catch (error) {
    return {
      message: "Error while getting users :( ...",
    };
  }
});
