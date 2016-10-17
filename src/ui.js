/* global Nauper, putDefaults, getTextOffset, wrapText */
Nauper.UI = function UI(engine) {
  this.engine = engine;
  this.canvas = this.engine.canvas;
  this.render = this.engine.render;
  this.size = this.engine.size;
};

Nauper.UI.prototype.setBackground = function setBackground(background) {
  if (background) {
    this.canvas.style.backgroundImage = `url(./data/images/backgrounds/${background})`;
  }
};

Nauper.UI.prototype.drawTextBox = function drawTextBox(configs) {
  const defaults = {
    type: 'default',
    color: '#fff',
    abs: 0.025,
    ord: 0.80,
    h: 0.18,
    w: 0.95,
    r: 0.05
  };
  const conf = putDefaults(defaults, configs);
  const x = this.size.width * conf.abs;
  const y = this.size.height * conf.ord;
  const height = this.size.height * conf.h;
  const width = this.size.width * conf.w;
  const radius = this.size.height * conf.r;

  this.render.fillStyle = conf.color;

  if (conf.type === 'default') {
    this.render.fillRect(x, y, width, height);
  } else if (conf.type === 'rounded') {
    this.render.beginPath();
    this.render.moveTo(x, y + radius);
    this.render.lineTo(x, (y + height) - radius);
    this.render.quadraticCurveTo(x, y + height, x + radius, y + height);
    this.render.lineTo((x + width) - radius, y + height);
    this.render.quadraticCurveTo(x + width, y + height, x + width, (y + height) - radius);
    this.render.lineTo(x + width, y + radius);
    this.render.quadraticCurveTo(x + width, y, (x + width) - radius, y);
    this.render.lineTo(x + radius, y);
    this.render.quadraticCurveTo(x, y, x, y + radius);
    this.render.fill();
  }
};

Nauper.UI.prototype.drawText = function drawText(configs) {
  const defaults = {
    text: '',
    align: 'wrapped',
    color: '#000',
    abs: 0.10,
    ord: 0.85,
    width: 0.80
  };
  const conf = putDefaults(defaults, configs);
  const x = this.size.width * conf.abs;
  const y = this.size.height * conf.ord;
  const maxwidth = this.size.width * conf.width;
  this.render.fillStyle = conf.color;
  if (conf.align === 'wrapped') {
    let texts = wrapText(this.engine, conf.text, this.render.font, maxwidth);
    texts.result.forEach((i, j) => {
      this.render.fillText(i, x, y + (texts.height * j));
    });
  } else if (conf.align === 'center') {
    let offset = getTextOffset(this.engine, conf.text);
    this.render.fillText(conf.text, offset, y);
  }
};
