module.exports = function (req, res) {
	console.log("Received:", req.body);
	res.send("OK");
};
