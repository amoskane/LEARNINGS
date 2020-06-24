//[1] Given an array of integers, determine whether or not there exist
//two elements in the array (at different positions) whose sum is equal to
//some target value. Examples: [5, 4, 2, 4], 8 --> true [5, 1, 2, 4], 8 --> false

// var someArray = [5, 4, 2, 4],
// 	someTarget = 8,
// 	result = true;


// var someArray = [5, 1, 2, 4],
// 	someTarget = 8,
// 	result = false;


// array[a] + array[b] = target;
// 5 + x = 8, x = 3, f
// 1 + x = 8, x = 7, f
// 2 + x = 8, x = 6, f
// 4 + x = 8, x = 4, t

//whats the best case? n because you have to look at every item in 
//optimize the worst case

var someArray = [],
	someTarget,
	result,
	someDiff,
	isAmatches = [],
	isAmatch;

someArray = [5, 4, 2, 4],
someTarget = 8;

function findTarget(sA, sT){

	for(var i=0; i<sA.length; i++){
		var clone = sA.slice(0); //make a copy

		console.log("clone is "+ clone);

		clone.splice(i, 1); //cut the current out of the copy

		console.log("clone is now "+clone);

		someDiff = someTarget - sA[i];  //8-5=3
		console.log("somediff is "+someDiff);

		isAmatch = clone.indexOf(someDiff);  //is 3 in the array?  -1,0,1,2,3
		console.log("isamatch is "+isAmatch);

		if(isAmatch > 0){
			isAmatch = true;
		}else{
			isAmatch = false;
		}

		isAmatches.push(isAmatch);

	}

	console.log(isAmatches); //does this array contain any true values?


	for(var i=0; i<isAmatches.length; i++){
		if(isAmatches[i]==true){
			//console.log(typeof isAmatches[i]);
			console.log(isAmatches[i] +" is true");
			result = true;
			console.log("result is "+result);
			return;
		}else{
			//console.log(typeof isAmatches[i]);
			console.log(isAmatches[i] +" is false");
			result = false;
		}
	}

	console.log("result is "+result);
};


findTarget(someArray, someTarget);



