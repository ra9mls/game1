// Основная логика игры для автотестов

const letters = [
  'А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'
];

function getRandomLetter() {
  return letters[Math.floor(Math.random() * letters.length)];
}

class GameLogic {
  constructor() {
    this.score = 0;
    this.currentLetter = '';
    this.letters = letters;
  }

  start() {
    this.score = 0;
    this.nextLetter();
  }

  nextLetter() {
    this.currentLetter = getRandomLetter();
    return this.currentLetter;
  }

  handleKey(key) {
    const upperKey = key.toUpperCase();
    if (upperKey === this.currentLetter) {
      this.score += 10;
      return { correct: true, score: this.score };
    } else if (this.letters.includes(upperKey)) {
      return { correct: false, score: this.score };
    }
    return { correct: null, score: this.score }; // не буква
  }
}

module.exports = { GameLogic, getRandomLetter, letters }; 