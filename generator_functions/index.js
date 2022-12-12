function *timeStampGenerator(){
    console.log(Date.now().toString());
    yield;
    console.log("execution continues");
}

const it = timeStampGenerator();
it.next();
it.next();

