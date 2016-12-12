/* global Nauper */
Nauper.Question = function Question(engine, args) {
  this.background = args.background;
  this.activebox = args.textbox.active;
  this.inactivebox = args.textbox.inactive;
  this.boxtype = args.textbox.type;
  this.boxlink = args.textbox.link;
  this.type = 'choice';
  this.necessary = args.necessary;
  this.engine = engine;
  this.render = this.engine.render;
  this.canvas = this.engine.canvas;
  this.size = this.engine.size;
  this.map = args.map;
  this.audio = args.audio;
  this.once = args.once;
  this.act = -1;
  this.box = this.inactivebox;
  this.coordmap = {
    x: 0.025,
    height: 0.20,
    width: 0.95,
    radius: 0.05
  };

  this.draw = function draw() {
    if (this.map.length !== 0 && this.map.length <= 4) {
      this.render.clearRect(0, 0, this.engine.size.width, this.engine.size.height);
      this.engine.ui.setBackground(this.background);
      for (let index = 0; index < this.map.length; index += 1) {
        this.drawQuestionBox(index, this.inactivebox);
      }
    } else {
      this.engine.nextElement();
    }
  }.bind(this);

  this.drawQuestionBox = function drawQuestionBox(boxIndex, drawingBox) {
    let box;
    if (drawingBox === undefined) {
      box = this.inactivebox;
    } else {
      box = drawingBox;
    }
    if (boxIndex !== -1) {
      this.engine.ui.drawTextBox({
        type: this.boxtype,
        color: box.background,
        link: this.boxlink,
        y: (boxIndex * 0.25) + 0.025,
        x: this.coordmap.x,
        height: this.coordmap.height,
        width: this.coordmap.width,
        radius: this.coordmap.radius,
        callback: () => {
          this.engine.ui.drawText({
            text: this.map[boxIndex].text,
            align: 'center',
            color: box.text,
            y: (boxIndex * 0.25) + 0.125
          });
        }
      });
    }
  }.bind(this);
};
