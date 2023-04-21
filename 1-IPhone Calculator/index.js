const operButtons = document.querySelectorAll(".oper_button");

let beforeNumber = null,
  currentNumber = "",
  currentOperator = null;

operButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const display = document.querySelector(".result_text");
    const id = e.target.id;

    if (id === "clear") {
      currentNumber = "";
      beforeNumber = null;
      currentOperator = null;
      display.innerText = 0;
    } else if (id === "toggle") {
      currentNumber = currentNumber * -1;
      display.innerText = currentNumber;
    } else if (id === "%") {
      currentNumber = currentNumber * 0.01;
      display.innerText = currentNumber;
    } else if (id === "divide" || id === "x" || id === "-" || id === "+") {
      currentOperator = id;
      beforeNumber = display.innerText;
      currentNumber = "";
    } else if (id === "=") {
      if (currentOperator === "+") {
        currentNumber = +beforeNumber + +currentNumber;
      } else if (currentOperator === "-") {
        currentNumber = +beforeNumber - +currentNumber;
      } else if (currentOperator === "divide") {
        currentNumber = +beforeNumber / +currentNumber;
      } else if (currentOperator === "x") {
        currentNumber = +beforeNumber * +currentNumber;
      }
      display.innerText = currentNumber;
      currentOperator = null;
    } else if (id === ".") {
      if (!String(display.innerText).includes(".")) {
        currentNumber = currentNumber + ".";
        display.innerText = currentNumber;
      }
    } else {
      // click number
      currentNumber = currentNumber + id;
      display.innerText = currentNumber;
    }
  });
});
