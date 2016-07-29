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

