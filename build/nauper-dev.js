// Select canvas
var CANVAS = document.getElementsByTagName('canvas')[0];
CANVAS.width = CANVAS.width || 800;
CANVAS.height = CANVAS.height || 600;
// Game title
var TITLE = 'Nauper';
// Basic canvas resize
var RESIZE = {
  width: CANVAS.width,
  height: CANVAS.height
};
// 
var RENDER = CANVAS.getContext('2d');
// Game resource
var SCENE = -1;
var DIALOGS = [];
var HEROES = [];
// Game menu background
var COVER = new Image();
COVER.src = "http://localhost:8000/data/backgrounds/1.jpg";


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
    // draw heroes
    if(data.heroes.length > 0) {
      var i;
      for(i = 0; i < data.heroes.length; i++) {
        var heroData = data.heroes[i].split(":");
        heroData[0] = +heroData[0];

        RENDER.drawImage(
          // image
          HEROES[heroData[0]].emotion[heroData[1]],
          // position
          HEROES[heroData[0]].position.x,
          HEROES[heroData[0]].position.y,
          // size
          HEROES[heroData[0]].size.width,
          HEROES[heroData[0]].size.height
        )
        
      }
    }
    if(data.type === 'dialog') {
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
        wrapText(RENDER, data.text, 50, this.height-100, this.width-100, 20);
      } else {
        // draw text
        RENDER.fillText(data.text, 50, this.height-125);
      }
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
  // start scene
  RENDER.font = '18px verdana'
  RENDER.fillText('Nauper Engine', 50, RESIZE.height-50);
  // Add event
  CANVAS.addEventListener('click', this.nextScene);
};


/**
 * Basic dialogs class
 * @param args basic dialogs
 * @since alpha 0.1 
 */
function DialogsSystem(args) {
  args = args || [];
  this.map = args;
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
DialogsSystem.prototype.add = function add(data) {
  this.map.push(data.map);
  return this;
};
/**
 * Get dialog data
 * @param id dialog id for get data
 * 
 */
DialogsSystem.prototype.get = function get(id) {
  id = +id || 0;
  return this.map[id];
};
/**
 * Get num dialog length
 * @return int
 */
DialogsSystem.prototype.getLength = function getLength() {
  return this.map.length - 1;
};

/**
 * Basic dialog class
 * @param args basic dialog
 * @since alpha 0.1 
 */
function DialogSystem(args) {
  args = args || {};
  args.type = args.type || 'dialog';
  args.heroes = args.heroes || [];
  this.map = args;
}
/**
 * Set dialog text
 * @param text dialog text
 * @since alpha 0.1 
 */
DialogSystem.prototype.setText = function setText(text) {
  this.map.text = text;
  return this;
};
/**
 * Set author text
 * @param id author id
 * @since alpha 0.1 
 */
DialogSystem.prototype.setAuthor = function setAuthor(id) {
  this.map.author = id;
  return this;
};
/**
 * Set dialog background
 * @param path path to image
 * @since alpha 0.1 
 */
DialogSystem.prototype.setBackground = function setBackground(path) {
  this.map.background = new Image();
  this.map.background.src = path;
  return this;
};
/**
 * Set heroes dialog list
 * @param map heroes list map
 * @since alpha 0.1 
 */
DialogSystem.prototype.setHeroes = function setHeroes(map) {
  this.map.heroes = map;
  return this;
};
/**
 * Add hero to map
 * @param map hero map
 * @since alpha 0.1 
 */
DialogSystem.prototype.addHero = function addHero(map) {
  this.map.heroes.push(map);
  return this;
};


/**
 * Basic hero class
 * @param args basic hero settings
 * @since alpha 0.2 
 */
function HeroesSystem() { }
/**
 * Add new hero
 * @param hero map hero
 * @since alpha 0.1
 */
HeroesSystem.prototype.add = function add(hero) {
  HEROES.push(hero.map)
};
/**
 * Remove hero 
 * @param id hero id
 * @since alpha 0.1
 */
HeroesSystem.prototype.remove = function remove(id) {
  delete HEROES[id];
};
/**
 * Basic heroes class
 * @param args basic hero settings
 * @since alpha 0.1 
 */
function HeroSystem(args) {
  // If args is empty
  var args = args || {};

  this.map = {
    name: args.name || 'Nauper',
    position: {
      x: 0,
      y: 0
    },
    size: {
      width: 50,
      height: 120
    }
  };
}
/**
 * Set hero name
 * @param name hero name
 * @since alpha 0.1
 */
HeroSystem.prototype.setName = function setName(name) {
  this.map.name = name;
  return this;
};
/**
 * Set hero position in scene
 * @param x, y hero position
 * @since alpha 0.2
 */
HeroSystem.prototype.setPosition = function setPosition(x, y) {
  this.map.position.x = x;
  this.map.position.y = y;
  return this;
};
/**
 * Add new hero
 * @param width, height hero image size
 * @since alpha 0.2
 */
HeroSystem.prototype.setSize = function setSize(width, height) {
  width = width || 50;
  height = height || 120;
  this.map.size.width = width;
  this.map.size.height = height;
  return this;
};
/**
 * Set emotions
 * @param map emotions map
 * @since alpha 0.2
 */
HeroSystem.prototype.setEmotions = function setEmotions(map) {
  this.map.emotion = map.emotions;
  return this;
};
/**
 * Add new emotion
 * @param map emotion map
 * @since alpha 0.2
 */
HeroSystem.prototype.addEmotion = function addEmotion(map) {
  this.map.emotion.push(map.emotion);
  return this;
};
/**
 * Set active emotion
 * @param name emotion name
 * @since alpha 0.2
 */
HeroSystem.prototype.activeEmotion = function activeEmotion(name) {
  this.map.active = name;
  return this;
};


/**
 * Basic emotions class
 * @since alpha 0.2 
 */
function EmotionsSystem() {
  this.emotions = {};
}
/**
 * Add new emotions
 * @param name emotion name
 * @param map obj class EmotionSystem
 * @since alpha 0.2 
 */
EmotionsSystem.prototype.add = function add(name, map) {
  this.emotions[name] = map.emotion;
  return this;
};
/**
 * Remove emotions
 * @param name emotion name
 * @since alpha 0.2 
 */
EmotionsSystem.prototype.remove = function remove(name) {
  delete this.emotions[name];
  return this;
};

/**
 * Basic emotion class
 * @since alpha 0.2 
 */
function EmotionSystem() {
  this.emotion = new Image();
}
/**
 * Set emotion image
 * @param path image path
 * @since alpha 0.2
 */
EmotionSystem.prototype.setImage = function setImage(path) {
  this.emotion.src = path;
  return this;
};


function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}