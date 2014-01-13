var app = require("../index");
var supertest = require("supertest"),
	fs = require("fs");

buster.testCase("14 results", {

	"setUp": function () {
		expect(true).toBeTrue();
	},

	"should 404 when no browser results": function (done) {

		var readStub = this.stub(fs, "readFileSync");
		readStub.withArgs("build/browser.results.html")
			.throws();
		readStub.withArgs("build/node.results.html")
			.returns("nr");

		supertest(app)
		.get("/results")
		.expect(404)
		.end(function (e) {
			expect(e).toBeNull();
			done();
		});
	}
});
