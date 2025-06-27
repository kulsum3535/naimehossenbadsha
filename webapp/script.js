const tg = window.Telegram.WebApp;
tg.ready();

const telegram_id = tg.initDataUnsafe.user.username;

fetch('/api/register.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: 'telegram_id=' + telegram_id
});

fetch('/api/get_balance.php?telegram_id=' + telegram_id)
  .then(res => res.json())
  .then(data => {
    document.getElementById('balance').innerText = '💰 Balance: ' + data.balance;
  });

document.getElementById('withdraw').onclick = () => {
  const amount = document.getElementById('amount').value;
  fetch('/api/withdraw.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'telegram_id=' + telegram_id + '&amount=' + amount
  })
  .then(res => res.json())
  .then(data => {
    if (data.status === 'ok') {
      alert('Withdraw requested!');
    } else {
      alert('Error: ' + data.status);
    }
  });
};
