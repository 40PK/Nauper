'use strict';

var Nauper = { // eslint-disable-line
  version: '0.1'
};
'use strict';

var wrapText = function wrapText(engine, text, style, maxwidth) {
  //eslint-disable-line
  var textElement = document.createElement('p');
  var words = text.split(' ');
  var drawingText = '';
  var height = 0;
  var width = 0;
  var result = [];
  textElement.style.font = style;
  textElement.style.position = 'relative';
  textElement.style.zIndex = '-1';
  textElement.innerHTML = 'Test';
  document.body.appendChild(textElement);
  height = textElement.offsetHeight;
  document.body.removeChild(textElement);

  words.forEach(function (i, index) {
    if (drawingText === '') {
      width = engine.render.measureText(i).width;
    } else {
      width = engine.render.measureText(drawingText + ' ' + i).width;
    }

    if (width > maxwidth) {
      result.push(drawingText);
      drawingText = i;
    } else if (width === maxwidth) {
      result.push(drawingText + ' ' + i);
      drawingText = '';
    } else if (width < maxwidth) {
      if (drawingText) {
        drawingText = drawingText + ' ' + i;
      } else {
        drawingText = i;
      }
      if (index + 1 === words.length) {
        result.push(drawingText);
      }
    }
  });

  return { result: result, height: height };
};
'use strict';

/* global Nauper */
Nauper.Engine = function Engine(configs) {
  var elements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  this.canvas = configs.canvas;
  this.render = this.canvas.getContext('2d');
  this.size = configs.size;
  this.canvas.width = this.size.width;
  this.canvas.height = this.size.height;
  this.render.font = configs.font;

  this.elements = elements;
  this.globalIndex = 0;
  this.localIndex = 0;
  this.clickType = null;

  function click(event) {
    if (this.clickType) {
      this[this.clickType].call(this, event);
    }
  }
  this.canvas.addEventListener('click', click.bind(this), false);
};

Nauper.Engine.prototype.choice = function choice(event) {
  var y = event.pageY;
  var buttonID = 3;
  if (y < this.size.height * 0.25) {
    buttonID = 0;
  } else if (y < this.size.height * 0.50) {
    buttonID = 1;
  } else if (y < this.size.height * 0.75) {
    buttonID = 2;
  }
  if (buttonID < this.elements[this.globalIndex][this.localIndex].map.length) {
    this.globalIndex = this.elements[this.globalIndex][this.localIndex].map[buttonID].address;
    this.localIndex = 0;
    this.clickType = 'nextElement';
    this.elements[this.globalIndex][this.localIndex].draw.call(null, this);
  }
};

Nauper.Engine.prototype.nextElement = function nextElement() {
  this.localIndex = Number(this.localIndex) + 1;
  if (this.localIndex === this.elements[this.globalIndex].length) {
    this.clickType = null;
  } else {
    this.elements[this.globalIndex][this.localIndex].draw.call(null, this);
    if (this.elements[this.globalIndex][this.localIndex].type === 'choice') {
      this.clickType = 'choice';
    } else {
      this.clickType = this.clickType;
    }
  }
};

Nauper.Engine.prototype.start = function start() {
  if (this.elements[0][0].type === 'frame') {
    this.clickType = 'nextElement';
  } else if (this.elements[0][0].type === 'choice') {
    this.clickType = 'choice';
  }
  this.elements[0][0].draw.call(null, this);
  return true;
};

Nauper.Engine.prototype.addScene = function addScene(scene) {
  this.elements.push(scene);
};
'use strict';

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
    this.canvas.style.backgroundImage = 'url(./data/images/backgrounds/' + this.background + ')';
  }
};

Nauper.Frame.prototype.check = function check() {
  return true;
};

Nauper.Frame.prototype.setText = function setText() {
  if (this.text !== undefined) {
    var x = this.size.width * 0.025;
    var y = this.size.height * 0.80;
    var height = this.size.height * 0.18;
    var width = this.size.width * 0.95;
    var radius = this.size.height * 0.05;
    var textwidth = this.size.width * 0.80;
    var textx = this.size.width * 0.10;
    var texty = this.size.height * 0.83 + 27;
    var texts = [];
    this.render.fillStyle = this.text.base;
    if (this.text.edges === 'default') {
      this.render.fillRect(x, y, width, height);
    } else if (this.text.edges === 'rounded') {
      this.render.beginPath();
      this.render.moveTo(x, y + radius);
      this.render.lineTo(x, y + height - radius);
      this.render.quadraticCurveTo(x, y + height, x + radius, y + height);
      this.render.lineTo(x + width - radius, y + height);
      this.render.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
      this.render.lineTo(x + width, y + radius);
      this.render.quadraticCurveTo(x + width, y, x + width - radius, y);
      this.render.lineTo(x + radius, y);
      this.render.quadraticCurveTo(x, y, x, y + radius);
      this.render.fill();
    }
    this.render.fillStyle = this.text.namecolor;
    this.render.fillText(this.text.name, this.size.width * 0.10, y + 27);
    this.render.fillStyle = this.text.textcolor;
    texts = wrapText(this.engine, this.text.text, this.render.font, textwidth);
    for (var j = 0; j < texts.result.length; j += 1) {
      var i = texts.result[j];
      this.render.fillText(i, textx, texty + texts.height * j);
    }
  }
};

Nauper.Frame.prototype.displayCharacters = function displayCharacters() {
  var _this = this;

  if (this.displayOrder !== undefined && this.displayOrder.length !== 0) {
    (function () {
      var loaded = _this.displayOrder.length;
      _this.displayOrder.forEach(function (i, index) {
        if (i !== false && i !== undefined) {
          (function () {
            var img = new Image();
            img.addEventListener('load', function () {
              var ratio = _this.size.height * 1.20 / img.height;
              var offsetY = _this.size.height * 0.10;
              var offsetX = _this.size.width * (0.225 * index);
              _this.render.drawImage(img, offsetX, offsetY, img.width * ratio, img.height * ratio);
              loaded -= 1;
              if (loaded === 0) {
                _this.setText();
              }
            });
            img.src = _this.characters[i];
          })();
        } else {
          loaded -= 1;
        }
      });
    })();
  } else {
    this.setText();
  }
};
'use strict';

/* global Nauper */
Nauper.Question = function Question(engine, args) {
  this.background = args.background;
  this.activebox = args.textbox.active;
  this.inactivebox = args.textbox.inactive;
  this.boxtype = args.textbox.type;
  this.necessary = args.necessary;
  this.engine = engine;
  this.render = this.engine.render;
  this.canvas = this.engine.canvas;
  this.size = this.engine.size;
  this.map = args.map;
  this.setType();

  this.draw = function draw() {
    var _this = this;

    if (this.map.length !== 0 && this.map.length <= 4) {
      (function () {
        var x = _this.size.width * 0.025;
        var y = 0;
        var height = _this.size.height * 0.20;
        var width = _this.size.width * 0.95;
        var radius = _this.size.height * 0.05;
        _this.render.clearRect(0, 0, _this.size.width, _this.size.height);
        _this.setBackground();
        _this.map.forEach(function (i, index) {
          y = (index * 0.25 + 0.025) * _this.size.height;
          _this.renderBox(index, false, { x: x, y: y, height: height, width: width, radius: radius });
        });
      })();
    } else {
      this.engine.nextElement();
    }
  }.bind(this);
};

Nauper.Question.prototype.setBackground = function setBackground() {
  if (this.background) {
    this.canvas.style.backgroundImage = 'url("./data/images/backgrounds/' + this.background + '")';
  }
};

Nauper.Question.prototype.setType = function setType() {
  if (this.necessary === true || this.necessary === undefined) {
    this.type = 'choice';
  } else {
    this.type = 'frame';
  }
};

Nauper.Question.prototype.setText = function setText(index, active, pos) {
  var x = this.size.width * 0.50 - this.render.measureText(this.map[index].text).width / 2;
  var y = this.size.height * (pos.y / this.size.height + 0.10);
  if (active) {
    this.render.fillStyle = this.activebox.text;
  } else if (!active) {
    this.render.fillStyle = this.inactivebox.text;
  }
  this.render.fillText(this.map[index].text, x, y);
};

Nauper.Question.prototype.renderBox = function renderBox(index, active, pos) {
  var ev = {
    xwidth: pos.x + pos.width,
    yheight: pos.y + pos.height
  };
  if (active) {
    this.render.fillStyle = this.activebox.background;
  } else if (!active) {
    this.render.fillStyle = this.inactivebox.background;
  }

  if (this.boxtype === 'default') {
    this.render.fillRect(pos.x, pos.y, pos.width, pos.height);
  } else if (this.boxtype === 'rounded') {
    this.render.beginPath();
    this.render.moveTo(pos.x, pos.y + pos.radius);
    this.render.lineTo(pos.x, ev.yheight - pos.radius);
    this.render.quadraticCurveTo(pos.x, ev.yheight, pos.x + pos.radius, ev.yheight);
    this.render.lineTo(ev.xwidth - pos.radius, ev.yheight);
    this.render.quadraticCurveTo(ev.xwidth, ev.yheight, ev.xwidth, ev.yheight - pos.radius);
    this.render.lineTo(ev.xwidth, pos.y + pos.radius);
    this.render.quadraticCurveTo(ev.xwidth, pos.y, ev.xwidth - pos.radius, pos.y);
    this.render.lineTo(pos.x + pos.radius, pos.y);
    this.render.quadraticCurveTo(pos.x, pos.y, pos.x, pos.y + pos.radius);
    this.render.fill();
  }
  this.setText(index, active, pos);
};
"use strict";

/* global Nauper */
Nauper.Character = function Character(args) {
  var result = {};
  args.emotions.forEach(function characterEmotions(emotion) {
    result[emotion] = args.path + "/" + emotion + ".png";
  });
  return result;
};