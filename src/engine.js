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
