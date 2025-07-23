const { GameLogic, letters } = require('./game');

describe('GameLogic', () => {
  let game;

  beforeEach(() => {
    game = new GameLogic();
    game.start();
  });

  test('score is zero after start', () => {
    expect(game.score).toBe(0);
  });

  test('nextLetter returns a valid letter', () => {
    const letter = game.nextLetter();
    expect(letters).toContain(letter);
  });

  test('score increases by 10 for correct answer', () => {
    game.currentLetter = 'Ж';
    const result = game.handleKey('Ж');
    expect(result.correct).toBe(true);
    expect(result.score).toBe(10);
  });

  test('score does not increase for incorrect answer', () => {
    game.currentLetter = 'А';
    const result = game.handleKey('Б');
    expect(result.correct).toBe(false);
    expect(result.score).toBe(0);
  });

  test('score does not change for non-letter key', () => {
    game.currentLetter = 'А';
    const result = game.handleKey('1');
    expect(result.correct).toBe(null);
    expect(result.score).toBe(0);
  });

  test('multiple correct answers accumulate score', () => {
    game.currentLetter = 'Д';
    game.handleKey('Д');
    game.currentLetter = 'Е';
    game.handleKey('Е');
    expect(game.score).toBe(20);
  });
}); 