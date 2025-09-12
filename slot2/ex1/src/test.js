const result = (a, b) => a + b;
console.log(result(2, 3));
let square = (num) => num*num;
console.log(square(5));
let greet =(name,DateofTime) => {
       console.log(`Hello ${name}, Good ${DateofTime}`);
}
       greet("Alice","Morning");
       greet("Bod","Evening");
let sayHello = () => {
       console.log("Hello There");
}
let person ={
    name:"John",
    age:30,
    greet: function() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}
