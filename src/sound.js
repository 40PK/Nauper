/* global Nauper */
Nauper.Sound = function Sound(engine) {
  this.engine = engine;
  this.audio = this.engine.audio;
  this.repeating = false;

  this.repeatend = function repeatend() {
    this.audio.play();
    this.repeating = true;
  }.bind(this);

  this.stopend = function stopend() {
    this.stop();
    this.audio.removeEventListener('ended', stopend);
  }.bind(this);
};

Nauper.Sound.prototype.play = function play(filename, once) {
  this.audio.src = `./data/sounds/${filename}`;
  this.audio.play();
  if (once) {
    this.audio.addEventListener('ended', this.stopend);
  } else if (!once) {
    this.audio.addEventListener('ended', this.repeatend);
  }
};

Nauper.Sound.prototype.pause = function pause() {
  this.audio.pause();
};

Nauper.Sound.prototype.stop = function stop() {
  this.pause();
  if (this.repeating) {
    this.audio.removeEventListener('ended', this.repeatend);
    this.repeating = false;
  }
  this.audio.src = '';
};

Nauper.Sound.prototype.process = function process(audio, once) {
  if (audio !== undefined) {
    this.stop();
    if (audio) {
      this.play(audio, once);
    }
  }
};
