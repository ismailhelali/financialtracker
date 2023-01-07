const form = document.querySelector('#transaction-form');
const transactionHistory = document.querySelector('#transaction-history');
const balanceTable = document.querySelector('#balance table');

let transactions = [];
let balance = {};

// Add a new transaction to the transactions array
function addTransaction(transaction) {
  transactions.push(transaction);
  updateBalance(transaction);
}

// Update the balance object
function updateBalance(transaction) {
  const type = transaction.type;
  const amount = transaction.amount;
  const date = transaction.date;

  if (type === 'input') {
    if (balance[date]) {
      balance[date]['income'] += amount;
    } else {
      balance[date] = { income: amount, expenses: 0 };
    }
  } else {
    if (balance[date]) {
      balance[date]['expenses'] += amount;
    } else {
      balance[date] = { income: 0, expenses: amount };
    }
  }
}

// Display all transactions in the transaction history table
function displayTransactions() {
  transactionHistory.querySelector('table').innerHTML = '';

  transactions.forEach((transaction, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.pendingDays}</td>
      <td>${transaction.amount}</td>
      <td>${transaction.reference}</td>
      <td>${transaction.type}</td>
      <td>${transaction.name}</td>
      <td>${transaction.paymentOption}</td>
      <td><button class="delete" data-index=${index}>Delete</button></td>
    `;
    transactionHistory.querySelector('table').appendChild(row);
  });
}

// Display the balance in the balance table
function displayBalance() {
  balanceTable.innerHTML = '';

  for (let date in balance) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${date}</td>
      <td>${balance[date]['income']}</td>
      <td>${balance[date]['expenses']}</td>
      <td>${balance[date]['income'] - balance[date]['expenses']}</td>
    `;
    balanceTable.appendChild(row);
  }
}

// Save the transactions and balance to local storage
function saveData() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
  localStorage.setItem('balance', JSON.stringify(balance));
}

// Load the transactions and balance from local storage
function loadData() {
  transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  balance = JSON.parse(localStorage.getItem('balance')) || {};
}

// Delete a transaction
function deleteTransaction(index) {
  transactions.splice



Ismail Helali
continue from // Save the transactions and balance to local storage
Certainly! Here is the rest of the JavaScript code:

Copy code
// Save the transactions and balance to local storage
function saveData() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
  localStorage.setItem('balance', JSON.stringify(balance));
}

// Load the transactions and balance from local storage
function loadData() {
  transactions = JSON.parse(localStorage.getItem('transactions')) || [];
  balance = JSON.parse(localStorage.getItem('balance')) || {};
}

// Delete a transaction
function deleteTransaction(index) {
  transactions.splice(index, 1);
  saveData();
  loadData();
  displayTransactions();
  displayBalance();
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const date = form.querySelector('#date').value;
  const pendingDays = form.querySelector('#pending-days').value;
  const amount = form.querySelector('#amount').value;
  const reference = form.querySelector('#reference').value;
  const type = form.querySelector('#type').value;
  const name = form.querySelector('#name').value;
  const paymentOption = form.querySelector('#payment-option').value;

  const transaction = {
    date,
    pendingDays,
    amount,
    reference,
    type,
    name,
    paymentOption,
  };

  addTransaction(transaction);
  saveData();
  displayTransactions();
  displayBalance();

  form.reset();
});

// Handle delete button clicks
transactionHistory.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    const index = e.target.dataset.index;
    deleteTransaction(index);
  }
});

loadData();
displayTransactions();
displayBalance();
