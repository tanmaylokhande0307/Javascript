//pseudo code

function actor(handler, initialState = {}) {
  const queue = [];
  let state = initialState;

  function dequeue(queue) {
    return queue.shift();
  }

  function enqueue(queue, message) {
    return queue.push(message);
  }

  (function loop() {
    console.log(state)
    const event = dequeue(queue);
    if (event !== undefined) {
      state = handler(state, event);
    }
    setTimeout(loop);
  })();

  return {
    send(message) {
      enqueue(queue, message);
    },
  };
}

function handler(state, event) {
  console.log("handling message", state, event);
  return {
    ...state,
    [event]: event,
  };
}

let inititalState = {}
const actor1 = actor(handler,inititalState)
actor1.send("hello")