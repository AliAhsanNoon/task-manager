const express = require("express");
const app = express();
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const port = process.env.PORT || 3000;

app.use(express.json());

// Users
app.get("/users", (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((e) => res.status(500).send());
});

app.get("/users/:id", (req, res) => {
  const _id = req.params.id;
  console.log("user id :: ", _id);
  User.findById(_id)
    .then((user) => {
      if (!user) return res.send(404).send();
      res.send(user);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.post("/users", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then(() => res.status(201).send(user))
    .catch((error) => {
      res.status(400).send(error);
      console.log("Something went wrong while saving user", error);
    });
});

//---------- Tasks ---------

app.get("/tasks", (req, res) => {
  Task.find()
    .then((users) => res.send(users))
    .catch((e) => {
      res.status(500).send();
    });
});

app.get("/tasks/:id", (req, res) => {
  const _id = req.params.id;
  Task.findById(_id)
    .then((task) => {
      if (!task) {
        res.status(404).send("Not Found");
      }
      res.send(task);
    })
    .catch((e) => {
      res.status(500).send();
    });
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((data) => res.status(201).send(data))
    .catch((error) => res.status(400).send("Error Saving Task"));
});

app.listen(port, () => {
  console.log(`Server is up and running at PORT ${port}`);
});
