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

