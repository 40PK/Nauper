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
var frame = new Frame({
    "characters": [lena.smile], 
    "displayOrder": [0], 
    "textbox": {
        "base": "#fff", 
        "namecolor": "#000", 
        "name": "Лена", 
        "textcolor": "black", 
        "text": "приветики"
    }, 
    "background": "1.jpg"
});
var scene = new Scene({
    "frames": [frame]
});
var engine = new Engine([scene]);
console.log(lena);
console.log(frame);
console.log(scene);
console.log(engine);
// engine.start();
