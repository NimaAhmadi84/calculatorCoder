let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;
let calculationHistory = [];

const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const historyList = document.getElementById('historyList');

// به‌روزرسانی نمایشگر
function updateDisplay() {
    display.value = currentInput;
}

// اضافه کردن عدد
function appendNumber(num) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = num;
        shouldResetDisplay = false;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

// اضافه کردن اعشار
function appendDecimal() {
    if (shouldResetDisplay) {
        currentInput = '0.';
        shouldResetDisplay = false;
    } else if (!currentInput.includes('.')) {
        currentInput += '.';
    }
    updateDisplay();
}

// اضافه کردن عملگر
function appendOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = op;
    shouldResetDisplay = true;
    
    let displayOp = op;
    if (op === '*') displayOp = '×';
    if (op === '/') displayOp = '÷';
    if (op === '-') displayOp = '−';
    
    historyDisplay.value = `${previousInput} ${displayOp}`;
}

// محاسبه نتیجه
function calculate() {
    if (operator === null || shouldResetDisplay) return;
    
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);
    let result;
    
    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert('خطا: تقسیم بر صفر امکان‌پذیر نیست!');
                clearAll();
                return;
            }
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }
    
    // گرد کردن نتیجه برای جلوگیری از خطاهای اعشاری
    result = Math.round(result * 1000000000) / 1000000000;
    
    // افزودن به تاریخچه
    addToHistory(prev, operator, current, result);
    
    currentInput = result.toString();
    operator = null;
    previousInput = '';
    shouldResetDisplay = true;
    historyDisplay.value = '';
    updateDisplay();
}

// پاک کردن همه
function clearAll() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    shouldResetDisplay = false;
    historyDisplay.value = '';
    updateDisplay();
}

// پاک کردن ورودی فعلی
function clearEntry() {
    currentInput = '0';
    updateDisplay();
}

// تغییر علامت
function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

// درصد
function percentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

// جذر
function squareRoot() {
    const value = parseFloat(currentInput);
    if (value < 0) {
        alert('خطا: جذر اعداد منفی امکان‌پذیر نیست!');
        return;
    }
    const result = Math.sqrt(value);
    addToHistory(value, '√', '', result);
    currentInput = result.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

// توان دوم
function square() {
    const value = parseFloat(currentInput);
    const result = Math.pow(value, 2);
    addToHistory(value, 'x²', '', result);
    currentInput = result.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

// توان
function power() {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }
    previousInput = currentInput;
    operator = '^';
    shouldResetDisplay = true;
    historyDisplay.value = `${previousInput} ^`;
}

// فاکتوریل
function factorial() {
    const value = parseInt(currentInput);
    if (value < 0) {
        alert('خطا: فاکتوریل اعداد منفی تعریف نشده است!');
        return;
    }
    if (value > 170) {
        alert('خطا: عدد بسیار بزرگ است!');
        return;
    }
    
    let result = 1;
    for (let i = 2; i <= value; i++) {
        result *= i;
    }
    
    addToHistory(value, 'n!', '', result);
    currentInput = result.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

// ثابت‌ها
function appendConstant(constant) {
    if (constant === 'pi') {
        currentInput = Math.PI.toString();
    } else if (constant === 'e') {
        currentInput = Math.E.toString();
    }
    shouldResetDisplay = true;
    updateDisplay();
}

// سینوس
function sin() {
    const value = parseFloat(currentInput);
    const result = Math.sin(value * Math.PI / 180); // تبدیل به رادیان
    addToHistory(value, 'sin', '', result);
    currentInput = result.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

// کسینوس
function cos() {
    const value = parseFloat(currentInput);
    const result = Math.cos(value * Math.PI / 180);
    addToHistory(value, 'cos', '', result);
    currentInput = result.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

// تانژانت
function tan() {
    const value = parseFloat(currentInput);
    const result = Math.tan(value * Math.PI / 180);
    addToHistory(value, 'tan', '', result);
    currentInput = result.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

// لگاریتم دهدهی
function log() {
    const value = parseFloat(currentInput);
    if (value <= 0) {
        alert('خطا: لگاریتم اعداد غیرمثبت تعریف نشده است!');
        return;
    }
    const result = Math.log10(value);
    addToHistory(value, 'log', '', result);
    currentInput = result.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

// لگاریتم طبیعی
function ln() {
    const value = parseFloat(currentInput);
    if (value <= 0) {
        alert('خطا: لگاریتم اعداد غیرمثبت تعریف نشده است!');
        return;
    }
    const result = Math.log(value);
    addToHistory(value, 'ln', '', result);
    currentInput = result.toString();
    shouldResetDisplay = true;
    updateDisplay();
}

// پرانتز
let parenthesisCount = 0;
function toggleParenthesis() {
    if (parenthesisCount % 2 === 0) {
        if (currentInput === '0' || shouldResetDisplay) {
            currentInput = '(';
            shouldResetDisplay = false;
        } else {
            currentInput += '(';
        }
    } else {
        currentInput += ')';
    }
    parenthesisCount++;
    updateDisplay();
}

// افزودن به تاریخچه
function addToHistory(prev, op, current, result) {
    let displayOp = op;
    if (op === '*') displayOp = '×';
    if (op === '/') displayOp = '÷';
    if (op === '-') displayOp = '−';
    
    const historyItem = {
        expression: `${prev} ${displayOp} ${current}`,
        result: result
    };
    
    calculationHistory.unshift(historyItem);
    if (calculationHistory.length > 50) {
        calculationHistory.pop();
    }
    
    updateHistoryPanel();
}

// به‌روزرسانی پنل تاریخچه
function updateHistoryPanel() {
    historyList.innerHTML = '';
    calculationHistory.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = `${item.expression} = ${item.result}`;
        div.onclick = () => {
            currentInput = item.result.toString();
            updateDisplay();
        };
        historyList.appendChild(div);
    });
}

// پاک کردن تاریخچه
function clearHistory() {
    calculationHistory = [];
    updateHistoryPanel();
}

// تغییر تم
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const themeBtn = document.getElementById('themeBtn');
    if (document.body.classList.contains('dark-mode')) {
        themeBtn.textContent = '☀️ حالت روز';
    } else {
        themeBtn.textContent = '🌙 حالت شب';
    }
}

// پشتیبانی از کیبورد
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === 'Backspace') {
        if (currentInput.length > 1) {
            currentInput = currentInput.slice(0, -1);
        } else {
            currentInput = '0';
        }
        updateDisplay();
    }
});

// مقداردهی اولیه
updateDisplay();
