var Nauper = { // eslint-disable-line
  version: '0.1'
};

/* global Nauper */
Nauper.Engine = function Engine(configs, elements) {
  this.canvas = configs.canvas;
  this.render = this.canvas.getContext('2d');
  this.size = configs.size;
  this.canvas.width = this.size.width;
  this.canvas.height = this.size.height;

  this.elements = elements;
  this.index = 0;
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
  if (buttonID < this.elements[this.index].map.length) {
    this.index = this.elements[this.index].map[buttonID].address;
    this.clickType = 'nextElement';
    this.elements[this.index].draw.call(null, this);
  }
};

Nauper.Engine.prototype.nextElement = function nextElement() {
  this.index = Number(this.index) + 1;
  if (this.index === this.elements.length) {
    // this.canvas.removeEventListener('click', this.nextElement);
    this.clickType = null;
  } else {
    this.elements[this.index].draw.call(null, this);
    this.clickType = this.elements[this.index].type === 'choice' ? 'choice' : this.clickType;
  }
};

Nauper.Engine.prototype.start = function start() {
  if (this.elements[0].type === 'frame') {
    this.clickType = 'nextElement';
  } else if (this.elements[1].type === 'choice') {
    this.clickType = 'choice';
  }
  this.elements[0].draw.call(null, this);
  return true;
};

/* global Nauper */
Nauper.Frame = function Frame(args) {
  var characters = args.characters;
  var displayOrder = args.displayOrder;
  var text = args.textbox;
  if (characters.length !== 0 && displayOrder.length !== 0 && text && args.background) {
    this.type = 'frame';
    this.draw = function draw(engine) {
      var render = engine.render;
      var size = engine.size;
      var canvas = engine.canvas;

      function setText() {
        render.fillStyle = text.base;
        if (text.edges == "default") {
          render.fillRect(0, size.height * 0.80, size.width, size.height * 0.20);
        } else if (text.edges == "rounded") {
          var x = size.width * 0.05;
          var y = size.height * 0.80;
          var height = size.height * 0.18;
          var width = size.width * 0.90;
          var radius = size.height * 0.05;
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
        render.fillText(text.name, size.width * 0.10, size.height * 0.82);
        render.fillStyle = text.textcolor;
        render.fillText(text.text, size.width * 0.10, size.height * 0.85);
      }

      render.clearRect(0, 0, size.width, size.height);
      canvas.style.backgroundImage = 'url(./data/images/backgrounds/' + args.background + ')';
      canvas.style.backgroundSize = 'cover';
      displayOrder.forEach(function orderCreator(i, index) {
        var img;
        if (i !== false || i === 0) {
          img = new Image();
          img.onload = function onload() {
            var ratio = (size.height * 1.20) / img.height;
            var offsetY = size.height * 0.10;
            var offsetX;
            if (index === 0) {
              offsetX = 0;
            } else if (index === 1) {
              offsetX = size.width * 0.225;
            } else if (index === 2) {
              offsetX = size.width * 0.450;
            } else if (index === 3) {
              offsetX = size.width * 0.675;
            }
            render.drawImage(img, offsetX, offsetY, img.width * ratio, img.height * ratio);
            setText();
          };
          img.src = characters[i];
        }
      });
    };
  } else {
    throw new Error();
  }
};

/* global Nauper */
Nauper.Character = function Character(args) {
  var result = {};
  if (args.path && args.emotions.length !== 0) {
    args.emotions.forEach(function characterEmotions(emotion) {
      result[emotion] = args.path + '/' + emotion + '.png';
    });
    return result;
  }
  throw new Error();
};

/* global Nauper */
Nauper.Question = function Question(args) {
  var background = args.background;
  var boxcolor = args.boxcolor;
  var textcolor = args.textcolor;
  this.map = args.map;
  if (this.map.length > 1 && this.map.length < 5 && background && boxcolor && textcolor) {
    this.type = 'choice';
    this.draw = function draw(engine) {
      var render = engine.render;
      var size = engine.size;
      render.fillStyle = background;
      render.fillRect(0, 0, size.width, size.height);
      this.map.forEach(function renderQuestion(i, index) {
        render.fillStyle = boxcolor;
        render.fillRect(0, index * 0.25 * size.height, size.width, size.height * 0.25);
        render.fillStyle = textcolor;
        render.fillText(i.text, size.width * 0.50, size.height * ((index * 0.25) + 0.125));
      });
    }.bind(this);
  } else {
    throw new Error();
  }
};
