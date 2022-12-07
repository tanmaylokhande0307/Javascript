<<<<<<< HEAD
let message =  {
    name:"John",
    regularFunction: function (){
        console.log(this);
        console.log('Hello '+ this.name);
    },
    arrowFunction: () => {
        console.log(this)
        console.log("Hii " + this.name);
    }
}

message.regularFunction();
message.arrowFunction();

function hi(){
    console.log("hi");
    console.log(this);
}

hi();
 
