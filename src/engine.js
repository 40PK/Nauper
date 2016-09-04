/* global Nauper */
Nauper.Engine = function Engine(configs, elements) {
  this.canvas = configs.canvas;
  this.render = this.canvas.getContext('2d');
  this.size = configs.size;
  this.canvas.width = this.size.width;
  this.canvas.height = this.size.height;

  this.elements = elements;
  this.index = 0;
  this.clickType = null;

  function click(event) {
    if (this.clickType) {
      this[this.clickType].call(this, event);
    }
  }
  this.canvas.addEventListener('click', click.bind(this), false);
};

Nauper.Engine.prototype.choice = function choice(event) {
  var y = event.pageY;
  var buttonID = 3;
  if (y < this.size.height * 0.25) {
    buttonID = 0;
  } else if (y < this.size.height * 0.50) {
    buttonID = 1;
  } else if (y < this.size.height * 0.75) {
    buttonID = 2;
  }
  if (buttonID < this.elements[this.index].map.length) {
    this.index = this.elements[this.index].map[buttonID].address;
    this.clickType = 'nextElement';
    this.elements[this.index].draw.call(null, this);
  }
};

Nauper.Engine.prototype.nextElement = function nextElement() {
  this.index = Number(this.index) + 1;
  if (this.index === this.elements.length) {
    // this.canvas.removeEventListener('click', this.nextElement);
    this.clickType = null;
  } else {
    this.elements[this.index].draw.call(null, this);
    this.clickType = this.elements[this.index].type === 'choice' ? 'choice' : this.clickType;
  }
};

Nauper.Engine.prototype.start = function start() {
  if (this.elements[0].type === 'frame') {
    this.clickType = 'nextElement';
  } else if (this.elements[1].type === 'choice') {
    this.clickType = 'choice';
  }
  this.elements[0].draw.call(null, this);
  return true;
};
