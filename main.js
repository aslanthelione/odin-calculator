const input = document.querySelector(".input");

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
        handleDigit(key);
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
}

function handleOperator(o) {
    console.log(`handleOperator(${o})`);
}

function handleDecimal() {
    console.log(`handleDecimal()`);
}

function handleEquals() {
    console.log(`handleEquals()`);
}

function handleNegate() {
    console.log(`handleNegate()`);
}

function clearLast() {
    console.log(`clearLast()`);
}

function clearAll() {
    console.log(`clearAll()`);
}