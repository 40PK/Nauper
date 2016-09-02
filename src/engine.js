var canvas = document.getElementsByTagName("canvas")[0];
var render = canvas.getContext("2d");
var doc = document.documentElement;
var canvas.style.width = doc.clientWidth.toString() + "px";
var canvas.style.height = doc.clientHeight.toString() + "px";
var size = {
	"width": doc.clientWidth,
	"height": doc.clientHeight
};