var resultViewer = require("clientApp").resultViewer;

buster.testCase("resultViewer", {

	"should render status div": function ()
	{
		var parent = document.createElement('div');
		
		resultViewer(parent);
		
		expect(parent.innerHTML)
			.toMatch('<div id="testStatus"');
	}

});
