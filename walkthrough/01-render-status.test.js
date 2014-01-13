var resultViewer = require("clientApp").resultViewer;

buster.testCase("resultViewer", {

	"should render status div": function ()
	{
		var parent = document.createElement('div');
		
		resultViewer(parent);
		
		assert.match(parent.innerHTML, 
									'<div id="testStatus"');
	}

});
