noBtn.addEventListener("mouseover", () => {
  const newX = Math.floor(
    Math.random() * questionContainer.clientWidth
  );
  const newY = Math.floor(
    Math.random() * questionContainer.clientHeight
  );
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
});

yesBtn.addEventListener("click", () => {
  const timeOutId = setTimeout(() => {
    alert("I knew you would say yes!");
  }, 1000);
});
