/* global Nauper, putDefaults */
Nauper.Redirect = function Redirect(engine, configs) {
  let defaults = {
    globalIndex: 0,
    localIndex: 0
  };
  this.engine = engine;
  this.conf = putDefaults(defaults, configs);
};

Nauper.Redirect.prototype.draw = function draw() {
  this.engine.globalIndex = this.conf.globalIndex;
  this.engine.localIndex = this.conf.localIndex - 1;
  this.engine.nextElement();
};
