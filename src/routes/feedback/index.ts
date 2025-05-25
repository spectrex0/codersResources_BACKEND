import { Elysia } from "elysia";
import { feedbackDeleteRoute } from "./delete.js";
import { feedbackGetRoute } from "./get.js";
import { feedbackSendRoute } from "./send.js";

export const feedbackRoute = new Elysia({ prefix: "/feedback" })
  .use(feedbackGetRoute)
  .use(feedbackSendRoute)
  .use(feedbackDeleteRoute);
