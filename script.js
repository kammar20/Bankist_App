'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//? display movements
const displayMoments = function (movements) {
  // empty the container first
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = ` 
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">3 days ago</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//? Display Current Balance
const diplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, crr) {
    return acc + crr;
  }, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

//? Calculate display Summary
const calDisplaySummary = function (acc) {
  ///Income
  const income = acc.movements
    .filter(move => move > 0)
    .reduce(function (acc, crr) {
      return acc + crr;
    }, 0);
  labelSumIn.textContent = `${income}€`;

  /// out
  const out = acc.movements
    .filter(move => move < 0)
    .reduce(function (acc, crr) {
      return acc + crr;
    }, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  /// interest (on every deposit 1,2%)
  const interest = acc.movements
    .filter(move => move > 0)
    .map(function (deposit) {
      return (deposit * acc.interestRate) / 100;
    })
    .filter(function (int) {
      return int >= 1;
    })
    .reduce(function (acc, crr) {
      return acc + crr;
    }, 0);

  labelSumInterest.textContent = `${interest}€`;
};

//? create userName initials
//? 'Steven Thomas Williams', // stw
const createUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(function (name) {
        return name[0];
      })
      .join('');
  });
};
createUserName(accounts);

// update ui
const updateUi = function (acc) {
  // Display movement
  displayMoments(acc.movements);

  // Display  balance
  diplayBalance(acc);

  // Display summary
  calDisplaySummary(acc);
};

// user Login
let currentAccount;
//? Login user
btnLogin.addEventListener('click', function (event) {
  event.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // console.log('Login');

    // display welcome
    labelWelcome.textContent = `"Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }"`;

    // disply ui
    containerApp.style.opacity = '100';

    // clear input field

    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    // update ui
    updateUi(currentAccount);
  }
});

// Transfer Money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);

  const reciverAccount = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  if (
    amount > 0 &&
    reciverAccount &&
    currentAccount.balance >= amount &&
    reciverAccount?.userName !== currentAccount.userName
  ) {
    // doing transfer
    // negative current account
    currentAccount.movements.push(-amount);

    // postive movement account
    reciverAccount.movements.push(amount);

    // update ui
    updateUi(currentAccount);
  }

  inputTransferTo.value = inputTransferAmount.value = '';

  inputTransferAmount.blur();
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Find Maximum Value from Array using Reduce.

/////////////////////////////////////////////////
