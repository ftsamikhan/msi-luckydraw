import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  phoneNum: String,
  ticketNum: Number,
  admin: Boolean,
});

const User = mongoose.model("User", userSchema);

export default  User;
