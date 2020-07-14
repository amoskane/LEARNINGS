const sortedArr = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  31,
  32,
  33,
  34,
  35,
  36,
  37,
  38,
  39,
  110,
  111,
  112,
  113,
  114,
  115,
  116,
  117,
  118,
  119,
  120,
];

const findValue = (array, val) => {
  let arrL = array.length;
  console.log('arrL is outside' + arrL);
  //let arrEnd = arrL - 1;
  const splitAndCompare = (arr) => {
    arrL = arr.length;
    console.log('---------');
    console.log('arrL is inside' + arrL);
    const half = Math.floor(arrL / 2);
    console.log(half);
    //console.log(arr);
    if (half) {
      if (arr[half] === val) {
        console.log('true!');
        return true;
      } else if (arr[half] > val) {
        const firsthalf = arr.splice(0, half);
        console.log(firsthalf);
        //console.log('arrL is ' + arrL);
        splitAndCompare(firsthalf);
      } else {
        const secondhalf = arr.splice(half, arrL);
        console.log(secondhalf);
        //console.log('arrL is ' + arrL);
        splitAndCompare(secondhalf);
      }
    } else {
      console.log('false!');
      return false;
    }
  };

  if (arrL >= 1) {
    //console.log('here?');
    splitAndCompare(array);
  } else {
    console.log('false!');
    return false;
  }
};

findValue(sortedArr, 31);
