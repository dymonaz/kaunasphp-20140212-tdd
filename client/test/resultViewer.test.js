var resultViewer = require("clientApp").resultViewer;

buster.testCase("resultViewer", {

	"setUp": function () {
		/*:DOC elParent = <div>
		    <span>
		        some text
		    </span>
		 </div>
		 */
		resultViewer.init(this.elParent);
		expect(this.elParent.innerHTML).toMatch("some text");
	},

	"should render status div": function () {
		assert.match(this.elParent.innerHTML,
			'<div id="testStatus"');
	},

	"should render results div": function () {
		expect(this.elParent.innerHTML)
			.toMatch('<div id="testResults"');
	},

	"when status is clicked, display results": function () {
		var statusDiv = this.elParent.querySelector('#testStatus');
		var resultsDiv = this.elParent.querySelector('#testResults');
		var evt = document.createEvent("MouseEvent");
		evt.initEvent("click", true, true, null);
		statusDiv.dispatchEvent(evt);
		expect(resultsDiv.classList).toMatch(["visible"]);
	},

	"when status is clicked, hide results": function () {
		var statusDiv = this.elParent.querySelector('#testStatus');
		var resultsDiv = this.elParent.querySelector('#testResults');
		resultsDiv.className = "visible";

		var evt = document.createEvent("MouseEvent");
		evt.initEvent("click", true, true, null);
		statusDiv.dispatchEvent(evt);
		expect(resultsDiv.className).not.toMatch("visible");
	},

	"// ??? should loadResults()": function () {

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
			var onReceivedStub = this.stub(resultViewer, "onReceived");

			var server = this.useFakeServer();
			server.respondWith("GET", "/results", [200, {"content-type": "text/html"}, "RESULTS"]);

			resultViewer.loadResults();
			expect(server.requests.length).toEqual(1);

			server.respond();
			expect(onReceivedStub).toHaveBeenCalledOnceWith(null, "RESULTS");
		},

		"should XHR, then onReceived (server)": function () {
			var onReceivedStub = this.stub(resultViewer, "onReceived");

			var server = this.useFakeServer();
			server.respondWith("GET", "/results", [404, {"content-type": "text/html"}, ""]);

			resultViewer.loadResults();
			expect(server.requests.length).toEqual(1);

			server.respond();
			expect(onReceivedStub).toHaveBeenCalledOnce();
		},

		"should XHR, then onReceived (async)": function (done) {
			var onReceivedStub = this.stub(resultViewer, "onReceived");

			var server = this.useFakeServer();
			server.respondWith("GET", "/results", [200, {"content-type": "text/html"}, "RESULTS"]);

			resultViewer.loadResults(function () {

				expect(onReceivedStub).toHaveBeenCalledOnceWith(null, "RESULTS");
				done();

			});

			expect(server.requests.length).toEqual(1);
			setTimeout(function () {
				server.respond();
			}, 100);

		},

		"should XHR, then onReceived (promise)": function () {
			var onReceivedStub = this.stub(resultViewer, "onReceived");

			var server = this.useFakeServer();
			server.respondWith("GET", "/results", [200, {"content-type": "text/html"}, "RESULTS"]);

			var promise = resultViewer.loadResults();

			expect(server.requests.length).toEqual(1);
			setTimeout(function () {
				server.respond();
			}, 100);

			return promise.then(function () {
				expect(onReceivedStub).toHaveBeenCalledOnceWith(null, "RESULTS");
			})
		}
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
		},

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
