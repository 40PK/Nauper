// Init
var doc = document.documentElement;
var canvaselems = document.getElementsByTagName("canvas");
// creating app
var engine = new Nauper.Engine({
  canvas: canvaselems[0],
  offscreen: canvaselems[1],
  font: "15pt Arial",
  size: {
      width: doc.clientWidth,
      height: doc.clientHeight
  }
}, []);

var lena = new Nauper.Character({
	"path": "./data/images/characters/lena", 
	"emotions": ["smile"]
});
var yulya = new Nauper.Character({
    "path": "./data/images/characters/yulya",
    "emotions": ["smile"]
});

var frameOne = new Nauper.Frame(engine, {
	"characters": [lena.smile, yulya.smile], 
	"displayOrder": [0, 1], 
	"textbox": {
        "edges": "rounded",
		"base": "#fff", 
		"namecolor": "#000", 
		"name": "Lena", 
		"textcolor": "black", 
		"text": "It's a start frame"
	}, 
	"background": "1.jpg"
});
var frameTwo = new Nauper.Frame(engine, {
    "characters": [lena.smile, yulya.smile],
    "displayOrder": [false, false, 1, 0],
    "textbox": {
        "base": "#fff",
        "edges": "default",
        "namecolor": "#000",
        "name": "Julia",
        "textcolor": "black",
        "text": "It's a frame with both text and characters"
    }
});
var frameThree = new Nauper.Frame(engine, {
    "textbox": {
        "base": "#fff",
        "edges": "rounded",
        "namecolor": "#000",
        "name": "arseniypetrikor",
        "textcolor": "#000",
        "text": "This is a text without characters"
    }
});
var frameFour = new Nauper.Frame(engine, {
    "characters": [lena.smile, yulya.smile],
    "displayOrder": [0, false, false, 1]
});

var questionOne = new Nauper.Question(engine, {
    "map": [{
        "text": "To start",
        "address": "0"
    },
    {
        "text": "To text and characters",
        "address": "1"
    },
    {
        "text": "To only text frame",
        "address": "2"
    },
    {
        "text": "To only characters frame",
        "address": "3"
    }],
    "textbox": {
        "type": "default",
        "inactive": {
            "background": "#fff",
            "text": "#000"
        },
        "active": {
            "background": "#000",
            "text": "#fff"
        }
    }
});

engine.addScene([frameOne, questionOne]);
engine.addScene([frameTwo]);
engine.addScene([frameThree]);
engine.addScene([frameFour]);

engine.start();
