/* global Nauper */
Nauper.Frame = function Frame(args) {
  var characters = args.characters;
  var displayOrder = args.displayOrder;
  var text = args.textbox;
  if (characters.length !== 0 && displayOrder.length !== 0 && text && args.background) {
    this.type = 'frame';
    this.draw = function draw(engine) {
      var render = engine.render;
      var size = engine.size;
      var canvas = engine.canvas;

      function setText() {
        render.fillStyle = text.base;
        render.fillRect(0, size.height * 0.80, size.width, size.height * 0.20);
        render.fillStyle = text.namecolor;
        render.font = '15pt Arial';
        render.fillText(text.name, size.width * 0.10, size.height * 0.82);
        render.fillStyle = text.textcolor;
        render.fillText(text.text, size.width * 0.10, size.height * 0.85);
      }

      render.clearRect(0, 0, size.width, size.height);
      canvas.style.backgroundImage = 'url(./data/images/backgrounds/' + args.background + ')';
      canvas.style.backgroundSize = 'cover';
      displayOrder.forEach(function orderCreator(i, index) {
        var img;
        if (i !== false || i === 0) {
          img = new Image();
          img.onload = function onload() {
            var ratio = (size.height * 1.20) / img.height;
            var offsetY = size.height * 0.10;
            var offsetX;
            if (index === 0) {
              offsetX = 0;
            } else if (index === 1) {
              offsetX = size.width * 0.225;
            } else if (index === 2) {
              offsetX = size.width * 0.450;
            } else if (index === 3) {
              offsetX = size.width * 0.675;
            }
            render.drawImage(img, offsetX, offsetY, img.width * ratio, img.height * ratio);
            setText();
          };
          img.src = characters[i];
        }
      });
    };
  } else {
    throw new Error();
  }
};
