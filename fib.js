//a series of numbers in which each number
//( Fibonacci number ) is the sum of the two
//preceding numbers.
//The simplest is the series 0, 1, 1, 2, 3, 5, 8, etc.

// const fib = (x) => {
//   let resArr = [];
//   let newNum = 0;

//   const adder = (b1, b2) => {
//     return b1 + b2;
//   };

//   for (let i = 0; i < x; i++) {
//     if (i === 0) {
//       newNum = 0;
//     } else if (i === 1) {
//       newNum = 1;
//     } else {
//       const backOne = resArr[i - 1]; //cache this
//       const backTwo = resArr[i - 2]; //cache this

//       newNum = adder(backOne, backTwo);
//     }

//     resArr.push(newNum);
//   }

//   console.log(resArr);
//   console.log(newNum);
//   return newNum;
// };

const controlfib = (x) => {
  let cacheArr = [];
  //   //let cacheArr = [];
  //   let newNum = 0;

  function fib(n) {
    if (n === 0 || n === 1) {
      cacheArr[n] = n;
      return n;
    }

    const valAt = (n) => {
      //console.log('yes, run before' + n);
      return !!cacheArr[n];
    };

    let one;
    if (valAt(n - 1)) {
      console.log('in cache');
      console.log(cacheArr[n - 1]);
      one = cacheArr[n - 1];
    } else {
      console.log('not in cache');
      //console.log(fib(n - 1));
      one = fib(n - 1);
    }

    let two;
    if (valAt(n - 2)) {
      console.log('in cache');
      console.log(cacheArr[n - 2]);
      two = cacheArr[n - 2];
    } else {
      console.log('not in cache');
      //console.log(fib(n - 2));
      two = fib(n - 2);
    }
    //const two = valAt(n - 2) ? cacheArr[n - 2] : fib(n - 2);

    cacheArr[n] = one + two;
    console.log(cacheArr);
    return one + two;
  }

  console.log(fib(x));
  fib(x);
};

controlfib(11);
