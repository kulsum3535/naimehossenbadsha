const gridSize = 20;
const tileCount = 15;

let snake = [{ x: 7, y: 7 }];
let dx = 0;
let dy = 0;
let fruit = spawnFruit();
let score = 0;
let token = 0;
let gameInterval;
let gameStarted = false;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startGameBtn');
const scoreDisplay = document.getElementById('score');
const tokenDisplay = document.getElementById('token');

const bgImg = new Image();
bgImg.src = 'assets/snake/background.png';

const headImg = new Image();
headImg.src = 'assets/snake/snake_head.png';

const fruitImg = new Image();
fruitImg.src = 'assets/snake/fruit.png';

startBtn.addEventListener('click', () => {
  if (!gameStarted) {
    dx = 1;
    dy = 0;
    gameStarted = true;
    gameInterval = setInterval(gameLoop, 150);
    startBtn.style.display = 'none';
  }
});

function spawnFruit() {
  return {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount)
  };
}

function draw() {
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  snake.forEach((segment, index) => {
    if (index === 0) {
      ctx.drawImage(headImg, segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    } else {
      ctx.fillStyle = 'limegreen';
      ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    }
  });

  ctx.drawImage(fruitImg, fruit.x * gridSize, fruit.y * gridSize, gridSize, gridSize);
}

function gameLoop() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };

  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || isCollision(head)) {
    clearInterval(gameInterval);
    alert('Game Over!');
    sendTokenToServer(token);
    return;
  }

  snake.unshift(head);

  if (head.x === fruit.x && head.y === fruit.y) {
    score++;
    token += 3;
    fruit = spawnFruit();
  } else {
    snake.pop();
  }

  scoreDisplay.textContent = score;
  tokenDisplay.textContent = token;

  draw();
}

function isCollision(head) {
  return snake.some(segment => segment.x === head.x && segment.y === head.y);
}

// Control buttons
document.getElementById('up').onclick = () => { if (dy === 0) { dx = 0; dy = -1; } };
document.getElementById('down').onclick = () => { if (dy === 0) { dx = 0; dy = 1; } };
document.getElementById('left').onclick = () => { if (dx === 0) { dx = -1; dy = 0; } };
document.getElementById('right').onclick = () => { if (dx === 0) { dx = 1; dy = 0; } };

// Token Update API Call
function sendTokenToServer(amount) {
  fetch("update_token.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "amount=" + amount
  });
}
