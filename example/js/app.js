// Init
var canvas = document.getElementsByTagName("canvas")[0];
var render = canvas.getContext("2d");
var doc = document.documentElement;
canvas.width = doc.clientWidth;
canvas.height = doc.clientHeight;
var size = {
	"width": doc.clientWidth,
	"height": doc.clientHeight
};
// creating app
var lena = new Character({
	"path": "./data/images/characters/lena", 
	"emotions": ["smile"]
});
var yulya = new Character({
    "path": "./data/images/characters/yulya",
    "emotions": ["smile"]
});
var frameOne = new Frame({
	"characters": [lena.smile, yulya.smile], 
	"displayOrder": [0, 1], 
	"textbox": {
		"base": "#fff", 
		"namecolor": "#000", 
		"name": "Лена", 
		"textcolor": "black", 
		"text": "приветики"
	}, 
	"background": "1.jpg"
});
var frameTwo = new Frame({
    "characters": [lena.smile, yulya.smile],
    "displayOrder": [false, false, 1, 0],
    "textbox": {
        "base": "#fff",
        "namecolor": "#000",
        "name": "Юля",
        "textcolor": "black",
        "text": "я некочан"
    },
    "background": "4.jpg"
});
var questionOne = new Question({
    "background": "#fff",
    "boxcolor": "#888",
    "textcolor": "#000",
    "map": [{
        "text": "в начало",
        "address": "0"
    },
    {
        "text": "вперед",
        "address": "2"
    }
    ]
});
var engine = new Engine([frameOne, questionOne, frameTwo]);
engine.start();