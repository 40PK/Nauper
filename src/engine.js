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
      this.element = this.elements[this.globalIndex][this.localIndex];
      if (this.element.func !== 'fade') {
        this.UI.clearQuestion();
        this.UI.hideTextBox();
      }
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
  if (this.elements[this.globalIndex][this.localIndex + 1].func !== 'fade') {
    this.UI.hideCharacters();
  } else {
    setTimeout(this.UI.hideCharacters,
      this.elements[this.globalIndex][this.localIndex + 1].arguments[2] || 2000);
  }
};

Nauper.Engine.prototype.addLabel = function addLabel(label) {
  if (label.length > 0) {
    this.elements.push(label);
  }
};

Nauper.Engine.prototype.start = function start() {
  this.click();
};
