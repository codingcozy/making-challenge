const input = document.querySelector(".input");

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    window.location.href = `https://www.google.com/search?q=${e.target.value}`;
  }
});
