import mongoose from "mongoose";

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        unique: true
    },
    token: {
        type:String,
        required: true
    },
    // feedback: {
    //     type: String,
    //     required: true
    // }
})


export default userSchema