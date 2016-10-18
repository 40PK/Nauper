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
  this.type = 'frame';

  this.draw = function draw() {
    if (this.check()) {
      this.render.clearRect(0, 0, this.size.width, this.size.height);
      this.engine.ui.setBackground(this.background);
      this.displayCharacters();
    } else {
      this.engine.nextElement();
    }
  }.bind(this);
};

Nauper.Frame.prototype.check = function check() {
  return true;
};

Nauper.Frame.prototype.setText = function setText() {
  this.engine.ui.drawTextBox({
    type: this.text.edges
  });
  this.engine.ui.drawText({
    text: this.text.name,
    x: 0.10,
    y: 0.82
  });
  this.engine.ui.drawText({
    text: this.text.text,
    x: 0.10,
    y: 0.845
  });
};

Nauper.Frame.prototype.displayCharacters = function displayCharacters() {
  if (this.displayOrder !== undefined && this.displayOrder.length !== 0) {
    let loaded = this.displayOrder.length;
    this.displayOrder.forEach((i, index) => {
      if (i !== false && i !== undefined) {
        let img = new Image();
        img.addEventListener('load', () => {
          const ratio = (this.size.height * 1.20) / img.height;
          const offsetY = this.size.height * 0.10;
          const offsetX = this.size.width * (0.225 * index);
          this.render.drawImage(img, offsetX, offsetY, img.width * ratio, img.height * ratio);
          loaded -= 1;
          if (loaded === 0) {
            this.setText();
          }
        });
        img.src = this.characters[i];
      } else {
        loaded -= 1;
      }
    });
  } else {
    this.setText();
  }
};
