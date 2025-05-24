import {Elysia, t} from "elysia";

const feedbackDelete = new Elysia()

feedbackDelete.delete("/feedbacks/delete", ({}) => {

},{
  body: t.Object({
    
  })
})