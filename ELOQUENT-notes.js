ELOQUENT JAVASCRIPT HAHAHA
 
1 Values, Types, and Operators
Type coercion
console.log(8 * null). 			Null goes to number
// → 0
console.log("5" - 1)				String goes to number
// → 4
console.log("5" + 1)			Number goes to string with +
// → 51         
console.log("five" * 2)			nan when it can’t go to a number			
// → NaN
console.log(false == 0)			== with different types
// → true						if one side is null or undefined, the other side has to be too
 

When you want to test whether a value has a real value 
instead of null or undefined, 
you can compare it to null with the ==(or !=) operator.
 
NaN is of type number
 
0 == false //t
"" == false//t unless you use ===
 
|| has the lowest precedence, then comes &&, then the comparison operators (>, ==, and so on)
 
&& and ||
convert the value on their left side to Boolean type
 
The rules for converting strings and numbers to Boolean values state that 0, NaN, and the empty string ("") count as false
 
Short circuit with:
True || x   Or
False && x
 
 
2 Program Structure
Expressions produce values 
While statements effect changes.
 
If an expression corresponds to a sentence fragment, 
a JavaScript statement corresponds to a full sentence. 
A program is a list of statements.
 
a program that outputs all even numbers from 0 to 12
let number = 0;
while (number <= 12) {
  console.log(number);
  number = number + 2;
}
 
Based on result
 
a program that calculates and shows the value of 210
let result = 1;
let counter = 0;
while (counter < 10) {
  result = result * 2;
  counter = counter + 1;
}
 
Based on # of times through 
 
a do loop always executes its body at least once, and it starts testing whether it should stop only after that first execution.
let yourName;
do {
  yourName = prompt("Who are you?");
} while (!yourName);
console.log(yourName);
 
For loop considered shorter than the while syntax
 
for(initialize counter; checks a condition; updates counter){
 
}
 
 
for (let current = 20; ; current = current + 1) {
  if (current % 7 == 0) {
    console.log(current);
    break;
  }
}
// → 21
 
 
The continue keyword is similar to break, in that it influences the progress of a loop. When continue is encountered in a loop body, control jumps out of the body and continues with the loop’s next iteration.
 
 
switch (prompt("What is the weather like?")) {
  case "rainy":
    console.log("Remember to bring an umbrella.");
    break;
  case "sunny":
    console.log("Dress lightly.");
  case "cloudy":
    console.log("Go outside.");
    break;
  default:
    console.log("Unknown weather type!");
    break;
}
 
 
1. Functions
 
Every time the function is called, new instances of the local bindings are created. 
Bindings declared with let and const are in fact local to the block
 
Scope
Each scope can “look out” into the scope around it, so x is visible inside the block in the example. The exception is when multiple bindings have the same name—in that case, code can see only the innermost one. For example, when the code inside the halve function refers to n, it is seeing its own n, not the global n.
const halve = function(n) {
  return n / 2;
};
 
let n = 10;
console.log(halve(100));
// → 50
console.log(n);
// → 10
 
Each local scope can also see all the local scopes that contain it, and all scopes can see the global scope. This approach to binding visibility is called lexical scoping.
  
This is a function declaration.
 
function square(x) {
  return x * x;
}
 
No semi necessary
Function declarations ARE HOISTED!!!

 
Function expression?
This is a function as a value.
 
const square = function(x) {
	return x*x;
};  
JavaScript is extremely broad-minded about the number of arguments you pass to a function. If you pass too many, the extra ones are ignored. If you pass too few, the missing parameters get assigned the value undefined.
 
This feature—being able to reference a specific instance of a local binding in an enclosing scope—is called closure.
 
Recursion is not always just an inefficient alternative to looping. Some problems really are easier to solve with recursion than with loops. Most often these are problems that require exploring or processing several “branches”, each of which might branch out again into even more branches.
 
Functions that create values are easier to combine in new ways than functions that directly perform side effects.
 
A pure function is a specific kind of value-producing function that not only has no side effects but also doesn’t rely on side effects from other code—for example, it doesn’t read global bindings whose value might change.
 
 
4.Data Structures
Both value.x and value[x] access a property on value—but not necessarily the same property. 
 
The difference is in how x is interpreted. 
 
When using a dot, the word after the dot is the literal name of the property. 
 
When using square brackets, the expression between the brackets is evaluated to get the property name.
 
Whereas value.x fetches the property of value named “x”, value[x] tries to evaluate the expression x and uses the result, converted to a string, as the property name.
 
The delete operator cuts off a tentacle from such an octopus.
 
console.log("right" in anObject);
// → true
The binary in operator, when applied to a string and an object, tells you whether that object has a property with that name. 
 
Object.keys	To find out what properties an object has
 
Object.assign 	function copies all properties from one object into another.
  
The types of values discussed in earlier chapters, such as numbers, strings, and Booleans, are all immutable—it is impossible to change values of those types. ??? Just reassign the value?
 
With objects, there is a difference between having two references to the same object and having two different objects that contain the same properties. 
 
When you compare objects with JavaScript’s == operator, it compares by identity: it will produce true only if both objects are precisely the same value. Comparing different objects will return false, even if they have identical properties. 
 

though a const binding to an object can itself not be changed and will continue to point at the same object, the contents of that object might change.
 
Arrays have an includes method that checks whether a given value exists in the array.

 
for (let entry of JOURNAL) {
  console.log(`${entry.events.length} events.`);
}
 
When a for loop looks like this, with the word of after a variable definition, it will loop over the elements of the value given after of. This works not only for arrays but also for strings and some other data structures.
  
Phi function too calc the correlation
Tablefor pizza gets the 4 digits to calc phi for that event
journalEvents function to get list of unique events
  
Altogether:
for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ":", correlation);
  }
} 
 
Objects
 
Arrays
Includes
Push.       On back
pop.         Off back
Shift 	off front   //takes nothing
Unshift	on front   //takes nothing
Indexof	returns index
lastIndexOf	search from the end instead of the start
Slice		takes start and end indices and returns an array that has only the elements between them
		including the start, excluding the end
		omit start for a Copy
		if you only give one, it slices off from the front
Concat	if just 1, it adds to 
  
Strings
Length
toUpperCase
toLowerCase
Slice
indexOf		can search for more than one char
Trim			remove whitespace back and front 
padStart		takes the desired length and padding character as arguments.
split(“ ”)
join(“. ”)
"LA".repeat(3)	LALALA
 
console.log(String(6).padStart(3, "0"));
 
function max(...numbers) {
…numbers is a rest parameter
For unknown number of params
Bound to an array of all arguments
 
Math
Max
Min
Sqrt
Trig funcs
Pi
Random
Floor		round down to whole
Ceil			round up
Round
Abs
 
Destructuring
 
function phi([n00, n01, n10, n11]) {
  return (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) *
              (n01 + n11) * (n00 + n10));
}
If you know the value you are binding is an array, you can use square brackets to “look inside” of the value, binding its contents.
 
 
Json
 
JSON looks similar to JavaScript’s way of writing arrays and objects, with a few restrictions. 
 
All property names have to be surrounded by double quotes, 
 
and only simple data expressions are allowed—no function calls, bindings, or anything that involves actual computation. 
 
Comments are not allowed in JSON.
 
 
JSON.stringify(js value) = JSON encoded string
JSON.parse(JSON encoded string) = js value
 
 
