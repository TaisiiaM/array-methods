const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const addUserStartBtn = document.getElementById('add-user-start');
const doubleBtn = document.getElementById('double');
const divideBtn = document.getElementById('divide');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');
const del = document.getElementById('delete');
const delFirst = document.getElementById('delete-first');
const reverseUsers = document.getElementById('reverse');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.title} ${user.name.first} ${user.name.last} ` ,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

async function getMyUser() {
  const response = await fetch('json/users.json');
  const data = await response.json();

  const newUser = {
    name: `${data.title} ${data.first} ${data.last} ` ,
    money: Math.floor(Math.random() * 1000000)
  };

  addDataStart(newUser);
}

// Double eveyones money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

function divideMoney(){
  data = data.map(user => {
    return { ...user, money: user.money / 2 };
  });

  updateDOM();
}

// Sort users by richest
function sortByRichest() {
 
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter only millionaires
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth of ${data.length} People: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);

  updateDOM();
}

function addDataStart(obj){
  data.unshift(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

function deleteUser(){
  data.pop();

  updateDOM();
}

function deleteFirstUser(){
  data.shift();

  updateDOM();
}

function reverseUsersFunc(){
  data.reverse();

  updateDOM();
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
addUserStartBtn.addEventListener('click', getMyUser);
doubleBtn.addEventListener('click', doubleMoney);
divideBtn.addEventListener('click', divideMoney)
sortBtn.addEventListener('click', sortByRichest);
reverseUsers.addEventListener('click', reverseUsersFunc);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
del.addEventListener('click', deleteUser);
delFirst.addEventListener('click', deleteFirstUser);
