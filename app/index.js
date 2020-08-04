var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var cors = require('cors');

var itemController = require("./controller/itemController")
var typeController = require("./controller/typeController")
var videoController = require("./controller/videoController")

app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.text());

app.use(cors());

app.use("/api/item", itemController);
app.use("/api/type", typeController);
app.use("/api/video", videoController);

module.exports = app