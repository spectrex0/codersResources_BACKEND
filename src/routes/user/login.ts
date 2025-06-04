import { Elysia, t } from "elysia";
import userModel from "../../models/userModel.js";

export const userLoginRoute = new Elysia().post(
  "/login",
  async ({ body }: { body: { userName: string; userPassword: string } }) => {
    const { userName, userPassword } = body;
    const UserFound = await userModel.findOne({ userName });

    if (!UserFound) {
      return {
        successful: false,
        message: "User not found 😶",
      };
    }
    if (UserFound.userPassword !== userPassword) {
      return {
        successful: false,
        message: "Invalid credentials dude 🤐",
      };
    } else {
      return {
        successful: true,
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
