const express = require("express");
const app = express();
require("./db/mongoose");

const userRouter = require("../src/router/userRouter");
const taskRouter = require("../src/router/taskRouter");

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up and running at PORT ${port}`);
});
