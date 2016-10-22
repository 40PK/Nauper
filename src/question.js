/* global Nauper */
Nauper.Question = function Question(engine, args) {
  this.background = args.background;
  this.activebox = args.textbox.active;
  this.inactivebox = args.textbox.inactive;
  this.boxtype = args.textbox.type;
  this.necessary = args.necessary;
  this.engine = engine;
  this.render = this.engine.render;
  this.canvas = this.engine.canvas;
  this.size = this.engine.size;
  this.map = args.map;
  this.setType();

  this.draw = function draw() {
    if (this.map.length !== 0 && this.map.length <= 4) {
      let x = 0.025;
      let y = 0;
      let height = 0.20;
      let width = 0.95;
      let radius = 0.05;
      this.render.clearRect(0, 0, this.size.width, this.size.height);
      this.engine.ui.setBackground(this.background);
      this.map.forEach((i, index) => {
        y = ((index * 0.25) + 0.025);
        /* this.engine.ui.drawTextBox({
          type: this.boxtype,
          color: this.inactivebox.background,
          y,
          x,
          height,
          width,
          radius
        });
        this.engine.ui.drawText({
          text: i.text,
          align: 'center',
          color: this.inactivebox.text,
          y: y + 0.10
        }); */
        this.engine.ui.drawTextWithBox({
          box: {
            type: this.boxtype,
            color: this.inactivebox.background,
            y,
            x,
            height,
            width,
            radius,
            render: this.engine.offrender,
            canvas: this.engine.offscreen
          },
          text: {
            text: i.text,
            color: this.inactivebox.text,
            y: y + 0.10,
            render: this.engine.offrender,
            canvas: this.engine.offscreen
          }
        });
      });
    } else {
      this.engine.nextElement();
    }
  }.bind(this);
};

Nauper.Question.prototype.setType = function setType() {
  if (this.necessary === true || this.necessary === undefined) {
    this.type = 'choice';
  } else {
    this.type = 'frame';
  }
};
