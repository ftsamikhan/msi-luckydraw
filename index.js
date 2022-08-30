import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {} from "dotenv/config";
import mongooseConnect from "./database/index.js";
import userRouter from "./routes/users.js";
import ticketRouter from "./routes/tickets.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongooseConnect();

const port = 3000;

app.use("/user", userRouter);
app.use("/ticket", ticketRouter);

app.listen(port, () => {
  console.log(`Server started at Port: ~ ${port}`);
});
