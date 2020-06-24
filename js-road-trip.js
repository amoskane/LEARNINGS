PEMDAS-- parens, exponent, mult, division, add, subtract

\t for tab stop
\\ for \
\" for "
\n for new line

a=a+3 same as
a+=3

++ increment
-- decrement
string positions are 0 based

charAt(x) returns the character at index x

for ( *start with this*  ;  *loop if this expression is true*  ;  *do this AFTER each loop*){
	do this, each loop
}


&& AND

|| OR

alert
confirm== returns true or cancel
prompt== alert, then returns string

typeof undefined == undefined
typeof null == object

array methods:
length
pop == deletes last item and return string as a value
push == adds to the last cell, no return, length is increased
shift == deletes firs item and returns string as a value

to erase the content of a cell, assign it a value of undefined.

----------------------------------------
----------------------------------------
Section 1: Function EXPRESSIONS


// FUNCTION DECLARATION
function forestFright(){
  var toAlert = "";
  for(var i = 0; i<5; i++){
    toAlert = toAlert + "Lions, Tigers, and Bears, Oh My!!\n";
  }
  alert(toAlert);
}

// FUNCTION EXPRESSION
var runaway = function (){
  var toAlert = "";
  for(var i = 0; i<5; i++){
    toAlert = toAlert + "Lions, Tigers, and Bears, Oh My!!\n";
  }
  alert(toAlert);
};


var numbers = [12,4,3,9,8,6,10,1];

var results = numbers.map( function(arrayCell){ return arrayCell * 2; } );

same as 
var results[];
for(var i=0; i< numbers.length; i++){
	results[i] = collFunction(numbers[i]);
}


//takes one array, returns another
var passengers = [ ["Thomas", "Meeks"], 
                   ["Gregg", "Pollack"], 
                   ["Christine", "Wong"], 
                   ["Dan", "McGaw"] ];

var modifiedNames = passengers.map(function(arrayCell){
		var result = arrayCell[0] +" "+ arrayCell[1];
  	return result;
	}
);

console.log(modifiedNames[0]);


//alerts each user 
var modifiedNames = [ "Thomas Meeks", 
                      "Gregg Pollack", 
                      "Christine Wong", 
                      "Dan McGaw" ];

modifiedNames.map(function(arrayCell){
  alert("Yo, "+arrayCell +"!");
});

//build an array of anonymous functions:
var puzzlers = [a,b,c,d];
var a = function(x){return 3*x-8;};
var b = function(x){return (x+2)*(x+2)*(x+2);};
var c = function(x){return x*x-9;};
var d = function(x){return x%4;};



shift() pops 1st item off an array and returns it.

----------------------------------------
Returning functions and immediate invocation

since functions can be treated as expressions, we can return them as if values.

var parkRides = [["Birch Bumpers", 40], ["Pines Plunge",55], ["Cedar Coaster",20], ["Ferris Wheel of Firs",90]];

var fastPassQueue = [ "Cedar Coaster", "Pines Plunge", "Birch Bumpers", "Pines Plunge"];

var wantsRide = "Birch Bumpers";


var ticket = buildTicket( parkRides, fastPassQueue, wantsRide);

ticket();
//parens and semicolon tell js to call the contents of ticket as a function

				//array of rides, array of fast passes, customer's pick
function buildTicket ( allRides, passRides, pick ){
//check to see if pick is next fast pass available
	if(passRides[0] == pick){
		var pass = fastAvail.shift();
		//treating this function as an expression and returning it directly. Not assigning to a variable.
		return function () {
			alert("Quick! You got a Fast Pass to "+pass+"!");
		};
	}else {
		//go through all rides and check for a match
		for (var i=0; i<allRides.length; i++){
			if(allRides[1][0] == pick){
				return function () {
					alert("A ticket is printing for "+pick+"!\n"+ "Your wait time is about "+allRides[i][1]+" minutes");
				};
			}
		}
	} 
}


----------------------------------------
Doing this using an immediately invoked function:


var wantsRide = "Cedar Coaster";

buildTicket( parkRides, fastPassQueue, wantsRide)();
												//1-add them here
//don't call ticket(); cause we don't have it now

//returns the function 

( function () {
	alert("Quick! You've got a Fast Pass to " +pass+ "!");
})();
  //2-and it adds them here, and then it's an immediately invoked function

//pass is saved in a closure
//pass == "Cedar Coaster"

alerts, then shifts()



//return functions that alert instead of strings:
function adventureSelector ( userChoice ){
  if(userChoice == 1){
  	return function () {
			alert("You've selected the Vines of Doom!\nHope you have a swingin' time.");
		};
  }
  else if(userChoice == 2){
  	return function () {
			alert("Looks like you want the Lake of Despair!\nWatch out for crocs. And I ain't talkin' about shoes.");
		};
  }
  else if(userChoice == 3){
  	return function () {
			alert("The Caves of Catastrophe, really?\nAlright, well....nice knowing you.");
		};
  }
}

//call this with option 3:
adventureSelector(3)();



//go through the puzzle queue, use the result as the start for the next f(x)
var puzzlers = [
  function ( a ) { return 8*a - 10; }, 
  function ( a ) { return (a-3) * (a-3) * (a-3); }, 
  function ( a ) { return a * a + 4; },
  function ( a ) { return a % 5; }
];
var start = 2;

var applyAndEmpty = function (){
  var startLength = puzzlers.length;
  //console.log(startLength);
  for (var i=0; i <= startLength; i++){
  	start = puzzlers[i](start);
    puzzlers.shift();
    return start;
  }
  alert(start);
};

for i 0-4, 

function ( start ) { return 8*start - 10; },
8*2-10
start = 6

function ( start ) { return (start-3) * (start-3) * (start-3); }, 
3*3*3
start = 27

function ( start ) { return start * start + 4; },
27*27+4
start = 733

function ( start ) { return start % 5; }
start = 3




var puzzlers = [
  function ( a ) { return 8*a - 10; }, 
  function ( a ) { return (a-3) * (a-3) * (a-3); }, 
  function ( a ) { return a * a + 4; },
  function ( a ) { return a % 5; }
];
var start = 2;

var applyAndEmpty = function (){
  var startLength = puzzlers.length;
  while (var i=0){
  	start = puzzlers[i](start);
    puzzlers.shift();
    return start;
  }
  alert(start);
};





var puzzlers = [
  function ( a ) { return 8*a - 10; }, 
  function ( a ) { return (a-3) * (a-3) * (a-3); }, 
  function ( a ) { return a * a + 4; },
  function ( a ) { return a % 5; }
];

//“What is obtained when the result of passing 9 into function 4 
//is then passed into the function whose array index matches 
//the result of passing 3 into function 2?”

 alert(puzzlers[puzzlers[1](3)](puzzlers[3](9)));



----------------------------------------
----------------------------------------
Section 2: Closures:

when you return a function from a function, 
complete with variables from an external scope.

the entire contents of one of the inner functions 
will still be available OUTSIDE the outermost function


HERE: pass, pick and allrides are defined externally.
function buildTicket ( allRides, passRides, pick ){
	if(passRides[0] == pick){
		var pass = fastAvail.shift();
		return function () {
			alert("Quick! You got a Fast Pass to "+pass+"!");
		};
	}else {
		for (var i=0; i<allRides.length; i++){
			if(allRides[1][0] == pick){
				return function () {
					alert("A ticket is printing for "+pick+"!\n"+ "Your wait time is about "+allRides[i][1]+" minutes");
				};
			}
		}
	} 
}


 A closure wraps up the entire local environment complete 
 with all necessary variables that came from an external scope. 

 or

 A closure wraps up the entire local environment, 
 binding necessary variables from other scopes.



function testClosure (){
	var x=4;  //local variable only
	return x;
}

testClosure(); -->4
x --> undefined

because x disappears as soon as testClosure function closes.
a functions's local variables aren't 
available once the functions's scope is closed.'



function testClosure (){
	var x=4;  //local variable only
	function closeX(){
		return x;//but closeX can get to testClosure's scope
	}
	return CloseX;
}

The inner function will be able to access the outer function's variables
becasue they "feel like: global variables."'

x is not stored anywhere inside closeX, not even as a parameter.

You can now go:
var checkLocalX = testClosure();

which gives you-->
var checkLocalX = function closeX(){
						return x;
					}

and 
checkLocalX();
--> 4
because even though testClosure has closed scope, 
it's local variables are now bound within checkLocalX.'


Closures make the construction of very similar functions very efficient.


This will make a ticket maker function for each mode of transport:
function buildCoveTicketMaker( transport) {
	return funciton ( name ){
		alert("Here is your trans ticket via the "+transport+".\nWelcome to the Cold Closures Cove, "+name+"!");
	}
}


then
var getSubTix = buildCoveTicketMaker( "Submarine" );
var getBattleshipTix = buildCoveTicketMaker( "Battelship");
var getGiantSeagullTix = buildCoveTicketMaker( "Giant Seagull");


what's inside these'?
getSubTix();
-->
funciton ( name ){
		alert("Here is your trans ticket via the "+transport+".\nWelcome to the Cold Closures Cove, "+name+"!");
	}
getBattleshipTix();
-->
funciton ( name ){
		alert("Here is your trans ticket via the "+transport+".\nWelcome to the Cold Closures Cove, "+name+"!");
	}
getGiantSeagullTix();
-->
funciton ( name ){
		alert("Here is your trans ticket via the "+transport+".\nWelcome to the Cold Closures Cove, "+name+"!");
	}


So, examining the contents of the new variables does NOT reveal the closures.
Bound variables (and their values) will not be evident inside of a stored funciton.

"name" will stay undefined until these are called.

when you call these with names, then they get both:
getSubTix("Mario");-->
Here is your trans ticket via the Submarine.
Welcome to the Cold Closures Cove, Mario!

---------------------------------------

var hidden = mystery();
var result = hidden(3);

function mystery ( ){
  var secret = 6;
  function mystery2 ( multiplier ) { 
    multiplier *= 3;
    return secret * multiplier;
  }
  return mystery2;
}

function mystery ( 3 ){
  var secret = 6;
  function mystery2 ( 3 ) { 
    multiplier *= 3;
    multiplier = 9
    return 6 * 9;
    54
  }
  return mystery2;
  54
}

----------------------------------------

var hidden = mystery(4);
var result  = hidden(2);

function mystery ( input ){
  var secret = 5;
  function mystery2 ( multiplier ) { 
    multiplier *= input;
    return secret * multiplier;
  }
  return mystery2;
}

hidden(2)

mystery(4)==

//now pass in 2
	var secret = 5;
  	function mystery2 ( 2 ) { 
    	multiplier *= 4;
    	multiplier = 8
    	return secret * multiplier;
    	return 5 * 8
  }
  return mystery2;
  40

----------------------------------------

var hidden = mystery(3);
var jumble = mystery3(hidden);
var result = jumble(2);

function mystery ( input ){
  var secret = 4;
  input+=2;
  function mystery2 ( multiplier ) { 
    multiplier *= input;
    return secret * multiplier;
  }
  return mystery2;
}

function mystery3 ( param ){
  function mystery4 ( bonus ){
    return param(6) + bonus;
  }
  return mystery4;
}


jumble(2)
send 2 into mystery3(hidden);


mystery(3) ==
  var secret = 4;
  input+=2;
  input=5
  function mystery2 ( multiplier ) { 
    multiplier *= 5;
    return 4 * multiplier;
  }
  return mystery2;

hidden = function mystery2 ( multiplier ) { 
    multiplier *= 5;
    return 4 * multiplier;
  }

mystery3(function mystery2 ( multiplier ) { 
    multiplier *= 5;
    return 4 * multiplier;
  })



function mystery4 ( bonus ){
    return param(6) + bonus;
  }

  where param(6) is 


function mystery2 ( 6 ) { 
    multiplier *= 5;
    multiplier= 30
    return 4 * multiplier;
    return 120
  })

function mystery4 ( bonus ){
    return 120 + bonus;
  }

jumble = function mystery4 ( bonus ){
    return 120 + bonus;
  }

jumble(2) = function mystery4 ( 2 ){
    return 120 + 2;
  }

  -->122


----------------------------------------
Make a closure:
function warningMaker( obstacle ){
  function warning(){
  	alert("Beware! There have been "+obstacle+" sightings in the Cove today!");
  };
  return warning;
}

Call it for icerbergs:
var icebergAlert= warningMaker("iceberg");
icebergAlert();


Make it take more variables:
function warningMaker( obstacle ){
  return function (number, location) {
    alert("Beware! There have been "+obstacle+" sightings in the Cove today!\n"+number+" "+obstacle +"(s) spotted at the " + location +"!" 
         );
  };
}


----------------------------------------
function warningMaker( obstacle ){
  return function ( number, location ) {
    alert("Beware! There have been " + 
          obstacle + 
          "sightings in the Cove today!\n" +
          number + 
          " " + 
          obstacle + 
          "(s) spotted at the " + 
          location + 
          "!"
         );
  };
}
var killerPenguinAlert = warningMaker("killer penguin");
var polarBearAlert = warningMaker("polar bear");
var icebergAlert = warningMaker("iceberg");
var flashBlizzardAlert = warningMaker("flash blizzard");
var snowYetiAlert = warningMaker("snow yeti");


killerPenguinAlert(6, "Ice Caves");
snowYetiAlert(1, "Blizzard Beach");


----------------------------------------
----------------------------------------
Part 2-- Modifying Bound Values After Closures
Closure functions can even modify bound variables in the background

Lets write a passenger tracker to our buildCoveTicketMaker


function buildCoveTicketMaker( transport) {
	var = passengerNumber = 0;
	return funciton ( name ){
		passengerNumber++;
		alert("Here is your trans ticket via the "+transport+".\nWelcome to the Cold Closures Cove, "+name+"!"
			+"You are passenger #" +passengerNumber+ ".");
	}
}

In the returned function, you dont see that passengerNumber=0.
even though the local scope has disappeared, the values in it are retained.


----------------------------------------
function warningMaker( obstacle ){
  var count = 0;
  return function ( number, location ) {
    count++;
    alert("Beware! There have been " +
          obstacle +
          " sightings in the Cove today!\n" +
          number +
          " " +
          obstacle +
          "(s) spotted at the " +
          location +
          "!\n"+
          "This is Alert #"+count+" today for "+
          obstacle+ " danger."
         );
  };
}


----------------------------------------
Now add list of locations that have alerts:

function warningMaker( obstacle ){
  var count = 0;
  var zones = [];

  return function ( number, location ) {
    count++;
    zones.push(location);
    //var allZones = zones.join(",\n");
    var list = "";
    for(var i = 0; i<zones.length; i++){        
        list = list + "\n" + zones[i];  
    }
    alert("Beware! There have been " +
          obstacle +
          " sightings in the Cove today!\n" +
          number +
          " " +
          obstacle +
          "(s) spotted at the " +
          location +
          "!\n" +
          "This is Alert #" +
          count +
          " today for " +
          obstacle +
          " danger.\nCurrent danger zones are:\n"+
          list
         );
  };
}


----------------------------------------
Now make the list include the number of alerts in each zone:

function warningMaker( obstacle ){
  var count = 0;
  var zones = [];
  return function ( number, location ) {
    count++;
    zones.push([location, number]);
    var list = "";
    for(var i = 0; i<zones.length; i++){        
        list = list + "\n" + zones[i][0]+" ("+zones[i][1]+")";  
    }
    alert("Beware! There have been " +
          obstacle +
          " sightings in the Cove today!\n" +
          number +
          " " +
          obstacle +
          "(s) spotted at the " +
          location +
          "!\n" +
          "This is Alert #" +
          count +
          " today for " +
          obstacle +
          " danger.\n" +
          "Current danger zones are: " +
          list
         );
  };
}



----------------------------------------
----------------------------------------
Section 3 At the moment of Closure...

try to give each passenger a torpedo to be in charge of
					//of a pasenger, a list of passengers
function assignTorpedo ( name, passengerArray ){
	//will eventually hold the torpedo assignment function
	var torpedoAssignment;
	//find name in list
	for (var i=0, i<passengerArray.length; i++){
		//when you find it
		if (passengerArray[i] == name){
			torpedoAssignment = function(){
				alert("Ahoy, "+ name + "!\n" +
					"Man your post at Torpedo #" +(i+1) + "!");
			};
		}
	}
	return torpedoAssignment;
}

var subPassengers = ["Luke", "Leia", "Han", "Chewie", "Yoda", "R2-D2", "C-3PO"];

var giveAssignment = assignTorpedo("Chewie", subPassengers);

giveAssignment();
-->9!! Crap!

Closures bind values at the very last moment, 
so way before torpedoAssignment is returned, the i
loop has gone to 8 and stopped. 8+1=9.


----------------------------------------
Do it like this instead:
function assignTorpedo ( name, passengerArray ){
	//var torpedoAssignment; //take out
	for (var i=0, i<passengerArray.length; i++){
		if (passengerArray[i] == name){
			//instantly return instead of parking in a variable
			return function(){
				alert("Ahoy, "+ name + "!\n" +
					"Man your post at Torpedo #" +(i+1) + "!");
			};
		}
	}
	//return torpedoAssignment; //take out
}


i gets locked into place and Chewie gets 4.


----------------------------------------
or you could design it like the ticketmaker where
you only pass in the list, not the name. Because name gets 
passed in my the caller function

function makeTorpedoAssigner (passengerArray){
	return function (name){
		//loop now goes inside the function expression
		//now passengerArray is in the closure, too.
		//parameters are part of the environment too.
		for (var i=0; i<passengerArray.length; i++){
			if (passengerArray[i] == name){
			//instantly return instead of parking in a variable
			return function(){
				alert("Ahoy, "+ name + "!\n" +
					"Man your post at Torpedo #" +(i+1) + "!");
			};
		}
	}
}

since you put the lopp inside the returned function,
i will come directly from the local scope.

the only closed variable from the external scope is
passengerArray, which never changes.




var listOfSharks = ["Sea Pain", "Great Wheezy", "DJ Chewie", "Lil' Bitey", "Finmaster Flex", "Swim Khalifa", "Ice Teeth", "The Notorious J.A.W."];
var listOfTargets = ["icicle bat", "snow yeti", "killer penguin", "frost tiger", "polar bear", "iceberg", "blue witch", "wooly mammoth"];

function makeTargetAssigner( sharks, targets ){
  return function(shark){
		for(var i=0;i<sharks.length;i++){
			if(shark[i]==shark){
				alert("What up, "+shark+"!\n"+
"There've been "+listOfTargets[i]+" sightings in our 'hood!\nTime for a swim-by lasering, homie!");
			}
		}
  } ; 
}


var getTargetFor = makeTargetAssigner(listOfSharks, listOfTargets );

getTargetFor("Ice Teeth");

What up, xx!
There've been xx sightings in our 'hood!
Time for a swim-by lasering, homie!


----------------------------------------
----------------------------------------
Part 3: HOISTING!!

Memory is set aside when you open a scope
for all necessary variables and declared functions

//as you write it:
function sumOfSquares(a,b){
	var x = add(a*a+b*b);
	return x;

	function add (c,d){
		var a = c + d;
		return a;
	}
}

//as the compiler runs:
function sumOfSquares(a,b){
	//x is hoisted or raised to the top of the stack
	var x = undefined;
	//add is too
	function add (c,d){
		var a=c+d;
		return a;
	}

	x = add(a*a+b*b);
	return x;
}


----------------------------------------

function getMysteryNumber(){
	function chooseMystery(){
		return 12;
	}

	return chooseMystery();

	function chooseMystery(){
		return 7;
	}
}
-->7

----------------------------------------
COMPILER__>
hoist function chooseMystery(){
		return 12;
	}
hoist function chooseMystery(){
		return 7;
	}
overwrite the 12 function
return-->7 
----------------------------------------

both 12 and 7 are hoisted, but 7 last, so 
this returns 7

7 overwrites 12.
last one overwrites previous


function EXPRESSIONS are never hoisted.
they are treated as assignments.

----------------------------------------
This way they are function expressions:

function getMysteryNumber(){
	var chooseMystery=function(){
		return 12;
	}

	return chooseMystery();

	var chooseMystery= function(){
		return 7;
	}
}
-->12

----------------------------------------
COMPILER__>
var chooseMystery ((12))= undefined
var chooseMystery ((7))=  undefined which 
overwrites var chooseMystery ((12))= undefined
executable statement: var chooseMystery ((12))= function
executable statement: return chooseMystery
function terminates
unreachable executable statement: var chooseMystery ((7))= function

-->12
----------------------------------------


function getMysteryNumber(){
	return chooseMystery();

	function chooseMystery(){
		return 12;
	}

	function chooseMystery(){
		return 7;
	}
}
-->ERROR!

----------------------------------------
COMPILER__>
	var chooseMystery ((12))= undefined
	var chooseMystery ((7))=  undefined which 
	overwrites var chooseMystery ((12))= undefined
executable statement: return chooseMystery
function terminates
executable statement: var chooseMystery ((12))= function
unreachable executable statement: var chooseMystery ((7))= function

-->ERROR!
----------------------------------------


So why wouldnt it return undefined from 
var chooseMystery ((7))=  undefined?

because its a variable not a function.


----------------------------------------
Round 1
function capacityStatus (numPassengers, capacity){
	//if the train is full
		//alert that there's no seats

	//if not,
		//alert the number available	
}

Round 2
function capacityStatus (numPassengers, capacity){
	if(numPassengers == capacity){
		noSeats();
	} else {
		seatsAvail();
	}	
}

Round 3
function capacityStatus (numPassengers, capacity){
	if(numPassengers == capacity){
		noSeats();
	} else {
		seatsAvail();
	}	

	var noSeats = function(){
		alert("No seats left, dude!");
		return false;
	}
	
	var seatsAvail = function(){
		alert("There are "+(capacity - numPassengers)+" seats left!");
		return true;
}

capacityStatus(60,60);
-->ERROR

So noSeats and seatsAvail get hoisted as undefined.

condition runs and tells you which function to run

then the assignment happens of the function expressions

so noSeats doesnt exist at the time it is called!

----------------------------------------
First way to fix:
change order of code:

function capacityStatus (numPassengers, capacity){
	var noSeats = function(){
		alert("No seats left, dude!");
		return false;
	}

	var seatsAvail = function(){
		alert("There are "+(capacity - numPassengers)+" seats left!");
		return true;
	}	

	if(numPassengers == capacity){
		noSeats();
	} else {
		seatsAvail();
	}	

};

//why are we returning false and true?
----------------------------------------
Second way to fix:
no function expression, declared functions instead.

function capacityStatus (numPassengers, capacity){
	if(numPassengers == capacity){
		noSeats();
	} else {
		seatsAvail();
	}	

	function noSeats(){
		alert("No seats left, dude!");
		return false;
	}
	
	function seatsAvail(){
		alert("There are "+(capacity - numPassengers)+" seats left!");
		return true;
	}
}

functions get hoisted first,

----------------------------------------
Ex 1:

function thisIsWeird () {

  function secret(){
    var unused3;
  }
  
  var result;

  function secret(){
    var unused1;
  }
  
  result = secret;

  function secret(){
    var unused2;
  }
  
  return result;
}

secret = unused2
result = secret

----------------------------------------
Ex 2:


function theBridgeOfHoistingDoom () {
  function balrog(){
    return "fire";
  }
  var ring;
  function elf(){
    return "pointy ears";
  }
  ring = wizard;
  wizard = balrog;
  return wizard();
  function balrog(){
    return "whip";
  }
  function wizard(){
    return "white";
  }
  var power = ring();
  return elf();
  function elf(){
    return "immortal";
  }
}


hoisted version:

function theBridgeOfHoistingDoom () {
  var ring = undefined;
  var power = undefined;  
  function balrog(){
    return "whip";
  }
  function wizard(){
    return "white";
  }
  function elf(){
    return "immortal";
  }
  ring = wizard;
  wizard = balrog;
  return wizard();
}

Alrighty, here’s the hoisted version. 
The function looks for any variables to create space 
for, finds ring and power, and sets them both to undefined. 

The order of declared functions is 
balrog, elf, balrog, wizard, and elf. 

balrog1, elf1, balrog2, wizard, elf2 

balrog2, wizard, elf2   

The only executable code that actually ever runs 
are the lines that precede and include the 
return of the call to wizard.


----------------------------------------
Ex 3:

function theBridgeOfHoistingDoom () {
  var ring= undefined;
  var power = undefined;

  // function balrog(){
  //   return "fire";
  // }
  
  // function elf(){
  //   return "pointy ears";
  // }
  function balrog(){
    return "whip";
  }
  
  function wizard(){
    return "white";
  }
  
  function elf(){
    return "immortal";
  }

  ring = wizard;//executable
  
  wizard = balrog; //executable
  
  return wizard();
  
  //return elf();//not executable
  
}




function theBridgeOfHoistingDoom( ){
  function fellowship(){
    return "friends";
  }
  var sword = "sting";
  var dwarf = function(){ 
    return "axe";
  };
  var fall = "Fly you fools!";
  fellowship = function(){
    return "broken";
  };
  ring();
  return sword;
  fellowship = function(){
    return "mines"
  };
  sword = function(){
    return "glamdring";
  };
  var ring = function(){
      return "precious";
  };
  
}


First, any declared variables get moved to the top 
of the load, and are initially undefined. //1

These are followed by any declared functions 
in the order they are declared. //2

Any code that is executed, like assignments, 
operations, or function calls, are always last 
and proceed from first appearance in the code body 
to the last.


function theBridgeOfHoistingDoom( ){
  var sword = undefined//1
  var fall = undefined//1
  var dwarf = undefined//1
  var ring = undefined//1

  //Function Declaration//2
  function fellowship(){
    return "friends";
  }
  

  //assignment
  var sword = "sting";
  
  //Function Expression
  var dwarf = function(){ 
    return "axe";
  };
  
  //assignment
  var fall = "Fly you fools!";
  
  //assignment
  fellowship = function(){
    return "broken";
  };
  
  //function call
  ring();
  
  //operation
  return sword;
  
  //assignment
  fellowship = function(){
    return "mines"
  };
  
  //assignment
  sword = function(){
    return "glamdring";
  };
  
  //Function Expression
  var ring = function(){
      return "precious";
  };
  
}

//Step 3
function theBridgeOfHoistingDoom( ){
  var sword = undefined//1
  var fall = undefined//1
  var dwarf = undefined//1
  var ring = undefined//1

  //Function Declaration//2
  function fellowship(){
    return "friends";
  }

  //assignment//3
  sword = "sting";
  
  //Function Expression//3
  dwarf = function(){ 
    return "axe";
  };
  
  //assignment//3
  fall = "Fly you fools!";
  
  //assignment//3
  fellowship = function(){
    return "broken";
  };
  
  //function call//3
  ring();
  
  //operation//3
  return sword;
  
  // //assignment //3=====dead
  // fellowship = function(){
  //   return "mines"
  // };
  
  // //assignment
  // sword = function(){
  //   return "glamdring";
  // };
  
  // //Function Expression
  // var ring = function(){
  //     return "precious";
  // };
  
}


Alrighty, here’s the hoisted version. The function looks for 
any variables to create space for, finds sword, dwarf, fall, and ring, 
and sets them all to undefined. 

There’s only one declared function, fellowship, so that comes next. 
In this case, there are no replacement declared functions. 

The executable code that assigns new values or functions to variable 
has all var keywords popped off. 

Any executable code after the first return of sword is excluded from the answer.

    loadOrder.js

    function theBridgeOfHoistingDoom( ){
      var sword = undefined;
      var dwarf = undefined;
      var fall = undefined;
      var ring = undefined;
      function fellowship(){
        return "friends";
      }
      sword = "sting";
      dwarf = function (){ 
        return "axe";
      };
      fall = "Fly you fools!";
      fellowship = function (){
        return "broken";
      };
      ring();
      return sword;
    }


Remember that there is a difference between declared functions 
and function expressions. How will their load times differ (and why)?

Function declarations (no var) hoist to top, just under var's', with assignment.
Function expressions (var) get hoisted to top in order, without assignment until called.


----------------------------------------
Ex4
OK, whats the reuslt?

function theBridgeOfHoistingDoom( ){
  var sword = undefined;
  var dwarf = undefined;
  var fall = undefined;
  var ring = undefined;
  function fellowship(){
    return "friends";
  }
  sword = "sting";
  dwarf = function (){ 
    return "axe";
  }
  fall = "Fly you fools!";
  fellowship = function (){
    return "broken";
  }
  ring();
  return sword;
}



function theBridgeOfHoistingDoom( ){
  var sword = "sting";
  var dwarf = function (){ 
    return "axe";
  }
  var fall = "Fly you fools!";
  var ring = undefined;
  // function fellowship(){
  //   return "friends";
  // }
  
  
  
  // fellowship = function (){
  //   return "broken";
  // } //what the hell happens here?????
  ring();
  return sword;
}



Examine the ring variable and what happens to it. 
In the original puzzle presented by the Wizard-Devs, 
this variable got assigned a function expression near 
the bottom of theBridgeOfHoistingDoom, but that assignment 
is never reached according to the load order; 
it follows the first encountered return statement which 
made us delete it from our hoisted answer. 
Knowing that, is the sword variable truly the last thing to get returned?

What is produced by the call to ring as a function? 
Anything useful? If not, what happens?


var rr = undefined;
rr();
-->TypeError
so, ERROR

----------------------------------------
----------------------------------------
SECTION 4: OBJECTS.

Objects are containers of related info.
Properties are grouped in objects.

Object : Book
Props: title, author, pages, etc.

An object is a composite value.

----------------------------------------
Ways to build objects:
First: Object Literal

var booksArray=["Great Expectations", "The Remains of the Day", "Peter Pan"];

var myBox = {
	height:6,
	width:8,
	length:10,
	volume:480,
	material:"cardboard",
	contents:booksArray
};

myBox.width;
-->8

myBox.contents;
-->["Great Expectations", "The Remains of the Day", "Peter Pan"]

----------------------------------------
Ways to edit/add to objects:
First: Dot notation


myBox.width = 12;
changes width prop to 12

myBox.weight = 24;
will create the property weight

myBox.volume = myBox.length * myBox.width * myBox.height;
--> 480

myBox.contents.push("On the Road");
-->adds to booksArray even though its outside the object.

----------------------------------------
Second: Bracket notation

you must pass in a string in order to reference the property
myBox["volume"];
-->720

An object is just like an array, but whose indeces are 
accessed by strings instead of numbers.

You can use spaces in the property names with bracket notation:
myBox["# of stops"] = 2;

but you cant use that with dot notation, unless you do this:
console.log(myBox.["# of stops"]);
-->2

----------------------------------------
brackets take expressions, giving us dynamic property access.

in myBox, we already have
destination1: "Orlando"
destination2: "Miami"

for (var i=1; i <= myBox["# of stops"] ;i++){
	console.log( myBox["destination"+i]);
}
-->Orlando
-->Miami


----------------------------------------
delete myBox.contents;
deletes that property, give you a true back
does not delete booksArray.

delete ALWAYS gives you back a TRUE. Cause even if it
wasn't there before, it still isn't there now.

is this property gone? True.


----------------------------------------
so lets create an addBook function to add books to the box:

function addBook (box, name, writer){
	box["# of Books"]++;
	//here's the magic:
	box["book" + box["# of Books"]]= {title:name, author:writer};
	// will return book1
}

creates
book1:{
  title: name,
  author:writer
}
book2:{
  title: name,
  author:writer
}
book3:{
  title: name,
  author:writer
}

addBook(myBox, "Great Expectations", "Charles Dickens");
-->
book1:{
  title: "Great Expectations",
  author:"Charles Dickens"
}

addBook(myBox, "The Remains of the Day", "Kazuo Ishiguro");
book2:{
  title: "The Remains of the Day",
  author:"Kazuo Ishiguro"
}

myBox:{
  height:6, length:10,... "# of Books":2,
  book1{
    title: "Great Expectations",
    author:"Charles Dickens"
  },
  book2:{
    title: "The Remains of the Day",
    author:"Kazuo Ishiguro"
  }
}

chain dots to get into object's object's properties:
myBox.book1.title
--> "Great Expectations"


----------------------------------------

EXERCISES:


  Building Objects I

The ranger-developers at the Ocean of Objects need some help creating three data 
structures for the three different ranger vehicles they use to battle pirates on the Ocean.

Below are some particulars for those vehicles. They are listed in order of type, 
passenger capacity, and storage location.

    Motorboat, 6, Ammunition Depot
    Jet Ski, 1, Reef Dock
    Submarine, 8, Underwater Outpost

In the order listed here, build three JavaScript object literals with names vehicle1, 
vehicle2, and vehicle3. Within these, use the same order of properties as provided above, 
and call your properties type, capacity, and storedAt. Make sure to store numbers as 
number values, and text as string values.

var vehicle1 = {type: "Motorboat", capacity: 6, storedAt: "Ammunition Depot"};
var vehicle2 = {type: "Jet Ski", capacity: 1, storedAt: "Reef Dock"};
var vehicle3 = {type: "Submarine", capacity: 8, storedAt: "Underwater Outpost"};


 Accessing Objects I

One of the ranger-devs comes by to check how many rangers can go to battle the pirates 
using the motorboat. Using one line of code and object access notation, 
log out for him the amount of people that can join the fun.

The vehicle objects are provided for your reference.
console.log(vehicle1.capacity);




Excellent, the vehicle data structures are ready for usage.

Upon your completion of those data structures, the ranger-devs have asked you to build a 
vehicle finding function that will accept a vehicle and list of vehicle objects, 
and return the current location of the requested vehicle. Do the following:

    Put all the vehicle objects in an array by passing in only variable names. Call the array vehicles.
    Build a function expression assigned to a variable findVehicle, which accepts the name of the vehicle sought, as well as an array of vehicles. Call your parameters name and list.
    In findVehicle, check each object in the list parameter to find the object with a type of name. When found, return the storage location of that object.
    Call your built function to find the location of the Submarine.

The vehicle objects are provided for your reference.


var vehicle1 = {type: "Motorboat", capacity: 6, storedAt: "Ammunition Depot"};
var vehicle2 = {type: "Jet Ski", capacity: 1, storedAt: "Reef Dock"};
var vehicle3 = {type: "Submarine", capacity: 8, storedAt: "Underwater Outpost"};

var vehicles = [vehicle1, vehicle2, vehicle3];

var findVehicle = function(name, list){
  for (var i = 0; i<list.length; i++){
    if (list[i].type == name){
      return list[i].storedAt;
    }
  }
};
 
findVehicle("Submarine", vehicles);


----------------------------------------

vehicle1.capacity += 4;
vehicle2.submersible = false;
vehicle3.weapon = "Torpedoes";
vehicle1.submersible = false;
vehicle2.weapon = "Lasers";
vehicle3.capacity *= 2;
vehicle1.weapon = "Rear-Mounted Slingshot";
vehicle3.submersible = true;


----------------------------------------

var superBlinders = [ ["Firelight", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000] ];
var lighthouseRock = {
  gateClosed: true,
  bulbs: [ 200, 500, 750 ],
  capacity: 30,
  secretPassageTo: "Underwater Outpost"
};

delete lighthouseRock.bulbs;
lighthouseRock.weaponBulbs = superBlinders;

for (var i=0; i<superBlinders.length; i++){
  if(superBlinders[i][1]==12000){
		console.log(superBlinders[i][0]);  
  }
}

----------------------------------------


var superBlinders = [ ["Firestorm", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000] ];
var lighthouseRock = {
  gateClosed: true,
  weaponBulbs: superBlinders,
  capacity: 30,
  secretPassageTo: "Underwater Outpost",
  numRangers: 0
};



function addRanger ( location, name, skillz, station ){
  location["numRangers"]++;
  //here's the magic:
  location["ranger" + location["numRangers"]]=
    { name: name, skillz: skillz, station: station };
  // will return ranger1
}


addRanger( lighthouseRock, “Nick Walsh”,“magnification burn”, 2 );
addRanger( lighthouseRock, “Drew Barontini”, “uppercut launch”, 3 );
addRanger( lighthouseRock, “Christine Wong”, “bomb defusing”, 1 );


----------------------------------------


var superBlinders = [ ["Firestorm", 4000], ["Solar Death Ray", 6000], ["Supernova", 12000] ];
var lighthouseRock = {
  gateClosed: true,
  weaponBulbs: superBlinders,
  capacity: 30,
  secretPassageTo: "Underwater Outpost",
  numRangers: 3,
  ranger1: {name: "Nick Walsh", skillz: "magnification burn", station: 2},
  ranger2: {name: "Drew Barontini", skillz: "uppercut launch", station: 3},
  ranger3: {name: "Christine Wong", skillz: "bomb defusing", station: 1}
};

//tell the rangers where they're stationed

function dontPanic(location){
  var list=[];
  //go through each ranger object
  for(var i=1; i<location.numRangers; i++){
    //look at their station and get their superblinder
    var station = location.numRangers[i].station;
    var place = location.weaponBulbs[station][0];
    list.push= location.numRangers[i] +", man the"+ place +"!\n";
  }
  alert("Avast, me hearties!\n"+
  "There be Pirates nearby! Stations!\n"+
        list
  );
}

dontPanic(lighthouseRock);

----------------------------------------

4.10: OBJECT FUNCTIONALITY

Making addThingy functions be a part of the object
instead of outside of it.

var aquarium = {
  Nemo: { type:"fish", species:"clownfish", length: 3.7 },
  "Corral Castle": { type: "environment", material: "coquina", moves: false }
}

function addCritter( container, name, type, species, length ){
  container[name] = {type:type, species:species, length:length};
}

changes to 
var aquarium = {
  Nemo: { type:"fish", species:"clownfish", length: 3.7 },
  "Corral Castle": { type: "environment", material: "coquina", moves: false }
  addCritter( name, type, species, length ){
    this[name] = {type:type, species:species, length:length};
  }
}

container now gone from parameters
aquarium.addCritter(bla,bla,bla);

to take one out:
aquarium.takeOut = function(name){
  //add this to retain name
  this[name].name = name;
  //first name finds the desired object in the aquarium using the parameter as a property
  //2nd name creates a new property inside the object. not the same as the function's parameter
  //3rd name is the parameter "name"
  var temp = this[name];
  delete this[name];
  return temp;
}

var fishOutOfWater = aquarium.takeOut("Marlin");
//but then we lose MArlin's name...



addBulb: function(name, wattage){
    this.weaponBulbs.push([name, wattage]);
  }






var vehicle3 = {
  type: "Submarine", capacity: 8, storedAt: "Underwater Outpost",
  ranger1: { name: "Gregg Pollack", skillz: "Lasering", dayOff: "Friday"},
  ranger2: { name: "Bijan Boustani", skillz: "Roundhouse Kicks", dayOff: "Tuesday"},
  ranger3: { name: "Ashley Smith", skillz: "Torpedoing", dayOff: "Friday"},
  ranger4: { name: "Mark Krupinski", skillz: "Sniping", dayOff: "Wednesday"},
  numRangers: 4
};
function relieveDuty (vehicle, day){
  var offDuty = [];
  var onDuty = [];
  for (var i=1; i<vehicle.numRangers; i++){
      if(vehicle["ranger"+[i]].dayOff == day){
        offDuty.push(vehicle["ranger"+[i]]);
        //var temp = vehicle["ranger"+[i]].name;
        delete vehicle["ranger"+[i]];
        vehicle.numRangers--;
        return offDuty;
        
      }else{
        onDuty.push(vehicle["ranger"+[i]]);
        delete vehicle["ranger"+[i]];
        vehicle.numRangers--;
        return onDuty;
      }
    }
  vehicle.numRangers = onDuty.length;
  for (var n=1; n<vehicle.numRangers; n++){
    vehicle[onDuty][i]= vehicle["ranger"+[i]];
  }
}
relieveDuty(vehicle3, "Friday");





They said this was right:

var vehicle3 = {
  type: "Submarine", capacity: 8, storedAt: "Underwater Outpost",
  ranger1: { name: "Gregg Pollack", skillz: "Lasering", dayOff: "Friday"},
  ranger2: { name: "Bijan Boustani", skillz: "Roundhouse Kicks", dayOff: "Tuesday"},
  ranger3: { name: "Ashley Smith", skillz: "Torpedoing", dayOff: "Friday"},
  ranger4: { name: "Mark Krupinski", skillz: "Sniping", dayOff: "Wednesday"},
  numRangers: 4
};
function relieveDuty (vehicle, day){
  var offDuty = [];
  var onDuty = [];
  for (var i=1; i<vehicle.numRangers; i++){
      if(vehicle["ranger"+i]["dayOff"] == day){
        offDuty.push(vehicle["ranger"+i]);        
      }else{
        onDuty.push(vehicle["ranger"+i]);
      }
    delete vehicle["ranger"+i];
    }
  vehicle.numRangers = offDuty.length;
  for (var n=1; n<vehicle.numRangers; n++){
    //vehicle[onDuty][i]= vehicle["ranger"+[i]];
    vehicle["ranger"+n]= onDuty.shift();
  }
  return offDuty;
}
var offToday = relieveDuty(vehicle3, "Friday");





----------------------------------------
----------------------------------------
Using Enumeration

To know how many fish are in the aquarium:
objects dont have a length.

use the for-in loop.

for ( key in aquarium ){
  console.log(key);
}
key accesses each property in object.
points only to string names in properties
"key" is not special, can use any word.
-->
Nemo
Dory
Bubbles
Peach
Coral Castle
addCritter
takeOut


does current key we're' on has a type that is "fish"

var numFish = 0;
for ( key in aquarium ){
  if ( aquarium[key].type == "fish" ){
    numFish++;
  }
}
//since key contains a string name, 
//u can use it in bracket notation

the functions returning undefined wont
bother the execution or the result.

now:
aquarium.countFish = function(){
  var numFish = 0;
  for ( key in this ){
    if ( this[key].type == "fish" ){
     numFish++;
    }
  }
  return numFish;
}
aquarium.countFish();
-->3

now 
var poorDory = aquarium.takeOut("Dory");
aquarium.countFish();
-->2




EXERCISES:

Build a declared function called listGuns 
that accepts a container of spearguns, 
called guns, as a parameter and logs out 
the name of each Speargun. 
Additionally, use speargun to refer to the 
property names inside your function. 
When your function is built, 
call it on the given shipment of guns.


function listGuns(guns){
  for (key in guns){
    console.log(key);
    var speargun=guns[key];
    console.log(speargun);
  }
}
listGuns(rockSpearguns);





Problem is, the ranger-devs need to know what heft each Speargun has in order to know which one is right for each of their individual aiming styles.

Modify your existing listGuns function to log out the following message for each Speargun contained with the shipping container:

Behold! <speargun name>, with <heft style> heft!

Additionally, use only bracket notation for accessing properties within your function. For efficiency of code, create NO new variables. You’ll still want to call the function at the end, so you can leave that line of code intact.

function listGuns(guns){
  for (key in guns){
    console.log("Behold! "+key+", with "+guns[key]["heft"]+" heft!");
  }
}




Well, you probably know what’s coming. The ranger devs need your awesome function added directly to rockSpearguns, the list of the new Spearguns. Using your knowledge of enumeration and adding functions to JavaScript objects as properties, make your function a part of the rockSpearguns object variable. After you’ve added the function to the object, call the function using an appropriate syntax.

The former declared function is provided for you below. Remember: when you add this function to an object, as it is currently written, it will search through ALL properties of the object…including itself.

You’ll need to devise a way to ensure that only Spearguns get printed in the message for the ranger-devs. Since you’ll now be looking at more than just Spearguns within the rockSpearguns object, change your enumeration reference word to property instead of speargun, so that your code is more intuitive to someone reading it.

Just to add a tiny layer of toughness, the ranger-devs have asked that you use ONLY bracket notation throughout this challenge…no dots.


var listGuns;
rockSpearguns[listGuns] =function (){
  for(var property in this){
    if(property["heft"] != undefined){
    console.log("Behold! " + property +
                ", with " + this[property]["heft"] +" heft!");
    }
  }
};
rockSpearguns[listGuns]();


----------------------------------------
----------------------------------------


PROTOTYPES!!


----------------------------------------
----------------------------------------

Properties automatically assigned at instantiation:
valueOf
constructor
toLocaleString
toString 
isPrototypeOf
propertyIsEnumerable
hasOwnProperty

Object prototype 
-->Array 
-->String 
-->Number 
-->Function prototypes 

Go through a string and count all of one letter.
function countAll (string, letter){...}

now add countAll to the string prototype:
dorothy.countAll("h");

build a new function inside of the string protoype:

String.prototype.countAll = function(letter){
  var letterCount = 0;
  //since the string we're interested in will always be calling itself, this is appropriate.
  for (var i=0; i<this.length; i++){
    if (this.charAt(i).toUpperCase() == letter.toUpperCase() ){
      //if the char you're looking at is letter, both uppercase, then
      letterCount++;
    }
  }
  return letterCount++;
}



Array.prototype.countCattle = function ( kind ){
  var numKind = 0;
  for(var i = 0; i<this.length; i++){
    if(this[i].type == kind){
      numKind++;
    }
  }
  return numKind;
};

alert("There are "+canyonCows.countCattle("calf")+" calves in canyonCows, "
  +valleyCows.countCattle("bull")+" bulls invalleyCows, and "+forestCows.countCattle("cow")+
  " cows in forestCows.");

Object.prototype.noCalvesYet = function(){
  if(this.type == "cow" && this.hadCalf == null){
    return true;
  }
};

Array.prototype.countForBreeding = function(){
  var numToBreed=0;
  for(var i=0; i<this.length; i++){
    if(this[i].noCalvesYet()){
      numToBreed++;
    }
  }
  return numToBreed;
};


Object.prototype.noCalvesYet = function () {
  if(this.type == "cow" && this.hadCalf == null){
    return true;
  }
  return false;
};
Array.prototype.countForBreeding = function(){
  var numToBreed = 0;
  for(var i = 0; i<this.length; i++){
    if(this[i].noCalvesYet()){
      numToBreed++;
    }
  }
  return numToBreed;
};





----------------------------------------
----------------------------------------
Part 2- a 2nd way to build objects using object.create()

var shoe = { size:6, gender:"women", construction:"slipper" };

var magicShoe = Object.create(shoe);
//the 1st argument will be used as the prototype of the new Object.

console.log(magicShoe);
-->Object { size:6, gender:"women", construction:"slipper" };

Object.protoype.isPrototypeOf(shoe);
-->true

shoe.isPrototypeOf(magicShoe);
-->true

So what if you want to make different kinds of shoes? You could make all the shoe properties undefined
but then youd have to add all properties by hand.

Automate the property assignment:

Determine the common properties.
all shoes:  size, color, gender, construction, putOn(), takeOff() 
some shoes: laceColor, laceUp(), jewels, bowPosition, dimentionalTravel()

Build a constructor function for the shoe object.

function Shoe ( shoeSize, shoeColor, forGender, constructStyle){
  this.size = shoeSize;
  this.color = shoeColor;
  this.gender = forGender;
  this.construction = constructStyle;

  this.putOn = function(){ alert("Shoe's on, dood!"); };
  this.takeOff = function(){ alert("Uh, what's that smell?"); };
}

how to use the constructor function:
var beachShoe = new Shoe(10, "blue", "women", "flipflop");
console.log(beachShoe);
--> Shoe {size:10, color:"blue", ...}
now Shoe and not Object.


We now want to pull these out:
  this.putOn = function(){ alert("Shoe's on, dood!"); };
  this.takeOff = function(){ alert("Uh, what's that smell?"); };

by setting a constructors prototype property, every new instance will refer to it for extra properties.
make the constructor a prototype:

Shoe.prototype = {
  //these take a property style now:
  putOn = function(){ alert("Shoe's on, dood!"); };
  takeOff = function(){ alert("Uh, what's that smell?"); };
} 

So now:
function Shoe ( shoeSize, shoeColor, forGender, constructStyle){
  this.size = shoeSize;
  this.color = shoeColor;
  this.gender = forGender;
  this.construction = constructStyle;
}

--------------------------------
exercises:
var genericPost = 
  {x: 0, y: 0, postNum: undefined,
   connectionsTo: undefined,
   sendRopeTo: function ( connectedPost ) {
     if(this.connectionsTo == undefined){
       var postArray = [ ];
       postArray.push(connectedPost);
       this.connectionsTo = postArray;
     } else {
       this.connectionsTo.push(connectedPost);
     }
   }
  };

var post1 = Object.create(genericPost);
post1.x= -2;
post1.y= 4;
post1.postNum= 1;

var post2 = Object.create(genericPost);
post2.x= 5;
post2.y= 1;
post2.postNum= 2;

post1.sendRopeTo(post2);


------------------------
Part 3: Overriding Prototypal Methods 

valueOf:
returns the type as well as the value.

valueOf on custom objects:

var Tornado = function(category, affectedAreas, windGust){
  this.category = category;
  this.affectedAreas = affectedAreas;
  this.windGust = windGust;
};

var cities = [["Kansas City", 464310], ["Topeka", 127939], ["Lenexa", 49398]];
var twister = new Tornado("F5", cities, 220);

twister.valueOf();
-->Tornado{category:"F5", location: Array[3], windGust:220}
//A list of their properties, just like logging them out.

To change what valueOf does, just in the Tornado object:
Tornado.prototype.valueOf = function(){
  var sum = 0;
  for (var i=0; i< this.affectedAreas.length; i++){
    sum += this.affectedAreas[i][1];
  }
  return sum;
};

twister.valueOf();
--> 641647
//sum of all people affected 

valueOf in the Object protoype is never looked at, valueOf in the Tornado object is found first.

since cities array was passed in by reference, youll always get an updated valueOf

---------------------
toString();

calling toString on an array is usually handy.
var a = [3, "blind", "mice"];
a.toString();
-->"3,blind,mice"

var double = function (param){
  return param*2;
}

double.toString();
-->"function(param){
    return param*2;
  }"

//list all the city names when you toString it.
Tornado.prototype.toString = function(){
  var list = "";
  for (var i=0; i<this.affectedAreas.length; i++){
    if (i < this.affectedAreas.length - 1){
      list = list + this.affectedAreas[i][0] + ", ";  
    } else {
      list = list + "and " + this.affectedAreas[i][0];
    }
  }
  return "long string with all the info";
}

--------------------
find an objects constructor and prototype:
twister.constructor;
-->function(category, affectedAreas, windGust){
  ...
}

twister.constructor.prototype;
--> Object {valueOf: funciton, toString: function}

if a prototype object is defined, it will always be a property of the class's' constructor,
  which is just another function object.

shorthand:
twister.__proto__;


--------------------

hasOwnProperty()
to search prototype chains for potential overridden properties.
find location of properties.

Who is the owner of a particular property?

Object.prototype.findOwnerOfProperty = function(propName){
  //set it to the calling object to see if it is there
  var currentObject = this;
  //keep searching the prototype chain until you've gone beyond the Object prototype
  //which has no prototype. Trying to get it would give you null.
  while(currentObject !== null){
    if(currentObject.hasOwnProperty(propName)){
      return currentObject;
    } else{
      currentObject = currentObject.__proto__;
    }
  }
  return "No property found!";
}


twister.findOwnerofProperty("valueOf");
//looks in twister, not there.
//goes up the prototype chain to Tornado, finds it, logs out whole Tornado prototype.



--------------------------
Exercise:

function Fencepost (x, y, postNum){
  this.x = x;
  this.y = y;
  this.postNum = postNum;
  this.connectionsTo = [];
}
Fencepost.prototype = {
  sendRopeTo: function ( connectedPost ){
    this.connectionsTo.push(connectedPost);
  },
  removeRope: function ( removeTo ){
    var temp = [];
    for(var i = 0; i<this.connectionsTo.length; i++){
      if(this.connectionsTo[i].postNum != removeTo){
        temp.push(this.connectionsTo[i]);
      }
    }
    this.connectionsTo = temp;
  },
  movePost: function (x, y){
    this.x = x;
    this.y = y;
  },
  valueOf: function (){
  return Math.sqrt( this.x*this.x + this.y*this.y );
  }
};

Fencepost.prototype.toString= function(){
    var list="";
    for (var i=0; i<this.connectionsTo.length; i++){
      list += this.connectionsTo[i].postNum+ "\n"; 
    }  
    return("Fence post #"+this.postNum+":\n"+
"Connected to posts:\n"+list+
"Distance from ranch: "+this.valueOf()+" yards");
}; 


































