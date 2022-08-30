import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  categories : String,
  ticketNumber: Number,
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
