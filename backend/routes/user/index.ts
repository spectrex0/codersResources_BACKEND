import Elysia from "elysia";
import userRouteRegister from "./register";
import userGet from "./get";
import userLogin from "./login";
import userDelete from "./delete";
const userR = new Elysia()

userR.get("user", () => {
  return{
    message: "User default route"
  }
})
userR.use(userRouteRegister)
userR.use(userGet)
userR.use(userDelete)
userR.use(userLogin)
export default userR