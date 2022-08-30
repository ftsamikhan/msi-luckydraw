import mongoose, { mongo } from "mongoose";

const ticketSchema = new mongoose.Schema({
  ticketNumber: Number,
});

const Ticket = mongoose.model("Ticket", ticketSchema);
export default Ticket;
