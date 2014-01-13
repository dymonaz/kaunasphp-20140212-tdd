var reqwest = require('reqwest');
var xhr = function (obj, cb) {
	if (typeof(obj) == "string") {
		obj = {
			url: obj
		};
	}
	obj.type = "html";
	obj.success = function (res) {
		cb(null, res);
	};
	obj.error = function () {
		cb(new Error("faaaail"));
	};
	reqwest(obj);
};

module.exports = function (ta) {
	if (!ta.value) ta.value = '\n';

	var container = ta.parentNode;
	var fileName = ta.dataset.file;

	var saveFile = function () {
		cm.save();
		var evt = document.createEvent("HTMLEvents");
		evt.initEvent("change", true, true, null);
		ta.dispatchEvent(evt);

		xhr({
				method: "POST",
				url: "/save",
				data: {
					text: ta.value,
					file: fileName
				}
			},
			function (err, body) {
				if (err) console.error(err);
				console.log("Received:", body);
			});
	};

	var loadFinal = function () {
		xhr("walkthrough/" + fileName, function (e, body) {
			cm.setValue(body);
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
		xhr(fileName, function (e, body) {
			cm.setValue(body);
		});
	}

	container.addEventListener("click", function (e) {
		if (e.shiftKey) {
			xhr("base/" + fileName, function (e, body) {
				cm.setValue(body);
			});
		}

		// no idea why I have to click quite ~30% into editor to give focus
		if (!cm.hasFocus()) {
			cm.focus();
		}
	});
};
