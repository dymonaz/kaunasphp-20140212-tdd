var resultViewer = require("clientApp").resultViewer;

buster.testCase("04 resultViewer", {

 "setUp": function () {
	 /*:DOC elParent = <div>
	 	<span>
	 		some text
		</span>
	 </div> */
	 resultViewer.init(this.elParent);
	 expect(this.elParent.innerHTML).toMatch("some text");
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
	},
	
	"when status is clicked, hide results": function ()
	{
		var statusDiv = this.elParent.querySelector('#testStatus');
		var resultsDiv = this.elParent.querySelector('#testResults');
		resultsDiv.className="visible";
		
		var evt = document.createEvent("MouseEvent");
		evt.initEvent("click", true, true, null);
		statusDiv.dispatchEvent(evt);
		expect(resultsDiv.className).not.toMatch("visible");
	}

});
