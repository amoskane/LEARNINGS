//Write a function called strictEquals(a, b)
//that returns the same value as a === b.
//Your implementation must not use the === or !== operators.

//NaN === NaN is always false: UNEXPECTED
//Object.is(NaN, NaN)); // true

//Both 0 === -0 and -0 === 0 are always true: UNEXPECTED
//Object.is(0, -0)); // false

const strictEquality = (a, b) => {
  if (Object.is(a, b)) {
    //return true unless there's an NaN
    if (Object.is(a, NaN)) {
      return false;
    }
    return true;
  } else {
    //return false unless it's 0 and -0
    if (
      (Object.is(a, -0) && Object.is(b, 0)) ||
      (Object.is(a, 0) && Object.is(b, -0))
    ) {
      return true;
    }
    return false;
  }
};

console.log(strictEquality(0, -0));

// There is one usage of it that is relatively common and is worth knowing:
// if (x == null) {
//   // ...
// }
// This code is equivalent to writing:
// if (x === null || x === undefined) {
//   // ...
// }

//  This works because NaN === NaN is false, as we already learned.
//  So the reverse (NaN !== NaN) must be true.
//  Since NaN is the only value that’s not equal to itself,
//  size !== size can only mean that size is NaN.
