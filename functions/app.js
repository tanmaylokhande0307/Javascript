function setupCounter( value ){
    return function counter(){
        return value++;
    }
}

let counter1 = setupCounter(0);
console.log(counter1());
console.log(counter1());