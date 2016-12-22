/* global Nauper */
Nauper.Character = function Character(engine, emotionPaths, name, id, color, pos) {
  this.engine = engine;
  this.emotions = emotionPaths;
  this.name = name;
  this.color = color;
  this.id = id;
  this.pos = pos;
  this.engine.characters[this.id] = this;
  this.characterPos = {
    0: 'characterPos0',
    1: 'characterPos1',
    2: 'characterPos2',
    3: 'characterPos3',
    center: 'characterPosCenter'
  };
  this.currentEmotion = false;

  this.setPos = function setPos(position) {
    this.clearPos();
    this.image.classList.add(this.characterPos[position]);
    this.pos = position;
  }.bind(this);

  this.clearPos = function clearPos() {
    Object.getOwnPropertyNames(this.characterPos).forEach((i) => {
      this.image.classList.remove(this.characterPos[i]);
    });
    this.pos = false;
  }.bind(this);

  this.say = function say(text) {
    this.engine.nameElem.style.color = this.color;
    this.engine.nameElem.innerHTML = this.name;
    this.engine.textElem.innerHTML = text;
    this.engine.UI.showTextBox();
  }.bind(this);

  this.createImage();
  this.setPos.call(this, pos);
};

Nauper.Character.prototype.createImage = function createImage() {
  let characterClass;
  this.image = document.createElement('img');
  this.image.id = this.id;
  this.image.classList.add('character');
  this.image.classList.add(characterClass);
  document.body.appendChild(this.image);
  this.image.style.display = 'none';
};

Nauper.Character.prototype.draw = function draw(emotion) {
  this.image.style.display = 'block';
  if (this.emotions[emotion] && this.currentEmotion !== emotion) {
    this.image.src = this.emotions[emotion];
    this.currentEmotion = emotion;
    let listener = () => {
      console.log(this.image.offsetHeight);
      console.log(document.documentElement.offsetHeight);
      if (this.image.offsetHeight > document.documentElement.offsetHeight) {
        this.image.classList.add('characterAlternative');
      }
      this.image.removeEventListener('load', listener);
    };
    this.image.addEventListener('load', listener);
  }
};

Nauper.Character.prototype.hide = function hide() {
  this.image.style.display = 'none';
  this.image.src = '';
  this.currentEmotion = false;
};
