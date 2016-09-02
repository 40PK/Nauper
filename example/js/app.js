// create new yulya emotion
var yulyaSmile = new EmotionSystem();
yulyaSmile.setImage('data/heroes/yulya-smile.png');

// create new lena emotion
var lenaSmile = new EmotionSystem();
lenaSmile.setImage('data/heroes/lena-smile.png');

// create new yulya emotion system
var yulyaEmotions = new EmotionsSystem();
yulyaEmotions.add("smile", yulyaSmile);

// create new lena emotion system
var lenaEmotions = new EmotionsSystem();
lenaEmotions.add("smile", lenaSmile);

// Hero Yulya
var yulya = new HeroSystem();
yulya.setName('Юля');
yulya.setSize(320, 600)
yulya.setPosition(100,100);
yulya.setEmotions(yulyaEmotions);
// Hero Lena
var lena = new HeroSystem();
lena.setName('Лена');
lena.setSize(300, 600)
lena.setPosition(400,100);
lena.setEmotions(lenaEmotions);
// Heroes list
var heroes = new HeroesSystem();
heroes.add(yulya);
heroes.add(lena);

// First scene
var firstScene = new DialogSystem();
firstScene.setText('Семён, мы ведь не оставим мои запасы на зиму здесь?');
firstScene.setAuthor(0);
firstScene.setHeroes([
  '0:smile'
]);
firstScene.setBackground('data/backgrounds/4.jpg');
// Two scene
var twoScene = new DialogSystem();
twoScene.setText('Семён, ну что пошли?');
twoScene.setAuthor(1);
twoScene.setHeroes([
  '1:smile'
]);
twoScene.setBackground('data/backgrounds/3.jpg');
// Three scene
var threeScene = new DialogSystem();
// hide text and author
//threeScene.map.type = ''; 
threeScene.setText('И вот я возвращаюсь, надеюсь я сюда больше никогда не попаду.');
threeScene.setAuthor(-1);
threeScene.setBackground('data/backgrounds/2.jpg');
// Add scenes to Dialog
var basicDialog = new DialogsSystem();
basicDialog.add(firstScene);
basicDialog.add(twoScene);
basicDialog.add(threeScene);

// Create Canvas
var engine = new Engine({
  title: 'Everlasting summer',
  width: 800,
  height: 600
});
// Set dialog
engine.setDialogs(basicDialog.map);
// Run app
engine.run();