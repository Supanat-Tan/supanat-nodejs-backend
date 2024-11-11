const express = require("express");
const {
  addWorkouts,
  getSingleWorkout,
  getAllWorkouts,
  updateWorkouts,
  deleteWorkouts,
} = require("../controllers/workoutsController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require Auth for all workouts route
router.use(requireAuth);

//Add Workout
router.post("/add", addWorkouts);

//Get All Workouts
router.get("/all", getAllWorkouts);

//Get Single Workout
router.get("/single/:id", getSingleWorkout);

//Update Workout
router.patch("/update/:id", updateWorkouts);

//Delete Workout
router.delete("/delete/:id", deleteWorkouts);

module.exports = router;
