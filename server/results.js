var fs = require("fs");
module.exports = function (req, res, next) {
	try
	{
		var br = fs.readFileSync("build/browser.results.html").toString();
		var nr = fs.readFileSync("build/node.results.html").toString();
		res.send([br,nr].join("<hr/>"));
	} catch (e) {
		next('route');
	}
};
