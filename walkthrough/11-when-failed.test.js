var resultViewer = require("clientApp").resultViewer;

buster.testCase("11 resultViewer", {

	"setUp": function () {
		/*:DOC elParent = <div>
		 <textarea id="contents">
		 some text
		 </textarea>
		 </div>
		 */
		resultViewer.init(this.elParent);
	},

	"onReceived()": {
		"when OK should change status and add results": function () {
			resultViewer.onReceived(null, "OK RESULTS");
			var statusDiv = this.elParent.querySelector('#testStatus');
			expect(statusDiv.dataset.status).toEqual("ok");
			var resultsDiv = this.elParent.querySelector('#testResults');
			expect(resultsDiv.innerHTML).toMatch("OK RESULTS");
		},

		"when fail, should change status and add results": function () {
			resultViewer.onReceived(null, "✖ mega fail");
			var statusDiv = this.elParent.querySelector('#testStatus');
			expect(statusDiv.dataset.status).toEqual("fail");
			var resultsDiv = this.elParent.querySelector('#testResults');
			expect(resultsDiv.innerHTML).toMatch("✖ mega fail");
		}
	}

});
