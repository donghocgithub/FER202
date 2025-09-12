const listInt = [1, 2, 3, 4, 5];

for (let i = 0; i < listInt.length; i++) {
    console.log(listInt[i]);
}

listInt.forEach((item, index) => {
    console.log(item);
});

const newArr = listInt.map((item) => {
    return item * 2;
});
console.log(newArr);
console.log(listInt);
const evenArr = listInt.filter((item) => item % 2 === 0);       
console.log(evenArr);
const people = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 19 },
    { id: 3, name: "Peter", age: 30 },
    { id: 4, name: "John", age: 15 },
];          
people.forEach((person) => {        
    console.log(`ID: ${person.id}, Name: ${person.name}, Age: ${person.age}`);
});
const adults = people.filter((person) => person.age > 20);       
console.log(adults);        