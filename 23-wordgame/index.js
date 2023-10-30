const words = [
  "apple",
  "avocado",
  "banana",
  "blackberry",
  "blueberry",
  "cherry",
  "cherry",
  "coconut",
  "grape",
  "kiwi",
  "lemon",
  "lime",
  "mango",
  "melon",
  "orange",
  "papaya",
  "peach",
  "pear",
  "persimmon",
  "pineapple",
  "plum",
  "strawberry",
  "tangerine",
  "tomato",
  "watermelon",
];

const wordContainer = document.getElementById("word-container");
const scoreValue = document.getElementById("score-value");
const userInput = document.getElementById("user-input");
const resultScore = document.getElementById("result-score");
const btnContainer = document.getElementById("btn-container");
const restartButton = document.getElementById("restart_button");
const timeValue = document.getElementById("time-value");

let score = 0;
let gameTimer, timeTimer;
let wordSpeed = 1;
let wordInterval = 2000;
let playTime = 60;
let remainingTime = playTime;

function createWord() {
  const word = document.createElement("div");

  word.classList.add("word");
  word.innerText = words[Math.floor(Math.random() * words.length)];
  word.style.left = Math.random() * (wordContainer.offsetWidth - 200 - word.offsetWidth) + 100 + "px";
  wordContainer.appendChild(word);

  const bottom = wordContainer.offsetHeight - word.offsetHeight - 150;

  const animation = word.animate([{ top: "0px" }, { top: bottom + "px" }], {
    duration: 20000 / wordSpeed,
    easing: "linear",
    fill: "forwards",
  });

  animation.onfinish = function () {
    word.textContent = "";
    word.style.width = "70px";
    word.style.height = "50px";
    word.style.background = 'no-repeat url("./assets/drop.png") 0 0 / cover';

    setTimeout(() => {
      word.remove();
    }, 500);
  };
}

function startGame() {
  remainingTime = playTime;
  score = 0;
  wordSpeed = 1;
  timeValue.innerText = playTime;
  scoreValue.innerText = score;
  userInput.value = "";
  wordContainer.innerHTML = "";
  userInput.disabled = false;
  userInput.focus();
  btnContainer.style.display = "none";

  gameTimer = setInterval(function () {
    createWord();
  }, wordInterval);

  setTimeout(function () {
    endGame();
  }, 60000);

  timeTimer = setInterval(decreaseTime, 1000);
}

function endGame() {
  clearInterval(gameTimer);
  clearInterval(timeTimer);
  wordContainer.innerText = "";
  userInput.disabled = true;
  userInput.blur();
  btnContainer.style.display = "flex";
  resultScore.innerText = `Score : ${score}`;
}

function checkWord() {
  const enteredWord = userInput.value.trim().toLowerCase();
  const wordElements = document.querySelectorAll(".word");

  let isFind = false;

  for (let i = 0; i < wordElements.length; i++) {
    const wordElement = wordElements[i];

    if (wordElement.innerText.toLowerCase() === enteredWord) {
      isFind = true;
      userInput.classList.add("correct");
      setTimeout(() => {
        userInput.classList.remove("correct");
      }, 500);

      // correct pop animation
      wordElement.textContent = "";
      wordElement.style.width = "150px";
      wordElement.style.height = "150px";
      wordElement.style.transform = "translate(-50px , -50px)";
      wordElement.style.background = 'no-repeat url("./assets/pop.gif")  0 0 / cover';

      setTimeout(() => {
        wordElement.remove();
      }, 300);

      score++;
      scoreValue.innerText = score;
      userInput.value = "";
      if (score % 10 === 0) {
        wordSpeed += 1;
        clearInterval(gameTimer);
        wordInterval -= 100;
        createWord();
        gameTimer = setInterval(function () {
          createWord();
        }, wordInterval);
      }
      break;
    }
  }

  if (!isFind) {
    userInput.classList.add("wrong");
    setTimeout(() => {
      userInput.classList.remove("wrong");
    }, 500);
  }
}

userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkWord();
    userInput.value = "";
  }
});

startGame();

function decreaseTime() {
  remainingTime--;

  timeValue.innerText = remainingTime;

  if (remainingTime === 0) {
    endGame();
  }
}

restartButton.addEventListener("click", () => {
  startGame();
});
