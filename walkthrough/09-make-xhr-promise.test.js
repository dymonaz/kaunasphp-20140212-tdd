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

			var onReceivedStub = this.stub(resultViewer, "onReceived");
			var server = this.useFakeServer();
			server.respondWith("GET", "/results", [200, {"content-type": "text/html"}, "RESULTS"]);

			var promise = resultViewer.loadResults();

			setTimeout(function () {
				server.respond();
			}, 100);

			return promise.then(function () {
				expect(onReceivedStub).toHaveBeenCalledOnceWith(null, "RESULTS");
			});

		}
	}

});