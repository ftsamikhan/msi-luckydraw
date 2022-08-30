import mongoose from "mongoose";

const mdbURL = "mongodb://localhost:27017/LuckyDrawDB";

export default function mongooseConnect () {
  mongoose
    .connect(mdbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => {
      console.log("An error occured with mongoose connection: ", error.message);
    });

  mongoose.connection.once("open", function () {
    console.log("Mongoose default connection is open to ", mdbURL);
    // app.emit("ready");
  });

  mongoose.connection.on("disconnected", function () {
    console.log("Mongoose connection is disconnected");
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        "Mongoose default connection is disconnected due to application termination"
      );
      process.exit(0);
    });
  });
};
