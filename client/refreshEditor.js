module.exports = function (e) {
	[].forEach.call(e.currentSlide.querySelectorAll('textarea'), function (ta) {
		if (ta.codemirror) {
			setTimeout(function () {
				ta.codemirror.refresh();
			}, 500); // set to slightly longer than transition speed of Reveal
		}
	});
};
