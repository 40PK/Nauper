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
  var characters = args.characters;
  var displayOrder = args.displayOrder;
  var text = args.textbox;
  var render = engine.render;
  var size = engine.size;
  var canvas = engine.canvas;

  var setText = function setText() {
    if (text !== undefined) {
      (function () {
        var x = size.width * 0.025;
        var y = size.height * 0.80;
        var height = size.height * 0.18;
        var width = size.width * 0.95;
        var radius = size.height * 0.05;
        var texts = [];
        render.fillStyle = text.base;
        if (text.edges === 'default') {
          render.fillRect(0, size.height * 0.80, size.width, size.height * 0.20);
        } else if (text.edges === 'rounded') {
          render.beginPath();
          render.moveTo(x, y + radius);
          render.lineTo(x, y + height - radius);
          render.quadraticCurveTo(x, y + height, x + radius, y + height);
          render.lineTo(x + width - radius, y + height);
          render.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
          render.lineTo(x + width, y + radius);
          render.quadraticCurveTo(x + width, y, x + width - radius, y);
          render.lineTo(x + radius, y);
          render.quadraticCurveTo(x, y, x, y + radius);
          render.fill();
        }
        render.fillStyle = text.namecolor;
        render.fillText(text.name, size.width * 0.10, size.height * 0.80 + 27);
        render.fillStyle = text.textcolor;
        texts = wrapText(engine, text.text, render.font, size.width * 0.80);
        texts.result.forEach(function insertText(i, j) {
          render.fillText(i, size.width * 0.10, size.height * 0.83 + 27 + texts.height * j);
        });
      })();
    }
  };

  var setBackground = function setBackground() {
    if (args.background) {
      canvas.style.backgroundImage = 'url(./data/images/backgrounds/' + args.background + ')';
    }
  };

  var displayCharacters = function displayCharacters() {
    if (displayOrder !== undefined && displayOrder.length !== 0) {
      (function () {
        var loaded = displayOrder.length;
        displayOrder.forEach(function (i, index) {
          if (i !== false && i !== undefined) {
            (function () {
              var img = new Image();
              img.addEventListener('load', function () {
                var ratio = size.height * 1.20 / img.height;
                var offsetY = size.height * 0.10;
                var offsetX = size.width * (0.225 * index);
                render.drawImage(img, offsetX, offsetY, img.width * ratio, img.height * ratio);
                loaded -= 1;
                if (loaded === 0) {
                  setText();
                }
              });
              img.src = characters[i];
            })();
          } else {
            loaded -= 1;
          }
        });
      })();
    } else {
      setText();
    }
  };

  this.type = 'frame';

  this.check = function () {
    return true;
  };

  this.draw = function draw() {
    if (this.check()) {
      render.clearRect(0, 0, size.width, size.height);
      setBackground();
      displayCharacters();
    } else {
      engine.nextElement();
    }
  }.bind(this);
};
'use strict';

/* global Nauper */
Nauper.Question = function Question(engine, args) {
  var _this = this;

  this.background = args.background;
  this.activebox = args.textbox.active;
  this.inactivebox = args.textbox.inactive;
  this.boxtype = args.textbox.type;
  this.necessary = args.necessary;
  this.render = engine.render;
  this.canvas = engine.canvas;
  this.size = engine.size;
  this.setBackground = function () {
    if (_this.background) {
      _this.canvas.style.backgroundImage = 'url("./data/images/backgrounds/' + _this.background + '")';
    }
  };
  this.setType = function () {
    if (_this.necessary === true || _this.necessary === undefined) {
      _this.type = 'choice';
    } else {
      _this.type = 'frame';
    }
  };
  this.setText = function (index, active, pos) {
    var x = _this.size.width * 0.50 - _this.render.measureText(_this.map[index].text).width / 2;
    var y = _this.size.height * (pos.y / _this.size.height + 0.10);
    if (active) {
      _this.render.fillStyle = _this.activebox.text;
    } else if (!active) {
      _this.render.fillStyle = _this.inactivebox.text;
    }
    _this.render.fillText(_this.map[index].text, x, y);
  };
  this.renderBox = function (index, active, pos) {
    var ev = {
      xwidth: pos.x + pos.width,
      yheight: pos.y + pos.height
    };
    if (active) {
      _this.render.fillStyle = _this.activebox.background;
    } else if (!active) {
      _this.render.fillStyle = _this.inactivebox.background;
    }

    if (_this.boxtype === 'default') {
      _this.render.fillRect(pos.x, pos.y, pos.width, pos.height);
    } else if (_this.boxtype === 'rounded') {
      _this.render.beginPath();
      _this.render.moveTo(pos.x, pos.y + pos.radius);
      _this.render.lineTo(pos.x, ev.yheight - pos.radius);
      _this.render.quadraticCurveTo(pos.x, ev.yheight, pos.x + pos.radius, ev.yheight);
      _this.render.lineTo(ev.xwidth - pos.radius, ev.yheight);
      _this.render.quadraticCurveTo(ev.xwidth, ev.yheight, ev.xwidth, ev.yheight - pos.radius);
      _this.render.lineTo(ev.xwidth, pos.y + pos.radius);
      _this.render.quadraticCurveTo(ev.xwidth, pos.y, ev.xwidth - pos.radius, pos.y);
      _this.render.lineTo(pos.x + pos.radius, pos.y);
      _this.render.quadraticCurveTo(pos.x, pos.y, pos.x, pos.y + pos.radius);
      _this.render.fill();
    }
    _this.setText(index, active, pos);
  };
  this.map = args.map;
  if (this.map.length > 1 && this.map.length < 5) {
    this.setType();
    this.draw = function () {
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
    };
  } else {
    engine.nextElement();
  }
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