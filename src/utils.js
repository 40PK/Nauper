let wrapText = (engine, text, style, maxwidth) => { //eslint-disable-line
  let textElement = document.createElement('p');
  let words = text.split(' ');
  let drawingText = '';
  let height = 0;
  let width = 0;
  let result = [];
  textElement.style.font = style;
  textElement.style.position = 'relative';
  textElement.style.zIndex = '-1';
  textElement.innerHTML = 'Test';
  document.body.appendChild(textElement);
  height = textElement.offsetHeight;
  document.body.removeChild(textElement);

  words.forEach((i, index) => {
    if (drawingText === '') {
      width = engine.render.measureText(i).width;
    } else {
      width = engine.render.measureText(`${drawingText} ${i}`).width;
    }

    if (width > maxwidth) {
      result.push(drawingText);
      drawingText = i;
    } else if (width === maxwidth) {
      result.push(`${drawingText} ${i}`);
      drawingText = '';
    } else if (width < maxwidth) {
      if (drawingText) {
        drawingText = `${drawingText} ${i}`;
      } else {
        drawingText = i;
      }
      if (index + 1 === words.length) {
        result.push(drawingText);
      }
    }
  });

  return { result, height };
};

let getTextOffset = (engine, text) => { //eslint-disable-line
  let textWidth = engine.render.measureText(text).width;
  let halfScreen = engine.size.width * 0.50;
  let halfText = textWidth * 0.50;
  let result = halfScreen - halfText;
  return result;
};

let putDefaults = (defaults, given) => { //eslint-disable-line
  let keys = Object.getOwnPropertyNames(defaults);
  let result = {};
  keys.forEach((key) => {
    if (given[key] === undefined) {
      result[key] = defaults[key];
    } else if (given[key] !== undefined) {
      result[key] = given[key];
    }
  });
  return result;
};
