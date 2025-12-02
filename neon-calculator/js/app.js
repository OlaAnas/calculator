// js/app.js
document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelector(".buttons");

    const calc = new Calculator();

    const updateDisplay = () => {
        display.textContent = calc.getDisplayValue();
    };

    buttons.addEventListener("click", (event) => {
        const target = event.target;
        if (!target.matches("button")) return;

        const digit = target.dataset.digit;
        const action = target.dataset.action;
        const operator = target.dataset.operator;

        if (digit !== undefined) {
            calc.inputDigit(digit);
            updateDisplay();
            return;
        }

        if (action === "decimal") {
            calc.inputDecimal();
            updateDisplay();
            return;
        }

        if (action === "sign") {
            calc.toggleSign();
            updateDisplay();
            return;
        }

        if (action === "clear") {
            calc.clearAll();
            updateDisplay();
            return;
        }

        if (action === "operator" && operator) {
            calc.setOperator(operator);
            updateDisplay();
            return;
        }

        if (action === "equals") {
            calc.equals();
            updateDisplay();
            return;
        }
    });

    // Initial display
    updateDisplay();
});
