//rest parameter allows us to pass an indefinite number of arguments as an array
function greet(message,...names){
    console.log(message + " " + 'everyone');
    names.forEach(name => console.log(message + " " + name));
}

greet("Hello","John","Mary")