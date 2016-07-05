const callFirst = (fn, larg) =>
  function(rest) {
  return fn.call(this, larg, rest);
};

const callLast = (fn, rarg) =>
  function(rest) {
  return fn.call(this, rest, rarg);
};

const callLeft = (fn, ...args) =>
  (remainingArgs) =>
    fn(...args, ...remainingArgs);

const callRight = (fn, ...args) =>
 (remainingArgs) =>
   fn(remainingArgs, args);

const unary = (fn) =>
   fn.length === 1 ?
     fn
     : function(something) {
       return fn.call(this, something);
     };

const tap = (value, fn) => {
  const curried = (fn) => (
    typeof(fn) === 'function' && fn(value),
    value
  );

  return fn === 'undefined' ?
    curried
    : curried(fn);
};

'use strict';
const maybe = (fun) =>
  function(args) {
    if (args.length === 0) {
      return;
    } else {
      for (let arg of args) {
        if (arg == null) { return; }
      }
      return fn.apply(this, args);
    }
  };

'use strict';
const once = (fn) => {
  let done = false;

  return function() {
    return done ? void 0 : ((done = true), fn.apply(this, arguments));
  };
};

const leftVariadic = (fn) => {
  if (fn.length < 1) {
    return fn;
  } else {
    return function(args) {
      const gathered = args.slice(0, args.length - fn.length + 1);
      const spread = args.slice(args.length - fn.length + 1);
      return fn.apply(
        this, [gathered].concat(spread)
    ); };
  }
};

const leftGather = (outputArrayLength) => {
  return function(inputArray) {
    return [inputArray.slice(0,
            inputArray.length - outputArrayLength + 1)]
           .concat(
             inputArray.slice(inputArray.length - outputArrayLength + 1)
           );
  };
};

const compose = (a, b) =>
(c) => a(b(c));

const pipeline = (...fns) =>
  (value) =>
    fns.reduce((acc, fn) => fn(acc), value);

const mapWith = (fn) =>
  (list) => list.map(fn);

const flip = (fn) =>
  function(first, second) {
    if (arguments.length === 2) {
      return fn(second, first);
    } else {
      return function(second) {
        return fn(second, first);
      };
    };
  };

const memoized = (fn) => {
  const lookupTable = {};
  return function(...args) {
    const key = JSON.stringify(this, args);
    return lookupTable[key] || (lookupTable[key] = fn.apply(this, args));
  };
};

const getWith = (attr) => (object) => object[attr];

const pluckWith = (attr) => mapWith(getWith(attr));

const deepMapWith = (fn) =>
  function innerdeepMapWith(tree) {
    return Array.prototype.map.call(tree, (element) =>
      Array.isArray(element) ?
        innerdeepMapWith(element)
        : fn(element)
    );
  };
