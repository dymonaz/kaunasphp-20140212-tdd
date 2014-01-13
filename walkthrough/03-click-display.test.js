var resultViewer = require("clientApp").resultViewer;

buster.testCase("resultViewer", {

 "setUp": function () {
	 this.elParent = document.createElement('div');
	 resultViewer(this.elParent);
 },
								 
	"should render status div": function ()
	{
		assert.match(this.elParent.innerHTML, 
									'<div id="testStatus"');
	},

	 "should render results div": function ()
	{
		expect(this.elParent.innerHTML)
			.toMatch('<div id="testResults"');
	},
	
	"when status is clicked, display results": function ()
	{
		var statusDiv = this.elParent.querySelector('#testStatus');
		var resultsDiv = this.elParent.querySelector('#testResults');
		var evt = document.createEvent("MouseEvent");
		evt.initEvent("click", true, true, null);
		statusDiv.dispatchEvent(evt);
		expect(resultsDiv.classList).toMatch(["visible"]);
	}

});
