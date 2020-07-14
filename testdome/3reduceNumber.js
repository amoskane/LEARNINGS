function createCheckDigit(membershipId) {
  // Write the code that goes here.

  const memArr = membershipId.split('');
  //console.log(memArr);
  //let startNum = 0;
  const memArrNum = memArr.map((item) => {
    //console.log(item);
    return parseInt(item, 10);
  });
  console.log(memArrNum);
  //console.log(startNum);

  let result;
  const reduceIt = (startArr) => {
    function sumofArray(sum, num) {
      return sum + num;
    }
    const addedup = startArr.reduce(sumofArray, 0);
    result = addedup;
  };

  reduceIt(memArrNum);

  console.log(result);
  //return addedup;
  while (result > 9) {
    const x = result.toString();
    const memArr = x.split('');
    //console.log(memArr);
    //let startNum = 0;
    const memArrNum = memArr.map((item) => {
      //console.log(item);
      return parseInt(item, 10);
    });
    console.log(memArrNum);
    //console.log(startNum);
    reduceIt(memArrNum);
  }
  return result;
}

console.log(
  createCheckDigit(
    '555557676767676764536475867574635567857653796090909090909090909999999999999999999999999999999999999999'
  )
);
