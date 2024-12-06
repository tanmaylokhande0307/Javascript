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
  return operationMapping[operation](x, y);
};

// console.log(evaluate("sum")(1)(2));

const infiniteSum = (a) => {
  return (b) => {
    if (b) return infiniteSum(a + b);
    else return a;
  };
};

function infiniteSum1(...args) {
  const sum = args.reduce((a, b) => a + b, 0);

  const adder = (...nextArgs) => {
    if (nextArgs.length === 0) {
      return sum;
    }
    return infiniteSum1(sum, ...nextArgs);
  };

  return adder;
}

const newSum = (a, b, c) => a + b + c;

const curry = (fn) => {
  return (curriedFunction = (...args) => {
      if (args.length >= fn.length) {
          return fn(...args);
        } else {
            return (...nextArgs) => {
          console.log(nextArgs);
        return curriedFunction(...args, ...nextArgs);
      };
    }
  });
};

const totalSum = curry(newSum);

console.log(totalSum(5)(23)(28));
