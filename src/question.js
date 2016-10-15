/* global Nauper */
Nauper.Question = function Question(engine, args) {
  let background = args.background;
  let activebox = args.textbox.active;
  let inactivebox = args.textbox.inactive;
  let boxtype = args.textbox.type;
  let necessary = args.necessary;
  let render = engine.render;
  let canvas = engine.canvas;
  let size = engine.size;
  let setBackground = () => {
    if (background) {
      canvas.style.backgroundImage = `url("./data/images/backgrounds/${background}")`;
    }
  };
  let setType = () => {
    if (necessary === true || necessary === undefined) {
      this.type = 'choice';
    } else {
      this.type = 'frame';
    }
  };
  let setText = (index, active, pos) => {
    let x = (size.width * 0.50) - (render.measureText(this.map[index].text).width / 2);
    let y = (size.height * ((pos.y / size.height) + 0.10));
    if (active) {
      render.fillStyle = activebox.text;
    } else if (!active) {
      render.fillStyle = inactivebox.text;
    }
    render.fillText(this.map[index].text, x, y);
  };
  let renderBox = (index, active, pos) => {
    let ev = {
      xwidth: pos.x + pos.width,
      yheight: pos.y + pos.height
    };
    if (active) {
      render.fillStyle = activebox.background;
    } else if (!active) {
      render.fillStyle = inactivebox.background;
    }

    if (boxtype === 'default') {
      render.fillRect(pos.x, pos.y, pos.width, pos.height);
    } else if (boxtype === 'rounded') {
      render.beginPath();
      render.moveTo(pos.x, pos.y + pos.radius);
      render.lineTo(pos.x, ev.yheight - pos.radius);
      render.quadraticCurveTo(pos.x, ev.yheight, pos.x + pos.radius, ev.yheight);
      render.lineTo(ev.xwidth - pos.radius, ev.yheight);
      render.quadraticCurveTo(ev.xwidth, ev.yheight, ev.xwidth, ev.yheight - pos.radius);
      render.lineTo(ev.xwidth, pos.y + pos.radius);
      render.quadraticCurveTo(ev.xwidth, pos.y, ev.xwidth - pos.radius, pos.y);
      render.lineTo(pos.x + pos.radius, pos.y);
      render.quadraticCurveTo(pos.x, pos.y, pos.x, pos.y + pos.radius);
      render.fill();
    }
    setText(index, active, pos);
  };
  this.map = args.map;
  if (this.map.length > 1 && this.map.length < 5) {
    setType();
    this.draw = function draw() {
      let x = size.width * 0.025;
      let y = 0;
      let height = size.height * 0.20;
      let width = size.width * 0.95;
      let radius = size.height * 0.05;
      render.clearRect(0, 0, size.width, size.height);
      setBackground();
      this.map.forEach(function renderQuestion(i, index) {
        y = ((index * 0.25) + 0.025) * size.height;
        renderBox(index, false, { x, y, height, width, radius });
      });
    }.bind(this);
  } else {
    engine.nextElement();
  }
};
