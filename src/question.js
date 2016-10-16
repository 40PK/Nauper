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
      let x = this.size.width * 0.025;
      let y = 0;
      let height = this.size.height * 0.20;
      let width = this.size.width * 0.95;
      let radius = this.size.height * 0.05;
      this.render.clearRect(0, 0, this.size.width, this.size.height);
      this.setBackground();
      this.map.forEach((i, index) => {
        y = ((index * 0.25) + 0.025) * this.size.height;
        this.renderBox(index, false, { x, y, height, width, radius });
      });
    } else {
      this.engine.nextElement();
    }
  }.bind(this);
};

Nauper.Question.prototype.setBackground = function setBackground() {
  if (this.background) {
    this.canvas.style.backgroundImage = `url("./data/images/backgrounds/${this.background}")`;
  }
};

Nauper.Question.prototype.setType = function setType() {
  if (this.necessary === true || this.necessary === undefined) {
    this.type = 'choice';
  } else {
    this.type = 'frame';
  }
};

Nauper.Question.prototype.setText = function setText(index, active, pos) {
  let x = (this.size.width * 0.50) - (this.render.measureText(this.map[index].text).width / 2);
  let y = (this.size.height * ((pos.y / this.size.height) + 0.10));
  if (active) {
    this.render.fillStyle = this.activebox.text;
  } else if (!active) {
    this.render.fillStyle = this.inactivebox.text;
  }
  this.render.fillText(this.map[index].text, x, y);
};

Nauper.Question.prototype.renderBox = function renderBox(index, active, pos) {
  let ev = {
    xwidth: pos.x + pos.width,
    yheight: pos.y + pos.height
  };
  if (active) {
    this.render.fillStyle = this.activebox.background;
  } else if (!active) {
    this.render.fillStyle = this.inactivebox.background;
  }

  if (this.boxtype === 'default') {
    this.render.fillRect(pos.x, pos.y, pos.width, pos.height);
  } else if (this.boxtype === 'rounded') {
    this.render.beginPath();
    this.render.moveTo(pos.x, pos.y + pos.radius);
    this.render.lineTo(pos.x, ev.yheight - pos.radius);
    this.render.quadraticCurveTo(pos.x, ev.yheight, pos.x + pos.radius, ev.yheight);
    this.render.lineTo(ev.xwidth - pos.radius, ev.yheight);
    this.render.quadraticCurveTo(ev.xwidth, ev.yheight, ev.xwidth, ev.yheight - pos.radius);
    this.render.lineTo(ev.xwidth, pos.y + pos.radius);
    this.render.quadraticCurveTo(ev.xwidth, pos.y, ev.xwidth - pos.radius, pos.y);
    this.render.lineTo(pos.x + pos.radius, pos.y);
    this.render.quadraticCurveTo(pos.x, pos.y, pos.x, pos.y + pos.radius);
    this.render.fill();
  }
  this.setText(index, active, pos);
};
