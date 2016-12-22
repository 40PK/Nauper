/* global Nauper */
Nauper.UI = function UI(engine) {
  this.engine = engine;

  this.hideTextBox = function hideTextBox() {
    this.engine.sayBox.style.display = 'none';
  }.bind(this);

  this.showTextBox = function showTextBox() {
    this.engine.sayBox.style.display = 'block';
  }.bind(this);
};

Nauper.UI.prototype.drawQuestion = function drawQuestion(questionMap) {
  questionMap.forEach((i, index) => {
    let choice = document.createElement('div');
    let choiceText = document.createElement('p');
    choiceText.classList.add('inactiveQuestionText');
    choiceText.innerHTML = i.text;
    choice.classList.add('inactiveQuestionBox');
    choice.appendChild(choiceText);
    choice.style.top = String(25 * index) + '%';
    document.body.appendChild(choice);

    choice.addEventListener('mouseover', () => {
      choice.classList.remove('inactiveQuestionBox');
      choice.classList.add('activeQuestionBox');
      choiceText.classList.remove('inactiveQuestionText');
      choiceText.classList.add('activeQuestionText');
    });
    choice.addEventListener('mouseout', () => {
      choice.classList.remove('activeQuestionBox');
      choice.classList.add('inactiveQuestionBox');
      choiceText.classList.remove('activeQuestionText');
      choiceText.classList.add('inactiveQuestionText');
    });
    choice.addEventListener('click', () => {
      this.engine.redirect(i.address);
    });
  });
  this.hideCharacters();
};

Nauper.UI.prototype.clearQuestion = function clearQuestion() {
  let questions = document.querySelectorAll('.inactiveQuestionBox, .activeQuestionBox');
  questions.forEach((i) => {
    i.remove();
  });
};

Nauper.UI.prototype.hideCharacters = function hideCharacters() {
  let characters = document.querySelectorAll('.character');
  for (let i = 0; i < characters.length; i += 1) {
    characters[i].style.display = 'none';
  }
};

Nauper.UI.prototype.setBackground = function setBackground(bg) {
  document.body.style.backgroundImage = 'url("' + bg + '")';
};

Nauper.UI.prototype.fade = function fade(color = '#000', func = 'ease', time = 2000) {
  let html = document.getElementsByTagName('html')[0];
  html.style.transitionDuration = String(time) + 'ms';
  html.style.transitionTimingFunction = func;
  html.style.backgroundColor = color;
  html.style.opacity = '0';
  setTimeout(() => {
    this.engine.click();
    html.style.opacity = '1';
  }, time);
};
