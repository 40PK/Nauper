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
  this.width = args.width || RESIZE.width;
  // if height not indicated
  this.height = args.height || RESIZE.height;
  // if title not indicated
  this.title = args.title || 'Nauper';
}
/**
 * Edit canvas size
 * @param width  canvas width
 * @param height canvas height
 * @return object class
 */
Engine.prototype.setSize = function setSize(width, height) {
  width = width || RESIZE.width;
  height = height || RESIZE.height;

  this.width = width;
  this.height = height;

  return this;
};
/**
 * Edit page/game title
 * @param title page title
 * @return object class
 */
Engine.prototype.setTitle = function setTitle(title) {
  title = title || 'Nauper';

  this.title = title;
  
  return this;
};
/**
 * Load game dialogs
 * @param map object class 'DialogSystem'
 * @return object class
 */
Engine.prototype.loadDoalog = function loadDialog(map) {
  map = map || new DialogSystem();

  this.dialogMap = map;

  return this;
};
/**
 * Run game loop
 */
Engine.prototype.run = function run() {
  // Set title game
  document.getElementsByTagName('title')[0].innerHTML = this.title;
  // Set canvas width
  CANVAS.width = this.width;
  // Set canvas height
  CANVAS.height = this.height;
};


