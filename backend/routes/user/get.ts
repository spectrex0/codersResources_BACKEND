import {Elysia} from "elysia";
import userModel from "../../models/userModel";

const userGet = new Elysia()

userGet.get("/user/get", async () => {
  try {
  const data = await userModel.find({})
  return {data}
  } catch (error) {
    return {
      message: "Error while getting users :( ..."
    }
  }
})


export default userGet