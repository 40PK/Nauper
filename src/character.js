/* global Nauper */
Nauper.Character = function Character(engine, emotionPaths, name, id, color) {
  this.engine = engine;
  this.emotions = emotionPaths;
  this.name = name;
  this.color = color;
  this.id = id;
  this.engine.characters[this.id] = this;
};
