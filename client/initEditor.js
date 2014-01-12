var xhr = require('xhr');

module.exports = function (ta) {
	if (!ta.value) ta.value = '\n';

	var container = ta.parentNode;
	var cm = CodeMirror.fromTextArea(ta,
		{
			lineNumbers: true,
			autofocus: false,
			matchBrackets: true,
			readOnly: container.classList.contains("code-sample") ? "nocursor" : false,
			mode: "text/javascript"
		});

	if (ta.dataset.autoload) {
		xhr(ta.dataset.file, function (e, res, body) {
			cm.setValue(body);
		});
	}

	container.addEventListener("click", function (e) {
		if (e.shiftKey) {
			xhr("base/" + ta.dataset.file, function (e, res, body) {
				cm.setValue(body);
			});
		}

		// no idea why I have to click quite ~30% into editor to give focus
		if (!cm.hasFocus()) {
			cm.focus();
		}
	});
};
