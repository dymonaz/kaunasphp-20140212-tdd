/*global module:false*/
module.exports = function (grunt) {

	var aliases = {
		"domready": "domready",
		"clientApp": "./client/index.js"
	};

	grunt.initConfig({
		clean: {
			"build": {
				src: ["build/**", "!build/**/.gitignore"],
				filter: 'isFile'
			},
			"browser": ["build/clientApp.js", "build/clientApp.min.js", "build/browser.results.html"],
			"node": ["build/node.results.html"]
		},
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
			},
			"browser-test-saved": {
				files: [
					"build/tmp/0*.test.js",
					"build/tmp/10*.test.js",
					"build/tmp/11*.test.js",
					"build/tmp/12*.test.js"
				],
				tasks: ["concat:browser-tests"]
			},
			"node-test-saved": {
				files: [
					"build/tmp/13*.test.js",
					"build/tmp/14*.test.js",
					"build/tmp/15*.test.js"
				],
				tasks: ["concat:node-tests"]
			}
		},
		concat: {
			"browser-tests": {
				src: [
					"build/tmp/0*.test.js",
					"build/tmp/10*.test.js",
					"build/tmp/11*.test.js",
					"build/tmp/12*.test.js"
				],
				dest: "client/test/resultViewer.test.js"
			},
			"node-tests": {
				src: [
					"build/tmp/13*.test.js",
					"build/tmp/14*.test.js",
					"build/tmp/15*.test.js"
				],
				dest: "server/test/results.test.js"
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
	grunt.registerTask("test-all", ["clean:build", "test-browser", "test-node"]);
	grunt.registerTask("test-browser", ["clean:browser", "browserify", "uglify", "buster-to-file:browser"]);
	grunt.registerTask("test-node", ["clean:node", "buster-to-file:node"]);

	grunt.registerTask("buster-to-file", function (which) {

		var fn = "./build/" + which + ".results.html";
		var fs = require("fs");
		var converter = new (require('ansi-to-html'));

		var off = function (text) {
			fs.writeFileSync(fn, "<pre>" + converter.toHtml(text) + "</pre>");
			grunt.event.off("buster:success", off);
			grunt.event.off("buster:failure", off);
		};

		grunt.event.on('buster:success', off);
		grunt.event.on('buster:failure', off);
		grunt.task.run("buster:" + which);

	});

};
