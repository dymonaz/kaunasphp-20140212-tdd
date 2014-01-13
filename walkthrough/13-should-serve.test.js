var app = require("../index");
var supertest = require("supertest"),
	fs = require("fs");

buster.testCase("13 results", {

	"setUp": function () {
		expect(true).toBeTrue(); // hack - require() uses readFileSync()
	},

	"should serve combined results.html": function (done) {

		var readStub = this.stub(fs, "readFileSync");
		readStub.withArgs("build/browser.results.html")
			.returns("br");
		readStub.withArgs("build/node.results.html")
			.returns("nr");

		supertest(app)
		.get("/results")
		.expect(200)
		.expect("br<hr/>nr")
		.end(function (e) {
			expect(e).toBeNull();
			expect(readStub).toHaveBeenCalledTwice();
			done();
		});

	}

});
