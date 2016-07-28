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


