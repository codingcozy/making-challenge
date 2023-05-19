const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img = new Image();
img.src = "./assets/flappy_bird_sprite.png";

//setting
let gamePlaying = false;
const gravity = 0.2;
const speed = 3;
const size = [51, 36];
const jump = -7;
const cTench = canvas.width / 10;

let index = 0,
  bestScore = 0,
  flight,
  flyHeight,
  currentScore,
  pipe;

//pipe setting
const pipeWidth = 78;
const pipeGap = 270;
const pipeLoc = () => Math.random() * (canvas.height - (pipeGap + pipeWidth) - pipeWidth) + pipeWidth;

const setup = () => {
  currentScore = 0;
  flight = jump;

  flyHeight = canvas.height / 2 - size[1] / 2;

  //setting three pipes
  pipes = Array(3)
    .fill()
    .map((a, i) => [canvas.width + i * (pipeGap + pipeWidth), pipeLoc()]);
};

const render = () => {
  index++;

  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -((index * (speed / 2)) % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height, -(index * (speed / 2)) % canvas.width, 0, canvas.width, canvas.height);

  //pipe
  if (gamePlaying) {
    pipes.map((pipe) => {
      pipe[0] -= speed;

      // top pipe
      ctx.drawImage(img, 432, 588 - pipe[1], pipeWidth, pipe[1], pipe[0], 0, pipeWidth, pipe[1]);
      // bottom pipe
      ctx.drawImage(img, 432 + pipeWidth, 108, pipeWidth, canvas.height - pipe[1] + pipeGap, pipe[0], pipe[1] + pipeGap, pipeWidth, canvas.height - pipe[1] + pipeGap);

      // give 1 point
      if (pipe[0] <= -pipeWidth) {
        currentScore++;

        // check
        bestScore = Math.max(bestScore, currentScore);

        //remove and create pipe
        pipes = [...pipes.slice(1), [pipes[pipes.length - 1][0] + pipeGap + pipeWidth, pipeLoc()]];
      }

      if ([pipe[0] <= cTench + size[0], pipe[0] + pipeWidth >= cTench, pipe[1] > flyHeight || pipe[1] + pipeGap < flyHeight + size[1]].every((elem) => elem)) {
        gamePlaying = false;
        setup();
      }
    });
  }

  //draw bird
  if (gamePlaying) {
    ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, cTench, flyHeight, ...size);
    flight += gravity;
    flyHeight = Math.min(flyHeight + flight, canvas.height - size[1]);
  } else {
    ctx.drawImage(img, 432, Math.floor((index % 9) / 3) * size[1], ...size, canvas.width / 2 - size[0] / 2, flyHeight, ...size);
    flyHeight = canvas.height / 2 - size[1] / 2;

    // text
    ctx.fillText(`Best Score : ${bestScore}`, 85, 245);
    ctx.fillText("Click to play", 90, 535);
    ctx.font = "bold 30px courier";
  }

  document.getElementById("bestScore").innerHTML = `Best : ${bestScore}`;
  document.getElementById("currentScore").innerHTML = `Current : ${currentScore}`;

  window.requestAnimationFrame(render);
};

setup();

img.onload = render;

document.addEventListener("click", () => (gamePlaying = true));

window.onclick = () => (flight = jump);
