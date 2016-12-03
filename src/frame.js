/* global Nauper, wrapText */
Nauper.Frame = function Frame(engine, args) {
  this.engine = engine;
  this.render = this.engine.render;
  this.size = this.engine.size;
  this.canvas = this.engine.canvas;
  this.characters = args.characters;
  this.displayOrder = args.displayOrder;
  this.background = args.background;
  this.text = args.textbox;
  this.audio = args.audio;
  this.once = args.once;
  this.type = 'frame';
  this.textAnimation = args.textAnimation;
  this.loaded = 0;

  this.draw = function draw() {
    this.render.clearRect(0, 0, this.size.width, this.size.height);
    this.engine.ui.setBackground(this.background);
    this.displayCharacters();
  }.bind(this);
};

Nauper.Frame.prototype.setText = function setText() {
  if (this.text !== undefined) {
    this.engine.ui.drawTextBox({
      type: this.text.type,
      color: this.text.background,
      link: this.text.link,
      callback: () => {
        this.engine.ui.drawText({
          text: this.text.name,
          color: this.text.ncl,
          x: 0.10,
          y: 0.83,
          animation: this.textAnimation
        });
        this.engine.ui.drawText({
          text: this.text.text,
          color: this.text.color,
          x: 0.10,
          y: 0.86,
          animation: this.textAnimation
        });
      }
    });
  }
};

Nauper.Frame.prototype.createImageDrawCallback = function createImageDrawCallback(img, index) {
  let result = () => {
    const ratio = (this.size.height * 1.20) / img.height;
    const offsetY = this.size.height * 0.10;
    const offsetX = this.size.width * (0.225 * index);
    this.render.drawImage(img, offsetX, offsetY, img.width * ratio, img.height * ratio);
    this.loaded -= 1;
    if (this.loaded === 0) {
      this.setText();
    }
  };
  return result;
};

Nauper.Frame.prototype.displayCharacters = function displayCharacters() {
  if (this.displayOrder !== undefined && this.displayOrder.length !== 0) {
    this.loaded = this.displayOrder.length;
    for (let index = 0; index < this.displayOrder.length; index += 1) {
      let i = this.displayOrder[index];
      if (i !== false && i !== undefined) {
        let img = new Image();
        img.onload = this.createImageDrawCallback(img, index);
        img.src = this.characters[i];
      } else {
        this.loaded -= 1;
      }
    }
  } else {
    this.setText();
  }
};
