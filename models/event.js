import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  reward: String,
  date: String,
  resultAnnounced: Boolean,
  users: [{ type: String }],
});

const Event = mongoose.model("Event", eventSchema);

export default Event;
