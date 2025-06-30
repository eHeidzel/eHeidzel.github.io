document.getElementById('externalScriptBtn').addEventListener('click', () => {
    alert('Успешный вызов!');
});

function demoIf() {
    let age = prompt('Сколько вам лет?');
    if (age >= 18) {
        alert('Вы совершеннолетний!');
    } else {
        alert('Вы еще несовершеннолетний!');
    }
}

function demoSwitch() {
    let day = prompt('Введите номер дня недели (1-7)');
    switch(day) {
        case '1': alert('Понедельник'); break;
        case '2': alert('Вторник'); break;
        case '3': alert('Среда'); break;
        case '4': alert('Четверг'); break;
        case '5': alert('Пятница'); break;
        case '6': alert('Суббота'); break;
        case '7': alert('Воскресенье'); break;
        default: alert('Некорректный ввод!');
    }
}

function demoFor() {
    let result = '';
    for (let i = 1; i <= 5; i++) {
        result += i + ' ';
    }
    alert(result);
}

function demoWhile() {
    let sum = 0;
    let num = 0;
    while (num !== null) {
        num = prompt('Введите число (отмена для выхода)', '');
        if (num !== null && !isNaN(num)) {
            sum += parseInt(num);
        }
    }
    alert('Сумма: ' + sum);
}

function demoDoWhile() {
    const secret = Math.floor(Math.random() * 10) + 1;
    let guess;
    do {
        guess = parseInt(prompt('Угадайте число от 1 до 10'));
        if (guess < secret) alert('Больше!');
        else if (guess > secret) alert('Меньше!');
    } while (guess !== secret);
    alert('Поздравляю! Вы угадали число ' + secret + '!');
}

function demoBreak() {
    let nums = [1, 3, 5, 6, 7, 8];
    let firstEven;
    
    for (let num of nums) {
        if (num % 2 === 0) {
            firstEven = num;
            break;
        }
    }
    
    alert('Первое четное число из списка [1, 3, 5, 6, 7, 8]: ' + firstEven);
}

function demoContinue() {
    let result = '';
    for (let i = 1; i <= 10; i++) {
        if (i % 2 === 0) continue;
        result += i + ' ';
    }
    alert('Нечетные числа: ' + result);
}

function square(x) {
    return x * x;
}

function demoReturn() {
    let num = prompt('Введите число');
    if (!isNaN(num)) {
        alert('Квадрат числа: ' + square(num));
    } else {
        alert('Это не число!');
    }
}

// Скрипты для раздела 3 (диалоговые окна)
function demoAlert() {
    alert('Это простое сообщение!');
}

function demoConfirm() {
    let result = confirm('Вы уверены?');
    alert(result ? 'Вы согласились!' : 'Вы отказались!');
}

function demoPrompt() {
    let name = prompt('Как вас зовут?', 'Гость');
    alert('Привет, ' + (name || 'Гость') + '!');
}