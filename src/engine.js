/* global Nauper */
Nauper.Engine = function Engine() {
  this.UI = new Nauper.UI(this);
  this.elements = [];
  this.notSkip = ['say', 'drawQuestion', 'fade'];
  this.characters = {};
  this.sayBox = document.getElementById('sayBox');
  this.nameElem = document.getElementById('name');
  this.textElem = document.getElementById('text');
  this.globalIndex = 0;
  this.localIndex = -1;

  this.click = function click() {
    this.localIndex += 1;
    if (this.localIndex < this.elements[this.globalIndex].length) {
      this.UI.clearQuestion();
      this.UI.hideTextBox();
      this.element = this.elements[this.globalIndex][this.localIndex];
      this.element.parent[this.element.func].apply(this.element.parent, this.element.arguments);
      if (this.notSkip.indexOf(this.element.func) === -1) {
        this.click();
      }
    }
  }.bind(this);

  this.clickListener = document.body.addEventListener('click', this.click);
};

Nauper.Engine.prototype.redirect = function redirect(globalIndex = 0, localIndex = 0) {
  this.globalIndex = globalIndex;
  this.localIndex = localIndex - 1;
  this.UI.hideCharacters();
};

Nauper.Engine.prototype.addLabel = function addLabel(label) {
  if (label.length > 0) {
    this.elements.push(label);
  }
};

Nauper.Engine.prototype.start = function start() {
  this.click();
};
