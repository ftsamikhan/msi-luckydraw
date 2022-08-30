import express from "express";
import Ticket from "../models/ticket.js";
var router = express.Router();

router.get("/", (req, res) => {
  Ticket.find({}, function (err, tickets) {
    if (err) console.log(err);
    else {
      if (tickets.length) res.status(200).send(tickets);
      else res.status(404).send("No tickets found");
    }
  });
});

router.post("/", async (req, res) => {
  try {
    const result = await Ticket.create(req.body);
    res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const result = await Ticket.findByIdAndUpdate(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Ticket.findByIdAndDelete(req.params.id);
  } catch (error) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

export default router;
