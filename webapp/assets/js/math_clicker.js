let num1, num2, operator, correctAnswer;

function generateQuestion() {
  num1 = Math.floor(Math.random() * 20) + 1;
  num2 = Math.floor(Math.random() * 20) + 1;
  operator = Math.random() > 0.5 ? '+' : '-';

  if (operator === '-' && num2 > num1) {
    [num1, num2] = [num2, num1];
  }

  correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;

  document.getElementById('question').innerText = `What is ${num1} ${operator} ${num2}?`;
  document.getElementById('answer').value = '';
  document.getElementById('answer').focus();
  document.getElementById('result').innerText = '';
}

function checkAnswer() {
  const userAnswer = parseInt(document.getElementById('answer').value);
  const resultBox = document.getElementById('result');

  if (isNaN(userAnswer)) {
    alert('Please enter a number.');
    return;
  }

  if (userAnswer === correctAnswer) {
    resultBox.innerText = "✅ Correct! +2 Token!";
    updateToken(2);
  } else {
    resultBox.innerText = "❌ Wrong! Try again.";
  }

  setTimeout(generateQuestion, 1000);
}

window.onload = generateQuestion;
