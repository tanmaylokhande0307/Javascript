const cart = ["shoes","prod1","prod2"];
createOrder(cart)
.then(function(orderId){
    console.log(orderId);
    return orderId;
})
.then(function(orderId){
    return proceedToPayment(orderId);
}) 
.then((data) => console.log(data))
.catch((err) => console.log(err.message));


function createOrder(cart){

    const pr = new Promise(function(resolve,reject){
         
        if(!validateCart(cart)){
            const err = new Error("cart is not valid");
            reject(err);
        }

        const orderId = "1234";

        if(orderId){
            setTimeout(() => {
                resolve(orderId);
            },5000)
           
        }

    });

    return pr;

} 

function validateCart(cart){
    return true;
}

function proceedToPayment(orderId){
    return new Promise(function(resolve,reject){
        resolve("Payment successfull");
    });
}