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