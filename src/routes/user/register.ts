import { Elysia, t } from "elysia";
import userModel from "../../models/userModel.js";

export const userRegisterRoute = new Elysia().post(
  "/register",
  async ({ body }: {body:{userPassword: String,userName: String }}) => {
    const { userName, userPassword } = body;
    try {
      if (!userName || !userPassword) {
        return {
          message: "fill all fields... 😑",
          successful: false,
        };
      }
      const userExists = await userModel.findOne({ userName });
      if (userExists) {
        return {
          successful: false,
          message: "The user already axists",
        };
      }
      const RegistUser = await new userModel({ userName, userPassword });
      RegistUser.save();
      return {
        successful: true,
        message: "User registred! 😁",
      };
    } catch (error) {
      console.log("Something went wrong while creating user acc: ", error);
      return {
        message: "Error creating account",
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
