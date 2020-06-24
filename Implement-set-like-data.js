//Implement a set-like data structure that supports Insert, Remove, and GetRandomElement efficiently.
//Example: If you insert the elements 1, 3, 6, 8 and remove 6, the structure should contain [1, 3, 8].
//Now, GetRandom should return one of 1, 3 or 8 with equal probability.

var insert,
	remove,
	getRando,
	result,
	myStructure = {
		insert: function(x){
			return result.push(x)},
		remove: function(y){
			var indexOfY = result.findIndex(y);
			if(indexOfY){
				return result.splice(indexOfY, 1);
			}
		},
		getRando: function(z){
			var ranDo = Math.floor((Math.random() * 9) + 0);
			return result(ranDo);
		},
		result:[]
	}

myStructure.insert(1);
myStructure.insert(3);
myStructure.insert(6);
myStructure.insert(8);
myStructure.remove(6);

console.log(myStucture.result);   			//===[1,3,8]



//Example: If you insert the elements 17, 8, 1, 11 and remove 1, the structure should contain [17, 8, 11].
//meaning not sorted? or sorted?
