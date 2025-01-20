const display = document.getElementById("display");
const buttons = document.querySelectorAll(".buttons button");

let currentInput = "";
let firstNumber = null;
let operator = null;

buttons.forEach(button => {
  button.addEventListener("click", () => handleButtonClick(button.textContent));
});

document.addEventListener("keydown", (event) => {
  const keyMap = {
    "Enter": "=",
    "Escape": "C",
    "Backspace": "←"
  };
  const key = keyMap[event.key] || event.key;
  handleButtonClick(key);
});

function handleButtonClick(value) {
  if (!isNaN(value) || value === ".") {
    if (value === "." && currentInput.includes(".")) return;
    currentInput += value;
    updateDisplay(currentInput);
  } else if (["+", "-", "*", "/"].includes(value)) {
    if (firstNumber === null) {
      firstNumber = parseFloat(currentInput);
      operator = value;
      currentInput = "";
    } else if (currentInput !== "") {
      firstNumber = operate(operator, firstNumber, parseFloat(currentInput));
      operator = value;
      currentInput = "";
      updateDisplay(firstNumber);
    }
  } else if (value === "=") {
    if (firstNumber !== null && operator !== null && currentInput !== "") {
      const result = operate(operator, firstNumber, parseFloat(currentInput));
      updateDisplay(result);
      resetCalculator(result);
    }
  } else if (value === "C") {
    resetCalculator();
  } else if (value === "←") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
  }
}

function operate(operator, a, b) {
  switch (operator) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b !== 0 ? a / b : "Error";
    default: return null;
  }
}

function updateDisplay(value) {
  display.textContent = value.toString().slice(0, 10); // Limit display length
}

function resetCalculator(result = null) {
  currentInput = "";
  firstNumber = result;
  operator = null;
  updateDisplay(result || "0");
}
