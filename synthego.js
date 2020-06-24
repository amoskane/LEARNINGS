// "-Gdo-Gdo-Ado-Ado-Udo-Gro-Gro- ... -Cro-Uro-Uro-Uro-Ur"

// mods				base    		backbone			linkage
// -				G   			r   				o
// 					A     			d    				r
// 					U   			m
// 					C

// no linkage in last.
// 3+1    instead of 4



// Question 1, Sequence Counts and Masses:
// Sometimes we make a sequence where the measured mass doesn’t seem to line up with the
// input sequence. To figure out what went wrong it is helpful to check the sequences base
// counts and the sequences mass.
// A) Write a function that returns counts for the different parts of the sequence (bases and
// linkages).
// B) Assuming you can ask a chemist for a lookup table of masses write a function that
// converts your counts into a mass.

function checkBase(){
	//masses? huh.
};


// Question 2, Sequence Reformatting:
// Most customers want sequences strings that only show the bases.
// For example,
var sample = "-Gdo-Gdo-Ado-Ado-Udo-Gro-Gro-Cro-Uro-Uro-Uro-Ur";
// could be represented as
// “GGAAUGGCUUUU” .
// However, this obscures the DNA vs. RNA information, so our shipping labels wrap DNA
// bases in square brackets such the sequence would be written as "[GGAAU]GGCUUUU" .
// A) Write a function that converts 4 letter sequences into the shipping label format.

function shipIt(samp){
	// split string into 4 chars + remainder array
	var //chunked = samp.split("-"),    TOO EASY HAHA
		rSet = [],
		dSet = [],
		mSet = [],
		dSetNeat= '',
		rSetNeat='',
		result,
		chunked=[];

	function splitValue(value, index) {
		// add first 4 chars to an array
		//and take them off the string
    	chunked.push(value.substring(0, index));
    	//console.log(value.length);
    	//returns from 4 to the end
	    samp = value.slice(index,value.length);
	}

	while(samp.length>2){
		//console.log("j is "+j);
		//console.log(samp.length);
		splitValue(samp, 4);
	}
	// console.log(chunked);
	// console.log(samp);

	//if 3rd char = r, get 2nd char, assemble sting
	//if 3rd char = d, get 2nd char, assemble sting
	//assuming only r and d matter for this shipping label....
	for (var i= 0; i<chunked.length; i++){
		if(chunked[i].charAt(2)==="r"){
			rSet.push(chunked[i]);
		}else if(chunked[i].charAt(2)==="d"){
			dSet.push(chunked[i]);
		}
	}
	// console.log(rSet);
	// console.log(dSet);

	//assemble final
	for (var i= 0; i<dSet.length; i++){
		dSetNeat = dSetNeat + dSet[i].charAt(1);
	}

	for (var i= 0; i<rSet.length; i++){
		rSetNeat = rSetNeat + rSet[i].charAt(1);
	}
	// console.log(dSetNeat);
	// console.log(rSetNeat);

	result = "["+dSetNeat+"]"+rSetNeat;
	return result;
};

console.log(shipIt(sample));




// Question 3, Sequence Validation:
// Synthego often needs to validate customer provided sequence data.
// Given the definition of a sequence from the setup info section and the following constraints:

// acceptable modifiers : -, m, b, d
// acceptable bases : A, G, C, T, U, R, Y, S, W, K, M, B, D, H, V, N,
// acceptable sugars : d, r, e, m, y, l, k, o
// acceptable linkages : o, s

// A) Write a function that validates an arbitrary input sequence against the definition and
// constraints.
// If the sequence conforms to the definition and all of the constraints, indicate success.
// If the sequence fails to conform, indicate failure, what condition caused failure, and the
// position in the input sequence that caused the failure.

//var sample = "-Gdo-Gdo-Ado-Ado-Udo-Gro-Gro-Cro-Uro-Uro-Uro-Ur"; should pass
var badSample = "-Edo-Gdo-Ado-Ado-Udo-Gro-Gro-Cro-Uro-Uro-Uro-Ur";  //should not pass.

function validateSequence(samp){
	// split string into 4 chars + remainder array
	var //chunked = samp.split("-"),    TOO EASY HAHA
		result,
		chunked = [],
		validFirstIndex = ["-", "m", "b", "d"],
		validSecondIndex = ["A", "G", "C", "T", "U", "R", "Y", "S", "W", "K", "M", "B", "D", "H", "V", "N"];

	function splitValue(value, index) {
    	chunked.push(value.substring(0, index));
	    samp = value.slice(index,value.length);
	}

	while(samp.length>2){
		splitValue(samp, 4);
	}

	//console.log(chunked);

	//i think you;d just do a bunch of regexes here...
	for (var i= 0; i<chunked.length; i++){
		//console.log(chunked[i].charAt(1));
		if(validSecondIndex.includes(chunked[i].charAt(1))){
			result=true;
		}else{
			result=false;
			return result;
		}
	}
	return result;
};

console.log(validateSequence(badSample));




















