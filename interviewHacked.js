var fr = [3,4,5,6,1,2];
//find smallest integer

var len = fr.length;
//console.log(len);
var avg = len/2;
console.log(avg);

//split the array at fr[avg]
var first = fr.split(avg);
console.log(first);


if( fr[0]<fr[avg] ){
	console.log("2nd half");
}else{
	console.log("1st half");
}