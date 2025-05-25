import { Elysia } from "elysia";
import { userDeleteRoute } from "./delete.js";
import { userGetRoute } from "./get.js";
import { userLoginRoute } from "./login.js";
import { userRegisterRoute } from "./register.js";

export const userRoute = new Elysia({ prefix: "/user" })
  .get("/", () => {
    return "User default route";
  })
  .use(userRegisterRoute)
  .use(userGetRoute)
  .use(userDeleteRoute)
  .use(userLoginRoute);
