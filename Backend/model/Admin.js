import mongoose from "mongoose";
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    otp: {
        type: Number
    },
    verified: {
        type: Boolean
    }


});
const userdata = mongoose.model("Admin", userSchema);

export default userdata;