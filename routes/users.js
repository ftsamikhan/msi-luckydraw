import express from "express";
import { User } from "../models/user";
var router = express.Router();

async function addUser(req, res) {
  try {
    await User.find({ username: req.body.username }, (err, result) => {
      if (err) throw err;
      if (result.length) {
        return res.send(result);
      } else {
        let id;
        let { username, email, password, ticketNum, admin } = req.body;
        const user = new User({ username, email, password, ticketNum, admin });
        user.save((err) => {
          id = user._id;
          User.findById(id, (err, foundUser) => {
            console.log(foundUser);
            if (err) {
              console.log(err);
            } else {
              return res.send(foundUser);
            }
          });
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.send(500).send(err.message);
  }
}

router.get("/users", (res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    }
    if (users.length) {
      return res.status(200).send(users);
    } else return res.status(200).send("No user found!");
  });
});

router.post("/", addUser);

export default router;