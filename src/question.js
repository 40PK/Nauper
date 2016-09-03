/* global render size */
function Question(args) { // eslint-disable-line no-unused-vars
  if (args.map.length !== 0 && args.map.length !== 1 && args.map.length < 5 && args.background && args.boxcolor && args.textcolor) {
    this.map = args.map;
    var background = args.background;
    var boxcolor = args.boxcolor;
    this.type = 'choice';
    var textcolor = args.textcolor;
    this.draw = function draw() {
      render.fillStyle = background;
      render.fillRect(0, 0, size.width, size.height);
      this.map.forEach(function renderQuestion(i, index) {
        render.fillStyle = boxcolor;
        render.fillRect(0, index * 0.25 * size.height, size.width, size.height * 0.25);
        render.fillStyle = textcolor;
        render.fillText(i.text, size.width * 0.50, size.height * (index * 0.25 + 0.125));
      });
    };
  } else {
    throw new Error();
  }
}
