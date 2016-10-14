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
Nauper.Engine = function Engine(configs, elements) {
  this.canvas = configs.canvas;
  this.render = this.canvas.getContext('2d');
  this.size = configs.size;
  this.canvas.width = this.size.width;
  this.canvas.height = this.size.height;

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

/* global Nauper */
Nauper.Frame = function Frame(engine, args) {
  var characters = args.characters;
  var displayOrder = args.displayOrder;
  var text = args.textbox;
  var render = engine.render;
  var size = engine.size;
  var canvas = engine.canvas;

  var setText = function setText() {
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
    render.font = '15pt Arial';
    render.fillText(text.name, size.width * 0.10, size.height * 0.80 + 27);
    render.fillStyle = text.textcolor;
    /* global wrapText */
    texts = wrapText(engine, text.text, render.font, size.width * 0.80);
    texts.result.forEach(function insertText(i, j) {
      render.fillText(i, size.width * 0.10, size.height * 0.83 + 27 + texts.height * j);
    });
  };

  var setBackground = function setBackground() {
    if (args.background) {
      canvas.style.backgroundImage = 'url(./data/images/backgrounds/' + args.background + ')';
    }
  };

  var displayCharacters = function displayCharacters() {
    if (displayOrder.length !== 0) {
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
      canvas.click();
    }
  }.bind(this);
};
'use strict';

/* global Nauper */
Nauper.Question = function Question(engine, args) {
  var background = args.background;
  var boxcolor = args.boxcolor;
  var textcolor = args.textcolor;
  var boxtype = args.boxtype;
  var necessary = args.necessary;
  var render = engine.render;
  var canvas = engine.canvas;
  var size = engine.size;
  this.map = args.map;
  if (this.map.length > 1 && this.map.length < 5 && boxcolor && textcolor) {
    if (necessary === true || necessary === undefined) {
      this.type = 'choice';
    } else if (necessary === false) {
      this.type = 'frame';
    }
    this.draw = function draw() {
      var x = size.width * 0.025;
      var y = 0;
      var height = size.height * 0.20;
      var width = size.width * 0.95;
      var radius = size.height * 0.05;
      render.clearRect(0, 0, size.width, size.height);
      if (background) {
        canvas.style.backgroundImage = 'url("./data/images/backgrounds/' + background + '")';
      }
      this.map.forEach(function renderQuestion(i, index) {
        render.fillStyle = boxcolor;
        if (index === 0) {
          y = 0.05 * size.height;
        } else {
          y = index * 0.30 * size.height;
        }
        if (boxtype === 'default') {
          render.fillRect(0, index * 0.25 * size.height, size.width, size.height * 0.25);
        } else if (boxtype === 'rounded') {
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
        render.fillStyle = textcolor;
        render.fillText(i.text, size.width * 0.50, size.height * (y / size.height + 0.10));
      });
    }.bind(this);
  } else {
    throw new Error();
  }
};
'use strict';

/* global Nauper */
Nauper.Character = function Character(args) {
  var result = {};
  args.emotions.forEach(function characterEmotions(emotion) {
    result[emotion] = args.path + '/' + emotion + '.png';
  });
  return result;
};