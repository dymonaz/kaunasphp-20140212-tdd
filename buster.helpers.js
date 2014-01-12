(function () {
	// "this" is the global context in all envs (node, browser, etc)
	var buster = (this.buster || (this.buster = require('buster')));
	this.assert = buster.assert;
	this.refute = buster.refute;
	this.expect = buster.expect;
}());
