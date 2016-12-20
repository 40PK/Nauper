/* global Nauper */
Nauper.Character = function Character(engine, emotionPaths, name, id, color) {
  this.engine = engine;
  this.emotions = emotionPaths;
  this.name = name;
  this.color = color;
  this.id = id;
  this.engine.characters[this.id] = this;

  this.createImage();
};

Nauper.Character.prototype.createImage = function createImage() {
  this.image = document.createElement('img');
  this.image.id = this.id;
  this.image.classList.add('character');
  this.image.style.display = 'none';
  document.body.appendChild(this.image);
};
