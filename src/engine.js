/* global Nauper, getWindowSize, putDefaults */
Nauper.Engine = function Engine(configs) {
  this.defaultConfig = {
    maxCharacters: 4
  };
  this.conf = putDefaults(this.defaultConfig, configs);

  this.elements = [];
  this.globalIndex = 0;
  this.localIndex = -1;
  this.size = getWindowSize();

  this.click = function click() {
    this.localIndex += 1;
    if (this.localIndex < this.elements[this.globalIndex].length) {
      this.element = this.elements[this.globalIndex][this.localIndex];
      this.element.callback.apply(this.element.context, this.element.arguments);
    }
  }.bind(this);

  this.resize = function resize() {
    this.size = getWindowSize();
  }.bind(this);

  this.clickListener = document.body.addEventListener('click', this.click);
  window.addEventListener('resize', this.resize);
};
