const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const playerImg = new Image();
playerImg.src = "./assets/player.png";

const missileImg = new Image();
missileImg.src = "./assets/missile.png";

const player = {
  x: canvas.width / 2,
  y: canvas.hidden / 2,
  radius: 13,
};

const missiles = [];
let startTime = Date.now();
let isGameOver = false;

function drawScore() {
  const currentTime = Date.now();
  const timeElapsed = Math.floor((currentTime - startTime) / 1000);

  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillText("Time: " + timeElapsed + "sec", 10, canvas.height - 10);
}

// temporary
// function drawPlayer() {
//   ctx.beginPath();
//   ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
//   ctx.fillStyle = player.color;
//   ctx.fill();
//   ctx.closePath();
// }

// function drawMissiles() {
//   for (let i = 0; i < missiles.length; i++) {
//     const missile = missiles[i];
//     ctx.beginPath();
//     ctx.arc(missile.x, missile.y, missile.radius, 0, Math.PI * 2);
//     ctx.fillStyle = missile.color;
//     ctx.fill();
//     ctx.closePath();
//   }
// }

function createMissile() {
  const side = Math.floor(Math.random() * 4);
  let x, y;
  switch (side) {
    case 0:
      x = Math.random() * canvas.width;
      y = 0;
      break;
    case 1:
      x = Math.random() * canvas.width;
      y = canvas.height;
      break;
    case 2:
      x = 0;
      y = Math.random() * canvas.height;
      break;
    case 3:
      x = canvas.width;
      y = Math.random() * canvas.height;
      break;
    default:
      break;
  }

  const angle = Math.atan2(player.y - y, player.x - x);
  const speed = 1;

  const missile = {
    x,
    y,
    radius: 5,
    color: "red",
    velocityX: Math.cos(angle) * speed,
    velocityY: Math.sin(angle) * speed,
  };
  missiles.push(missile);
}

function moveMissile() {
  for (let i = 0; i < missiles.length; i++) {
    const missile = missiles[i];
    missile.x += missile.velocityX;
    missile.y += missile.velocityY;

    if (missile.x < 0 || missile.x > canvas.width || missile.y < 0 || missile.y > canvas.height) {
      missiles.splice(i, 1);
      i--;
    }
  }
}

function checkCollisions() {
  for (let i = 0; i < missiles.length; i++) {
    const missile = missiles[i];
    const distance = Math.sqrt((player.x - missile.x) ** 2 + (player.y - missile.y) ** 2);
    if (distance < player.radius + missile.radius) {
      isGameOver = true;
      break;
    }
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  if (!isGameOver) {
    clearCanvas();
    drawPlayer();
    drawMissiles();
    drawScore();
    moveMissile();
    checkCollisions();
    requestAnimationFrame(update);
  } else {
    ctx.font = "50px VT323, sans-serif";
    ctx.fillStyle = "white";
    ctx.fillText("Game Over", canvas.width / 2 - 60, canvas.height / 2);
  }
}

function drawPlayer() {
  ctx.drawImage(playerImg, player.x - player.radius, player.y - player.radius, player.radius * 2, player.radius * 2);
}

function drawMissiles() {
  for (let i = 0; i < missiles.length; i++) {
    const missile = missiles[i];
    ctx.drawImage(missileImg, missile.x - missile.radius, missile.y - missile.radius, missile.radius * 2, missile.radius * 2);
  }
}

Promise.all([
  new Promise((resolve) => {
    playerImg.onload = resolve;
  }),
  new Promise((resolve) => {
    missileImg.onload = resolve;
  }),
]).then(() => {
  setInterval(createMissile, 150);
  update();
});

document.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  player.x = Math.min(Math.max(mouseX, player.radius), canvas.width - player.radius);
  player.y = Math.min(Math.max(mouseY, player.radius), canvas.height - player.radius);
});
