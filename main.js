const display = document.querySelector(".display");
const input = document.querySelector(".input");

let showingAns = false;
let leftNeg = false;
let left = "";
let op = "";
let rightNeg = false;
let right = "";

input.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (!button || !input.contains(button)) return;

    if (button.dataset.digit !== undefined) {
        handleDigit(button.dataset.digit);
    }

    else if (button.dataset.op !== undefined) {
        handleOperator(button.dataset.op);
    }

    else if (button.dataset.action !== undefined) {
        switch (button.dataset.action) {
            case "decimal": handleDecimal(); break;
            case "equals": handleEquals(); break;
            case "negate": handleNegate(); break;
            case "clearLast": clearLast(); break;
            case "clearAll": clearAll(); break;
        }
    }
});

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (/^\d$/.test(key)) {
        handleDigit(+key);
    } else if (/^[+\-*/]$/.test(key)) {
        handleOperator(key);
    } else if (key === ".") {
        handleDecimal();
    } else if (key === "Enter" || key === "=") {
        e.preventDefault();       // stops Enter from "clicking" a focused button
        handleEquals();
    } else if (key.toLowerCase() === "n") {
        handleNegate();
    } else if (key === "Backspace") {
        clearLast();
    } else if (key === "Delete" || key.toLowerCase() === "c") {
        clearAll();
    }
});

function handleDigit(d) {
    console.log(`handleDigit(${d})`);

    if (showingAns) {
        left = +d;
        showingAns = false;
    } else {
        if (op) {
            if (d !== 0 || right !== "0") {
                right += d;
            }
        } else {
            if (d !== 0 || left !== "0") {
                left += d;
            }
        }
    }

    updateDisplay();
}

function handleOperator(o) {
    console.log(`handleOperator(${o})`);

    showingAns = false;

    if (right) {
        handleEquals();
        handleOperator(o);
    } else {
        op = o;
    }

    updateDisplay();
}

function handleDecimal() {
    console.log(`handleDecimal()`);

    showingAns = false;

    if (op) {
        if (!right) {
            right = "0.";
        } else if (!right.includes(".")) {
            right += ".";
        }
    } else {
        if (!left) {
            left = "0.";
        } else if (!left.includes(".")) {
            left += ".";
        }
    }

    updateDisplay();
}

function handleEquals() {
    console.log(`handleEquals()`);

    if (right) {
        let ans = 0;
        let x = +left;
        if (leftNeg) x = -x;
        let y = +right;
        if (rightNeg) y = -y;

        switch (op) {
            case "+": ans = x + y; break;
            case "-": ans = x - y; break;
            case "*": ans = x * y; break;
            case "/": ans = x / y; break;
        }

        leftNeg = ans < 0;
        left = Math.abs(ans).toString();
        op = "";
        rightNeg = false;
        right = "";

        showingAns = true;
        updateDisplay();
    } else if (!op) {
        showingAns = true;
        // updateDisplay();
    }
}

function handleNegate() {
    console.log(`handleNegate()`);

    showingAns = false;

    if (op) {
        rightNeg = !rightNeg;
    } else {
        leftNeg = !leftNeg;
    }

    updateDisplay();
}

function clearLast() {
    console.log(`clearLast()`);

    if (right) {
        right = right.slice(0, -1);

    } else if (rightNeg) {
        rightNeg = false;
    } else if (op) {
        op = "";
    } else if (left) {
        left = left.slice(0, -1);
    } else if (leftNeg) {
        leftNeg = false;
    }

    updateDisplay();
}

function clearAll() {
    console.log(`clearAll()`);

    leftNeg = "";
    left = "";
    op = "";
    rightNeg = "";
    right = "";

    updateDisplay();
}

function calculateDisplay() {
    let text = leftNeg ? "-" : "";
    text += (left || "0");
    if (op) text += ` ${op} `;
    if (rightNeg) text += "-";
    if (right) text += `${right}`

    return text;
}

function updateDisplay(text = calculateDisplay()) {
    display.textContent = text;
}