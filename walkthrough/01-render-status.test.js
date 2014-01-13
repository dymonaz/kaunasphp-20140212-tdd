var resultViewer = require("clientApp").resultViewer;

buster.testCase("01 resultViewer", {

	"should render status div": function ()
	{
		var parent = document.createElement('div');
		
		resultViewer.init(parent);
		
		assert.match(parent.innerHTML, 
									'<div id="testStatus"');
	}

});
