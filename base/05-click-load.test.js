var resultViewer = require("clientApp").resultViewer;

buster.testCase("05 resultViewer", {

	"setUp": function () {
		/*:DOC elParent = <div>
		    <textarea id="contents">
		        some text
		    </textarea>
		 </div>
		 */
		resultViewer.init(this.elParent);
	},

	"onchange of textarea should loadResults()": function () {

		// introduce stubs

		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", true, true, null);
		this.elParent.querySelector('#contents').dispatchEvent(evt);

	}

});