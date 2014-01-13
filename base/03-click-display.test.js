var resultViewer = require("clientApp").resultViewer;

buster.testCase("resultViewer", {

	// introduce setUp

	"should render status div": function ()
	{
		var parent = document.createElement('div');

		resultViewer(parent);

		assert.match(parent.innerHTML,
			'<div id="testStatus"');
	},

	"should render results div": function ()
	{
		var el = document.createElement('div');
		resultViewer(el);
		expect(el.innerHTML)
			.toMatch('<div id="testResults"');
	}

});
