
var arr = [];
function leastAppearance(choices) {

    for (var x of choices) {
        arr.push(pickANumber(x));
    }
    return arr;
}

function pickANumber([a, b]) {

        //smallest
          var smallest = Math.min(a, b);
//first time return smallest
if (arr.length === 0) {return smallest};
    //get the number of times each appears
   for (var y of arr) {
            let countA = 0;

            let countB = 0;
           if (y == a) countA++;
            if (y == b) countB++;
       // i think this statement needs to be outside the for loop--is that true?
            return countA > countB ? b : (countA<countB ? a : smallest);
        }
}
//
// leastAppearance([[1,2], [3,4], [1,2]]);
