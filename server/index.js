var express = require('express');

var app = express();
app.use(express.logger({ immediate: true, format: 'dev' }));


app.get("/", function (req, res) { res.sendfile("index.html"); });
app.get("/buster.js", function (req, res) { res.sendfile("buster.js"); });
app.get("/buster.helpers.js", function (req, res) { res.sendfile("buster.helpers.js"); });

app.post("/save", express.bodyParser(), require("./save"));
app.get("/results", require("./results"));

app.use(express.static("node_modules/reveal.js/"));
app.use("/codemirror", express.static("node_modules/codemirror"));

app.use(express.static("build/"));
app.use(express.static("static/"));
app.use("/base", express.static("base/"));
app.use("/walkthrough", express.static("walkthrough/"));

module.exports = app;
