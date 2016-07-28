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

