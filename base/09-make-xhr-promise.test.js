var resultViewer = require("clientApp").resultViewer;

buster.testCase("09 resultViewer", {

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
		"should XHR, then onReceived (promise)": function () {

			// async test with promise!!

		}
	}

});