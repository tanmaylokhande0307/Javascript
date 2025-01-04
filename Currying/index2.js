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

const curriedJoin = curry(join);
// console.log(curriedJoin(1, 2, 3));
// console.log(curriedJoin(1)(2, 3));
console.log(curriedJoin(1, 2)(3));
