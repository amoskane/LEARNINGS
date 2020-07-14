// A binary gap within a positive integer N is any maximal sequence of
// consecutive zeros that is surrounded by ones at both ends in the binary representation of N.

// For example, number 9 has binary representation 1001 and contains a binary gap
// of length 2. The number 529 has binary representation 1000010001 and
// contains two binary gaps: one of length 4 and one of length 3.
// The number 20 has binary representation 10100 and contains one binary gap of length 1.
// The number 15 has binary representation 1111 and has no binary gaps.
// The number 32 has binary representation 100000 and has no binary gaps.

// Write a function:
// function solution(N);

// that, given a positive integer N, returns the length of its longest binary gap.
// The function should return 0 if N doesn't contain a binary gap.

// For example, given N = 1041 the function should return 5,
// because N has binary representation 10000010001 and so its longest binary gap is of length 5.
// Given N = 32 the function should return 0, because N has binary representation '100000'
// and thus no binary gaps.

// Write an efficient algorithm for the following assumptions:

// N is an integer within the range [1..2,147,483,647].

function solution(N) {
  //1041
  const bin = N.toString(2); //10000010001

  //array
  const arr = bin.toString(10).split('');
  console.log(arr); //['1', '0', '0', '0', '0', '0', '1', '0', '0', '0', '1'];
  const len = arr.length;

  let gaps = [];
  let arrayClone = [...arr];

  const saveGaps = array => {
    const firstOne = arrayClone.indexOf('1');
    const cutBack = arrayClone.slice(firstOne + 1, len);
    const interimLen = arrayClone.length;
    const secOne = cutBack.indexOf('1');
    if (secOne === -1) {
      return;
    }
    console.log(secOne);
    const cutBackAgain = cutBack.slice(secOne, interimLen);
    //console.log(cutBackAgain);
    arrayClone = cutBackAgain;
    gaps.push(secOne);
    //console.log(gaps);
    if (arrayClone.length > 1) {
      //console.log(arrayClone.length);
      saveGaps(arrayClone);
    }
  };
  saveGaps(arr);
  const sortedGaps = gaps.sort((a, b) => a - b);
  const lastPos = sortedGaps.length - 1;
  //console.log(sortedGaps[lastPos]);
  const result = sortedGaps.length > 0 ? sortedGaps[lastPos] : 0;
  console.log(result);
  return result;
  //const asNum = parseInt(sortedGaps[0], 10);
  //console.log(asNum);
  //return asNum;
  //find 1st 1, delete it
  //0,0,0,0,0,1
  //find 1st 1, report index 5, delete 5 and back
  //0,0,0,1

  //repeat
}

//solution(1041);
//solution(15);
solution(32);
