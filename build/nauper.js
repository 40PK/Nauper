// Select canvas
var CANVAS = document.getElementsByTagName('canvas')[0];
// Basic canvas resize
var RESIZE = {
  width: CANVAS.width,
  height: CANVAS.height
};
var RENDER = CANVAS.getContext('2d');


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



/**
 * Basic dialog class
 * @param args basic dialog
 * @since alpha 0.1 
 */
function DialogSystem(args) {
  args = args || [];
  this.dialog = args;
}
/**
 * Add data in dialog
 * 
 * @param data            basic data
 * @param data.text       dialog text
 * @param data.author     dialog author
 * @param data.heroes     dialog heroes
 * @param data.background background scene
 */
DialogSystem.prototype.add = function add(data) {
  data.text = data.text || 'Hello world';
  data.author = data.author || -1;
  data.heroes = data.heroes || [];
  this.dialog.push(data);
  return this;
};
/**
 * Get dialog data
 * @param id dialog id for get data
 * 
 */
DialogSystem.prototype.get = function get(id) {
  id = +id || 0;
  return this.dialog[id];
};
/**
 * Get num dialog length
 * @return int
 */
DialogSystem.prototype.getLength = function getLength() {
  return this.dialog.length - 1;
};


/**
 * Basic hero class
 * @param args basic hero settings
 * @since alpha 0.1 
 */
function HeroSystem(args) {
  // If args is empty
  var args = args || {};

  this.hero = {
    name: args.name || 'Nauper',
    position: {
      x: 0,
      y: 0
    },
    size: {
      x: 1,
      y: 1
    },
    emotion: args.emotion || new EmotionsSystem()
  };
}


/**
 * Basic emotions class
 * @since alpha 0.1 
 */
function EmotionsSystem() {
  this.emotions = {};
}
/**
 * Add new emotions
 * @param name emotion name
 * @param map obj class EmotionSystem
 */
EmotionsSystem.prototype.add = function add(name, map) {
  var map = map || new EmotionSystem();
  this.emotions[name] = map;
  return this;
}
/**
 * Remove emotions
 * @param name emotion name
 */
EmotionsSystem.prototype.remove = function remove(name) {
  delete this.emotions[name];
  return this;
}

/**
 * Basic emotion class
 * @since alpha 0.1 
 */
function EmotionSystem(args) {

}



function SpriteSystem() {
  
}

