const pwEl = document.getElementById('pw');
const copyEl = document.getElementById('copy');
const lenEl = document.getElementById('len');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numberEl = document.getElementById('number');
const symbolEl = document.getElementById('symbol');

const generateEl = document.getElementById('generate');

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbol = '!@#$%^&*()_+';

function getLowercase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
  return symbol[Math.floor(Math.random() * symbol.length)];
}

function generatePassword() {
  // @ts-ignore
  const len = lenEl.value;
  let password = '';

  // @ts-ignore
  if (upperEl.checked) {
    password += getUppercase();
  }
  // @ts-ignore
  if (lowerEl.checked) {
    password += getLowercase();
  }
  // @ts-ignore
  if (numberEl.checked) {
    password += getNumber();
  }
  // @ts-ignore
  if (symbolEl.checked) {
    password += getSymbol();
  }

  for (let i = password.length; i < len; i++) {
    const x = generateX();
    password += x;
  }
  // @ts-ignore
  pwEl.innerText = password;
}

function generateX() {
  const xs = [];

  // @ts-ignore
  if (upperEl.checked) {
    xs.push(getUppercase());
  }

  // @ts-ignore
  if (lowerEl.checked) {
    xs.push(getLowercase());
  }

  // @ts-ignore
  if (numberEl.checked) {
    xs.push(getNumber());
  }

  // @ts-ignore
  if (symbolEl.checked) {
    xs.push(getSymbol());
  }

  if (xs.length === 0) return '';

  return xs[Math.floor(Math.random() * xs.length)];
}

// @ts-ignore
generateEl.addEventListener('click', generatePassword);

// @ts-ignore
copyEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  // @ts-ignore
  const password = pwEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Password copied to clipboard!');
});