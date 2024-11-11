const Workouts = require("../models/workoutModel");
const mongoose = require("mongoose");

//All Workouts
const getAllWorkouts = async (req, res) => {
  try {
    const user_id = req.user._id;
    const workouts = await Workouts.find({ user_id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    console.log(err);
  }
};

//Single Workout
const getSingleWorkout = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such workout" });
    }
    const workout = await Workouts.findById(id);
    if (!workout) {
      return res.status(404).json({ error: "No such workout" });
    }
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Server error" });
  }
};

//Add Workout
const addWorkouts = async (req, res) => {
  const { title, load, reps } = req.body;

  //Check emptyfield
  let emptyfield = [];
  if (!title) {
    emptyfield.push("title");
  }
  if (!load) {
    emptyfield.push("load");
  }
  if (!reps) {
    emptyfield.push("reps");
  }
  if (emptyfield.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the field", emptyfield });
  }
  try {
    const user_id = req.user._id;
    const workout = await Workouts.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err);
  }
};

//Update Workout
const updateWorkouts = async (req, res) => {
  const id = req.params.id;
  try {
    const workout = await Workouts.findByIdAndUpdate(id, { ...req.body });
    if (!workout) {
      res.status(404).json({ error: err.message });
    }
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
  }
};

//Delete Workout
const deleteWorkouts = async (req, res) => {
  const id = req.params.id;
  try {
    const workout = await Workouts.findByIdAndDelete(id);
    if (!workout) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(workout);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addWorkouts,
  getAllWorkouts,
  getSingleWorkout,
  updateWorkouts,
  deleteWorkouts,
};
