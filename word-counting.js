// find top 5 most used words

var txt =
  'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc';

//convert to arr
const arr = txt.split(' ');

let result = {};
for (let i = 0; i < arr.length; i++) {
  let cleansed = arr[i].toLowerCase();
  const lastChar = cleansed.length - 1;

  if (cleansed[lastChar] === '.' || cleansed[lastChar] === ',') {
    cleansed = cleansed.substring(0, lastChar);
  }

  //console.log(cleansed);
  //console.log(result.hasOwnProperty(cleansed));
  if (result.hasOwnProperty(cleansed)) {
    //console.log('is there already');
    const currentCount = result[cleansed]++;
    //console.log(currentCount);
    //currentCount++
  } else {
    //console.log(i + " is not there")
    result[cleansed] = 1;
  }
  //console.log(result);
}

const resultArr = [];
for (const word in result) {
  resultArr.push([word, result[word]]);
}

resultArr.sort(function (a, b) {
  return b[1] - a[1];
});

//const resultArrLength = resultArr.length;
const topFive = resultArr.slice(0, 5);
console.log(topFive);

const topFiveObj = {};
topFive.forEach(el => {
  //topFiveObj[el[0]];
  topFiveObj[el[0]] = el[1];
});

console.log(topFiveObj);
// obj = {
//     'Lorem': 1
//     'ipsum': 2
// }
