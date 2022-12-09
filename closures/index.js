function outer(){
    
    var a = 1,b = 2;
    return function inner(){
        console.log(a);
    }
    
}

const inn = outer();

inn();


// for(var i = 0; i< 3; i++) {
//    function print(c){
//         setTimeout(() => {
//             console.log(c);
//         },i*1000)
//    }
//    print(i);
// }


// function counter(){
//     var count = 0;
    
//     function incCount(){
//         count++;
//     }
// }

// console.log(count);