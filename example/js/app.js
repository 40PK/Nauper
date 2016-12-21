let engine = new Nauper.Engine();

let lena = new Nauper.Character(engine, {
  smile: './data/lena/smile.png'
}, 'Лена', 'lena', '#ff00ff', 'center');

let yulya = new Nauper.Character(engine, {
  smile: './data/yulya/smile.png'
}, 'Юля', 'yulya', '#800000', '0');

let demoSceneOne = [{
  parent: engine.UI,
  func: 'setBackground',
  arguments: ['./data/bg/1.jpg']
}, {
  parent: lena,
  func: 'draw',
  arguments: ['smile']
}, {
  parent: lena,
  func: 'say',
  arguments: ['hello']
}, {
  parent: engine.UI,
  func: 'drawQuestion',
  arguments: [[{
    address: 0,
    text: 'В начало'
  }, {
    address: 1,
    text: 'Далее'
  }]]
}];

let demoSceneTwo = [{
  parent: engine.UI,
  func: 'fade',
  arguments: []
}, {
  parent: yulya,
  func: 'draw',
  arguments: ['smile']
}, {
  parent: yulya,
  func: 'say',
  arguments: ['Good evening, isn\'t it?']
}];

engine.addLabel(demoSceneOne);
engine.addLabel(demoSceneTwo);
engine.start();
