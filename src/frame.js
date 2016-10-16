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
      this.setBackground();
      this.displayCharacters();
    } else {
      this.engine.nextElement();
    }
  }.bind(this);
};

Nauper.Frame.prototype.setBackground = function setBackground() {
  if (this.background) {
    this.canvas.style.backgroundImage = `url(./data/images/backgrounds/${this.background})`;
  }
};

Nauper.Frame.prototype.check = function check() {
  return true;
};

Nauper.Frame.prototype.setText = function setText() {
  if (this.text !== undefined) {
    const x = this.size.width * 0.025;
    const y = this.size.height * 0.80;
    const height = this.size.height * 0.18;
    const width = this.size.width * 0.95;
    const radius = this.size.height * 0.05;
    const textwidth = this.size.width * 0.80;
    const textx = this.size.width * 0.10;
    const texty = (this.size.height * 0.83) + 27;
    let texts = [];
    this.render.fillStyle = this.text.base;
    if (this.text.edges === 'default') {
      this.render.fillRect(x, y, width, height);
    } else if (this.text.edges === 'rounded') {
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
    this.render.fillStyle = this.text.namecolor;
    this.render.fillText(this.text.name, this.size.width * 0.10, y + 27);
    this.render.fillStyle = this.text.textcolor;
    texts = wrapText(this.engine, this.text.text, this.render.font, textwidth);
    for (let j = 0; j < texts.result.length; j += 1) {
      let i = texts.result[j];
      this.render.fillText(i, textx, texty + (texts.height * j));
    }
  }
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
