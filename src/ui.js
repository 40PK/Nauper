/* global Nauper, putDefaults, getTextOffset, wrapText, copyObject */
Nauper.UI = function UI(engine) {
  this.engine = engine;
  this.canvas = this.engine.canvas;
  this.offscreen = this.engine.offscreen;
  this.render = this.engine.render;
  this.offrender = this.engine.offrender;
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
    link: '',
    x: 0.025,
    y: 0.80,
    height: 0.18,
    width: 0.95,
    radius: 0.05,
    render: this.render,
    canvas: this.canvas,
    onimageload: function __onimageload() {}
  };
  const conf = putDefaults(defaults, configs);
  const x = this.size.width * conf.x;
  const y = this.size.height * conf.y;
  const height = this.size.height * conf.height;
  const width = this.size.width * conf.width;
  const radius = this.size.height * conf.radius;

  conf.render.fillStyle = conf.color;

  if (conf.type === 'default') {
    conf.render.fillRect(x, y, width, height);
  } else if (conf.type === 'rounded') {
    conf.render.beginPath();
    conf.render.moveTo(x, y + radius);
    conf.render.lineTo(x, (y + height) - radius);
    conf.render.quadraticCurveTo(x, y + height, x + radius, y + height);
    conf.render.lineTo((x + width) - radius, y + height);
    conf.render.quadraticCurveTo(x + width, y + height, x + width, (y + height) - radius);
    conf.render.lineTo(x + width, y + radius);
    conf.render.quadraticCurveTo(x + width, y, (x + width) - radius, y);
    conf.render.lineTo(x + radius, y);
    conf.render.quadraticCurveTo(x, y, x, y + radius);
    conf.render.fill();
  } else if (conf.type === 'image') {
    let image = new Image();
    image.onload = function imageLoaded() {
      conf.render.drawImage(image, x, y, width, height);
      if (conf.onimageload) {
        conf.onimageload();
      }
    };
    image.src = conf.link;
  }
};

Nauper.UI.prototype.drawText = function drawText(configs) {
  const defaults = {
    text: '',
    align: 'wrapped',
    color: '#000',
    x: 0.10,
    y: 0.85,
    width: 0.80,
    render: this.render,
    canvas: this.canvas
  };
  const conf = putDefaults(defaults, configs);
  const x = this.size.width * conf.x;
  const y = this.size.height * conf.y;
  const maxwidth = this.size.width * conf.width;
  conf.render.fillStyle = conf.color;
  if (conf.align === 'wrapped') {
    let texts = wrapText(conf.render, conf.text, conf.render.font, maxwidth);
    texts.result.forEach((i, j) => {
      conf.render.fillText(i, x, y + (texts.height * j));
    });
  } else if (conf.align === 'center') {
    let offset = getTextOffset(conf.render, { width: conf.canvas.width }, conf.text);
    conf.render.fillText(conf.text, offset, y);
  }
};

Nauper.UI.prototype.drawTextWithBox = function drawTextWithBox(configs) {
  const defaultbox = {
    type: 'default',
    color: '#fff',
    link: '',
    x: 0.025,
    y: 0.80,
    height: 0.18,
    width: 0.95,
    radius: 0.05,
    render: this.offrender,
    canvas: this.offscreen
  };
  const defaulttext = {
    text: '',
    align: 'center',
    color: '#000',
    x: 0.10,
    y: 0.85,
    width: 0.80,
    render: this.offrender,
    canvas: this.offscreen
  };
  const confbox = putDefaults(defaultbox, configs.box);
  const conftext = putDefaults(defaulttext, configs.text);
  const toprerender = {
    box: copyObject(confbox),
    text: copyObject(conftext)
  };
  toprerender.text.x -= toprerender.box.x;
  toprerender.text.y -= toprerender.box.y;
  toprerender.box.x = 0;
  toprerender.box.y = 0;
  this.offscreen.width = confbox.width * this.size.width;
  this.offscreen.height = confbox.height * this.size.height;
  this.offrender.font = this.render.font;
  this.drawTextBox(toprerender.box);
  this.drawText(toprerender.text);
  this.render.drawImage(this.offscreen, confbox.x * this.size.width, confbox.y * this.size.height);
};
