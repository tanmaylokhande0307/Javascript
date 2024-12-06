const f = (a) => (b) => console.log(a, b);

// console.log(f(2)(3))

const sum = (a) => (b) => (c) => a + b + c;

// console.log(sum(1)(3)(3))

const operationMapping = {
  sum: (x, y) => x + y,
  subtraction: (x, y) => x - y,
  multiply: (x, y) => x * y,
  divide: (x, y) => x / y,
};

const evaluate = (operation) => (x) => (y) => {
    return operationMapping[operation](x,y)
};

console.log(evaluate("sum")(1)(2));
