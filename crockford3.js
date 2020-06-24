FUNCTIONS.

only diff btwn function expression and function statement
is that the name is mandatory in a function statement.

function statement:

older

function foo() {}
expands to: 
var foo = function foo(){};
expands to:
var foo = undefined;
foo = function foo(){};

unlike ordinary var, both pieces are hoisted to the top of the function.

if the first token of the function is function, 
	then its a function statement.

Otherwise, its a function expression.

generally function expressions are easier to reason about. re:
you cant put a function statement inside an if statement because hoisting.

you might want to have a different function being defined if you take the else branch or the then branch, 
but hoisting doesnt look at branching. And it happens before we know the result of the if.

Browsers let you do it, but they all do it differently so dont do it.

no block scope because of the way vars get hoisted.
function scope.
variables defined in a function are not visible outside the function.

------------------
DO THIS:
Declare all variables at the top of the function.
Declare all functions before you call them.
------------------

every function returns in js.
it will return undefined unless you declare the expression you want returned.
Except for constructors, whose default value is this.

2 psuedo parameters that a function can recieve:
arguments
this

arguments:
-when a function is invoked ,in addition to its parameters, it also gets a special parameter called arguments.
-it contains all of the arguments from the invocation
-it is an array like object, not an array, unfortunately.
-arguments.length is the # of arguments passed. may be diff than the # of parameters passed.
-weird interaction with parameters--its possible to change parameters unexpectedly by changing arguments.
------------------
DO THIS:
-treat as a read only structure!
------------------

change to arguments in EC5 is that arguments is now more array like.
has more arrray methods.

Old way:
function sum(){
	var i,
		n = arguments.length,
		total = 0;
	for (i=0; i<n; i+=1) {
		total =+ arguments[i];
	}
	return total;
}

var ten=sum(1,2,3,4);

New way:
function sum(){
	return arguments.reduce(function(a,b){
		return a+b;
	}, 0);
}


---------------------
this.

-the this parameter contains a reference to the object of invocation.
-this allows a method to know what object it is concerned with.
-this allows a single function object to service many functions.
-this is the key to prototypal inheritance.

invocation:
-the () suffix operator surrounding zero or more comma separated arguments.
-used to call or execute the function
-the arguments will be bound to parameters

-if a function is called with too many arguments, the extras are just ignored, no error thrown.
-if a function is called with too few, the missing values will be undefined.
-there is no implicit type checking on the arguments.


4 ways to call a funciton: they differ in what they do with this.
--Function form
	functionObject(arguments)

	called immediately, no reference to another object.
	this is set to the global object in ES3.
	this is now set to undefined in ES5 Strict.
	but then an inner function does not get access to the outer this. so define 
	var that=this; 
	in the outer object. inner object will have access to <that>.

--Method form
	thisObject.methodName(arguments) or thisObject.functionName(arguments)
	thisObject["methodName"](arguments)

	this is set to thisObject.
	allows methods to have a reference to the object of interest
	allows function to manipulate the object of this.

--Constructor form
	new FunctionObject(arguments)

	when a funciton is called with the new operator, a new object is created and assigned to this.
	if there is not an explicit return value, then this will be returned.
	used in psuedoClassical style

--Apply form 
	functionObject.apply(thisObject, arguments)
	functionObject.call(thisObject, argument)

	both allow us to specify what this is.
	apply takes an array of arguments.
	call takes 0 or more individual parameters.


-this is a bonus parameter. its value depends on the calling form.
-this gives methods access to their objects.
-this is bound at the invocation time.


SIDE EFFECTS.
not exactly math functions.
not totally predictable.

pure functional programming:
if you never assign to a var
	and never change an object once its created.


First reasons for subroutines/functions:
-code reuse
-decomposition //divide and conquer
-modularity //libraries 
-expressiveness
-higher order- like in recursion, when a function calls itself.

classic recursive solution:
1 divide the array into 2 groups, lo and hi. //2 pointers, starting at each end, scan in, when meet done.
2 call quicksort on each group 

STACKS 
original problem with subroutines was that when the program 
jumped to the subroutine it had to destroy the address of where it came from.
Stacks solved that problem, just after the 60s.

other new idea:
CLOSURE
sometimes called Lexical scoping or Static scoping
has to do with how variable names are resolved in nested functions.

-the context of an inner function includes the scope of the outer function.
	so outer function vars are available in the inner function
	even after the outer function has returned
-an inner function enjoys that context even afer the parent functions have returned.


GLOBAL VERSION:
var names = ['zero', 'one', 'two',...];

var digit_name = function(n){
	return names[n];
};

alert(digit_name(3));  //three


SLOW version:
names is now a variable of the digit function
but its slow to init an array and fill it every time.

var digit_name = function(n){
	var names = ['zero', 'one', 'two',...];

	return names[n];
};

alert(digit_name(3));  //three


CLOSURE VERSION:
returns a function, not a value.
An immediately called function.
So digit_name stores the inner function only, not the whole function.
And the inner function still has access to names, even though its function has returned. 

var digit_name = (function(n){
	var names = ['zero', 'one', 'two',...];

	return function(n){
		return names[n];
	};	
}());

alert(digit_name(3));  //three


LAZY, DONT DO THIS:
attempts to delay initialization until later b/c it might be costly.
Until you know it will be called.

var digit_name = function(n){
	var names = ['zero', 'one', 'two',...];

	digit_name = function(n){
		return names[n];
	};
	return digit_name(n);
};

alert(digit_name(3));  //three

actually slower than the slow case we started with 
because digit_name is no longer first class.
digit_name is always modifying itself
if you were to pass it to a function or assign it to an object and let someone call it as a method,
it would have to stuff a new function into itself.
so write into the documentation not to call it, only to access it.


CLOSURE CONDITIONAL:
var digit_name = (function(n){
	var names;
	return function(n){
		if (!names){
			names = ['zero', 'one', 'two',...];
		}
		return names[n];
	};	
}());

alert(digit_name(3));  //three

The cost of an if statement is totally negligible.


ANOTHER EXAMPLE:
function fade(id){
	var dom = document.getElementById(id),
		level = 1;
	function step(){
		//level is now the variable of fade, not the value when it was created
		var h = level.toString(16);
		//same with dom.
		dom.style.backgroundColor = '#FFF'+h+h;
		if (level<15){
			level += 1;
			setTimeout(step, 100);
		}
	}
	//fire step every tenth of a second
	setTimeout(step, 100);
	//now fade is returned and DONE
}

This works because of closure. If you called this on 3 ids at the same time, each would create its
own level and its own step function and none of them would see/crash each other.

step is able to close over step and dom, and so it just works.


LATER METHOD:
Make a later method like setTimeOut, but more object oriented. 
The later method causes a method on the object to be invoked in the future.
my_object.later(1000, "erase", true);

//in ES5
arguments.slice(2)

//in ES3
Array.prototype.slice.apply(arguments, [2]);

//if we don't already have a later
//do it conditionally so that if the language ever adds the functionality, you're not overwriting the native version.
if (typeof Object.prototype.later !== 'function'){
	Object.prototype.later = function(msec, method){
			//this is not captured in closure, but that is.
		var that = this,
			//creat an array of the additional arguments
			args = Array.prototype.slice.apply(arguments, [2]);
		if (typeof method === 'string'){
			method = that[method];
		}
		setTimeout(function(){
			method.apply(that, args);
		}, msec);

		return that;   //Cascade
	};
}



PARTIAL APPLICATION:
a little theoretical now.
Take a function and a parameter and return another function 
which doesnt execute yet but will when given more parameters

function curry(func){
	//get the args except for the first one, cause thats just the funciton
	var args = arguments.slice(1);
	//this function applies the arguments to the function.
	return function(){
		//doing it this way bc arguments need to be an array and the slice function returns an array.
		return func.apply(null, args.concat(arguments.slice()));
	};
}

//this will return a function that will add 1 to whatever it gets.
//this is just an add function and 1
var inc = curry(function add(a.b){
	return a+b;
}, 1);

alert(inc(6)); //7



So what if you have a process which cant be resolved immediately?
maybe it needs lots of computation or has to go out to a worker pool.

need to return something that's not real, and you're not sure when the real one will come.
return a promise.

A promise is an object which allows us to call methods on the thing.
It will queue methods up until the thing comes back.

The promise maker:
will return a set of 5 functions:
when 
fail
fulfill
smash
status

depends on the vouch and resolve methods.



SEALERS/UNSEALERS
sometimes you need to pass secret info around the app.
be able to take an envelope and give it away.
but dont open it.

Sealer maker function--
makes and breaks seals, the 2 functions must be generated in pairs.



Psuedoclassical Inheritance:
//Gizmo's constructor
function Gizmo(id){
	this.id = id;
}
//adding the methods to it that we want the instances to inherit. 
Gizmo.prototype.toString = function(){
	return "gizmo "+ this.id;
};
//ppl mistakenly try to add methods to the constructor all the time.

function Hoozit(id){
	this.id = id;
}
//the hoozit need to inherit from the gizmo
//and, if the gizmo constructer throws error if no parameters then you're sunk.
Hoozit.prototype = new Gizmo();
Hoozit.prototype.test = function(id){
	return this.id === id;
};



Prototypal Inheritance:


























