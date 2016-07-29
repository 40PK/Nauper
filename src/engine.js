/**
 * Basic game class
 * 
 * @param args         basic settings for game loop
 * @param args.width   set width canvas
 * @param args.height  set height canvas
 * @param args.title   set title page/game
 * 
 * @since alpha 0.1 
 */
function Engine(args) {
  // if args is empty
  args = args || {};
  // if width not indicated
  RESIZE.width = args.width || RESIZE.width;
  // if height not indicated
  RESIZE.height = args.height || RESIZE.height;
  // if title not indicated
  TITLE = args.title || TITLE;
}
/**
 * Edit canvas size
 * @param width  canvas width
 * @param height canvas height
 * @return object class
 */
Engine.prototype.setSize = function setSize(width, height) {
  RESIZE.width = width;
  RESIZE.height = height;
  return this;
};
/**
 * Edit page/game title
 * @param title page title
 * @return object class
 */
Engine.prototype.setTitle = function setTitle(title) {
  TITLE = title;
  return this;
};
/**
 * Set dialog
 * @param map dialogs map
 * @since alpha 0.1 
 */
Engine.prototype.setDialogs = function setDialogs(map) {
  DIALOGS = map;
}
/**
 * Render dialog
 * @since alpha 0.1 
 */
Engine.prototype.nextScene = function nextScene() {
  // clear canvas
  RENDER.clearRect(0, 0, this.width, this.height);
  if(SCENE > DIALOGS.length-1) SCENE = -1;
  if(SCENE < 0) {
    // render menu cover
    RENDER.drawImage(COVER, 0, 0, this.width, this.height);
    // set title font
    RENDER.font = '23px verdana';
    // set title color
    RENDER.fillStyle = 'black';
    // draw title
    RENDER.fillText(TITLE, 50, 100);
  } else {
    // get scene data
    var data = DIALOGS[SCENE];
    // draw cover
    RENDER.drawImage(data.background, 0, 0, this.width, this.height);
    // dialog bg
    RENDER.fillStyle = 'white';
    RENDER.fillRect(30, this.height-150, this.width-60, 140);
    // set font
    RENDER.font = '16px verdana';
    // set text color
    RENDER.fillStyle = 'black';
    // if is hero
    if(data.author >= 0) {
      // draw author name
      RENDER.fillText(HEROES[data.author].name + ':', 50, this.height-125);
      // draw text
      RENDER.fillText(data.text, 50, this.height-100);
    } else {
      // draw text
      RENDER.fillText(data.text, 50, this.height-125);
    }
    
  }
  // goto next scene
  SCENE += 1;
};
/**
 * Run game loop
 */
Engine.prototype.run = function run() {
  // Set title game
  document.getElementsByTagName('title')[0].innerHTML = TITLE;
  // Set canvas width
  CANVAS.width = RESIZE.width;
  // Set canvas height
  CANVAS.height = RESIZE.height;
  // start
  RENDER.font = '18px verdana'
  RENDER.fillText('Nauper', 50, RESIZE.height-50);
  // Add event
  CANVAS.addEventListener('click', this.nextScene);
};

