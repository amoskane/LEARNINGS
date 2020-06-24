var gA =   [1, 2, 6, 5, 9],
	result = [];

function getProductsOfAllIntsExceptAtIndex(argArray){

	for (var outer=0; outer<argArray.length; outer++){
		var wholeslot = [];
		for (var inner=0; inner<argArray.length; inner++){

			var slot;
			//console.log("outer is"+outer);
			//console.log("inner is "+inner);

			if(outer != inner){
				//console.log("outer value is "+argArray[outer]);
				//console.log("inner value is "+argArray[inner]);
				slot = argArray[inner];
				console.log("slot is "+slot);  //7, then 3, then 4
				wholeslot.push(slot);
				console.log("wholeslot is "+wholeslot); //7,3,4
			}else{ console.log(outer === inner); }
		}

		//wholeslot = wholeslot * slot; //7*3*4= 84
		var wholeslotproduct = wholeslot.reduce(function(a,b){return a*b;});
		console.log("wholeslotproduct is "+wholeslotproduct);
		result.push(wholeslotproduct);
	}

	console.log("result is "+result);
	return result;

}

console.log(getProductsOfAllIntsExceptAtIndex(gA));





// function getProductsOfAllIntsExceptAtIndex(argArray){

// 	for (var outer=0; outer<argArray.length; outer++){

// 		//clone array
// 		clony = Array.prototype.slice.call(argArray, 0);
// 		//take index out
// 		clony.splice(outer,1);
// 		//reduce array and store as wholeslotproduct
// 		var wholeslotproduct = clony.reduce(function(a,b){return a*b;});

// 		result.push(wholeslotproduct);
// 	}

// 	console.log("result is "+result);
// 	return result;

// }

// console.log(getProductsOfAllIntsExceptAtIndex(gA));







//return   [84, 12, 28, 21]
//by calcing     [7 * 3 * 4,  1 * 3 * 4,  1 * 7 * 4,  1 * 7 * 3]

// for gA[0], gA[1]*gA[2]*gA[3]
// for gA[1], gA[0]*gA[2]*gA[3]
// for gA[2], gA[0]*gA[1]*gA[3]
// for gA[3], gA[0]*gA[1]*gA[2]


//for 1 do 7,3,4
//for 7 do 1,3,4



















