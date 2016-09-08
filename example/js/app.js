// Init
var doc = document.documentElement;
// creating app
var lena = new Nauper.Character({
	"path": "./data/images/characters/lena", 
	"emotions": ["smile"]
});
var yulya = new Nauper.Character({
    "path": "./data/images/characters/yulya",
    "emotions": ["smile"]
});
var frameOne = new Nauper.Frame({
	"characters": [lena.smile, yulya.smile], 
	"displayOrder": [0, 1], 
	"textbox": {
        "edges": "rounded",
		"base": "#fff", 
		"namecolor": "#000", 
		"name": "Лена", 
		"textcolor": "black", 
		"text": "приветики"
	}, 
	"background": "1.jpg"
});
var frameTwo = new Nauper.Frame({
    "characters": [lena.smile, yulya.smile],
    "displayOrder": [false, false, 1, 0],
    "textbox": {
        "base": "#fff",
        "edges": "rounded",
        "namecolor": "#000",
        "name": "Юля",
        "textcolor": "black",
        "text": "я некочан"
    }
});
var questionOne = new Nauper.Question({
    "boxcolor": "#fff",
    "textcolor": "#000",
    "boxtype": "rounded",
    "map": [{
        "text": "в начало",
        "address": "0"
    },
    {
        "text": "вперед",
        "address": "1"
    }
    ]
});
var engine = new Nauper.Engine({
  canvas: document.getElementsByTagName("canvas")[0],
  size: {
	  width: doc.clientWidth,
	  height: doc.clientHeight
  }
}, [
  [
    frameOne, 
    questionOne
  ], 
  [
    frameTwo
  ]]);
engine.start();