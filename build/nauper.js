'use strict';

var Nauper = { // eslint-disable-line
  version: '0.1pa'
};
"use strict";

/* eslint-disable */
var __nativeST__ = window.setTimeout;
var __nativeSI__ = window.setInterval;
/* eslint-enable */
window.setTimeout = function __timeout(vCallback, nDelay) {
  var context = this;
  var aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeST__(vCallback instanceof Function ? function __cb() {
    vCallback.apply(context, aArgs);
  } : vCallback, nDelay);
};

window.setInterval = function __interval(vCallback, nDelay) {
  var context = this;
  var aArgs = Array.prototype.slice.call(arguments, 2);
  return __nativeSI__(vCallback instanceof Function ? function __cb() {
    vCallback.apply(context, aArgs);
  } : vCallback, nDelay);
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
    if (given === undefined || given[key] === undefined) {
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
  var result = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };
  result.coff = result.width / result.height;
  return result;
};

var convertHexIntoRGBA = function convertHexIntoRGBA(hexstring, opacity) {
  //eslint-disable-line
  var hex = hexstring.replace('#', '');
  var colors = {};
  if (hex.length === 3) {
    colors.r = parseInt(hex.substring(0, 1), 16);
    colors.g = parseInt(hex.substring(1, 2), 16);
    colors.b = parseInt(hex.substring(2, 3), 16);
  } else if (hex.length === 6) {
    colors.r = parseInt(hex.substring(0, 2), 16);
    colors.g = parseInt(hex.substring(2, 4), 16);
    colors.b = parseInt(hex.substring(4, 6), 16);
  }
  return 'rgba(' + colors.r + ', ' + colors.g + ', ' + colors.b + ', ' + opacity + ')';
};

var makeRequest = function makeRequest(url, callback) {
  //eslint-disable-line
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.addEventListener('readystatechange', function () {
    callback(xhr);
  });
  xhr.send();
};

var makeRequestSync = function makeRequestSync(url, callback) {
  //eslint-disable-line
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send();
  callback(xhr);
};
'use strict';

/* global Nauper */
Nauper.UI = function UI(engine) {
  this.engine = engine;

  this.hideTextBox = function hideTextBox() {
    this.engine.sayBox.style.display = 'none';
  }.bind(this);

  this.showTextBox = function showTextBox() {
    this.engine.sayBox.style.display = 'block';
  }.bind(this);
};

Nauper.UI.prototype.drawQuestion = function drawQuestion(questionMap) {
  var _this = this;

  questionMap.forEach(function (i, index) {
    var choice = document.createElement('div');
    var choiceText = document.createElement('p');
    choiceText.classList.add('inactiveQuestionText');
    choiceText.innerHTML = i.text;
    choice.classList.add('inactiveQuestionBox');
    choice.appendChild(choiceText);
    choice.style.top = String(25 * index) + '%';
    document.body.appendChild(choice);

    choice.addEventListener('mouseover', function () {
      choice.classList.remove('inactiveQuestionBox');
      choice.classList.add('activeQuestionBox');
      choiceText.classList.remove('inactiveQuestionText');
      choiceText.classList.add('activeQuestionText');
    });
    choice.addEventListener('mouseout', function () {
      choice.classList.remove('activeQuestionBox');
      choice.classList.add('inactiveQuestionBox');
      choiceText.classList.remove('activeQuestionText');
      choiceText.classList.add('inactiveQuestionText');
    });
    choice.addEventListener('click', function () {
      _this.engine.redirect(i.address);
    });
  });
};

Nauper.UI.prototype.clearQuestion = function clearQuestion() {
  var questions = document.querySelectorAll('.inactiveQuestionBox, .activeQuestionBox');
  questions.forEach(function (i) {
    i.remove();
  });
};

Nauper.UI.prototype.hideCharacters = function hideCharacters() {
  var characters = document.querySelectorAll('.character');
  for (var i = 0; i < characters.length; i += 1) {
    characters[i].style.display = 'none';
  }
};

Nauper.UI.prototype.setBackground = function setBackground(bg) {
  document.body.style.backgroundImage = 'url("' + bg + '")';
};

Nauper.UI.prototype.fade = function fade() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#000';

  var _this2 = this;

  var func = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ease';
  var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2000;

  var html = document.getElementsByTagName('html')[0];
  html.style.transitionDuration = String(time) + 'ms';
  html.style.transitionTimingFunction = func;
  html.style.backgroundColor = color;
  html.style.opacity = '0';
  setTimeout(function () {
    _this2.engine.click();
    html.style.opacity = '1';
  }, time);
};
"use strict";

/* global Nauper */
Nauper.Sound = function Sound(engine) {
  this.engine = engine;
};
'use strict';

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

Nauper.Engine.prototype.redirect = function redirect() {
  var globalIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var localIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  this.globalIndex = globalIndex;
  this.localIndex = localIndex - 1;
  if (this.elements[this.globalIndex][this.localIndex + 1].func !== 'fade') {
    this.UI.hideCharacters();
  } else {
    setTimeout(this.UI.hideCharacters, this.elements[this.globalIndex][this.localIndex + 1].arguments[2] || 2000);
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
'use strict';

/* global Nauper */
Nauper.Character = function Character(engine, emotionPaths, name, id, color, pos) {
  this.engine = engine;
  this.emotions = emotionPaths;
  this.name = name;
  this.color = color;
  this.id = id;
  this.pos = pos;
  this.engine.characters[this.id] = this;
  this.characterPos = {
    0: 'characterPos0',
    1: 'characterPos1',
    2: 'characterPos2',
    3: 'characterPos3',
    center: 'characterPosCenter'
  };
  this.currentEmotion = false;

  this.setPos = function setPos(position) {
    this.clearPos();
    this.image.classList.add(this.characterPos[position]);
    this.pos = position;
  }.bind(this);

  this.clearPos = function clearPos() {
    var _this = this;

    Object.getOwnPropertyNames(this.characterPos).forEach(function (i) {
      _this.image.classList.remove(_this.characterPos[i]);
    });
    this.pos = false;
  }.bind(this);

  this.say = function say(text) {
    this.engine.nameElem.style.color = this.color;
    this.engine.nameElem.innerHTML = this.name;
    this.engine.textElem.innerHTML = text;
    this.engine.UI.showTextBox();
  }.bind(this);

  this.createImage();
  this.setPos.call(this, pos);
};

Nauper.Character.prototype.createImage = function createImage() {
  var characterClass = void 0;
  this.image = document.createElement('img');
  this.image.id = this.id;
  this.image.classList.add('character');
  this.image.classList.add(characterClass);
  document.body.appendChild(this.image);
  this.image.style.display = 'none';
};

Nauper.Character.prototype.draw = function draw(emotion) {
  var _this2 = this;

  this.image.style.display = 'block';
  if (this.emotions[emotion] && this.currentEmotion !== emotion) {
    (function () {
      _this2.image.src = _this2.emotions[emotion];
      _this2.currentEmotion = emotion;
      var listener = function listener() {
        var doc = document.documentElement.offsetHeight;
        var img = _this2.image.offsetHeight;
        if (img > doc) {
          _this2.image.style.top = '0';
        }
        _this2.image.removeEventListener('load', listener);
      };
      _this2.image.addEventListener('load', listener);
    })();
  }
};

Nauper.Character.prototype.hide = function hide() {
  this.image.style.display = 'none';
  this.image.src = '';
  this.currentEmotion = false;
};