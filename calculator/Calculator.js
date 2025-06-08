function calcNumber(result) {
  document.querySelector('.area').value += result;
}

function percentage(result) {
  var result1 = String(result);
  console.log(result1);
  if (result1.includes("%")) {
    var a, b, percent;
    var splitWord = [];
    a = Number(splitWord[0]);
    b = Number(splitWord[1]);
    percent = (a / 100 * b);
    document.querySelector('.area').value = percent;
  }
}

function makeNegative(result) {
  if (result.chartAt(0) == '_') {
    document.querySelector('.area').value = result.replace('-', '');
  }
  else {
    document.querySelector('.area').value = '-' + result;
  }
}


const body = document.querySelector("body");
const modeToggle = document.querySelector(".dark-light");

modeToggle.addEventListener("click", () => {
  modeToggle.classList.toggle("active");
  body.classList.toggle("dark");
  if (!body.classList.contains("dark")) {
    localStorage.setItem("mode", "light-mode");
  }
  else {
    localStorage.setItem("mode", "dark-mode");
  }
});