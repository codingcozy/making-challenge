function rotateClockHands() {
  let now = new Date();
  let options = { timeZone: "Asia/Seoul" };
  let timeString = now.toLocaleString("en-US", options);
  let timeComponents = timeString.split(", ")[1].split(":");
  let seconds = parseInt(timeComponents[2]) * 6;
  let minutes = parseInt(timeComponents[1]) * 6 + seconds / 60;
  let hours = parseInt(timeComponents[0]) * 30 + minutes / 12;

  const secondsElList = document.querySelectorAll(".second-hand");
  secondsElList.forEach((secondsEl) => {
    secondsEl.style.transform = "rotate(" + seconds + "deg)";
  });

  const minutesElList = document.querySelectorAll(".minute-hand");
  minutesElList.forEach((minutesEl) => {
    minutesEl.style.transform = "rotate(" + minutes + "deg)";
  });

  const hoursElList = document.querySelectorAll(".hour-hand");
  hoursElList.forEach((hoursEl) => {
    hoursEl.style.transform = "rotate(" + hours + "deg)";
  });

  const hoursNumberElList = document.querySelectorAll(".hour-number");
  hoursNumberElList.forEach((hoursNumberEl) => {
    hoursNumberEl.innerText = timeComponents[0];
  });

  const minutesNumberElList = document.querySelectorAll(".minute-number");
  minutesNumberElList.forEach((minutesNumberEl) => {
    minutesNumberEl.innerText = timeComponents[1];
  });
}

rotateClockHands();

setInterval(rotateClockHands, 1000);

const flicking = new Flicking("#my-flicking", {
  align: "prev",
});
