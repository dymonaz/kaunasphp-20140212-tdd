module.exports = function (elParent)
{
  var statusDiv = '<div id="testStatus"></div>';
  elParent.insertAdjacentHTML("beforeend", statusDiv);
};
