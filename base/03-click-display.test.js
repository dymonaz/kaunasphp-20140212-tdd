var resultViewer = require("clientApp").resultViewer;

buster.testCase("03 resultViewer", {

	// introduce setUp

	"should render status div": function ()
	{
		var parent = document.createElement('div');

		resultViewer.init(parent);

		assert.match(parent.innerHTML,
			'<div id="testStatus"');
	},

	"should render results div": function ()
	{
		var el = document.createElement('div');
		resultViewer.init(el);
		expect(el.innerHTML)
			.toMatch('<div id="testResults"');
	},

	"when status is clicked, display results": function ()
	{
		var statusDiv = this.elParent.querySelector('#testStatus');
		var resultsDiv = this.elParent.querySelector('#testResults');

		// var evt = document.createEvent("MouseEvent");
	}

});
