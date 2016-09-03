/* global canvas size */
function Engine(elements) { // eslint-disable-line no-unused-vars
  var index = 0;
  function nextElement() {
    index = Number(index) + 1;
    if (index === elements.length) {
      canvas.removeEventListener('click', nextElement);
    } else {
      elements[index].draw();
      if (elements[index].type === 'choice') {
        canvas.removeEventListener('click', nextElement);
        canvas.addEventListener('click', choice);
      }
    }
  }
  function choice(event) {
    var y = event.pageY;
    var buttonID = 3;
    if (y < size.height * 0.25) {
      buttonID = 0;
    } else if (y < size.height * 0.50) {
      buttonID = 1;
    } else if (y < size.height * 0.75) {
      buttonID = 2;
    }
    if (buttonID < elements[index].map.length) {
      index = elements[index].map[buttonID].address;
      canvas.removeEventListener('click', choice);
      canvas.addEventListener('click', nextElement);
      elements[index].draw();
    }
  }

  this.start = function start() {
    if (elements[0].type === 'frame') {
      canvas.addEventListener('click', nextElement);
    } else if (elements[1].type === 'choice') {
      canvas.addEventListener('click', choice);
    }
    elements[0].draw();
    return true;
  };
}

/* global render size canvas */
function Frame(args) { // eslint-disable-line no-unused-vars
  function setText() {
    render.fillStyle = text.base;
    render.fillRect(0, size.height * 0.80, size.width, size.height * 0.20);
    render.fillStyle = text.namecolor;
    render.font = '15pt Arial';
    render.fillText(text.name, size.width * 0.10, size.height * 0.82);
    render.fillStyle = text.textcolor;
    render.fillText(text.text, size.width * 0.10, size.height * 0.85);
  }

  if (args.characters.length !== 0 && args.displayOrder.length !== 0 && args.textbox && args.background) {
    var characters = args.characters;
    var displayOrder = args.displayOrder;
    var text = args.textbox;

    this.type = 'frame';
    this.draw = function draw() {
      render.clearRect(0, 0, size.width, size.height);
      canvas.style.backgroundImage = 'url(./data/images/backgrounds/' + args.background + ')';
      canvas.style.backgroundSize = 'cover';
      displayOrder.forEach(function orderCreator(i, index) {
        if (i !== false || i === 0) {
          var img = new Image();
          img.onload = function onload() {
            var ratio = size.height * 1.20 / img.height;
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
}

function Character(args) { // eslint-disable-line no-unused-vars
  if (args.path && args.emotions.length !== 0) {
    var result = {};
    args.emotions.forEach(function characterEmotions(emotion) {
      result[emotion] = args.path + '/' + emotion + '.png';
    });
    return result;
  }
  throw new Error();
}

/* global render size */
function Question(args) { // eslint-disable-line no-unused-vars
  if (args.map.length !== 0 && args.map.length !== 1 && args.map.length < 5 && args.background && args.boxcolor && args.textcolor) {
    this.map = args.map;
    var background = args.background;
    var boxcolor = args.boxcolor;
    this.type = 'choice';
    var textcolor = args.textcolor;
    this.draw = function draw() {
      render.fillStyle = background;
      render.fillRect(0, 0, size.width, size.height);
      this.map.forEach(function renderQuestion(i, index) {
        render.fillStyle = boxcolor;
        render.fillRect(0, index * 0.25 * size.height, size.width, size.height * 0.25);
        render.fillStyle = textcolor;
        render.fillText(i.text, size.width * 0.50, size.height * (index * 0.25 + 0.125));
      });
    };
  } else {
    throw new Error();
  }
}
