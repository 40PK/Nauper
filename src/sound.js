/* global Nauper */
Nauper.Sound = function Sound(engine) {
  this.engine = engine;
  this.audio = this.engine.audio;
};

Nauper.Sound.prototype.play = function play(filename) {
  this.audio.src = `./data/sounds/${filename}`;
  this.audio.play();
};

Nauper.Sound.prototype.pause = function pause() {
  this.audio.pause();
};

Nauper.Sound.prototype.stop = function stop() {
  this.pause();
  this.audio.src = '';
};

Nauper.Sound.prototype.process = function process(audio) {
  if (audio !== undefined) {
    this.stop();
    if (audio) {
      this.play(audio);
    }
  }
};
