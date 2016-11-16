/* global Nauper */
Nauper.Question = function Question(engine, args) {
  this.background = args.background;
  this.activebox = args.textbox.active;
  this.inactivebox = args.textbox.inactive;
  this.boxtype = args.textbox.type;
  this.boxlink = args.textbox.link;
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
      let height = 0.20;
      let width = 0.95;
      let radius = 0.05;
      this.render.clearRect(0, 0, this.size.width, this.size.height);
      this.engine.ui.setBackground(this.background);
      for (let index = 0; index < this.map.length; index += 1) {
        let i = this.map[index];
        this.engine.ui.drawTextBox({
          type: this.boxtype,
          color: this.inactivebox.background,
          link: this.boxlink,
          y: (index * 0.25) + 0.025,
          x,
          height,
          width,
          radius,
          callback: () => {
            this.engine.ui.drawText({
              text: i.text,
              align: 'center',
              color: this.inactivebox.text,
              y: (index * 0.25) + 0.125
            });
          }
        });
      }
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
