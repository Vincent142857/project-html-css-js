const dayEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secondsEl = document.getElementById('seconds');

const newYears = "1 Jan 2025";

function countdown() {

  const newYearsDate = new Date(newYears);
  const currentDate = new Date();

  const totalSeconds = (newYearsDate.getTime() - currentDate.getTime()) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const mins = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  if (dayEl && hoursEl && minsEl && secondsEl) {
    dayEl.innerHTML = String(days);
    hoursEl.innerHTML = formatTime(hours);
    minsEl.innerHTML = formatTime(mins);
    secondsEl.innerHTML = formatTime(seconds);
  }
}

/**
 * @param {number} time
 */
function formatTime(time) {
  return time < 10 ? `0${time}` : time.toString();
}

countdown();
setInterval(countdown, 1000);