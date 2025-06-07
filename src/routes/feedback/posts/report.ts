import { Elysia, t } from "elysia";
import feedbackModel from "../../../models/feedbackModel.js";


const addReport = new Elysia()

addReport.post('/report', async ({body}) => {
  const {_id} = body;

  const report = await feedbackModel.findByIdAndUpdate(
  _id, 
  {$inc: {Reports: 1}},
  {new: true}
  );
  return report
}, {
  body: t.Object({
    _id: t.String()
  })
})

export default addReport