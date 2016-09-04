/* global Nauper */
Nauper.Question = function Question(args) {
  var background = args.background;
  var boxcolor = args.boxcolor;
  var textcolor = args.textcolor;
  this.map = args.map;
  if (this.map.length > 1 && this.map.length < 5 && background && boxcolor && textcolor) {
    this.type = 'choice';
    this.draw = function draw(engine) {
      var render = engine.render;
      var size = engine.size;
      render.fillStyle = background;
      render.fillRect(0, 0, size.width, size.height);
      this.map.forEach(function renderQuestion(i, index) {
        render.fillStyle = boxcolor;
        render.fillRect(0, index * 0.25 * size.height, size.width, size.height * 0.25);
        render.fillStyle = textcolor;
        render.fillText(i.text, size.width * 0.50, size.height * ((index * 0.25) + 0.125));
      });
    }.bind(this);
  } else {
    throw new Error();
  }
};
