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
        var x = size.width * 0.025;
        var y = size.height * 0.80;
        var height = size.height * 0.18;
        var width = size.width * 0.95;
        var radius = size.height * 0.05;
        render.fillStyle = text.base;
        if (text.edges === 'default') {
          render.fillRect(0, size.height * 0.80, size.width, size.height * 0.20);
        } else if (text.edges === 'rounded') {
          render.beginPath();
          render.moveTo(x, y + radius);
          render.lineTo(x, (y + height) - radius);
          render.quadraticCurveTo(x, y + height, x + radius, y + height);
          render.lineTo((x + width) - radius, y + height);
          render.quadraticCurveTo(x + width, y + height, x + width, (y + height) - radius);
          render.lineTo(x + width, y + radius);
          render.quadraticCurveTo(x + width, y, (x + width) - radius, y);
          render.lineTo(x + radius, y);
          render.quadraticCurveTo(x, y, x, y + radius);
          render.fill();
        }
        render.fillStyle = text.namecolor;
        render.font = '15pt Arial';
        render.fillText(text.name, size.width * 0.10, (size.height * 0.80) + 27);
        render.fillStyle = text.textcolor;
        render.fillText(text.text, size.width * 0.10, (size.height * 0.83) + 27);
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
