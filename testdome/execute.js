function wrap(execute) {
  // Return modified function
  let internalResult;
  //   console.log(internalResult);
  try {
    internalResult = execute();
  } catch (e) {
    return null;
  }
  return internalResult;
  //   if (internalResult instanceof Error) {
  //     //     return null;
  //     console.log('yes');
  //   } else {
  //     //     return internalResult;
  //   }
}

const err = function () {
  throw new Error('Error');
};

const res = function () {
  return 'Result';
};

var errorExec = wrap(err);

var resultExec = wrap(res);

console.log(errorExec && errorExec()); // Should output null
console.log(resultExec && resultExec()); // Should output "Result"
