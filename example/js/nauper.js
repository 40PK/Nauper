'use strict';

var Nauper = { // eslint-disable-line
  version: '0.1'
};
'use strict';

var getTextHeight = function getTextHeight(style) {
  //eslint-disable-line
  var textElement = document.createElement('p');
  var result = 0;
  textElement.style.font = style;
  textElement.style.position = 'relative';
  textElement.style.zIndex = '-1';
  textElement.innerHTML = 'Test';
  document.body.appendChild(textElement);
  result = textElement.offsetHeight;
  document.body.removeChild(textElement);
  return result;
};

var wrapText = function wrapText(render, text, style, maxwidth) {
  //eslint-disable-line
  var words = text.split(' ');
  var drawingText = '';
  var height = getTextHeight(style);
  var width = 0;
  var result = [];

  words.forEach(function (i, index) {
    if (drawingText === '') {
      width = render.measureText(i).width;
    } else {
      width = render.measureText(drawingText + ' ' + i).width;
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

var getTextOffset = function getTextOffset(render, size, text) {
  //eslint-disable-line
  var textWidth = render.measureText(text).width;
  var halfScreen = size.width * 0.50;
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

var copyObject = function copyObject(object) {
  //eslint-disable-line
  var result = {};
  result = putDefaults(object, {});
  return result;
};

var getWindowSize = function getWindowSize() {
  //eslint-disable-line
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };
};
'use strict';

/* global Nauper, putDefaults, getTextOffset, wrapText, copyObject, getTextHeight */
Nauper.UI = function UI(engine) {
  this.engine = engine;
  this.canvas = this.engine.canvas;
  this.render = this.engine.render;
  this.size = this.engine.size;
  this.menu = [];
  this.menuStyle = {};
  this.currentMS = 0;
  this.lastActive = undefined;
  this.menuOpened = false;
};

Nauper.UI.prototype.setBackground = function setBackground(background) {
  if (background) {
    this.canvas.style.backgroundImage = 'url(./data/images/backgrounds/' + background + ')';
  }
};

Nauper.UI.prototype.drawTextBox = function drawTextBox(configs) {
  var _this = this;

  var defaults = {
    type: 'default',
    color: '#fff',
    link: '',
    x: 0.025,
    y: 0.80,
    height: 0.18,
    width: 0.95,
    radius: 0.05,
    callback: function __callback() {}
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
  } else if (conf.type === 'image') {
    (function () {
      var image = new Image();
      image.addEventListener('load', function (event) {
        _this.render.drawImage(image, x, y, width, height);
        if (conf.callback) {
          conf.callback(event);
        }
      });
      image.src = conf.link;
    })();
  }

  if (conf.type !== 'image') {
    conf.callback();
  }
};

Nauper.UI.prototype.drawText = function drawText(configs) {
  var _this2 = this;

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
      var texts = wrapText(_this2.render, conf.text, _this2.render.font, maxwidth);
      texts.result.forEach(function (i, j) {
        _this2.render.fillText(i, x, y + texts.height * j);
      });
    })();
  } else if (conf.align === 'center') {
    var offset = getTextOffset(this.render, { width: this.canvas.width }, conf.text);
    this.render.fillText(conf.text, offset, y);
  }
};

Nauper.UI.prototype.process = function process(event) {
  var result = void 0;
  var element = this.engine.elements[0][0];
  if (element === this.engine.element && !this.engine.firstPassed) {
    result = 'draw';
    this.engine.firstPassed = true;
  } else if (this.menuOpened) {
    this.menuOpened = false;
    result = 'draw';
  } else if (event.pageX < 50 && event.pageY < 50) {
    this.drawMenu();
    result = null;
  } else {
    result = 'next';
  }
  return result;
};

Nauper.UI.prototype.move = function move(event) {
  if (this.engine.element.type === 'choice') {
    var x = event.pageX;
    var y = event.pageY;
    var flag = false;
    for (var index = 0; index < this.engine.element.map.length; index += 1) {
      var sizes = {
        x: 0.025 * this.size.width,
        y: (index * 0.25 + 0.025) * this.size.height,
        height: 0.20 * this.size.height,
        width: 0.95 * this.size.width
      };
      if (x >= sizes.x && x <= sizes.x + sizes.width) {
        if (y >= sizes.y && y <= sizes.y + sizes.height) {
          this.engine.element.active = index;
          flag = true;
          break;
        }
      }
    }
    if (!flag) {
      this.engine.element.active = undefined;
    }
    if (this.engine.element.active !== this.lastActive) {
      this.lastActive = this.engine.element.active;
      this.engine.element.draw(false);
    }
  }
};

Nauper.UI.prototype.addMenuScreen = function addMenuScreen(menumap) {
  this.menu.push(menumap);
};

Nauper.UI.prototype.setMenuStyle = function setMenuStyle(sm) {
  var defaults = {
    mainbox: 'default',
    maincolor: '#fff',
    smallbox: 'default',
    smallcolor: '#eee',
    smallheight: 0.10,
    smallspace: 0.025,
    title: '#000',
    items: '#111'
  };
  this.menuStyle = putDefaults(defaults, sm);
};

Nauper.UI.prototype.drawMenu = function drawMenu() {
  var _this3 = this;

  var curSlength = this.menu[this.currentMS].length;
  var sh = this.menuStyle.smallheight;
  var ss = this.menuStyle.smallspace;
  var menu = {
    x: 0.25,
    y: 0.25,
    height: (sh + ss) * curSlength + ss,
    width: 0.5
  };
  this.drawTextBox({
    type: this.menuStyle.mainbox,
    color: this.menuStyle.maincolor,
    x: menu.x,
    y: menu.y,
    width: menu.width,
    height: menu.height,
    callback: function callback() {
      _this3.menu[_this3.currentMS].forEach(function (i, index) {
        var y = 0.25 + index * (sh + ss) + ss;
        var width = menu.width - ss * 2;
        _this3.drawTextBox({
          type: _this3.menuStyle.smallbox,
          color: _this3.menuStyle.smallcolor,
          x: 0.25 + ss,
          y: y,
          height: _this3.menuStyle.smallheight,
          width: width
        });
      });
    }
  });
  this.menuOpened = true;
};
'use strict';

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
  this.audio.src = '/data/sounds/' + filename;
  this.audio.play();
  if (once) {
    this.audio.addEventListener('ended', this.stopend);
  } else if (!once) {
    this.audio.addEventListener('ended', this.repeatend);
  }
};

Nauper.Sound.prototype.init = function init() {
  this.setVolume();
  // Will be multiple functions call
};

Nauper.Sound.prototype.setVolume = function setVolume(volume) {
  if (typeof volume === 'number' && volume <= 1) {
    this.engine.audioVolume = volume;
  }
  this.volume = this.engine.audioVolume;
  this.audio.volume = this.volume;
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
  var path = '/data/sounds/' + audio;
  var substr = this.audio.src.substr(-path.length, path.length);
  if (audio !== undefined && path !== substr) {
    this.stop();
    if (audio) {
      this.play(audio, once);
    }
  }
};
'use strict';

/* global Nauper, getWindowSize */
Nauper.Engine = function Engine(configs) {
  var elements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  this.font = configs.font;
  this.audio = document.getElementById('audio');
  this.canvas = document.getElementById('canvas');
  this.render = this.canvas.getContext('2d');
  this.size = getWindowSize();
  this.ui = new Nauper.UI(this);
  this.sound = new Nauper.Sound(this);
  this.audioVolume = 0.5;
  this.canvas.width = this.size.width;
  this.canvas.height = this.size.height;
  this.render.font = this.font;
  this.firstPassed = false;
  this.element = null;

  this.elements = elements;
  this.globalIndex = 0;
  this.localIndex = 0;
  this.clickType = null;

  this.elementProcessor = function elementProcessor(event) {
    var task = this.ui.process(event);
    if (task === 'redraw') {
      this.element.draw();
    } else if (task === 'next') {
      this.click(event);
      this.sound.process(this.element.audio, this.element.once);
    } else if (task === 'draw') {
      this.element.draw();
      this.sound.process(this.element.audio, this.element.once);
    }
  }.bind(this);

  this.resize = function resize() {
    this.size = getWindowSize();
    this.canvas.width = this.size.width;
    this.canvas.height = this.size.height;
    this.element.draw();
  }.bind(this);

  this.move = function move(event) {
    this.ui.move(event);
    // now is only one function, at future we might use multiple
  }.bind(this);

  this.canvas.addEventListener('click', this.elementProcessor, false);

  window.addEventListener('resize', this.resize, false);
  window.addEventListener('mousemove', this.move, false);
};

Nauper.Engine.prototype.click = function click(event) {
  if (this.clickType) {
    this[this.clickType].call(this, event);
  }
};

Nauper.Engine.prototype.choice = function choice(event) {
  var _this = this;

  var x = event.pageX;
  var y = event.pageY;
  this.element.map.forEach(function (i, index) {
    var sizes = {
      x: 0.025 * _this.size.width,
      y: (index * 0.25 + 0.025) * _this.size.height,
      height: 0.20 * _this.size.height,
      width: 0.95 * _this.size.width
    };
    if (x >= sizes.x && x <= sizes.x + sizes.width) {
      if (y >= sizes.y && y <= sizes.y + sizes.height) {
        if (i.address !== false) {
          _this.globalIndex = i.address;
          _this.localIndex = -1;
        }
        _this.nextElement();
      }
    }
  });
};

Nauper.Engine.prototype.nextElement = function nextElement() {
  this.localIndex = Number(this.localIndex) + 1;
  if (this.localIndex === this.elements[this.globalIndex].length) {
    this.clickType = null;
  } else {
    this.element = this.elements[this.globalIndex][this.localIndex];
    this.element.draw.call(null, this);
    if (this.element.type === 'choice') {
      if (this.element.necessary || this.element.necessary === undefined) {
        this.clickType = 'choice';
      } else {
        this.clickType = 'nextElement';
      }
    } else {
      this.clickType = 'nextElement';
    }
  }
};

Nauper.Engine.prototype.start = function start() {
  this.sound.init();
  if (this.elements[0][0].type === 'frame') {
    this.clickType = 'nextElement';
  } else if (this.elements[0][0].type === 'choice') {
    this.clickType = 'choice';
  }
  this.element = this.elements[0][0];
  this.elementProcessor({ pageX: -1, pageY: -1 });
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
  this.audio = args.audio;
  this.once = args.once;
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
  var _this = this;

  if (this.text !== undefined) {
    this.engine.ui.drawTextBox({
      type: this.text.type,
      color: this.text.background,
      link: this.text.link,
      callback: function callback() {
        _this.engine.ui.drawText({
          text: _this.text.name,
          color: _this.text.ncl,
          x: 0.10,
          y: 0.83
        });
        _this.engine.ui.drawText({
          text: _this.text.text,
          color: _this.text.color,
          x: 0.10,
          y: 0.86
        });
      }
    });
  }
};

Nauper.Frame.prototype.displayCharacters = function displayCharacters() {
  var _this2 = this;

  if (this.displayOrder !== undefined && this.displayOrder.length !== 0) {
    (function () {
      var loaded = _this2.displayOrder.length;

      var _loop = function _loop(index) {
        var i = _this2.displayOrder[index];
        if (i !== false && i !== undefined) {
          (function () {
            var img = new Image();
            // Trying to fix it as fast as I can
            img.onload = function () {
              //eslint-disable-line
              var ratio = _this2.size.height * 1.20 / img.height;
              var offsetY = _this2.size.height * 0.10;
              var offsetX = _this2.size.width * (0.225 * index);
              _this2.render.drawImage(img, offsetX, offsetY, img.width * ratio, img.height * ratio);
              loaded -= 1;
              if (loaded === 0) {
                _this2.setText();
              }
            };
            img.src = _this2.characters[i];
          })();
        } else {
          loaded -= 1;
        }
      };

      for (var index = 0; index < _this2.displayOrder.length; index += 1) {
        _loop(index);
      }
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
  this.boxlink = args.textbox.link;
  this.type = 'choice';
  this.necessary = args.necessary;
  this.engine = engine;
  this.render = this.engine.render;
  this.canvas = this.engine.canvas;
  this.size = this.engine.size;
  this.map = args.map;
  this.audio = args.audio;
  this.once = args.once;
  this.active = undefined;

  this.draw = function draw() {
    var _this = this;

    var clear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (this.map.length !== 0 && this.map.length <= 4) {
      var x = 0.025;
      var height = 0.20;
      var width = 0.95;
      var radius = 0.05;
      if (clear) {
        this.render.clearRect(0, 0, this.size.width, this.size.height);
      }
      this.engine.ui.setBackground(this.background);

      var _loop = function _loop(index) {
        if (_this.active === undefined || _this.active === index) {
          (function () {
            var i = _this.map[index];
            var box = void 0;
            if (_this.active === index) {
              box = _this.activebox;
            } else {
              box = _this.inactivebox;
            }
            _this.engine.ui.drawTextBox({
              type: _this.boxtype,
              color: box.background,
              link: _this.boxlink,
              y: index * 0.25 + 0.025,
              x: x,
              height: height,
              width: width,
              radius: radius,
              callback: function callback() {
                _this.engine.ui.drawText({
                  text: i.text,
                  align: 'center',
                  color: box.text,
                  y: index * 0.25 + 0.125
                });
              }
            });
          })();
        }
      };

      for (var index = 0; index < this.map.length; index += 1) {
        _loop(index);
      }
    } else {
      this.engine.nextElement();
    }
  }.bind(this);
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