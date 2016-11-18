/* global Nauper, putDefaults, getTextOffset, wrapText, copyObject */
Nauper.UI = function UI(engine) {
  this.engine = engine;
  this.canvas = this.engine.canvas;
  this.render = this.engine.render;
  this.size = this.engine.size;
  this.lastActive = undefined;
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
    callback: function __callback() {}
  };
  const conf = putDefaults(defaults, configs);
  const x = this.size.width * conf.x;
  const y = this.size.height * conf.y;
  const height = this.size.height * conf.height;
  const width = this.size.width * conf.width;
  const radius = this.size.height * conf.radius;

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
  } else if (conf.type === 'image') {
    let image = new Image();
    image.addEventListener('load', (event) => {
      this.render.drawImage(image, x, y, width, height);
      if (conf.callback) {
        conf.callback(event);
      }
    });
    image.src = conf.link;
  }

  if (conf.type !== 'image') {
    conf.callback();
  }
};

Nauper.UI.prototype.drawText = function drawText(configs) {
  const defaults = {
    text: '',
    align: 'wrapped',
    color: '#000',
    x: 0.10,
    y: 0.85,
    width: 0.80
  };
  const conf = putDefaults(defaults, configs);
  const x = this.size.width * conf.x;
  const y = this.size.height * conf.y;
  const maxwidth = this.size.width * conf.width;
  this.render.fillStyle = conf.color;
  if (conf.align === 'wrapped') {
    let texts = wrapText(this.render, conf.text, this.render.font, maxwidth);
    texts.result.forEach((i, j) => {
      this.render.fillText(i, x, y + (texts.height * j));
    });
  } else if (conf.align === 'center') {
    let offset = getTextOffset(this.render, { width: this.canvas.width }, conf.text);
    this.render.fillText(conf.text, offset, y);
  }
};

Nauper.UI.prototype.process = function process(event) {
  let result;
  if (event) {
    result = 'next';
  }
  return result;
};

Nauper.UI.prototype.move = function move(event) {
  if (this.engine.element.type === 'choice') {
    let x = event.pageX;
    let y = event.pageY;
    let flag = false;
    for (let index = 0; index < this.engine.element.map.length; index += 1) {
      let sizes = {
        x: 0.025 * this.size.width,
        y: ((index * 0.25) + 0.025) * this.size.height,
        height: 0.20 * this.size.height,
        width: 0.95 * this.size.width
      };
      if (x >= sizes.x && x <= (sizes.x + sizes.width)) {
        if (y >= sizes.y && y <= (sizes.y + sizes.height)) {
          this.engine.element.active = index;
          flag = true;
          break;
        }
      }
    }
    if (!flag) {
      this.engine.element.active = undefined;
    }
    if (this.engine.element.active !== this.lastActive) {
      this.lastActive = this.engine.element.active;
      this.engine.element.draw(false);
    }
  }
};
