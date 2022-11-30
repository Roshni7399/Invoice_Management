
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  customername: {
    type: String,
    require: true,
  },

  phone: {
    type: Number,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
});
const userdata = mongoose.model("customer", userSchema);

export default userdata;
