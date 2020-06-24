var words = [
    'ptolemaic',
        'ptolemaica',
    'retrograde',
        'retrogradea',
    'supplant',
    	'supplanta',
    'undulate',
    	'undulatea',
    'xenoepist',
    	'xenoepista',
    'asymptote',  // <-- rotates here!
    'babka',
    'banoffee',
    'engender',
    'karpatka',
    'othellolagkage',
];

// (function(wordArray){		//O^n
// 	for (let i = 0; i < wordArray.length; i++) {
// 		if(wordArray[i]> wordArray[i+1]){
// 			// console.log(i+1);
// 			return i+1;
// 		}
// 	}
// })(words);


(function(wordArray){			//O log n
	var firstWord = wordArray[0],
		floorIndex = 0,
		ceilIndex = wordArray.length-1;
	//console.log(ceilIndex);

	while(floorIndex < ceilIndex){
		console.log(ceilIndex);

		//guess a midpoint
		var midPoint = Math.floor(ceilIndex/2);
		//console.log(midPoint);

		if(firstWord <= wordArray[midPoint]){
			console.log("beginning is bigger than mid so it's in here");
			ceilIndex = midPoint;
			console.log("ceilIndex is "+ ceilIndex);
			console.log("floorIndex is "+ floorIndex);
		}else{
			console.log("beginning is smaller than mid so it's in here");
			floorIndex = midPoint;
			console.log("ceilIndex is "+ ceilIndex);
			console.log("floorIndex is "+ floorIndex);
		}
		// if floor and ceiling have converged
        if (floorIndex + 1 === ceilIndex) {

            // between floor and ceiling is where we flipped to the beginning
            // so ceiling is alphabetically first
            break;
        }
	}
	console.log(ceilIndex);
	return ceilIndex;
})(words);