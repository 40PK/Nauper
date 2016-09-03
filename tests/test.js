var canvas = document.getElementsByTagName("canvas")[0];
var render = canvas.getContext("2d");
var doc = document.documentElement;
canvas.style.width = String(doc.clientWidth) + "px";
canvas.style.height = String(doc.clientHeight) + "px";
var size = {
	"width": doc.clientWidth,
	"height": doc.clientHeight
};

function Engine (elements) {
	if (elements.length != 0) {
		this.elems = elements;
		this.render = function (id) {
			this.elements.forEach(function (i, index, array) {
				if (index == id) {
					if (i.type == "scene") {
						i.start();
						while (i.drawing) {};
						id++;
					} else if (i.type == "question") {
						this.render(i.draw());
					}
				}
			});
		}
		this.start = function () {
			this.render(0);
		}
	} else {
		throw new Error;
	}
}
function Scene (args) {
	if (args.frames.length != 0) {
		this.frames = args.frames;
		this.currentFrame = -1;
		this.type = "scene";
		this.drawing = false;
		this.nextFrame = function () {
			if (currentFrame != (frames.length - 1)) {
				this.currentFrame += 1;
				this.frames[this.currentFrame].draw();
			} else {
				canvas.removeEventListener("click");
				this.drawing = false;
			}
		}
		this.start = function () {
			this.drawing = true;
			this.addEventListener("click", this.nextFrame);
			this.nextFrame();
		}
	} else {
		throw new Error;
	}
}
function Frame (args) {
	if (args.characters.length != 0 && args.displayOrder.length != 0 && args.textbox) {
		this.characters = args.characters;
		this.displayOrder = args.displayOrder;
		this.text = args.text;
		this.draw = function () {
			this.displayOrder.forEach(function (i, index, array) {
				var img = new Image();
				img.onload = function () {
					if (i == 0) {
						render.drawImage(img, 0, 0);
					} else if (i == 1) {
						render.drawImage(img, size.width * 0.25, 0);
					} else if (i == 2) {
						render.drawImage(img, size.width * 0.50, 0);
					} else if (i == 3) {
						render.drawImage(img, size.width * 0.75, 0);
					}
				}
				img.src = characters[i];
			});
			render.fillStyle = this.text.base;
			render.fillRect(0, size.height * 0.90, size.width, size.height * 0.10);
			render.fillStyle = this.text.namecolor;
			render.font = "15pt Arial";
			render.fillText(this.text.name, size.width * 0.05, size.height * 0.91);
			render.fillStyle = this.text.textcolor;
			render.fillText(this.text.text, size.width * 0.05, size.height * 0.93);
		}
	} else {
		throw new Error;
	}
}
function Question (args) {
	if (args.map.length != 0 && args.map.length != 1 && args.map.length < 5 && args.background && args.boxcolor && args.textcolor) {
		this.map = args.map;
		this.background = args.background;
		this.boxcolor = args.boxcolor;
		this.type = "choice";
		this.textcolor = args.textcolor;
		this.draw = function () {
			render.fillStyle = this.background;
			render.fillRect(0, 0, size.width, size.height);
			this.map.forEach(function (i, index, array) {
				render.fillStyle = this.boxcolor;
				render.fillRect(0, index * 0.25 * size.height, size.width, size.height * 0.25);
				render.fillStyle = this.textcolor;
				render.fillText(i.text, size.width * 0.50, index * 0.25 * size.height + 0.01);
			});
			var clicked = false;
			this.checkClick = function (event) {
				var x = event.pageX;
				var y = event.pageY;
				var buttonID = 0;
				if (y < size.height * 0.25) {
					buttonID = 0;
				} else if (y < size.height * 0.50) {
					buttonID = 1;
				} else if (y < size.height * 0.75) {
					buttonID = 2;
				} else if (y < size.height) {
					buttonID = 3;
				}
				if (buttonID < this.map.length) {
					canvas.removeEventListener("click");
					clicked = buttonID;
				}
			}
			canvas.addEventListener("click", this.checkClick);
			while (clicked == false) {};
			return clicked;
		}
	} else {
		throw new Error;
	}

}
function Character (args) {
	if (args.path && args.emotions.length != 0) {
		args.emotions.forEach(function (emotion, index, array) {
			this[emotion] = path + "/" + emotion + "png";
		});
	} else {
		throw new Error;
	}
}