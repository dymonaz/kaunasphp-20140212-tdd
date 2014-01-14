var resultViewer = require("clientApp").resultViewer;

buster.testCase("12 resultViewer", {

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

		"when http error, should retry": function () {

			var loadResultsStub = this.stub(resultViewer, "loadResults");
			var clock = this.useFakeTimers();

			resultViewer.onReceived(new Error());
			var statusDiv = this.elParent.querySelector('#testStatus');
			expect(statusDiv.dataset.status).toEqual("pending");
			var resultsDiv = this.elParent.querySelector('#testResults');
			expect(resultsDiv.innerHTML).toMatch("<p>Retrying...</p>");

			expect(loadResultsStub).not.toHaveBeenCalled();
			clock.tick(100);
			expect(loadResultsStub).toHaveBeenCalled();

		}
	}

});
