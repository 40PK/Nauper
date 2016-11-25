/* global Nauper, putDefaults, getTextOffset, wrapText, copyObject, getTextHeight */
Nauper.UI = function UI(engine) {
  this.engine = engine;
  this.canvas = this.engine.canvas;
  this.render = this.engine.render;
  this.size = this.engine.size;
  this.menu = [];
  this.menuStyle = {};
  this.currentMS = 0;
  this.lastActive = undefined;
  this.menuOpened = false;
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
  let element = this.engine.elements[0][0];
  if (element === this.engine.element && !this.engine.firstPassed) {
    result = 'draw';
    this.engine.firstPassed = true;
  } else if (this.menuOpened) {
    this.menuOpened = false;
    result = 'draw';
  } else if (event.pageX < 50 && event.pageY < 50) {
    this.drawMenu();
    result = null;
  } else {
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

Nauper.UI.prototype.addMenuScreen = function addMenuScreen(menumap) {
  this.menu.push(menumap);
};

Nauper.UI.prototype.setMenuStyle = function setMenuStyle(sm) {
  const defaults = {
    mainbox: 'default',
    maincolor: '#fff',
    smallbox: 'default',
    smallcolor: '#eee',
    smallheight: 0.10,
    smallspace: 0.025,
    title: '#000',
    items: '#111'
  };
  this.menuStyle = putDefaults(defaults, sm);
};

Nauper.UI.prototype.drawMenu = function drawMenu() {
  let curSlength = this.menu[this.currentMS].length;
  let sh = this.menuStyle.smallheight;
  let ss = this.menuStyle.smallspace;
  let menu = {
    x: 0.25,
    y: 0.25,
    height: ((sh + ss) * curSlength) + ss,
    width: 0.5
  };
  this.drawTextBox({
    type: this.menuStyle.mainbox,
    color: this.menuStyle.maincolor,
    x: menu.x,
    y: menu.y,
    width: menu.width,
    height: menu.height,
    callback: () => {
      this.menu[this.currentMS].forEach((i, index) => {
        let y = 0.25 + (index * (sh + ss)) + ss;
        let width = menu.width - (ss * 2);
        this.drawTextBox({
          type: this.menuStyle.smallbox,
          color: this.menuStyle.smallcolor,
          x: 0.25 + ss,
          y,
          height: this.menuStyle.smallheight,
          width
        });
      });
    }
  });
  this.menuOpened = true;
};
