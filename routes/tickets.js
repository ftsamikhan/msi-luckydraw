import express from "express";
import { Ticket } from "../models/ticket";
import { User } from "../models/user";
var router = express.Router();

router.get("/", (res) => {
  Ticket.find({}, function (err, tickets) {
    if (err) console.log(err);
    else {
      if (tickets.length) res.status(200).send(tickets);
      else res.status(404).send("No tickets found");
    }
  });
});

router.post("/", (req, res) => {
  try {
    let id;
    let { username } = req.body;
    const result = new Ticket({ username });
    result.save((err, res) => {
      id = result._id;
    });

    User.find({ username: req.body.username }, function (err, foundUser) {
      if (err) {
        console.log(err);
        return res.sendStatus(200);
      } else {
        if (foundUser.length) {
          foundUser[0].tickets.push(result);
          foundUser[0].save(() => {
            return res.send(foundUser[0]);
          });
        } else
          return res
            .status(404)
            .send("No user found associated with this number");
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
});

export default router;
