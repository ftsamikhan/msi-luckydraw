import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema({
  users: [{ type: String }],
});

const Winner = mongoose.model("Winner", winnerSchema);

export default Winner;
