/* global Nauper, getWindowSize */
Nauper.Engine = function Engine(configs, elements = []) {
  this.font = configs.font;
  this.audio = document.getElementById('audio');
  this.canvas = document.getElementById('canvas');
  this.render = this.canvas.getContext('2d');
  this.size = getWindowSize();
  this.ui = new Nauper.UI(this);
  this.sound = new Nauper.Sound(this);
  this.canvas.width = this.size.width;
  this.canvas.height = this.size.height;
  this.render.font = this.font;
  this.element = null;

  this.elements = elements;
  this.globalIndex = 0;
  this.localIndex = 0;
  this.clickType = null;

  this.elementProcessor = function elementProcessor(event) {
    let task = this.ui.process(event);
    if (task === 'redraw') {
      this.element.draw();
    } else if (task === 'next') {
      this.click(event);
      this.sound.process(this.element.audio, this.element.once);
    }
  }.bind(this);

  this.resize = function resize() {
    this.size = getWindowSize();
    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;
    this.elements[this.globalIndex][this.localIndex].draw();
  }.bind(this);

  this.move = function move(event) {
    this.ui.move(event);
    // now is only one function, at future we might use multiple
  }.bind(this);

  this.canvas.addEventListener('click', this.elementProcessor, false);

  window.addEventListener('resize', this.resize, false);
  window.addEventListener('mousemove', this.move, false);
};

Nauper.Engine.prototype.click = function click(event) {
  if (this.clickType) {
    this[this.clickType].call(this, event);
  }
};

Nauper.Engine.prototype.choice = function choice(event) {
  let x = event.pageX;
  let y = event.pageY;
  this.element.map.forEach((i, index) => {
    let sizes = {
      x: 0.025 * this.size.width,
      y: ((index * 0.25) + 0.025) * this.size.height,
      height: 0.20 * this.size.height,
      width: 0.95 * this.size.width
    };
    if (x >= sizes.x && x <= (sizes.x + sizes.width)) {
      if (y >= sizes.y && y <= (sizes.y + sizes.height)) {
        if (i.address !== false) {
          this.globalIndex = i.address;
          this.localIndex = -1;
        }
        this.nextElement();
      }
    }
  });
};

Nauper.Engine.prototype.nextElement = function nextElement() {
  this.localIndex = Number(this.localIndex) + 1;
  if (this.localIndex === this.elements[this.globalIndex].length) {
    this.clickType = null;
  } else {
    this.element = this.elements[this.globalIndex][this.localIndex];
    this.element.draw.call(null, this);
    if (this.element.type === 'choice') {
      if (this.element.necessary || this.element.necessary === undefined) {
        this.clickType = 'choice';
      } else {
        this.clickType = 'nextElement';
      }
    } else {
      this.clickType = 'nextElement';
    }
  }
};

Nauper.Engine.prototype.start = function start() {
  if (this.elements[0][0].type === 'frame') {
    this.clickType = 'nextElement';
  } else if (this.elements[0][0].type === 'choice') {
    this.clickType = 'choice';
  }
  this.element = this.elements[0][0];
  this.elements[0][0].draw.call(null, this);
  return true;
};

Nauper.Engine.prototype.addScene = function addScene(scene) {
  this.elements.push(scene);
};
