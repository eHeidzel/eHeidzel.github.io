// создание объекта
let car = {
    brand: "BMW",
    model: "X5",
    year: 2020,
    drive: function() {
        let ans = "Driving " + this.brand + " " + this.model;
        console.log();
        return ans;
    }
};
  
car.drive(); // Driving BMW X5

// Добавляем новое свойство динамически
car.color = "red";
console.log(car.color); // red

// Удаляем свойство
delete car.year;
console.log(car.year); // undefined

// Проверяем наличие свойств
console.log("brand" in car); // true
console.log(car.hasOwnProperty("model")); // true
console.log(car.hasOwnProperty("year")); // false
console.log(car.hasOwnProperty("toString")); // false

let data = []

for (let key in car) {
    if (car.hasOwnProperty(key)) {
        if (typeof car[key] === "function") {
            data.push(key + " (func): " + car[key]());
        } else {
            data.push(key + ": " + car[key]);
        }
    }
}

console.log(data);

const divFor = document.getElementById('for');
const list = document.createElement('ul');
            
for (let entry of data){
    const listItem = document.createElement('li');
    listItem.textContent = entry;
    console.log(entry);
    list.appendChild(listItem);
}

divFor.appendChild(list);
  
// Используем Object.keys()
let carKeys = Object.keys(car);
console.log("Ключи объекта car: ", carKeys);

// Используем Object.entries()
let carEntries = Object.entries(car);
console.log("Пары ключ-значение: ", carEntries);

// Конструктор для создания объектов типа "Person"
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.sayHello = function() {
      console.log("Привет, меня зовут " + this.name);
    };
}

// Создаем экземпляры объекта
let person1 = new Person("Иван", 30);
let person2 = new Person("Ольга", 25);

person1.sayHello(); // Привет, меня зовут Иван
person2.sayHello(); // Привет, меня зовут Ольга
