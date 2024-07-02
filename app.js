const express = require("express");
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const customEnv = require("custom-env")
customEnv.env(process.env.NODE_ENV, "./config");

const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const videos = require('./routes/video');
const user = require('./routes/user');

app.use("/api/videos", videos);
app.use("/api/user", user);

app.listen(process.env.PORT);
