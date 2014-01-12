var fs = require("fs");

module.exports = function (req, res) {
	var fileName = req.body.file;
	if (fileName.substr(fileName.length - 8) == ".test.js") {

		console.log("Test received, saving: " + fileName);
		fs.writeFileSync("build/tmp/" + fileName, req.body.text);

	} else {

		console.log("Implementation received: " + fileName);
		var outF = parseInt(fileName.substr(0, 3), 10) <= 12 ? "client/resultViewer.js" : "server/results.js";
		console.log("Saving as " + outF);
		fs.writeFileSync(outF, req.body.text);

	}
	res.send("OK");
};
