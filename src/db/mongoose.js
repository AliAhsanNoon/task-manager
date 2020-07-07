const mongoose = require("mongoose");

const connectionURL = "mongodb://localhost:27017/task-manager-api";

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
