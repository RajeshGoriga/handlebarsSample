const handlebars = require('handlebars');

// Helper: equals
handlebars.registerHelper('equals', function (arg1, arg2, options) {
  if (arguments.length !== 3) {
    throw new Error("The 'equals' helper requires exactly two arguments.");
  }

  const isEqual = arg1 === arg2;

  if (isEqual) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

// Helper: inc
handlebars.registerHelper('inc', function (num) {
  return parseInt(num) + 1;
});

// Helper: mod
handlebars.registerHelper('mod', function (dividend, divisor) {
  if (arguments.length !== 2) {
    throw new Error("Invalid number of arguments for mod helper.");
  }

  if (!Number.isInteger(dividend) || !Number.isInteger(divisor)) {
    throw new Error("Invalid arguments for mod helper. Numbers expected.");
  }

  return dividend % divisor;
});

// Helper: add
handlebars.registerHelper('add', function (...args) {
  if (args.length < 2) {
    throw new Error("Invalid number of arguments for add helper.");
  }

  let sum = 0;
  for (const arg of args) {
    if (!Number.isFinite(arg)) {
      throw new Error("Invalid arguments for add helper. Numbers expected.");
    }
    sum += arg;
  }

  return sum;
});

