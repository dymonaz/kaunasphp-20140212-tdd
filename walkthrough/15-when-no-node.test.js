var app = require("../index");
var supertest = require("supertest"),
	fs = require("fs");

buster.testCase("15 results", {

	"setUp": function () {
		expect(true).toBeTrue();
	},

	"should 404 when no node results": function (done) {

		var readStub = this.stub(fs, "readFileSync");
		readStub.withArgs("build/browser.results.html").returns("br");
		readStub.withArgs("build/node.results.html").throws();

		supertest(app)
			.get("/results")
			.expect(404)
			.end(function (e) {
				expect(e).toBeNull();
				done();
			});

	}

});
