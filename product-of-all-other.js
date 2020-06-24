
//You have an array of integers, and for each index you want to find
//the product of every integer except the integer at that index.
//
//Write a function getProductsOfAllIntsExceptAtIndex() that takes
//an array of integers and returns an array of the products.
//
//For example, given:
//
//  [1, 7, 3, 4]
//
//your function would return:
//
//  [84, 12, 28, 21]
//
//by calculating:
//
//  [7 * 3 * 4,  1 * 3 * 4,  1 * 7 * 4,  1 * 7 * 3]
//
//Do not use division in your solution.
//

var intArr =  [1, 7, 3, 4],
	result = [];

function getProductsOfAllIntsExceptAtIndex(arr){

	const arrLen = arr.length; //4
	var arrOfArr = [];

	//var arr = [1, 7, 3, 4];

	//arrOfArr.length = arrLen;

	//console.log(arrOfArr);
	//arr[0], arr[1], arr[2], arr[3]

	//create an array of wanted arrays
	//[[7,3,4], [1,3,4], [1,7,4], [1,7,3]]
	//at 1, slice 1 and return [7,3,4]
	for (let i=0; i<arrLen; i++){
		console.log(i); //0

		var copyOfArr = arr;  //copyOfArr = [1, 7, 3, 4]

		copyOfArr.splice(i, 1);  //copyOfArr = [7, 3, 4]

		var newArr = copyOfArr;  //newArr = [7, 3, 4]
		console.log("newArr is "+newArr);

		arrOfArr.push(newArr);
		console.log("arrOfArr "+arrOfArr); //[[7, 3, 4]]
		//copyOfArr = arr;
	}


	//send modArr into multiplier
	//modArr.map( x => x*modArr[] )
}


console.log(getProductsOfAllIntsExceptAtIndex(intArr));