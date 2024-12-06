function f(a){
    return function (b){
        console.log(a,b)
    }
}

console.log(f(2))