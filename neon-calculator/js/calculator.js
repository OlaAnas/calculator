// js/calculator.js
class Calculator {
    constructor() {
        this.reset();
    }

    // Reset all values
    reset() {
        this.currentValue = "0";   // what we are typing now
        this.previousValue = null; // value before pressing operator
        this.operator = null;      // "+", "-", "*", "/"
        this.overwrite = true;     // next digit overwrites currentValue
    }

    // Handle digits 0-9
    inputDigit(digit) {
        if (this.overwrite) {
            this.currentValue = String(digit);
            this.overwrite = false;
        } else {
            // Avoid leading zeros like "0005"
            if (this.currentValue === "0") {
                this.currentValue = String(digit);
            } else {
                this.currentValue += String(digit);
            }
        }
    }

    // Handle decimal point
    inputDecimal() {
        if (this.overwrite) {
            // start new number with "0."
            this.currentValue = "0.";
            this.overwrite = false;
            return;
        }

        if (!this.currentValue.includes(".")) {
            this.currentValue += ".";
        }
    }

    // Change sign +/-
    toggleSign() {
        if (this.currentValue === "0") return;
        if (this.currentValue.startsWith("-")) {
            this.currentValue = this.currentValue.slice(1);
        } else {
            this.currentValue = "-" + this.currentValue;
        }
    }

    // Clear everything
    clearAll() {
        this.reset();
    }

    // Set the operator (+, -, *, /)
    setOperator(nextOperator) {
        const inputValue = parseFloat(this.currentValue);

        if (this.operator && !this.overwrite) {
            // If there was an operator already, compute first
            this._compute(inputValue);
        } else {
            // First time we press an operator
            this.previousValue = inputValue;
        }

        this.operator = nextOperator;
        this.overwrite = true; // next digit overwrites display
    }

    // When user presses "="
    equals() {
        const inputValue = parseFloat(this.currentValue);

        if (this.operator === null || this.previousValue === null) {
            // Nothing to do
            return;
        }

        this._compute(inputValue);
        this.operator = null;
        this.previousValue = null;
        this.overwrite = true;
    }

    // Internal compute function
    _compute(secondOperand) {
        const firstOperand = this.previousValue;
        let result = 0;

        switch (this.operator) {
            case "+":
                result = firstOperand + secondOperand;
                break;
            case "-":
                result = firstOperand - secondOperand;
                break;
            case "*":
                result = firstOperand * secondOperand;
                break;
            case "/":
                // basic divide-by-zero protection
                if (secondOperand === 0) {
                    this.currentValue = "Error";
                    this.previousValue = null;
                    this.operator = null;
                    this.overwrite = true;
                    return;
                }
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }

        // Limit decimals a bit so it doesn’t look ugly
        this.currentValue = String(parseFloat(result.toFixed(10)));
        this.previousValue = result;
    }

    // Get the value to show on screen
    getDisplayValue() {
        return this.currentValue;
    }
}

// Make it available globally for app.js
window.Calculator = Calculator;
