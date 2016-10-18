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

var getTextOffset = function getTextOffset(engine, text) {
  //eslint-disable-line
  var textWidth = engine.render.measureText(text).width;
  var halfScreen = engine.size.width * 0.50;
  var halfText = textWidth * 0.50;
  var result = halfScreen - halfText;
  return result;
};

var putDefaults = function putDefaults(defaults, given) {
  //eslint-disable-line
  var keys = Object.getOwnPropertyNames(defaults);
  var result = {};
  keys.forEach(function (key) {
    if (given[key] === undefined) {
      result[key] = defaults[key];
    } else if (given[key] !== undefined) {
      result[key] = given[key];
    }
  });
  return result;
};
'use strict';

/* global Nauper, putDefaults, getTextOffset, wrapText */
Nauper.UI = function UI(engine) {
  this.engine = engine;
  this.canvas = this.engine.canvas;
  this.render = this.engine.render;
  this.size = this.engine.size;
};

Nauper.UI.prototype.setBackground = function setBackground(background) {
  if (background) {
    this.canvas.style.backgroundImage = 'url(./data/images/backgrounds/' + background + ')';
  }
};

Nauper.UI.prototype.drawTextBox = function drawTextBox(configs) {
  var defaults = {
    type: 'default',
    color: '#fff',
    x: 0.025,
    y: 0.80,
    height: 0.18,
    width: 0.95,
    radius: 0.05
  };
  var conf = putDefaults(defaults, configs);
  var x = this.size.width * conf.x;
  var y = this.size.height * conf.y;
  var height = this.size.height * conf.height;
  var width = this.size.width * conf.width;
  var radius = this.size.height * conf.radius;

  this.render.fillStyle = conf.color;

  if (conf.type === 'default') {
    this.render.fillRect(x, y, width, height);
  } else if (conf.type === 'rounded') {
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
};

Nauper.UI.prototype.drawText = function drawText(configs) {
  var _this = this;

  var defaults = {
    text: '',
    align: 'wrapped',
    color: '#000',
    x: 0.10,
    y: 0.85,
    width: 0.80
  };
  var conf = putDefaults(defaults, configs);
  var x = this.size.width * conf.x;
  var y = this.size.height * conf.y;
  var maxwidth = this.size.width * conf.width;
  this.render.fillStyle = conf.color;
  if (conf.align === 'wrapped') {
    (function () {
      var texts = wrapText(_this.engine, conf.text, _this.render.font, maxwidth);
      texts.result.forEach(function (i, j) {
        _this.render.fillText(i, x, y + texts.height * j);
      });
    })();
  } else if (conf.align === 'center') {
    var offset = getTextOffset(this.engine, conf.text);
    this.render.fillText(conf.text, offset, y);
  }
};
'use strict';

/* global Nauper */
Nauper.Engine = function Engine(configs) {
  var elements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  this.canvas = configs.canvas;
  this.render = this.canvas.getContext('2d');
  this.size = configs.size;
  this.ui = new Nauper.UI(this);
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
      this.engine.ui.setBackground(this.background);
      this.displayCharacters();
    } else {
      this.engine.nextElement();
    }
  }.bind(this);
};

Nauper.Frame.prototype.check = function check() {
  return true;
};

Nauper.Frame.prototype.setText = function setText() {
  this.engine.ui.drawTextBox({
    type: this.text.edges
  });
  this.engine.ui.drawText({
    text: this.text.name,
    x: 0.10,
    y: 0.82
  });
  this.engine.ui.drawText({
    text: this.text.text,
    x: 0.10,
    y: 0.845
  });
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
        var x = 0.025;
        var y = 0;
        var height = 0.20;
        var width = 0.95;
        var radius = 0.05;
        _this.render.clearRect(0, 0, _this.size.width, _this.size.height);
        _this.engine.ui.setBackground(_this.background);
        _this.map.forEach(function (i, index) {
          y = index * 0.25 + 0.025;
          _this.engine.ui.drawTextBox({
            type: _this.boxtype,
            color: _this.inactivebox.background,
            y: y,
            x: x,
            height: height,
            width: width,
            radius: radius
          });
          _this.engine.ui.drawText({
            text: i.text,
            align: 'center',
            color: _this.inactivebox.text,
            ord: y + 0.10
          });
        });
      })();
    } else {
      this.engine.nextElement();
    }
  }.bind(this);
};

Nauper.Question.prototype.setType = function setType() {
  if (this.necessary === true || this.necessary === undefined) {
    this.type = 'choice';
  } else {
    this.type = 'frame';
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