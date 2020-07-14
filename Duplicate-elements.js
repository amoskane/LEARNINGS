function countDuplicate(numbers) {
  const len = numbers.length;
  let hash = {};
  for (let i = 0; i < len; i++) {
    if (hash.hasOwnProperty(numbers[i])) {
      hash[numbers[i]] = hash[numbers[i]] + 1;
      //console.log(hash);
      //if value is not in Hash, inc
    } else {
      hash[numbers[i]] = 1;
      //console.log('is not' + hash);
    }
  }
  //console.log(hash);
  let result = 0;
  for (let [key, value] of Object.entries(hash)) {
    function isNotOne(num) {
      return num !== 1;
    }
    if (isNotOne(value)) {
      //console.log(key);
      //return parseInt(key, 10);
      result++;
    }
  }
  //console.log(result);
  return result;
}

countDuplicate([1, 3, 1, 4, 5, 6, 3, 2]);
