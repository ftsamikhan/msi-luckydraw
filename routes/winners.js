import express from "express";
import Event from "../models/event.js";
import User from "../models/user.js";
import Winner from "../models/winners.js";
import moment from "moment";

var router = express.Router();

async function generateWinner(req, res) {
  console.log(moment().format("LT"));
  Event.find(
    { resultAnnounced: false, date: { $lte: moment().format("L") } },
    function (result) {
      const arr = [];
      if (result.length) {
        result.forEach((event) => {
          let { users } = event;
          let len = users.length;
          let rn = Math.floor(Math.random() * len);

          if (users.length) {
            User.find({ username: users[rn] }, function (err, foundUser) {
              if (err) {
                console.log(err);
              } else {
                let eventWinner = new Winner({
                  user: foundUser,
                  event: event,
                });

                arr.push(eventWinner);
                eventWinner.save();
                event.resultAnnounced = true;
                event.save();
              }
            });
          }
        });
      }
      if (arr.length) return res.send(arr);
      else
        return res.send(
          "No event for the draw. Please check the previous winners."
        );
    }
  );
}

async function getWinner(res) {
  const winnerslimit = 1;
  await Winner.find({})
    .limit(winnerslimit)
    .exec(function (result) {
      return res.send(result);
    });
}

router.get("/", generateWinner);

router.get("/list", getWinner);

export default router;
