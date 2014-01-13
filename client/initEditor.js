var xhr = require('xhr');

module.exports = function (ta) {
	if (!ta.value) ta.value = '\n';

	var container = ta.parentNode;
	var fileName = ta.dataset.file;

	var saveFile = function () {
		cm.save();
		xhr({
				method: "POST",
				uri: "/save",
				json: {
					text: ta.value,
					file: fileName
				}
			},
			function (err, res, body) {
				if (err) console.error(err);
				console.log("Received:", body);
			});
	};

	var loadFinal = function () {
		xhr("walkthrough/" + fileName, function (e, res, body) {
			cm.setValue(body);
//			saveFile(); // @todo: enable when done
		});
	};

	var switchInstances = function ()
	{
		var editors = container.parentNode;
		if (editors) {
			var otherEditorClass = container.classList.contains("code-test") ? "code-impl" : "code-test";
			var otherTA = editors.querySelector("."+otherEditorClass+" textarea");
			if (otherTA && otherTA.codemirror && otherTA.codemirror.focus) {
				otherTA.codemirror.focus();
			}
		}
	};

	var cm = ta.codemirror = CodeMirror.fromTextArea(ta,
		{
			lineNumbers: true,
			autofocus: false,
			matchBrackets: true,
			readOnly: container.classList.contains("code-sample") ? "nocursor" : false,
			mode: "text/javascript",
			tabSize: 2,
			indentWithTabs: true,
			extraKeys: {
				"Cmd-S": saveFile,
				"Ctrl-S": saveFile,
				"Ctrl-L": loadFinal,
				"Shift-Tab": switchInstances,
				"Ctrl-]": function () { loadFinal(); Reveal.next(); },
				"Ctrl-[": function () { loadFinal(); Reveal.prev(); }
			}
		});

	if (ta.dataset.autoload) {
		xhr(fileName, function (e, res, body) {
			cm.setValue(body);
		});
	}

	container.addEventListener("click", function (e) {
		if (e.shiftKey) {
			xhr("base/" + fileName, function (e, res, body) {
				cm.setValue(body);
			});
		}

		// no idea why I have to click quite ~30% into editor to give focus
		if (!cm.hasFocus()) {
			cm.focus();
		}
	});
};
