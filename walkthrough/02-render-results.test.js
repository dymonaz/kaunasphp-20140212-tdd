var resultViewer = require("clientApp").resultViewer;

describe("02 resultViewer", function () {
	
	it("should render results div", function () {
		
		var el = document.createElement('div');
		resultViewer.init(el);
		expect(el.innerHTML).toMatch('<div id="testResults"');
		
	});
	
});
