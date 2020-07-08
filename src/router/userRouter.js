const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.get("/users", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.send(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "password", "email", "age"];
  const isValidOperations = updates.every((elem) =>
    allowedUpdates.includes(elem)
  );
  if (!isValidOperations) {
    return res.status(400).send({ error: "Invalid Update Operation" });
  }
  try {
    const user = await User.findById(req.params.id);
    updates.forEach((elem) => (user[elem] = req.body[elem]));
    await user.save();
    if (!user) {
      return res.send(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/users", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.send(404).send("Record Not Found");
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
