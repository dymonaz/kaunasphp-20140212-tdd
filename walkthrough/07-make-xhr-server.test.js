var resultViewer = require("clientApp").resultViewer;

buster.testCase("07 resultViewer", {

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
		"should XHR, then onReceived (server)": function () {

			var onReceivedStub = this.stub(resultViewer, "onReceived");
			var server = this.useFakeServer();
			server.respondWith("GET", "/results", [404, {"content-type": "text/html"}, ""]);

			resultViewer.loadResults();
			expect(server.requests.length).toEqual(1);

			server.respond();
			expect(onReceivedStub).toHaveBeenCalledOnce();

		}
	}

});