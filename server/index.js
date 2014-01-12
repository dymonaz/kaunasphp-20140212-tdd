var express = require('express');

var app = express();
app.use(express.logger({ immediate: true, format: 'dev' }));

app.get("/", function (req, res) {
	res.sendfile("index.html");
});
app.use(express.static("node_modules/reveal.js"));
app.use(express.static("build/"));
app.use(express.static("static/"));

module.exports = app;