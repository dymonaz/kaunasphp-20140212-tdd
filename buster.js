var config = module.exports;

config["browser"] = {
	rootPath: ".",
	environment: "browser",
	sources: [
		"build/resultViewer.min.js"
	],
	tests:[
		"client/test/*.test.js"
	],
	libs:[
		"buster.helpers.js"
	],
	extensions:[require("buster-html-doc")]
};

config["node"] = {
	rootPath: ".",
	environment: "node",
	tests:[
		"server/test/*.test.js"
	],
	libs:[
		"buster.helpers.js"
	]
};
