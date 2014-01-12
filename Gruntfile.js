/*global module:false*/
module.exports = function (grunt) {

	var aliases = {
		"myApp": "./client/index.js"
	};

	grunt.initConfig({
		browserify: {
			dist: {
				files: {
					"build/resultViewer.js": ["client/resultViewer.js"]
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
					"build/resultViewer.min.js": ["build/resultViewer.js"]
				}
			}
		},
		buster: {
			"browser": {
				test: {
					"config-group": "browser"
				}
			},
			"node": {
				test: {
					"config-group": "node"
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
		}
	});

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	grunt.registerTask("default", ["test-all"]);
	grunt.registerTask("test-all", ["test-browser", "test-node"]);
	grunt.registerTask("test-browser", ["browserify", "uglify", "buster:browser"]);
	grunt.registerTask("test-node", ["buster:node"]);

};
