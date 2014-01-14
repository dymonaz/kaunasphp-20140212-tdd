var fs = require("fs");

module.exports = function (req, res) {
	var fileName = req.body.file;
	var text = req.body.text;
	var delBrowser = parseInt(fileName.substr(0, 3), 10) <= 12;
	var resFn = "build/" + (delBrowser ? "browser" : "node") + ".results.html";
	if (fs.existsSync(resFn)) {
		console.log("Deleting " + resFn);
		fs.unlink(resFn);
	}

	if (fileName.substr(fileName.length - 8) == ".test.js") {

		console.log("Test received, saving: " + fileName);
		fs.writeFileSync("build/tmp/" + fileName, "(function(){\n\n" + text + "\n\n}());\n\n");

	} else {

		console.log("Implementation received: " + fileName);
		var outF = delBrowser ? "client/resultViewer.js" : "server/results.js";
		console.log("Saving as " + outF);
		fs.writeFileSync(outF, text);

	}

	res.send("OK");
};
