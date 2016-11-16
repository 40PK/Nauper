/* global Nauper */
Nauper.Engine = function Engine(configs, elements = []) {
  this.font = configs.font;
  this.canvas = configs.canvas;
  this.render = this.canvas.getContext('2d');
  this.size = configs.size;
  this.ui = new Nauper.UI(this);
  this.canvas.width = this.size.width;
  this.canvas.height = this.size.height;
  this.render.font = this.font;

  this.elements = elements;
  this.globalIndex = 0;
  this.localIndex = 0;
  this.clickType = null;

  function click(event) {
    if (this.clickType) {
      this[this.clickType].call(this, event);
    }
  }
  this.canvas.addEventListener('click', click.bind(this), false);
};

Nauper.Engine.prototype.choice = function choice(event) {
  let x = event.pageX;
  let y = event.pageY;
  this.elements[this.globalIndex][this.localIndex].map.forEach((i, index) => {
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
    this.elements[this.globalIndex][this.localIndex].draw.call(null, this);
    if (this.elements[this.globalIndex][this.localIndex].type === 'choice') {
      this.clickType = 'choice';
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
  this.elements[0][0].draw.call(null, this);
  return true;
};

Nauper.Engine.prototype.addScene = function addScene(scene) {
  this.elements.push(scene);
};
