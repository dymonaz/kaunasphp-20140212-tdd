module.exports["browser"] = {
	rootPath: ".",
	environment: "browser",
	sources: [ "build/clientApp.min.js" ],
	tests: [ "client/test/*.test.js" ],
	testHelpers: [ "buster.helpers.js" ],
	extensions: [require("buster-html-doc")]
};

module.exports["node"] = {
	rootPath: ".",
	environment: "node",
	tests: [ "server/test/*.test.js" ],
	testHelpers: [ "buster.helpers.js" ]
};
