const express = require("express");
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());
app.use(express.static('public'));

app.use(express.json({limit : 52428800}))

const customEnv = require("custom-env")
customEnv.env(process.env.NODE_ENV, "./config");

const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const videos = require('./routes/video');
const user = require('./routes/user');
const comment = require('./routes/comment');
const category = require('./routes/category');
const token = require('./routes/token')

app.use("/api/videos", videos);
app.use("/api/users", user);
app.use("/api/comments", comment);
app.use("/api/categories", category);
app.use("/api/tokens", token)

app.listen(process.env.PORT);
