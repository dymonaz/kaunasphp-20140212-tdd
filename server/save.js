var fs = require("fs");

module.exports = function (req, res) {
	var fileName = req.body.file;
	var text = req.body.text;
	if (fileName.substr(fileName.length - 8) == ".test.js") {

		console.log("Test received, saving: " + fileName);
		fs.writeFileSync("build/tmp/" + fileName, "(function(){\n\n" + text + "\n\n}());\n\n");

	} else {

		console.log("Implementation received: " + fileName);
		var outF = parseInt(fileName.substr(0, 3), 10) <= 12 ? "client/resultViewer.js" : "server/results.js";
		console.log("Saving as " + outF);
		fs.writeFileSync(outF, text);

	}
	fs.writeFileSync("walkthrough/" + fileName, text); // @todo: comment out when finished
	res.send("OK");
};
