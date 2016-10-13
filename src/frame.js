/* global Nauper */
Nauper.Frame = function Frame(engine, args) {
  let characters = args.characters;
  let displayOrder = args.displayOrder;
  let text = args.textbox;
  let render = engine.render;
  let size = engine.size;
  let canvas = engine.canvas;
  let setText = function setText() { //eslint-disable-line
    let x = size.width * 0.025;
    let y = size.height * 0.80;
    let height = size.height * 0.18;
    let width = size.width * 0.95;
    let radius = size.height * 0.05;
    let texts = [];
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
    texts = wrapText(engine, text.text, render.font, size.width * 0.80); //eslint-disable-line
    texts.result.forEach(function insertText(i, j) {
      render.fillText(i, size.width * 0.10, (size.height * 0.83) + 27 + (texts.height * j));
    });
  };

  this.type = 'frame';

  this.draw = function draw() {
    render.clearRect(0, 0, size.width, size.height);
    if (args.background) {
      canvas.style.backgroundImage = 'url(./data/images/backgrounds/' + args.background + ')';
      canvas.style.backgroundSize = 'cover';
    }
    if (displayOrder) {
      displayOrder.forEach(function orderCreator(i, index) {
        let img;
        if (i !== false || i === 0) {
          img = new Image();
          img.onload = function onload() {
            let ratio = (size.height * 1.20) / img.height;
            let offsetY = size.height * 0.10;
            let offsetX;
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
            setText(); //eslint-disable-line
          };
          img.src = characters[i];
        }
      });
    }
  };
};
