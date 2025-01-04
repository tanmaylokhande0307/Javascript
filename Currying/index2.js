const curry = (fn) => {
  return (curriedFn = (...args) => {
    if (args.length >= fn.length) {
      return fn(...args);
    } else {
      return function (...nextArgs) {
        return curriedFn(...args, ...nextArgs);
      };
    }
  });
};

const join = (a, b, c) => {
  return `${a}_${b}_${c}`;
};

function sum(a, b, c) {
  return a + b + c;
}

// const curriedJoin = curry(join);
// console.log(curriedJoin(1, 2, 3));
// console.log(curriedJoin(1)(2, 3));
// console.log(curriedJoin(1, 2)(3));

const infiniteSum = (...args) => {
  const sum = args.reduce((a, b) => a + b, 0);

  const adder = (...nextArgs) => {
    if (nextArgs.length === 0) {
      console.log(sum);
      return sum;
    }
    return infiniteSum(sum, ...nextArgs);
  };

  return adder;
};

console.log(infiniteSum(1)(2)(3)(4)(5)());
