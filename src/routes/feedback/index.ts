import { Elysia } from "elysia";
import { feedbackDeleteRoute } from "./delete.js";
import { feedbackGetRoute } from "./get.js";
import { feedbackSendRoute } from "./send.js";
import addLike from "./posts/Like.js"
import addReport from "./posts/report.js";
export const feedbackRoute = new Elysia({ prefix: "/feedback" })
  .use(feedbackGetRoute)
  .use(feedbackSendRoute)
  .use(addLike)
  .use(addReport)
feedbackRoute.use(feedbackDeleteRoute);
