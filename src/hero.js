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

