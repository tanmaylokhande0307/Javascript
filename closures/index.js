// function outer(){
//     function inner(){
//         console.log(a);
//     }
//     let a = 1;
//     return inner;
// }

// const inn = outer();

// inn();


for(var i = 0; i< 3; i++) {
    {
        var c = 0;
        
        setTimeout(() => {
            console.log(c++);
        },i*1000)
    }
}

