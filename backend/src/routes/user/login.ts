import { Elysia, t } from "elysia";
import userModel from "../../models/userModel.js";

export const userLoginRoute = new Elysia().post(
  "/login",
  async ({ body }) => {
    const { userName, userPassword } = body;
    const UserFound = await userModel.findOne({ userName });
    const passFound = await userModel.findOne({ userPassword });

    if (!UserFound) {
      return {
        succesful: false,
        message: "User not found 😶",
      };
    }
    if (!UserFound || !passFound) {
      return {
        succesful: false,
        message: "Invalid credentails dude 🤐",
      };
    } else {
      return {
        succesful: true,
      };
    }
  },
  {
    body: t.Object({
      userName: t.String(),
      userPassword: t.String(),
    }),
  }
);
