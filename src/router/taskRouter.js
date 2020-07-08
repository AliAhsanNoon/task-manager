const express = require("express");
const router = new express.Router();
const Task = require("../models/task");
const { update } = require("../models/task");

router.get("/tasks", async (req, res) => {
  try {
    const task = await Task.find();
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      res.status(404).send("Not Found");
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOp = updates.every((elem) => allowedUpdates.includes(elem));

  if (!isValidOp) {
    return res.status(400).send("Invalid Updated Operation");
  }

  try {
    const task = await Task.findById(req.params.id);
    updates.forEach((elem) => (task[elem] = req.body[elem]));
    await task.save();
    if (!task) {
      return res.status(404).send("Not Found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(_id);
    if (!task) {
      return res.send(404).send("Record Not Found");
    }
    res.status(200).send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send("Error Saving Task");
  }
});

module.exports = router;
