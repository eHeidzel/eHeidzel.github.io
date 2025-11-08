// Базовый класс игры
class Game {
    constructor(minNumber = 1, maxNumber = 100, maxAttempts = 10) {
        this._minNumber = minNumber;
        this._maxNumber = maxNumber;
        this._maxAttempts = maxAttempts;
        this.targetNumber = 0;
        this.attempts = 0;
        this.isGameOver = false;
        this.guessHistory = [];
        this.difficulty = 'normal';
    }

    // Геттеры и сеттеры
    get minNumber() {
        return this._minNumber;
    }

    set minNumber(value) {
        if (value >= 1 && value < this._maxNumber) {
            this._minNumber = value;
        }
    }

    get maxNumber() {
        return this._maxNumber;
    }

    set maxNumber(value) {
        if (value > this._minNumber) {
            this._maxNumber = value;
        }
    }

    get maxAttempts() {
        return this._maxAttempts;
    }

    set maxAttempts(value) {
        if (value > 0) {
            this._maxAttempts = value;
        }
    }

    // Инициализация новой игры
    init() {
        this.targetNumber = this.generateRandomNumber();
        this.attempts = 0;
        this.isGameOver = false;
        this.guessHistory = [];
        console.log(`Загадано число: ${this.targetNumber} (${this.difficulty})`);
    }

    // Генерация случайного числа
    generateRandomNumber() {
        return Math.floor(Math.random() * (this._maxNumber - this._minNumber + 1)) + this._minNumber;
    }

    // Проверка предположения игрока
    checkGuess(guess) {
        if (this.isGameOver) {
            return { valid: false, message: "Игра окончена. Начните новую игру." };
        }

        const numberGuess = parseInt(guess);
        
        if (isNaN(numberGuess) || numberGuess < this._minNumber || numberGuess > this._maxNumber) {
            return { valid: false, message: `Пожалуйста, введите число от ${this._minNumber} до ${this._maxNumber}` };
        }

        this.attempts++;
        this.guessHistory.push(numberGuess);

        if (numberGuess === this.targetNumber) {
            this.isGameOver = true;
            return { 
                valid: true, 
                message: `🎉 Поздравляем! Вы угадали число ${this.targetNumber} за ${this.attempts} попыток!`,
                isCorrect: true
            };
        }

        if (this.attempts >= this._maxAttempts) {
            this.isGameOver = true;
            return { 
                valid: true, 
                message: `💀 Игра окончена! Загаданное число было: ${this.targetNumber}`,
                isGameOver: true
            };
        }

        const hint = numberGuess < this.targetNumber ? "больше" : "меньше";
        return { 
            valid: true, 
            message: `Не угадали! Попробуйте число ${hint}.`,
            hint: hint,
            attemptsLeft: this._maxAttempts - this.attempts
        };
    }

    // Получить историю попыток
    getGuessHistory() {
        return this.guessHistory;
    }

    // Получить оставшиеся попытки
    getRemainingAttempts() {
        return this._maxAttempts - this.attempts;
    }

    // Получить информацию о диапазоне
    getRangeInfo() {
        return `Диапазон: ${this._minNumber}-${this._maxNumber}, попыток: ${this._maxAttempts}`;
    }
}

// Класс для сложного уровня
class HardGame extends Game {
    constructor() {
        super(1, 200, 5); // Больше диапазон, меньше попыток
        this.difficulty = 'hard';
    }

    // Переопределяем метод генерации случайного числа для большей сложности
    generateRandomNumber() {
        // Добавляем немного "непредсказуемости" в генерацию
        const baseNumber = super.generateRandomNumber();
        // Делаем числа ближе к краям диапазона более вероятными
        if (Math.random() < 0.3) {
            return baseNumber < 100 ? 
                Math.floor(Math.random() * 50) + 1 : 
                Math.floor(Math.random() * 50) + 151;
        }
        return baseNumber;
    }

    // Переопределяем метод проверки для сложного уровня
    checkGuess(guess) {
        const result = super.checkGuess(guess);
        
        if (result.valid && !result.isCorrect && !result.isGameOver) {
            // Для сложного уровня даем менее конкретные подсказки
            const numberGuess = parseInt(guess);
            const difference = Math.abs(numberGuess - this.targetNumber);
            
            let hintLevel;
            if (difference > 50) hintLevel = "очень далеко";
            else if (difference > 20) hintLevel = "далеко";
            else if (difference > 10) hintLevel = "близко";
            else hintLevel = "очень близко";
            
            result.message = `Не угадали! Вы ${hintLevel} от цели.`;
        }
        
        return result;
    }
}

// Класс для легкого уровня
class EasyGame extends Game {
    constructor() {
        super(1, 50, 15); // Меньше диапазон, больше попыток
        this.difficulty = 'easy';
    }

    // Переопределяем метод проверки для легкого уровня
    checkGuess(guess) {
        const result = super.checkGuess(guess);
        
        if (result.valid && !result.isCorrect && !result.isGameOver) {
            // Для легкого уровня даем более конкретные подсказки
            const numberGuess = parseInt(guess);
            const difference = this.targetNumber - numberGuess;
            
            if (Math.abs(difference) <= 1) {
                result.message = "Очень близко! Попробуйте ещё раз.";
            } else {
                result.message = `Попробуйте число ${difference > 0 ? "больше" : "меньше"}.`;
            }
        }
        
        return result;
    }
}

// Класс для управления интерфейсом игры
class GameUI {
    constructor() {
        this.game = null;
        this.difficultyButtons = document.querySelectorAll('.difficulty-btn');
        this.guessInput = document.getElementById('guessInput');
        this.guessButton = document.getElementById('guessButton');
        this.restartButton = document.getElementById('restartButton');
        this.messageElement = document.getElementById('message');
        this.attemptsElement = document.getElementById('attempts');
        this.historyElement = document.getElementById('history');
        this.gameInfoElement = document.getElementById('gameInfo');

        this.initializeEventListeners();
        this.setDifficulty('normal'); // Устанавливаем сложность по умолчанию
    }

    // Инициализация обработчиков событий
    initializeEventListeners() {
        this.guessButton.addEventListener('click', () => this.handleGuess());
        this.restartButton.addEventListener('click', () => this.startNewGame());
        
        this.guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleGuess();
            }
        });

        // Обработчики для кнопок сложности
        this.difficultyButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.setDifficulty(e.target.dataset.difficulty);
            });
        });
    }

    // Установка сложности игры
    setDifficulty(difficulty) {
        // Обновляем активную кнопку
        this.difficultyButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.difficulty === difficulty);
        });

        // Создаем соответствующую игру
        switch (difficulty) {
            case 'easy':
                this.game = new EasyGame();
                break;
            case 'hard':
                this.game = new HardGame();
                break;
            default:
                this.game = new Game();
        }

        this.startNewGame();
    }

    // Обработка предположения игрока
    handleGuess() {
        const guess = this.guessInput.value;
        const result = this.game.checkGuess(guess);

        if (!result.valid) {
            this.showMessage(result.message, 'error');
            return;
        }

        if (result.isCorrect) {
            this.showMessage(result.message, 'success');
            this.disableInput();
        } else if (result.isGameOver) {
            this.showMessage(result.message, 'error');
            this.disableInput();
        } else {
            this.showMessage(result.message, 'info');
            this.updateAttemptsInfo();
            this.updateHistory(guess, result.hint);
        }

        this.guessInput.value = '';
        this.guessInput.focus();
    }

    // Начать новую игру
    startNewGame() {
        this.game.init();
        this.enableInput();
        this.clearMessages();
        this.updateGameInfo();
        this.updateAttemptsInfo();
        this.clearHistory();
        
        const rangeInfo = this.game.getRangeInfo();
        this.showMessage(`Я загадал число. ${rangeInfo}. Попробуйте угадать!`, 'info');
    }

    // Обновить информацию о игре
    updateGameInfo() {
        this.gameInfoElement.textContent = this.game.getRangeInfo();
        this.guessInput.min = this.game.minNumber;
        this.guessInput.max = this.game.maxNumber;
        this.guessInput.placeholder = `${this.game.minNumber}-${this.game.maxNumber}`;
    }

    // Показать сообщение
    showMessage(message, type) {
        this.messageElement.textContent = message;
        this.messageElement.className = `message ${type}`;
    }

    // Очистить сообщения
    clearMessages() {
        this.messageElement.textContent = '';
        this.messageElement.className = 'message';
    }

    // Обновить информацию о попытках
    updateAttemptsInfo() {
        this.attemptsElement.textContent = `Осталось попыток: ${this.game.getRemainingAttempts()}`;
    }

    // Обновить историю попыток
    updateHistory(guess, hint) {
        const historyItem = document.createElement('div');
        historyItem.textContent = `Попытка ${this.game.attempts}: ${guess} ${hint ? `(${hint})` : ''}`;
        historyItem.style.margin = '5px 0';
        historyItem.style.fontSize = '14px';
        historyItem.style.color = '#636262';
        this.historyElement.appendChild(historyItem);
    }

    // Очистить историю
    clearHistory() {
        this.historyElement.innerHTML = '';
    }

    // Отключить ввод
    disableInput() {
        this.guessInput.disabled = true;
        this.guessButton.disabled = true;
    }

    // Включить ввод
    enableInput() {
        this.guessInput.disabled = false;
        this.guessButton.disabled = false;
        this.guessInput.focus();
    }
}

// Инициализация игры при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const gameUI = new GameUI();
});