import { Elysia, t } from "elysia";
import userModel from "../../models/userModel";

const userDelete = new Elysia();

userDelete.delete(
  "/user/delete",
  async ({ body }) => {
    const { userName } = body;
    try {
      const userTodelete = await userModel.findOneAndDelete({ userName });
      if(!userTodelete){
        return{
          message: "User not found ❌"
        }
      }else{
        return{
          message: "User removed ✔"
        }
      }
      
    } catch (error) {
      return {
        message: "error deleting user... 😪",
      };
    }
  },
  {
    body: t.Object({
      userName: t.String(),
    }),
  }
);


export default userDelete