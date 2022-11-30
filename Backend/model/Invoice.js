import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
const userSchema = new mongoose.Schema({
  customername: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: false,
  },
  status: {
    type: String,
    require: true,
  },
  final: {
    type: String,
  },
  item: [],
});

userSchema.plugin(paginate);
const userdata = mongoose.model("invoice", userSchema);

export default userdata;
