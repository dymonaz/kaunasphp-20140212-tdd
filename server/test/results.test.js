var app = require("../index");
var supertest = require("supertest"),
	fs = require("fs");

buster.testCase("results", {

	"setUp": function () {
		expect(true).toBeTrue();
	},

	"should serve combined results.html": function (done) {

		var readStub = this.stub(fs, "readFileSync");
		readStub.withArgs("build/browser.results.html").returns("br");
		readStub.withArgs("build/node.results.html").returns("nr");

		supertest(app)
			.get("/results")
			.expect(200)
			.expect("br<hr/>nr")
			.end(function (e) {
				expect(e).toBeNull();
				expect(readStub).toHaveBeenCalledTwice();
				done();
			});

	},

	"should 404 when no browser results": function (done) {

		var readStub = this.stub(fs, "readFileSync");
		readStub.withArgs("build/browser.results.html").throws();
		readStub.withArgs("build/node.results.html").returns("nr");

		supertest(app)
			.get("/results")
			.expect(404)
			.end(function (e) {
				expect(e).toBeNull();
				done();
			});

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
