module.exports.init = function (elParent)
{
	var statusDiv = '<div id="testStatus"></div>';
	elParent.insertAdjacentHTML("beforeend", statusDiv);

	var resultsDiv = '<div id="testResults"></div>';
	elParent.insertAdjacentHTML("beforeend", resultsDiv);
};
