const form = document.getElementById('expenseForm');
const balanceList = document.getElementById('balanceList');
const apiUrl = 'https://script.google.com/macros/s/AKfycbwAPmRr30-y-c2olf7wD89GMj8tuON5EUgykj62DDkv9M5tkJgCCdNK0716PJVKST15/exec;  // 新しいURLを設定

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const date = document.getElementById('date').value;
  const amount = document.getElementById('amount').value;
  const memo = document.getElementById('memo').value;

  const data = { date, amount, memo };

  try {
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
      form.reset();  // フォームのリセット
    } else {
      const errorText = await response.text();
      console.error('送信失敗:', errorText);
      alert('送信失敗');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('送信中にエラーが発生しました');
  }
});

async function updateBalance() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    balanceList.innerHTML = '';

    data.forEach(item => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.date}: ${item.amount}円 - ${item.memo}`;
      balanceList.appendChild(listItem);
    });
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
}

// 初期化時に残高を更新
updateBalance();
