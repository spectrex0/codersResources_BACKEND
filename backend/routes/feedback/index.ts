import Elysia from "elysia";
import FeedbackRouteGet from "./get";
import FeedbackRouteSend from "./send";

const FeedbackR = new Elysia()

FeedbackR.use(FeedbackRouteGet)
FeedbackR.use(FeedbackRouteSend)

export default FeedbackR