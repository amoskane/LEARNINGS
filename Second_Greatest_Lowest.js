function Second_Greatest_Lowest(arr_num) {
  //organize the numbers by lowest to highest
  arr_num.sort(function(x,y) {
    //console.log(x-y);
    return x-y;
  });
  console.log(arr_num);

  var uniqa = [arr_num[0]];
  //console.log(uniqa);
  var result = [];

  //get rid of same numbers right next to each other
  for(var j=1; j < arr_num.length; j++) {
    //console.log(arr_num[j-1]);
    if(arr_num[j-1] !== arr_num[j]) {
      uniqa.push(arr_num[j]);
    }
  }

  result.push(uniqa[1],uniqa[uniqa.length-2]);
  return result.join(',');

}

//console.log(Second_Greatest_Lowest([1,2,3,4,5]));

console.log(Second_Greatest_Lowest([10,9,8,7,6,5,4,3,2,1,2,3,4,5]));