import Elysia from "elysia";
import userDelete from "./delete";
import userGet from "./get";
import userLogin from "./login";
import userRouteRegister from "./register";
const userR = new Elysia();

userR.get("/user", () => {
  "User default route";
});
userR.use(userRouteRegister);
userR.use(userGet);
userR.use(userDelete);
userR.use(userLogin);
export default userR;
