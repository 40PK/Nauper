// Init
var doc = document.documentElement;
// creating app
var engine = new Nauper.Engine({
  canvas: document.getElementsByTagName("canvas")[0],
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
        "edges": "default",
		"base": "#fff", 
		"namecolor": "#000", 
		"name": "Лена", 
		"textcolor": "black", 
		"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
	}, 
	"background": "1.jpg"
});
var frameTwo = new Nauper.Frame(engine, {
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

var frameThree = new Nauper.Frame(engine, {
    "textbox": {
        "base": "#fff",
        "edges": "rounded",
        "namecolor": "#000",
        "name": "ГГ",
        "textcolor": "#000",
        "text": "Текст без героев"
    }
});

var questionOne = new Nauper.Question(engine, {
    "map": [{
        "text": "в начало",
        "address": "0"
    },
    {
        "text": "вперед",
        "address": "1"
    },
    {
        "text": "без персонажей",
        "address": "2"
    },
    {
        "text": "снова в начало",
        "address": "0"
    }],
    "textbox": {
        "type": "rounded",
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

engine.start();