const inputList = document.querySelectorAll(".input");
const screenshot = document.getElementById("screenshot");

inputList.forEach((input) => {
  input.addEventListener("input", (e) => {
    const text = e.target.value;
    if (text.length > 0) {
      input.parentElement.classList.add("is_active");
    }
  });
});

let index = 2;

setInterval(() => {
  screenshot.style.backgroundImage = `url("./assets/screenshot${index}.png")`;
  index = (index + 1) % 3;
}, 4000);
