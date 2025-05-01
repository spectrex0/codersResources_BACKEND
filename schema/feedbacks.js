import mongoose from "mongoose";

const feedback = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    token : {
        type: String,
        required: false
    }
})

export default feedback