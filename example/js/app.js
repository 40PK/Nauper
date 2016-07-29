// Hero
var hero = new HeroSystem();
hero.setName('Nauper');
// Heroes list
var heroes = new HeroesSystem();
heroes.add(hero);

// First scene
var firstScene = new DialogSystem();
firstScene.setText('Hello world 1');
firstScene.setAuthor(-1);
firstScene.setBackground('http://localhost:8000/data/backgrounds/2.jpeg');
// Two scene
var twoScene = new DialogSystem();
twoScene.setText('Hello world 2');
twoScene.setAuthor(-1);
twoScene.setBackground('http://localhost:8000/data/backgrounds/3.jpg');
// Three scene
var threeScene = new DialogSystem();
threeScene.setText('Hello world 3');
threeScene.setAuthor(0);
threeScene.setBackground('http://localhost:8000/data/backgrounds/4.jpg');
// Add scenes to Dialog
var basicDialog = new DialogsSystem();
basicDialog.add(firstScene);
basicDialog.add(twoScene);
basicDialog.add(threeScene);

// Create Canvas
var engine = new Engine({
  title: 'My first game',
  width: 1000,
  height: 600
});
// Set dialog
engine.setDialogs(basicDialog.map);
// Run app
engine.run();