/*global module:false*/
module.exports = function (grunt) {

	var aliases = {
		"domready": "domready",
		"clientApp": "./client/index.js"
	};

	grunt.initConfig({
		browserify: {
			dist: {
				files: {
					"build/clientApp.js": ["client/clientApp.js"]
				},
				options: {
					alias: Object.keys(aliases).map(function (k) {
						return aliases[k] + ":" + k;
					}).join(",")
				}
			}
		},
		uglify: {
			dist: {
				files: {
					"build/clientApp.min.js": ["build/clientApp.js"]
				}
			}
		},
		buster: {
			"browser": {
				test: {
					"config-group": "browser",
					"reporter": "specification"
				}
			},
			"node": {
				test: {
					"config-group": "node",
					"reporter": "specification"
				}
			}
		},
		watch: {
			"test-browser": {
				files: [
					"buster.js",
					"buster.helpers.js",
					"client/**/*.js"
				],
				tasks: ["test-browser"]
			},
			"test-node": {
				files: [
					"buster.js",
					"buster.helpers.js",
					"server/**/*.js"
				],
				tasks: ["test-node"]
			}
		},
		express: {
			custom: {
				options: {
					port: 9001,
					bases: [require('path').resolve('./server')],
					server: require('path').resolve('./server/index'),
					serverreload: true,
					livereload: true
				}
			}
		}
	});

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.registerTask("default", ["test-all"]);
	grunt.registerTask("test-all", ["test-browser", "test-node"]);
	grunt.registerTask("test-browser", ["browserify", "uglify", "buster-to-file:browser"]);
	grunt.registerTask("test-node", ["buster-to-file:node"]);

	grunt.registerTask("buster-to-file", function (which) {

		var fn = "./build/" + which + ".results.html";
		var fs = require("fs");
		var converter = new (require('ansi-to-html'));

		var off = function (text) {
			fs.writeFileSync(fn, "<pre>" + converter.toHtml(text) + "</pre>");
			grunt.event.off("buster:success", onSuccess);
			grunt.event.off("buster:failure", onFailure);
		};

		var onSuccess = function (text) {
			off(text);
		};

		var onFailure = function (text) {
			off(text);
		};

		if (fs.exists(fn)) {
			fs.unlink(fn);
		}
		grunt.event.on('buster:success', onSuccess);
		grunt.event.on('buster:failure', onFailure);
		grunt.task.run("buster:" + which);

	});

};
