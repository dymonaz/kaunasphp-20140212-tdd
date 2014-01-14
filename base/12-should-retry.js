var elStatus, elResults;

module.exports.init = function (elParent) {
	var statusDiv = '<div id="testStatus"></div>';
	elParent.insertAdjacentHTML("beforeend", statusDiv);

	var resultsDiv = '<div id="testResults"></div>';
	elParent.insertAdjacentHTML("beforeend", resultsDiv);

	elStatus = elParent.querySelector('#testStatus');
	elResults = elParent.querySelector('#testResults');
	elStatus.addEventListener('click', function () {
		elResults.classList.toggle("visible");
	});

	[].forEach.call(elParent.querySelectorAll('textarea'), function (ta) {
		ta.addEventListener('change', function () {
			module.exports.loadResults();
		});
	});
};

var reqwest = require("reqwest");
module.exports.loadResults = function (done) {
	elStatus.dataset.status = "pending";
	elResults.innerHTML = "<p>Loading...</p>";

	return reqwest({
		url: "/results",
		type: "html",
		success: function (res)
		{
			module.exports.onReceived(null, res);
			if (done) done();
		},
		error: function ()
		{
			module.exports.onReceived(new Error());
			if (done) done();
		}
	});
};

module.exports.onReceived = function (e, res) {
	if (e) {
		elStatus.dataset.status = "pending";
		elResults.innerHTML = "<p>Retrying...</p>";
	} else {
		elStatus.dataset.status = res.indexOf('✖') >= 0 ? "fail" : "ok";
		elResults.innerHTML = res;
	}
};
