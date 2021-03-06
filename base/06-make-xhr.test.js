var resultViewer = require("clientApp").resultViewer;

buster.testCase("06 resultViewer", {

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
		"should change status to loading": function () {

			this.useFakeServer();

			resultViewer.loadResults();
			var statusDiv = this.elParent.querySelector('#testStatus');
			expect(statusDiv.dataset.status).toEqual("pending");
			var resultsDiv = this.elParent.querySelector('#testResults');
			expect(resultsDiv.innerHTML).toMatch("<p>Loading...</p>");
		},

		"should XHR, then onReceived": function () {

			// introduce fake server

		}
	}

});