1.SYNTAX SHoRTCUTS
Ternaries.

isArthur && isKing ? (weapon = "Excalibur", helmet = "Goosewhite")
					:
					isArcher ? (weapon = "Longbow", helmet = "Mail Helm")
							: (weapon = "x", helmet = "y")



Or.
this.swords = this.swords ? this.swords : [];
				if this exists, use it, if not, make an empty array.

same as:
this.swords = this.swords || [];

Does not continue if finds a falsey.
if all are truthy, you get the first truthy.
if all are falsey, you get the last one evaled.



And.
takes the rightmost truthy or the first falsey.
if all are truthy, you get the last truthy.
if all are falsey, you get the first falsy found.


array methods:
.indexOf returns the index of the thing, or a -1 if not there.
.splice(index to cut, how many items to cut)
returns an array of the cut out items.

useful in contingent statements:
var weapon = armoryIsOpen && isKnight &&
			 armory.retrieveSword("Claymore");




Switch blocks.
switch(register){
	case 1:
		this.weapon = "Broadsword";
		break;
}


you can do fallthrough on purpose.
	case 4:
	case 7:
	case 8:
		this.weapong = "";
		break


no match? uses the default case:
default:


you can write it so that you start at 5 and get 54321
or start at 8 and get 87654321
if there's no breaks.








2.PERFORMANCE
if you have
	treasureChest.necklaces.length in your loop, move it out into a variable,
x = treasureChest.necklaces.length

better yet, put that whole statement into the loop statement.
for(var i = 1, x = treasureChest.necklaces.length; i < x; i++)
means i and x are only for use in the loop.
x will be available outside of the loop so name it well

try to avoid repetitive access at depth.

methods that you add to a prototype become enumerable,
so they show up jsut like actual items in the array,
if you are using a for- in loop.




script execution.

if its a work intensive script file, move it just above /body.

or add async to the script tag.





short performance tips.
let inheritance help with memory usage
add shared methods to the prototype instead of to each object.



each time you appendChild, there''s a whole DOM reflow.
Stage thigns in a fragment instead and then jsut add the element.

document.createDocumentFragment();

in loop:
fragment.appendChild(element);

outside:
list.appendChild(fragment);

each var statement is a seperate lookup too, so use the comma instead.

try not to declare variables in loops.


efficient string concats:
+= will usually be ok, unless you have a ton of data.
so change
page += newPageBuild[i];
to
page = newPageBuild.join("\n");





console.time

console.time();
console.timeEnd();

takes a string reports out wiht timer info.

production of the timer will get reported too in layered timers.





speed averaging.

var rightNow = new Date();
console.log(rightNow);

== Mon Apr 10 2014 17:50:38 GMT-0500 (EST)


this date measured form 12:00am, JAn 1, 1970: 17:50:38

+rightNow gives whole time in milliseconds.
same as if
new Number (rightNow)


var rightNow = +new Date();

var endTime = +new Date();

endTime-rightNow

function SpeedTest(testImplement, testParams, repetitions){
	this.testImplement = testImplement;
	this.testParams = testParams;
	this.repetitions = repetitions || 10000;
	this.average = 0;
};

SpeedTest.prototype = {
	startTest: function(){
		var beginTime, endTime, sumTimes = 0;
		for (var i = 0, x = this.repetitions; i < x; i++){
			beginTime = +new Date;
			this.testImplement( this.testParams );
			endTime = +new Date;
			sumTimes += endTime = beginTime;
		}
		this.average = sumTimes / this.repetitions;
		return console.log("Average execution across "+ this.repetitions + ": " + this.average);
	}
}

Wrap the func you want to test:
var BP = function( listOfParams ){
	xxx
};

then call it:
var BPTest = new SpeedTest(BP, listForTests, 1000000);
BPTest.startTest();








3.Carefulness
1:34

'4'==4  //true
true == 1 //true
false == 0 //true
"\n \n \t" == 0 //true


=== are usually best for comparison operators.



instanceof checks to see if it is the type of object you think it is.

also use instanceof to check the entire inheritance chain.




1:55
Exception Handling.


syntax error happens at compilation
run-time error happens dutring execution

try block is a test zone for your code.
try{
	alert(alarm);
} catch (error) {
	alert("Uh oh, "+ error)
}



or
} catch (error) {
	if (error instanceof ReferenceError){
		alert(error + "the roster does not exist, check for relocation")
}

or } catch (error) {
	if (error instanceof TypeError){
		alert(error + "the roster has no concat method, check for an overwrite")
}



back in the try block:
when try reaches a throw it exits out and goes intot he catch block.

try {
	var newHallOfFame = ["x", "v"];
	if (list === undefined){
		throw new ReferencError();
	}
	if (list instanceof Array) === false{
		throw new TypeError();
	}
}

there is a finally block that can come after the catch block
that runs no matter what.

finally{
	console.log(list);
}



nested try blocks - can give you optional sequences in case 1st one fails


function changeInnerHTMLByIdorExisting( id, update, existing ){
	try{
		var newElement = undefined;
		document.getElementById(id).innerHTML = update;
	} catch (error){
		try{									//can't find it? try something else first.
			var elements = document.getElementByTagNames('*');
			for(var i = 0, x= elements.length; i<x; i++){  //get EVERYTHING and look for a match
				if(elements[i].innerHTML === existing){
					elements[i].innerHTML = update;
					id = elements[i].id;  //record the unfound id for later
					break;
				}
				if(i ===x){   //couldn't find it.
					throw new Error("An existing element" + "was not found.");
				}
			}
		} catch (error2) {  //if no element was found, we make a new text node
			alert(error2.message + "creating new text node");
			newElement = document.createTextNode(update);
		}
	} finally {
		if(newElement !== undefined){
			console.log("Returning new"+ "text node");
			return newElement;
		} else {
			console.log("Modified element \"" + (id || existing) + ....);
		}
	}
};








2:54
Stuff That (Sometimes) Sucks

avoid with.
with creates a new local scope unexpectedly.
if you try to put a new method on the object the method will actually not attach inside the object but outside of it.

instead, assign the depth to a var and call that.
var o = castle.keep.drawbridge;
o.capacity >= o.soldiers +reinforcements    ...


avoid eval.
takes a string as a param, starts the js compiler, and treats the string like a line of code.
an apostrophe can break the whole thing.

they use it to actually evaluate our code in the wondow, but that''s about the only case.

eval is most often misused for mapping  numbers to objects when arrays should be used.

you shoudl not use eval to stringify JSON.
use JSON.parse




don''t leave off {}''s.
even if you can on if statements.








3:30
Number Nonsense

js used binary floating point values.
0.1 +0.2 = 0.30000000000000004

.toFixed()
select the exact amount of decimals to display.
rounds to last indicated position
and returns a string instead of a number.

.parseFloat()
returns a decimal value.

.parseInt()
seeks first available integer at the front of a string.
returns NaN if string does not start with number.
also will trim off any decimals that may exist, without rounding.

will accept octal, hex and decimal values so look out.
older systems might interpret 021 as "17" in octal.
so give a radix to specify the base.
parseInt("021", 10);
octal values are 2-36.



test for a number before you try to do operations.
typeOf NaN; ///number. Goddammit.

console.log(NaN === NaN);

isNaN("42") //false because it is a string. Or whatever.
//is only really looking for NaN.

if unsure about data type,
and highly reliant on Number, 
use typeOf AND NaN.
(typeof data === "number" && !isNaN(data))


var lambString = '57.98 lazy lambs.'
parseFloat(lambString)
//57.98








4. The Mail of Modularity

namespacing basics
the problem: many people build js files, global vars may conflict.



file 1:
var list = ["jt", "mr", "pg"],
	hof = document.getElementById("hof"),
	fragment = document.createDocumentFragment(), element;

for (var i = 0, list.length; i < x; i++) {
	element = document.createElement("li");
	element.appendChild(document.createTextNode(list[i]) );
	fragment.appendChild(element);
}
hof.appendChild(fragment);



file 2:
var reqs = ["ck", "sd", "gs"],
	list = document.getElementById("reqs"),
	fragment = document.createDocumentFragment(), element;

for (var i = 0, reqs.length; i < x; i++) {
	element = document.createElement("li");
	element.appendChild(document.createTextNode(reqs[i]) );
	fragment.appendChild(element);
}
list.appendChild(fragment);



BUT WHAT IF:
var list = ["jt", "mr", "pg"],
	hof = document.getElementById("hof"),
	fragment = document.createDocumentFragment(), element;

function displayHOF(){  //global function
	for (var i = 0, list.length; i < x; i++) {
		element = document.createElement("li");
		element.appendChild(document.createTextNode(list[i]) );
		fragment.appendChild(element);
	}
	hof.appendChild(fragment);
};
list is displayed on button click.

displayHOF finds the wrong "list"





the key for creating a namespace is a single global object,
a wrapper

var HOFMASTER = {  //conventionally capped.
	list : ["jt", "mr", "pg"],
	hof : document.getElementById("hof"),
	fragment : document.createDocumentFragment(),
	element : undefined,
	displayHOF: function(){
		for (var i = 0, this.list.length; i < x; i++) {
			this.element = document.createElement("li");
			this.element.appendChild(document.createTextNode(this.list[i]) );
			this.fragment.appendChild(this.element);
		}
		this.hof.appendChild(this.fragment);
	},
	BIOGRAPHIES:{

	};
};

onclick = "HOFMASTER.displayHOF();"


nested namespacing is very common in a module pattern.








Anonymous Closures

public methods and vlaues often trigger private methods and values.

so go from a module to a closure:

var ARMORY = {
	weaponList: [ *list of weapons* ],

	makeWeaponRequest: function(){},
	removeWeapon: function(){},
	replaceWeapon: function(){}
};


var ARMORY = (function(){
	var weaponList = [ *list of weapons* ]; //makes this private.
									//belongs to the function and not the namespace
	makeWeaponRequest: function(){},

	var removeWeapon = function(){};
	var replaceWeapon = function(){};
})();
//IIFE


//pull the private stuff to the top
var ARMORY = (function(){
	var weaponList = [ *list of weapons* ];
	var removeWeapon = function(){};
	var replaceWeapon = function(){};

	makeWeaponRequest: function(){},

})();

//in order to make some of the properties public, return an object.
//and that becomes the ARMORY namespace
var ARMORY = (function(){
	var weaponList = [ *list of weapons* ];
	var removeWeapon = function(){};
	var replaceWeapon = function(){};

	return {
		makeWeaponRequest: function(){}
	};

})();

//the closure now produces our desired private methods and values
all the function''s local variables are "bound down"
within the scope of the returned namespace object.

none of the functions''s local variables are ever properties
within the returned namespace object.






Global Imports.
//what if we need a global variable inside a module?

2 problems:
1) if going for a global variable, the entire length of the chain is checked.
2) devs that enounter externally  scoped vars may be unable
to immediately place the source of the variable''s data



so do this:

var wartime = true;
var ARMORY = (function(war){
	var weaponList = [ *list of weapons* ];
	var removeWeapon = function(){};
	var replaceWeapon = function(){};

	return {
		makeWeaponRequest: function(){
			if(war) //let civilians have weapons
		}
	};

})(wartime);

an imported var gets boxed up into the closure.
modifiable in the module but global value stays protected









Augmentation.

Provides extra properties for existing modules.

in a separate file, we keep functions
which will add values or functionality to our existing Armory

set up just like the module, but without the var keyword
because we are modifying an already created module.

you import it like the global it is.



ARMORY = ( function( oldNS ){

})(ARMORY)




ARMORY = ( function( oldNS ){
	var oilBarrels = 1000;  //new closures
	var catapults = ["", "", "", ""];

	oldNS.assignCatapults = function(regiment){
		//hook up a regiment with some oil and catapults
	};
	return oldNS;
})(ARMORY);


augmented sections DO NOT have access to the private data in the
original file!!























