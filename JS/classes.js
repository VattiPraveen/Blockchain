class Child {
    constructor(name, year) {
        this.name = name;
        this.year = year;
    }
    age(x) {
        return x - this.year;
    }
}

let date = new Date();
let year = date.getFullYear();


let child = new Child("Sara", 2014);

console.log(child.name + " is " + child.age(year) + " years old.");
