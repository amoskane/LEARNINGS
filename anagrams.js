const firstWords = ["cinema", "host", "aba", "train"];
const secondWords = ["iceman", "shot", "bab", "rain"];

const isAnagram = (firstList, secondList) => {
  const isSameLetters = str => {
    return str.split("").sort();
  };

  const sortedFirst = firstList.map(isSameLetters);
  //console.log(sortedFirst);

  const sortedSecond = secondList.map(isSameLetters);
  //console.log(sortedSecond);

  //compare 1-1, 2-2, 3-3
  for (let i = 0; i < sortedFirst.length; i++) {
    if (JSON.stringify(sortedFirst[i]) === JSON.stringify(sortedSecond[i])) {
      console.log(1);
    } else {
      console.log(0);
    }
  }
};

isAnagram(firstWords, secondWords);
//

//compare 2 arrays:
//convert them to strings
//JSON.stringify(sortedFirst[i]) === JSON.stringify(sortedSecond[i])
