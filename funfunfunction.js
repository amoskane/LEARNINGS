1 FILTER AND REJECT

var animals = [
	{ name: 'Fluffykins', species: 'rabbit' },
	{ name: 'Caro', 	  species: 'dog' },
	{ name: 'Hamilton',   species: 'dog' },
	{ name: 'Harold', 	  species: 'fish' },
	{ name: 'Ursula', 	  species: 'cat' },
	{ name: 'Jimmy', 	  species: 'fish' }
]
var isDog = function(animal){
	return animal.species === 'dogs'
}


//filter and reject take a function for the callback
//both are looking for a T or F condition, and including it or excluding it
//based on that.
var dogs = animals.filter(isDog)
var otherAnimals = animals.reject(isDog)

/*
var dogs = []
for (var i = 0; i < animals.length; i++){
	if (animals[i].species === 'dog')
		dogs.push(animals[i])
}
*/


2 MAP
//map is going to transform each object in the array

//as an arrow
var names = animals.map((animal) => {return animal.name + 'is a ' + animal.species})

//if your junk fits on one line you can take out return and {}:
var names = animals.map((animal) => animal.name)

var names = animals.map((x) => x.name)


var names = animals.map(function(animal){
	return animal.name + 'is a ' + animal.species
})
/*
var names = []
for (var i = 0; i < animals.length; i++){
	names.push(animals[i].name)
}
*/



3 REDUCE
//if all other array transform methods fail your case....
var orders = [
	{ amount: 250 },
	{ amount: 400 },
	{ amount: 100 },
	{ amount: 325 }
]

//reduce is a function on the array object
//just like map and filter.

//but reduce wants an object
											//the iterated item
											//is the 2nd argument
										//callback, starting object
var totalAmount = orders.reduce( function(sum, order){
	return sum + order.amount
}, 0)
 //^starting sum value

//so reduce expects a callback, first, and then a starting value.
//reduce can do any array transformation.

/*
var totalAmount = 0
for (var i = 0; i < orders.length; i++){
	totalAmount += orders[i].amount
}
*/

console.log(totalAmount)

//map, filter, reject, find are all array transformations

//from the standard deviation video, this is a most basic use of reduce: summing things:
//AND, this is a recursive, declarative construction:
let orders = [ 3,5,7,8,5,25,8,4 ]

let sumOrders =
	orders.reduce((sum, x) => x + sum, 0)

// let averageOrders =
// 	sumOrders / orders.length

console.log(averageOrders);

//first we need all the differences
let differences =
	orders.map(x => x -averageOrders)
console.log(differences);

let arrayAverage = arr => arr.reduce((sum, x) => x + sum, 0) / arr.length

let averageOrders =
	arrayAverage(orders)

let averageDifference = arrayAverage(differences)   ////====0!! wrong!
//the negatives and positives negate each other, so.

let differences =
	orders.map(x => x - averageOrders).map(Math.abs)

//last thing that needs to happen, to get a REAL standard deviation is that
//you need to take the square root of the differences,
//sum and then un square.

let differences =
	orders.map(x => x - averageOrders).map(x => x * x)
	//which also takes care of the negatives problem...

let standardDeviation = Math.sqrt(averageDifference)







let orders = [ 3,5,7,8,5,25,8,4 ]

let arrayAverage = arr => arr.reduce((sum, x) => x + sum, 0) / arr.length

let averageOrders =
	arrayAverage(orders)
console.log("averageOrders is "+ averageOrders);

let differences =
	orders.map(x => x - averageOrders).map(x => x * x)
console.log("differences is "+ differences);

let averageDifference = arrayAverage(differences)
console.log("averageDifference is "+ averageDifference);

let standardDeviation = Math.sqrt(averageDifference)
console.log(standardDeviation);


// averageOrders is 8.125
// differences is 26.265625,9.765625,1.265625,0.015625,9.765625,284.765625,0.015625,17.015625
// averageDifference is 43.609375
// 6.603739470936145
// undefined


let Outlier =
	orders.map(x => x - averageOrders - standardDeviation > 0)


//averageDifference has a name in statistics: variance.
//variance has many interesting algebraic characteristics.






4 ADVANCED REDUCE
//we summarized the properties a series of objects
//but we can reduce to another array or an object.

data.txt, //tab separated file
mark johansson	waffle iron	80	2
mark johansson	blender	200	1
mark johansson	knife	10	4
Nikita Smith	waffle iron	80	1
Nikita Smith	knife	10	2
Nikita Smith	pot    20	3

we need to transform it to this:

{
	'mark johansson': [
		{ name: 'waffle iron', price: '80', quantity: '2' },
		{ name: 'blender', price: '200', quantity: '1' },
		{ name: 'knife', price: '10', quantity: '4' }
	],
	'nikita smith': [
		{ name: 'waffle iron', price: '80', quantity: '1' },
		{ name: 'knife', price: '10', quantity: '2' },
		{ name: 'pot', price: '20', quantity: '3' }
	]
}

//import filesystem module from node
//old way        var fs = require('fs')
import fs from 'fs'

var output = fs.readfileSync('data.txt')

console.log('output', output);
//returns a buffer of bytes. needs an encoding table

var output = fs.readfileSync('data.txt', 'utf8')
//returns file contents

//start splitting this into an array.
var output = fs.readfileSync('data.txt', 'utf8')
	.split('\n')
//split is a method on the string object that 
//splits the string into an array
//splitting at the new line character.

//you get an array of strings, but with one empty array at the end.
//get rid of empty with 
.trim()

var output = fs.readfileSync('data.txt', 'utf8')
	.trim()
	.split('\n')
	//now split it on each \
	.map(line => line.split('\t'))
	//so now each array has a list of stings
	.reduce((customers, line) => {
		//gives us an empty array for mark and nikita
		customers[line[0]] =[]
		customers[line[0]].push({
			name: line[1],
			price: line[2],
			quantity: line[3]
		})
		return customers
	}, {})
	  //beginning value is an empty object literal



//change
console.log('output', output);
//to
console.log('output', JSON.stingify(output, null, 2));
										//makes a json object with
											//2 spaces for indentation

//only the last item was going into the array, so
//change
customers[line[0]] =[]
//to
customers[line[0]] = customers[line[0]] || []
		//reuse it if it exists,
		//make it if it doesn't




5 CLOSURES
in javascript, functions are not just functions, they are also
closures.

closures have access to the valiables in scopes above them


var me = "Bruce Wayne"
function greetMe() {
	console.log('Hello, '+ me + '!');
};
greetMe()

//we are not calling greetMe with a parameter.
//we are getting me from the above scope.

in a language that did not support closures, you would have to write it like

function greetMe(me) {
	console.log('Hello, '+ me + '!');
};
greetMe("Bruce Wayne")



one example that illustrates why closures are useful:

function sendRequest(){
	var requestID = '123'
	$.ajax({
		url: '/myUrl',
		success: function(){
			alert('Request ' + requestID + ' returned')
		}
	})
}

Good use case for closures:
you start a task,
and you want to specify
something to happen
when that task is done.
with stuff that is available to you when you start.






6 CURRYING

let dragon = (name, size, element) =>
	name + ' is a ' +
	size + ' dragon that breathes ' +
	element + '!'

console.log(dragon('Fluffykins', 'tiny', 'lightning'));


Curried version:
let dragon =
	name =>
		size =>
			element =>
				name + ' is a ' +
				size + ' dragon that breathes ' +
				element + '!'

console.log(dragon('Fluffykins')('tiny')('lightning'));




//go through the array and see if each object has the given element

let hasElement =
	(element, obj) => obj.element === element


let lightningDragons =
	dragons.filter(x => hasElement('lightning', x))

//first, import lodash
import _ from 'lodash'

//then change to:
let hasElement =
	_.curry((element, obj) => obj.element === element)


//then you can remove the wrapping function:
let lightningDragons =
	dragons.filter(hasElement('lightning'))




7 RECURSION

countDownFrom(10)


// should output
// 10
// 9
// 8
// 7
// ...
// 1


let countDownFrom = (num) => {
	if (num === 0) return;
	console.log(num);
	countDownFrom(num-1)
}



//every time you use a loop you could have used recursion.
//BUT, recursion can do thing sloop can't


//so you need to transform this
let categories = [
	{ id: 'animals', 'parent': null},
	{ id: 'mammals', 'parent': 'animals',
	{ id: 'cats', 'parent': 'mammals'},
	{ id: 'dogs', 'parent': 'mammals'},
	{ id: 'chihuahua', 'parent': 'dog'},
	{ id: 'labrador', 'parent': 'dog'},
	{ id: 'persian', 'parent': 'cat'},
	{ id: 'siamese', 'parent': 'cat'}
]



//into this:
{
	animals:{
		mammals:{
			dogs:{
				chihuahua: null
				labrador: null
			}
			cats:{
				persian: null
				siamese: null
			}
		}
	}
}



let categories = [
	{ id: 'animals', 'parent': null},
	{ id: 'mammals', 'parent': 'animals'},
	{ id: 'cats', 'parent': 'mammals'},
	{ id: 'dogs', 'parent': 'mammals'},
	{ id: 'chihuahua', 'parent': 'dogs'},
	{ id: 'labrador', 'parent': 'dogs'},
	{ id: 'persian', 'parent': 'cats'},
	{ id: 'siamese', 'parent': 'cats'}
]

let makeTree = (categories, parent) => {
	let node = {}
	categories
		//keep the ones that have the parent we passed in
		.filter(c => c.parent === parent)
		//for each top level category,
		.forEach(c =>
			//we make a chunk for each id and
						//make a tree with id as the parent
			node[c.id] = makeTree(categories, c.id))
	return node
}

console.log(
	JSON.stringify(
		makeTree(categories, null)
	, null, 2)
);




8 PROMISES
//composable callbacks

//with callbacks
import loadImageCallbacked
from './load-image-callbacked'

loadImageCallbacked('images/cat4.jpg',
	(error, img) => {
		let imgElement =
			document.createElement(img)
		imgElement.src = img.src
		document.body.appendChild(imgElement)
	}
)


//with promises
import loadImagePromised
from '.load-image-promised'

loadImagePromised('images/cat1.jpg')
	.then((img) => {
		let imgElement =
			document.createElement(img)
		imgElement.src = img.src
		document.body.appendChild(imgElement)
	}
)


//or
let whenCatLoaded =
	loadImagePromised('images/cat3.jpg')

whenCatLoaded.then((img) => {
		let imgElement =
			document.createElement(img)
		imgElement.src = img.src
		document.body.appendChild(imgElement)
	}
)



//things get messier with more cats, though.
//app.js with callbacks
import loadImageCallbacked
from './load-image-callbacked'

let addImg = (src) => {
	let imgElement =
		document.createElement(img)
	imgElement.src = src
	document.body.appendChild(imgElement)
}

//this is the callback christmas tree of doom
loadImageCallbacked('images/cat1.jpg', (error, img1) => {
	if(error) throw error;
	addImg(img1.src)
	loadImageCallbacked('images/cat2.jpg', (error, img2) => {
		if(error) throw error;
		addImg(img2.src)
		loadImageCallbacked('images/cat4.jpg', (error, img3) => {
			if(error) throw error;
			addImg(img3.src)
		})
	})
})




//now looking iNSIDE the loadImage callback.
function loadImage(url, callback) {
	let image = new Image()

	image.onload = function(){
		callback(null, image)  //null because we don't have an error, and image because that's the success object.
	};

	image.onerror = function(){
		let message =
			'Could not load image at ' + url
		callback(new Error(msg))
	};

	img.src = url
}
export default loadImage



//rewrite this to return a promise instead of using callbacks.

//probably depricated, but...
import 'babelify/polyfill'

function loadImage(url) {
						//both funcitons
	return new Promise((resolve, reject) => {       //the promise constructor
													//takes a single function as it's argument
		let image = new Image()						//that function takes resolve and reject, which are also functions

		image.onload = function(){
			resolve(image)
		};

		image.onerror = function(){
			let message =
				'Could not load image at ' + url
			reject(new Error(msg))
		};

		img.src = url

	})
}
export default loadImage






//back to app.js:
//app.js with promises
import loadImage
from './load-image-callbacked'

let addImg = (src) => {
	let imgElement =
		document.createElement(img)
	imgElement.src = src
	document.body.appendChild(imgElement)
}

loadImage('images/cat1.jpg').then((img1) => {
	addImg(img1.src)
	loadImage('images/cat2.jpg').then((img2) => {
		addImg(img2.src)
		loadImage('images/cat3.jpg').then((img3) => {
			addImg(img3.src)
		})
	})
})


//BUT STILL HORIIBLE!
//Now use the composibility.

import loadImage
from './load-image'

let addImg = (src) => {
	let imgElement =
		document.createElement(img)
	imgElement.src = src
	document.body.appendChild(imgElement)
}

Promise.all([
	loadImage('images/cat1.jpg'),
	loadImage('images/cat2.jpg'),
	loadImage('images/cat3.jpg')
]).then((images) => {
	images.forEach(img => addImg(img.src))
}).catch((error) => {
	//handle errors here
})


//Promise.all returns a new promise.

//that promise gets then called on it

//then will be called with images, an array of actual result images.











1. ES6 FEATURES. DESTRUCTURING.

var animal = {
	species: 'dog',
	weight: 23,
	sound: 'woof'
}


var { species, sound } = animal
console.log('The '+species+'says '+sound+'!');

//we are destructuring the animal object into 2 local variables

//so you can say species instead of animal.species

//line 519 would be compiled down to this in ES5:
var species = animal.species;
var sound = animal.sound;


//you do this to work with option objects easier.
makeSound({
	species: 'dog',
	weight: 23,
	sound: 'woof'
})

function makeSound(options) {
	console.log('The ' + options.species + ' says' + options.sound + '!');
};
//The dog says woof!


//now we want to make species an optional property on the options object
makeSound({
	weight: 23,
	sound: 'woof'
})


function makeSound(options) {
	console.log('The ' + options.species + ' says' + options.sound + '!');
};
//The undefined says woof!



//NO!
makeSound({
	weight: 23,
	sound: 'woof'
})


function makeSound(options) {
	options.species = options.species || 'animal'      //sets a default value.
	console.log('The ' + options.species + ' says' + options.sound + '!');
};
//The animal says woof!



Problems.
options too many times
is hard to scan


//so you could solve it like this:
function makeSound(options) {
	var species = options.species || 'animal'      //sets a default value.
	var sound = options.sound
	console.log('The ' + options.species + ' says' + options.sound + '!');
};
//The animal says woof!

ok a little better. BUT



//get attributes species and sound from object options.

function makeSound(options) {
	var { species, sound } = options
	species = species || 'animal'
	console.log('The ' + options.species + ' says' + options.sound + '!');
};


BUT what if you could destructe in the method structure
and assign default values in it???



function makeSound({species = 'animal', sound}) {
	console.log('The ' + options.species + ' says' + options.sound + '!');
};



//you can also destructure many levels deep
//and arrays, not just objects.


2 VAR, LET, CONST

//funny behavior of var:
for (var i = 0; i < 10; i++){
	console.log(i);
}

1...9

console.log('after loop', i);

1...10

huh.




ECMA5 only has function scope. Only scope.


//if you:
function counter(){
	for (var i = 0; i < 10; i++){
		console.log(i);
	}
	console.log('after loop', i);
};

counter()

1...10




//if you:
function counter(){
	for (var i = 0; i < 10; i++){
		console.log(i);
	}
};

counter()
console.log('after loop', i);

i is not defined
i really is trapped in the function scope now.



//so ppl do this:
(function (){
	for (var i = 0; i < 10; i++){
		console.log(i);
	}
})()
console.log('after loop', i);

AN IIFE
Immediately
Invoked
Function
Expression



//if you firget the var:
//all that set up was for nothing.
//it's back outside again.
(function (){
	for (i = 0; i < 10; i++){
		console.log(i);
	}
})()
console.log('after loop', i);



//if you
	"use strict"
//it will stop that.





"use strict"
var i = 99999999
;(function (){					//must colon in this case!!!
	for (i = 0; i < 10; i++){
		console.log(i);
	}
})()
console.log('after loop', i);




/////////////the one gotcha is when you start a line with a (
huh.



LET INTRODUCES BLOCK SCOPE.


CONST IS JUST LIKE LET
EXCEPT YOU CANNOT reassign IT

kind of.


"use strict"
let x = 1
x=2
console.log(x);

works, but

"use strict"
const x = 1
x=2
console.log(x);

errors out.

however
"use strict"
const x = {
	y: 5
}
x.y=6
console.log(x);

//gives you { y: 6 }
so objects are still overwritable 

but not this:
"use strict"
const x = {
	y: 5
}
x.y=6
x = {
	z: 9
}
console.log(x);

NOPE..

CONST PREVENTS REASSIGNMENT


why use these?
because
MINIMIZE
MUTABLE
STATE




FACTORIES.
Simply functions that creat objects and return them.

replacement for classes. and better.








#19- the pomodoro button dealie

npm init
went to git hub, made repo, put in repo name
git init
git remote add mpj url
git pull --rebase mpj master

ga 
gc
git push

get coffee



npm install --save express









































