
function greet(message,...names){
    console.log(message + " " + 'everyone');
    names.forEach(name => console.log(message + " " + name));
}

greet("Hello","John","Mary")