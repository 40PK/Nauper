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