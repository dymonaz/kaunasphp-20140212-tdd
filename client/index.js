var resultViewer = require("./resultViewer");
var initEditor = require("./initEditor");

module.exports = function () {

	[].forEach.call(document.querySelectorAll(".code-editor textarea"), initEditor);

};
module.exports.resultViewer = resultViewer;
