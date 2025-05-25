import { Elysia, t } from "elysia";

export const feedbackDeleteRoute = new Elysia().delete("/delete", ({}) => {}, {
  body: t.Object({}),
});
