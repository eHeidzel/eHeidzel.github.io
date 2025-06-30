function calculateS(t) {
    try {
        if (t < -1) {
            throw new Error("Ошибка: подкоренное выражение отрицательное");
        }

        if (t == 8 || t == -8) {
            throw new Error("Ошибка: деление на 0");
        }
        
        const sqrtValue = Math.sqrt(1 + t);
        
        const f = -t + sqrtValue;
        const s = Math.abs(t);
        return f / (8 - s);
    } catch (error) {
        alert(error.message);
        return null;
    }
}