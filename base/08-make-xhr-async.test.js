var resultViewer = require("clientApp").resultViewer;

buster.testCase("08 resultViewer", {

	"setUp": function () {
		/*:DOC elParent = <div>
		 <textarea id="contents">
		 some text
		 </textarea>
		 </div>
		 */
		resultViewer.init(this.elParent);
	},

	"loadResults()": {
		"should XHR, then onReceived (async)": function (done) {

			// async test

		}
	}

});