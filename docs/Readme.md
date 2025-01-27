### Event Loop and Queues

Call Stack 
Macrotask [setTimeout,setInterval]
Microtask [Promises]

### Order of Execution

Call Stack

Micro Task queue (promises) gets high priority than macrotask queue
The gets executed immediately after the current script ends but before the next macrotask

Macrotask   
Asynchronous tasks gets executed when the call stack is empty
