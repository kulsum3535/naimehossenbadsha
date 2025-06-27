let startTime, timeout;

function startGame() {
  const box = document.getElementById('game-box');
  box.style.background = 'red';
  box.innerHTML = '';

  timeout = setTimeout(() => {
    box.style.background = 'green';
    startTime = Date.now();
    box.innerHTML = '<p style="text-align:center;margin-top:140px;">CLICK!</p>';
    box.onclick = () => checkReaction();
  }, Math.random() * 3000 + 2000);
}

function checkReaction() {
  const box = document.getElementById('game-box');
  const reactionTime = Date.now() - startTime;

  box.innerHTML = `<p style="text-align:center;margin-top:140px;">⏱️ ${reactionTime}ms</p>`;

  if (reactionTime < 300) {
    box.innerHTML += "<br>✅ +2 Token!";
    updateToken(2);
  } else {
    box.innerHTML += "<br>Too Slow!";
  }

  box.onclick = null;
}
