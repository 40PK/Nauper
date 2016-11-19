// creating app
var engine = new Nauper.Engine({
  font: "21px Arial"
});

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
        "type": "image",
        "link": "./data/images/boxes/wb.png",
		"background": "#fff", 
		"ncl": "#000", 
		"name": "Lena", 
		"color": "black", 
		"text": "It's a start frame"
	}, 
	"background": "1.jpg",
    "audio": "your_bright_side.mp3",
    "once": true
});
var frameTwo = new Nauper.Frame(engine, {
    "characters": [lena.smile, yulya.smile],
    "displayOrder": [false, false, 1, 0],
    "textbox": {
        "background": "#fff",
        "type": "default",
        "ncl": "#000",
        "name": "Julia",
        "text": "black",
        "text": "It's a frame with both text and characters"
    }
});
var frameThree = new Nauper.Frame(engine, {
    "textbox": {
        "background": "#fff",
        "type": "rounded",
        "ncl": "#000",
        "name": "arseniypetrikor",
        "color": "#000",
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
        "link": "./data/images/boxes/wb.png",
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
