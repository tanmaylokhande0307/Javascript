function *timeStampGenerator(){
   
    var ts = Date.now();
    console.log('originalTimestamp ', ts);

    yield ts;    
    console.log('yield ',yield);

    console.log('waiting');
   
    var additionalTime = yield;
    console.log('additional time ',additionalTime);
   
    if(additionalTime){
        ts = ts + additionalTime;
    }
   
    console.log('updated time ',ts)
}

    const it = timeStampGenerator();
    const originalTimestamp = it.next();
    console.log(originalTimestamp);
    it.next();
    it.next(1000*6)