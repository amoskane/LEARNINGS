NUMBERS
parseInt == returns an integer. add a 2nd parameter for number type- base 8, 10, or 16 
parseFloat == returns a decimal

CMD-Opt-J = command line in chrome

if you add a number and a string, js will coerce the number to a string and concat the strings.
isNaN literal == is not a number? returns a boolean.

STRINGS
escape ‘s with \  ‘it is bar\’s fault’

string literal declaration: //better for now.
var foo = “bar”;

object wrapper declaration
baz = new String( “qux” );
//this gives you typeof Object, not String

LOOSELY TYPED
find the type with typeof

COMPARISON OPERATORS
== value but not type
!+ not equal

FALSEY values (7):
0, -0
null, false
NaN, undefined, “”

if you force convert them to a boolean, you get false
!! = force to boolean

IF STATEMENTS
if (condition)
  do…

if (variable) {{if it evaluates to truthy}}




WHILE LOOPS
while (condition)
  statement

continues looping through until condition is not true.

FOR LOOPS
     ((only runs once)) 
for ([initialExpression]; [condition]; [incrementalExpression])
  statement

var arrr = [ “yo”, “ho”, “rum” ],
index;

for (index = 0; index < arrrr.length; index++ ) {
   console.log( index + “: “ + arrrr[ index ] );

condition runs before increment expression

//can do:
index=0;

for (; index < arrrr.length; index++ ) {
   console.log( index + “: “ + arrrr[ index ] );

//or: declare vars in for loop

for (var index = 0, arrr = [ “yo”, “ho”, “rum” ]; index < arrrr.length; index++ ) {
   console.log( index + “: “ + arrrr[ index ] );

FOR LOOP FOR FIBONACCI SEQUENCE:

for ( var i = 2, fs = [ 0, 1 ];
     i < 12; i++ ) {
     fs[i] = fs[ i - 1 ] + fs[ i - 2 ];
}

console.log( fs );

fs[2] = fs[1] + fs[0];
fs[2]= 1


for ( var i = 3, fs = [ 0, 1 , 1];
     i < 12; i++ ) {
     fs[i] = fs[ i - 1 ] + fs[ i - 2 ];
}
fs[3] = fs[2 ] + fs[1 ];
fs[3] = 2

for ( var i = 4, fs = [ 0, 1 , 1, 2];
     i < 12; i++ ) {
     fs[i] = fs[ i - 1 ] + fs[ i - 2 ];
}
fs[4] = fs[3 ] + fs[2 ];
fs[4] = 3

for ( var i = 5, fs = [ 0, 1 , 1, 2, 3];
     i < 12; i++ ) {
     fs[i] = fs[ i - 1 ] + fs[ i - 2 ];
}
fs[5] = fs[4 ] + fs[3 ];
fs[5] = 5

for ( var i = 6, fs = [ 0, 1 , 1, 2, 3, 5];
     i < 12; i++ ) {
     fs[i] = fs[ i - 1 ] + fs[ i - 2 ];
}
fs[6] = fs[5 ] + fs[4 ];
fs[6] = 8


for ( var i = 7, fs = [ 0, 1 , 1, 2, 3, 5, 8];
     i < 12; i++ ) {
     fs[i] = fs[ i - 1 ] + fs[ i - 2 ];
}
fs[7] = fs[6 ] + fs[5 ];
fs[7] = 13




Object-to-Primitive Conversions in JavaScript

5 Primitive types:
Null: The value null.
Undefined: The value undefined.
Number: All numbers, such as 0 and 3.14. Also NaN, and Infinity.
Boolean: The values true and false.
String: All strings, such as "foo" and "".
non-primitive types:
arrays
functions
objects

__Note__: `typeof null` should _not_ be `"object"`. This is a mistake from the first versions of JavaScript, but it's really too late to fix. A more sensible type would have been `"null"`, but this is what we're stuck with.


toString 
valueOf    <<provide them as methods to your object:>>
function population(country, pop) {
	return {
		country: country,
		pop: pop,
		
		toString: function () {
			return "[Population " + 
				"\"" + country + "\" " +
				pop +
			"]";
		},
		
		valueOf: function () {
			return pop;
		}
	};
}
...the ToPrimitive function. This function is used to take an arbitrary value and get a corresponding primitive value instead. If the input is already a primitive value then the value will be returned without conversion. However, if the value is non-primitive, then it will call the internal [[DefaultValue]] method to find a default value for the object.
[[DefaultValue]] is an internal property of every object. It’s a method that takes an optional hint, which should be either Number or String. If a hint is not provided, it will default to Number unless the object is a Date, in which case it defaults to String (this is silly). After this has been figured out, it will call toString and valueOf, in order, to find a primitive value. This is where the hint comes into play. If the hint is Number, then valueOf will be tried first, but if it’s String then toString will be tried first. Here’s the ensuing process:
If the first method exists, and is callable, call it and get the result, otherwise skip to 3.
If the result of 1 is a primitive, return it.
If the second method exists, and is callable, call it and get the result, otherwise skip to 5.
If the result of 3 is a primitive, return it.
Throw a TypeError exception.

The +operator has a well-defined process:
Evaluate the left-hand side, and get the value.
Evaluate the right-hand side, and get the value.
Call ToPrimitive on both the left-hand and right-hand sides (without a hint)
If either primitive value is a String, then skip to 7.
Call ToNumber on both values.
Return the sum of the values.
Call ToString on both values.
Return the concatenation of both values.
Since no hint is passed to the ToPrimitive calls, the hint will be defaulted to Number (unless it’s a Date, which defaults to String). This means that our valueOf function will be called, instead of toString. It’s not until after the primitive values are retrieved that the interpreter decides whether it is going to do string concatenation or arithmetic. That’s why our example above returns "5bar" instead of "foobar".
You could, but Please do not make objects with toString methods that do not return strings.


CHROME DEV TOOLS--
Source pane/ R click--save as/ R click--reload modification
console
window -->shows whole DOM
inspect(document.body)-->shows that node, shows where it is in the DOM tree
Reveal.next() goes to next slide! :)
Look up APi ref for $, $$, Trace(), etc.


LOOPS
WHILE LOOPS
while(condition)
	statement

var arrrr = [ “bottle”, “of”, “rum”, 5 ],
index = 0;

while( arrrr[ index ] !==”rum”) {
	console.log( arrr[index] );
	index = index + 1;
}

OBJECTS 
object initializer:
var object = {
  size: "small",
  "arch-enemy": 7.5
};

define key as string only is special character like -

objects are mutable, primitives are not.

FUNCTIONS 
a procedure to do something

1) function statement: function keyword first

function name (){
  function block
} ------no semicolon

2) function operator: var keyword first

var name = function (argument) {
  function block
};


primitives are "passed by value"
not "passed by reference"


a function can be an object property.



-----------------------
var direction;
if(x < 200){
  direction = 1;
} else {
  direction = -1;
}
… You could write a shorter version using the ternary notation:
var direction = x < 200 ? 1 : -1;
The true case of the condition is after the question mark, and the other case follows the colon.
------------------------
So, the original function would be something like:
function addclass(elm,newclass){
  var c = elm.className;
  elm.className = (c === '') ? newclass : c+' '+newclass;
}
You can automate this using the split() and join() methods:
function addclass(elm,newclass){
  var classes = elm.className.split(' ');
  classes.push(newclass);
  elm.className = classes.join(' ');
}
This automatically ensures that classes are space-separated and that yours gets tacked on at the end.
-------------------------














