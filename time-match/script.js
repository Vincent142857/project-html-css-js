
// @ts-ignore
let dayEl = document.getElementById('days');
// @ts-ignore
let hoursEl = document.getElementById('hours');
// @ts-ignore
let minsEl = document.getElementById('mins');
// @ts-ignore
let secondsEl = document.getElementById('seconds');

// @ts-ignore
let newYears = "1 Jan 2025";

function countdown() {
  let newYearsDate = new Date(newYears);
  let currentDate = new Date();

  let totalSeconds = (newYearsDate.getTime() - currentDate.getTime()) / 1000;

  let days = Math.floor(totalSeconds / 3600 / 24);
  let hours = Math.floor(totalSeconds / 3600) % 24;
  let mins = Math.floor(totalSeconds / 60) % 60;
  let seconds = Math.floor(totalSeconds) % 60;

  if (dayEl && hoursEl && minsEl && secondsEl) {
    dayEl.innerHTML = String(days);
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
  }
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time.toString();
}
countdown();
setInterval(countdown, 1000);