var express = require('express')
var app = require('./app/index')
// var port = process.env.PORT || 28590;
var port = 28590;

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));