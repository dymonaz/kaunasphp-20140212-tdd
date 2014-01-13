var resultViewer = require("clientApp").resultViewer;

describe("resultViewer", function () {
	
	it("should render results div", function () {
		
		var el = document.createElement('div');
		resultViewer(el);
		expect(el.innerHTML).toMatch('<div id="testResults"');
		
	});
	
});
