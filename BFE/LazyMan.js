const sleep = (ms) =>
  new Promise((resolve, rej) => {
    setTimeout(resolve, ms);
  });

const LazyMan = (name, logFn) => {
  const cmds = [["greet", name]];

  const commands = {
    greet: (name) => logFn("Hi, I'm ", name),
    eat: (food) => logFn("Eat ", food),
    sleep: (ms) =>
      sleep(ms * 1000).then(() =>
        logFn(`Wake up after ${ms} second${ms > 1 ? "s" : ""}`)
      ),
  };

  async function exec() {
    for (const [cmd, val] of cmds) {
      await commands[cmd](val);
    }
  }

  setTimeout(exec,0)
  // defer execution of exec so that the cmds array is populated
  // can also be achieved using Promise.resolve().then(exec)

  return {
    sleep(ms) {
      cmds.push(["sleep", ms]);
      return this;
    },
    sleepFirst(ms) {
      cmds.unshift(["sleep", ms]);
      return this;
    },
    eat(food) {
      cmds.push(["eat", food]);
      return this;
    },
  };
};

LazyMan("d",console.log).eat("mango").eat("banana").sleepFirst(1)
