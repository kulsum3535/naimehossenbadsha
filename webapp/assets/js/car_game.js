const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 100,
  width: 50,
  height: 100,
  speed: 5,
  image: new Image()
};

player.image.src = "assets/images/car_game_image/player_car.png";

const opponentImages = [
  "assets/images/car_game_image/opponent1.png",
  "assets/images/car_game_image/opponent2.png",
  "assets/images/car_game_image/opponent3.png"
];

const bgImage = new Image();
bgImage.src = "assets/images/car_game_image/background.png";

let opponents = [];
let score = 0;
let tokens = 0;

function drawPlayer() {
  ctx.drawImage(player.image, player.x, player.y, player.width, player.height);
}

function drawBackground() {
  ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
}

function createOpponent() {
  const img = new Image();
  img.src = opponentImages[Math.floor(Math.random() * opponentImages.length)];

  opponents.push({
    x: Math.random() * (canvas.width - 50),
    y: -100,
    width: 50,
    height: 100,
    speed: 3,
    image: img
  });
}

function drawOpponents() {
  opponents.forEach(op => {
    ctx.drawImage(op.image, op.x, op.y, op.width, op.height);
  });
}

function moveOpponents() {
  opponents.forEach(op => {
    op.y += op.speed;
  });
  opponents = opponents.filter(op => op.y < canvas.height + 100);
}

function detectCollision() {
  for (let op of opponents) {
    if (player.x < op.x + op.width &&
        player.x + player.width > op.x &&
        player.y < op.y + op.height &&
        player.y + player.height > op.y) {
      gameOver();
    }
  }
}

function gameOver() {
  document.getElementById('gameOver').style.display = 'block';
  document.getElementById('scoreEnd').innerText = score;
  document.getElementById('tokenEnd').innerText = tokens;
  updateToken(tokens);
  cancelAnimationFrame(animation);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  drawPlayer();
  drawOpponents();
  moveOpponents();
  detectCollision();

  score++;
  if (score % 200 === 0) {
    createOpponent();
    tokens++;
  }

  document.getElementById('score').innerText = score;
  document.getElementById('token').innerText = tokens;

  animation = requestAnimationFrame(update);
}

createOpponent();
let animation = requestAnimationFrame(update);

document.getElementById('left').onclick = () => { player.x -= player.speed; };
document.getElementById('right').onclick = () => { player.x += player.speed; };

function restartGame() {
  window.location.reload();
}
