// Массив русских букв
const letters = [
  'А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я'
];

let score = 0;
let currentLetter = '';
let falling = false;
let fallTimeout = null;
let fallStart = null;
let fallDuration = 10000; // 10 секунд
let letterElem = null;

const scoreElem = document.getElementById('score');
const letterArea = document.getElementById('letter-area');
const mobileInput = document.getElementById('mobile-input');

// Звуки (добавь свои файлы в папку assets)
const successSound = new Audio('assets/success.mp3');
const errorSound = new Audio('assets/error.mp3');

function startGame() {
  score = 0;
  updateScore();
  nextLetter();
}

function updateScore() {
  scoreElem.textContent = `Очки: ${score}`;
}

function nextLetter() {
  if (letterElem) letterElem.remove();
  currentLetter = letters[Math.floor(Math.random() * letters.length)];
  letterElem = document.createElement('div');
  letterElem.className = 'falling-letter';
  letterElem.textContent = currentLetter;
  letterArea.appendChild(letterElem);
  animateLetter();
}

function animateLetter() {
  letterElem.style.top = '0px';
  fallStart = Date.now();
  falling = true;
  requestAnimationFrame(fallStep);
}

function fallStep() {
  if (!falling) return;
  const elapsed = Date.now() - fallStart;
  const areaHeight = letterArea.clientHeight - letterElem.clientHeight;
  const progress = Math.min(elapsed / fallDuration, 1);
  letterElem.style.top = `${progress * areaHeight}px`;
  if (progress < 1) {
    requestAnimationFrame(fallStep);
  } else {
    falling = false;
    setTimeout(nextLetter, 500); // небольшая пауза
  }
}

function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function focusMobileInput() {
  if (isMobile() && mobileInput) {
    mobileInput.style.display = 'block';
    mobileInput.focus();
    // Очищаем поле после каждого ввода
    mobileInput.value = '';
  }
}

window.addEventListener('keydown', (e) => {
  if (!falling) return;
  const key = e.key.toUpperCase();
  if (key === currentLetter) {
    score += 10;
    updateScore();
    successSound.currentTime = 0;
    successSound.play();
    falling = false;
    letterElem.style.color = '#00bb00';
    setTimeout(nextLetter, 500);
  } else if (letters.includes(key)) {
    errorSound.currentTime = 0;
    errorSound.play();
    letterElem.style.color = '#ff3333';
    setTimeout(() => {
      if (falling) letterElem.style.color = '#0077ff';
    }, 200);
  }
});

// Для мобильных: обработка ввода с input
if (mobileInput) {
  mobileInput.addEventListener('input', (e) => {
    if (!falling) return;
    const value = e.target.value.toUpperCase();
    if (!value) return;
    const key = value[0];
    if (key === currentLetter) {
      score += 10;
      updateScore();
      successSound.currentTime = 0;
      successSound.play();
      falling = false;
      letterElem.style.color = '#00bb00';
      setTimeout(nextLetter, 500);
    } else if (letters.includes(key)) {
      errorSound.currentTime = 0;
      errorSound.play();
      letterElem.style.color = '#ff3333';
      setTimeout(() => {
        if (falling) letterElem.style.color = '#0077ff';
      }, 200);
    }
    mobileInput.value = '';
  });
}

// Запуск игры
window.onload = () => {
  startGame();
  focusMobileInput();
};

// Если пользователь тапает по экрану — фокусируем input снова
if (isMobile() && mobileInput) {
  document.body.addEventListener('touchstart', () => {
    setTimeout(focusMobileInput, 100);
  });
} 