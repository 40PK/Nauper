function Engine (elements) {
    if (elements.length != 0) {
        render_ = function (id) {
            elements.forEach(function (i, index, array) {
                if (index == id) {
                    if (i.type == "scene") {
                        i.start();
                        // while (i.drawing) {};
                        id++;
                    } else if (i.type == "question") {
                        render_(i.draw());
                    }
                }
            });
        }
        this.start = function () {
            render_(0);
            console.log("end");
        }
    } else {
        throw new Error;
    }
}
function Scene (args) {
    if (args.frames.length != 0) {
        frames = args.frames;
        currentFrame = -1;
        this.type = "scene";
        this.drawing = false;
        nextFrame = function () {
            console.log(currentFrame);
            if (currentFrame != (frames.length - 1) || currentFrame == -1) {
                currentFrame += 1;
                frames[currentFrame].draw();
            } else {
                canvas.removeEventListener("click", nextFrame);
                frames[currentFrame].draw();
                drawing = false;
            }
        }
        this.start = function () {
            this.drawing = true;
            canvas.addEventListener("click", nextFrame);
            nextFrame();
        }
    } else {
        throw new Error;
    }
}
function Frame (args) {
    if (args.characters.length != 0 && args.displayOrder.length != 0 && args.textbox && args.background) {
        characters = args.characters;
        displayOrder = args.displayOrder;
        text = args.textbox;
        this.draw = function () {
            canvas.style.backgroundImage = "url(./data/images/backgrounds/" + args.background + ")";
            canvas.style.backgroundSize = "cover";
            var loaded = []
            displayOrder.forEach(function (i, index, array) {
                var img = new Image();
                loaded[index] = false;
                img.onload = function () {
                    var ratio = size.height * 1.20 / img.height;
                    var offsetY = size.height * 0.10;
                    if (i == 0) {
                        var offsetX = 0;
                    } else if (i == 1) {
                        var offsetX = size.width * 0.25;
                    } else if (i == 2) {
                        var offsetX = size.width * 0.50;
                    } else if (i == 3) {
                        var offsetX = size.width * 0.75;
                    }
                    render.drawImage(img, offsetX, offsetY, img.width * ratio, img.height * ratio);
                    loaded[index] = true;
                }
                img.src = characters[i];
            });
            render.fillStyle = text.base;
            render.fillRect(0, size.height * 0.80, size.width, size.height * 0.20);
            render.fillStyle = text.namecolor;
            render.font = "15pt Arial";
            render.fillText(text.name, size.width * 0.10, size.height * 0.84);
            render.fillStyle = text.textcolor;
            render.fillText(text.text, size.width * 0.10, size.height * 0.90);
        }
    } else {
        throw new Error;
    }
}
function Character (args) {
    if (args.path && args.emotions.length != 0) {
        var result = {};
        args.emotions.forEach(function (emotion, index, array) {
            result[emotion] = args.path + "/" + emotion + ".png";
        });
        return result;
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