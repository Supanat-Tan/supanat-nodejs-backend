require("dotenv").config();
const express = require("express");
const workoutRoutes = require("./routes/workouts_routers");
const userRoutes = require("./routes/users");
const mongoose = require("mongoose");

const app = express();

//Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);

app.use("/api/user", userRoutes);

//Routes
app.get("/", (req, res) => {
  res.json({
    mssg: "welcome",
  });
});

//Main server
async function main() {
  try {
    //connect to DB
    mongoose
      .connect(process.env.Mongo_URI)
      .then(() => {
        app.listen(process.env.PORT, () => {
          console.log("Connected to DB, Listening on Port ", process.env.PORT);
        });
      })
      .catch((err) => {
        console.log(err);
      });

    //On Signal Interrupted
    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to app interruption");
      process.exit(0);
    });

    //On Signal terminated
    process.on("SIGTERM", async () => {
      await mongoose.connection.close();
      console.log("MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
