function Frame (args) {
    if (args.characters.length != 0 && args.displayOrder.length != 0 && args.textbox && args.background) {
        var characters = args.characters;
        var displayOrder = args.displayOrder;
        var text = args.textbox;
        function setText () {
            render.fillStyle = text.base;
            render.fillRect(0, size.height * 0.80, size.width, size.height * 0.20);
            render.fillStyle = text.namecolor;
            render.font = "15pt Arial";
            render.fillText(text.name, size.width * 0.10, size.height * 0.82);
            render.fillStyle = text.textcolor;
            render.fillText(text.text, size.width * 0.10, size.height * 0.85);
        }
        this.type = "frame";
        this.draw = function () {
            render.clearRect(0, 0, size.width, size.height);
            canvas.style.backgroundImage = "url(./data/images/backgrounds/" + args.background + ")";
            canvas.style.backgroundSize = "cover";
            var loaded = []
            displayOrder.forEach(function (i, index, array) {
                if (i != false || i == 0) {
                    var img = new Image();
                    img.onload = function () {
                        var ratio = size.height * 1.20 / img.height;
                        var offsetY = size.height * 0.10;
                        if (index == 0) {
                            var offsetX = 0;
                        } else if (index == 1) {
                            var offsetX = size.width * 0.225;
                        } else if (index == 2) {
                            var offsetX = size.width * 0.450;
                        } else if (index == 3) {
                            var offsetX = size.width * 0.675;
                        }
                        render.drawImage(img, offsetX, offsetY, img.width * ratio, img.height * ratio);
                        setText();
                    }
                    img.src = characters[i];
                }
            });
        }
    } else {
        throw new Error;
    }
}