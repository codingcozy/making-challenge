let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let isDrawing = false;
let startX, startY;
let penSize = document.querySelector(".pen_size.active").dataset.size;
let penSizeBtnList = document.querySelectorAll(".pen_size");
let penTypeBtnList = document.querySelectorAll(".pen_type");
let penColorBtnList = document.querySelectorAll(".pen_color");
let penButton = document.getElementById("pen");
let eraserButton = document.getElementById("eraser");
let penColor = "#2d3436";

canvas.width = 500;
canvas.height = 500;

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);
penButton.addEventListener("click", usePen);
eraserButton.addEventListener("click", useEraser);

function startDrawing(e) {
  isDrawing = true;
  startX = e.pageX - canvas.offsetLeft;
  startY = e.pageY - canvas.offsetTop;
  context.beginPath();
  context.moveTo(startX, startY);
}

function draw(e) {
  if (!isDrawing) return;

  let x = e.pageX - canvas.offsetLeft;
  let y = e.pageY - canvas.offsetTop;

  context.lineWidth = penSize;
  context.lineCap = "round";
  context.strokeStyle = penColor;
  context.lineTo(x, y);
  context.stroke();
}

function stopDrawing() {
  isDrawing = false;
}

function usePen() {
  penColor = document.querySelector(".pen_color.active").dataset.color;
  penSize = document.querySelector(".pen_size.active").dataset.size;
}

function useEraser() {
  penColor = "#fff";
  penSize = document.querySelector(".pen_size.active").dataset.size + 5;
}

penTypeBtnList.forEach((penTypeBtn) => {
  penTypeBtn.addEventListener("click", (e) => {
    document.querySelector(".pen_type.active").classList.remove("active");
    e.currentTarget.classList.add("active");
  });
});

penSizeBtnList.forEach((penSizeBtn) => {
  penSizeBtn.addEventListener("click", (e) => {
    document.querySelector(".pen_size.active").classList.remove("active");
    e.target.classList.add("active");
    penSize = e.target.dataset.size;
  });
});

penColorBtnList.forEach((penColorBtn) => {
  penColorBtn.addEventListener("click", (e) => {
    document.querySelector(".pen_color.active").classList.remove("active");
    e.target.classList.add("active");
    penColor = e.target.dataset.color;
  });
});
