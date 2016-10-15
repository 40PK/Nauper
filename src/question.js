/* global Nauper */
Nauper.Question = function Question(engine, args) {
  let background = args.background;
  let boxcolor = args.boxcolor;
  let textcolor = args.textcolor;
  let boxtype = args.boxtype;
  let necessary = args.necessary;
  let render = engine.render;
  let canvas = engine.canvas;
  let size = engine.size;
  let setBackground = () => {
    if (background) {
      canvas.style.backgroundImage = `url("./data/images/backgrounds/${background}")`;
    }
  };
  let setType = () => {
    if (necessary === true || necessary === undefined) {
      this.type = 'choice';
    } else {
      this.type = 'frame';
    }
  };
  this.map = args.map;
  if (this.map.length > 1 && this.map.length < 5 && boxcolor && textcolor) {
    setType();
    this.draw = function draw() {
      let x = size.width * 0.025;
      let y = 0;
      let height = size.height * 0.20;
      let width = size.width * 0.95;
      let radius = size.height * 0.05;
      render.clearRect(0, 0, size.width, size.height);
      setBackground();
      this.map.forEach(function renderQuestion(i, index) {
        render.fillStyle = boxcolor;
        y = ((index * 0.25) + 0.025) * size.height;
        if (boxtype === 'default') {
          render.fillRect(x, y, width, height);
        } else if (boxtype === 'rounded') {
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
        render.fillStyle = textcolor;
        render.fillText(i.text, size.width * 0.50, size.height * ((y / size.height) + 0.10));
      });
    }.bind(this);
  } else {
    throw new Error();
  }
};
