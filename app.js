const form = document.getElementById('expenseForm');
const balanceList = document.getElementById('balanceList');
const apiUrl = 'YOUR_GOOGLE_SCRIPT_URL';  // メモしたGoogle Apps ScriptのURLをここに貼り付ける

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