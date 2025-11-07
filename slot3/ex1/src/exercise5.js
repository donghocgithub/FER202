const people = [
    { name: "Ann", age: 19 },
    { name: "Bob", age: 21 },
    { name: "Tom", age: 15 },
    { name: "Sue", age: 12 },
    { name: "Liz", age: 17 }
];

const teens = people
    // .filter(person => person.age >= 13 && person.age <= 19)
    //  .map(person => `${person.name} ${person.age}`);
const countTeens = people.reduce((count, p) => {
    if (p.age >= 13 && p.age <= 19) {
        count++;
    }
    return count;
}, 0);

console.log("Số người tuổi teen:",countTeens );

    
teens.forEach(str => console.log(str));