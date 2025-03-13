class LazyMan {
  constructor(name, logFn) {
    this.queue = [];
    this.name = name;
    this.logFn = logFn;

    this.greet();

    setTimeout(()=>this.nextTask())
  }

  nextTask() {
    const task = this.queue.shift();
    if (task) task();
  }

  greet() {
    this.queue.push(() => {
        this.logFn(`hello ${this.name}`);
        this.nextTask()
    });
    
  }

  eat(food) {
    this.queue.push(() => {
      this.logFn(`Eating ${food}`);
      this.nextTask()
    });
    return this;
  }

  sleep() {
    this.queue.push(() => {
      setTimeout(() => {
        this.logFn(`Slept for ${time} seconds`);
        this.nextTask()
      }, ms * 1000);
    });
    return this;
  }

  sleepFirst(time) {
    this.queue.unshift(() => {
      setTimeout(() => {
        this.logFn(`Slept first for ${time} seconds`);
        this.nextTask();
      }, time * 1000);
    });
    return this;
  }
}

new LazyMan("d", console.log).eat("mango").eat("banana").sleepFirst(2);
