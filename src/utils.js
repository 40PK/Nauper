let getTextHeight = (style) => { //eslint-disable-line
  let textElement = document.createElement('p');
  let result = 0;
  textElement.style.font = style;
  textElement.style.position = 'relative';
  textElement.style.zIndex = '-1';
  textElement.innerHTML = 'Test';
  document.body.appendChild(textElement);
  result = textElement.offsetHeight;
  document.body.removeChild(textElement);
  return result;
};

let wrapText = (render, text, style, maxwidth) => { //eslint-disable-line
  let words = text.split(' ');
  let drawingText = '';
  let height = getTextHeight(style);
  let width = 0;
  let result = [];

  words.forEach((i, index) => {
    if (drawingText === '') {
      width = render.measureText(i).width;
    } else {
      width = render.measureText(`${drawingText} ${i}`).width;
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

let getTextOffset = (render, size, text) => { //eslint-disable-line
  let textWidth = render.measureText(text).width;
  let halfScreen = size.width * 0.50;
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

let copyObject = (object) => { //eslint-disable-line
  let result = {};
  result = putDefaults(object, {});
  return result;
};

let getWindowSize = () => { //eslint-disable-line
  let result = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  };
  result.coff = result.width / result.height;
  return result;
};

let convertHexIntoRGBA = (hexstring, opacity) => { //eslint-disable-line
  let hex = hexstring.replace('#', '');
  let colors = {};
  if (hex.length === 3) {
    colors.r = parseInt(hex.substring(0, 1), 16);
    colors.g = parseInt(hex.substring(1, 2), 16);
    colors.b = parseInt(hex.substring(2, 3), 16);
  } else if (hex.length === 6) {
    colors.r = parseInt(hex.substring(0, 2), 16);
    colors.g = parseInt(hex.substring(2, 4), 16);
    colors.b = parseInt(hex.substring(4, 6), 16);
  }
  return `rgba(${colors.r}, ${colors.g}, ${colors.b}, ${opacity})`;
};
