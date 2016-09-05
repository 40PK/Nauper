/* global Nauper */
Nauper.Question = function Question(args) {
  var background = args.background;
  var boxcolor = args.boxcolor;
  var textcolor = args.textcolor;
  var boxtype = args.boxtype;
  this.map = args.map;
  if (this.map.length > 1 && this.map.length < 5 && background && boxcolor && textcolor) {
    this.type = 'choice';
    this.draw = function draw(engine) {
      var render = engine.render;
      var canvas = engine.canvas;
      var size = engine.size;
      var x = size.width * 0.025;
      var y = 0;
      var height = size.height * 0.20;
      var width = size.width * 0.95;
      var radius = size.height * 0.05;
      render.clearRect(0, 0, size.width, size.height);
      canvas.style.backgroundImage = 'url("./data/images/backgrounds/' + background + '")';
      this.map.forEach(function renderQuestion(i, index) {
        render.fillStyle = boxcolor;
        if (index === 0) {
          y = 0.05 * size.height;
        } else {
          y = (index * 0.30) * size.height;
        }
        if (boxtype === 'default') {
          render.fillRect(0, index * 0.25 * size.height, size.width, size.height * 0.25);
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
