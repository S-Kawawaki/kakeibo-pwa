const form = document.getElementById('expenseForm');
const balanceList = document.getElementById('balanceList');
const apiUrl = 'https://script.google.com/macros/s/AKfycbz8lxHbbcQ5DNE7cItXt2P9mX76jGyUI3E_U_7_tCloQzflC53g_MPB5l91JHL3nqcJ/exec';  // メモしたGoogle Apps ScriptのURLをここに貼り付ける

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const amount = document.getElementById('amount').value;
  const memo = document.getElementById('memo').value;

  const data = { date, amount, memo };

  const response = await fetch(apiUrl, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    alert('送信成功');
    updateBalance();
  } else {
    alert('送信失敗');
  }
});

async function updateBalance() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  balanceList.innerHTML = '';

  data.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.date}: ${item.amount}円 - ${item.memo}`;
    balanceList.appendChild(listItem);
  });
}

updateBalance();

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
      .then(() => console.log('Service Worker registered'))
      .catch(err => console.error('Service Worker registration failed', err));
  }