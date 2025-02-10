const loggedMethod = (originalMethod: any,_ctx:any) => {
    console.log(_ctx)
  function decoratedMethod(this: any, ...args: []) {
    console.log("executing decorated method",...args);
    originalMethod.call(this, ...args);
    console.log("execution finished");
  }

  return decoratedMethod
};

class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @loggedMethod
  greet(a:string) {
    console.log(`hello  ${this.name}`);
  }
}


const p = new Person("tan")

p.greet("hi")