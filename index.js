import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {} from "dotenv/config";
import mongooseConnect from "./database/index";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongooseConnect(app);

const port = 3000;

app.listen(port, () => {
  console.log(`Server started at Port: ~ ${port}`);
});
