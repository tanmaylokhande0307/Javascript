class Person {
    constructor(firstName,lsatname){
        this.firstName = firstName;
        this.lsatname = lsatname
    }

    get fullName(){
        return this.firstName + " " + this.lsatname;
    }

    set fullName(fullName){
        var nameParts = fullName.split(' ');
        this.firstName = nameParts[0];
        this.lsatname = nameParts[1];
    }
}

let tan = new Person("Josh","buttler");

tan.fullName = "lokhande tanmay"

const head = document.getElementById("display");

head.innerHTML = tan;
console.log(tan._proto_)
