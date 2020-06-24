
KYLE SIMPSON

function d() {}
declares d as a var officially


cuddling


function declaration:
function() {}

function expressions, attached to a variable
var bar = function() {}
var bar = function baz() {}

 

falsy:
(empty)
0 -0 NanN
“”
false
null
undefined


everything else is truthy.



void is an operator
void 42
always returns undefined.
wipes values off your vars.


init, test or conditional, update clauses
for loops
for (a = 5; a< 10; a++){
	console.log(a);
}

THIS is how that for loop works:
a = 5;
while (true) {
	if (a >= 10) {
		break;
	}
	console.log(a);
	a = a + 1;
}


toFixed(2)
method to send to fixed number of decimal points


function foo (b,bar,zaz){ ….these are called parameters
foo(10, 100, 4) ….these are called arguments


function foo(b) {  //this b exists only inside the function. it’s as if there was a var b here
	a = a * 2;
	a = a + 3;
	return a / 2;   // this does not get saved as a!
}

var a = 10;
var b = foo(3);

console.log(a); //23
console.log(b); //



SCOPE, CLOSURES
-nested scope
-hoisting
-this
-closure

SCOPE AND THE JS COMPILER
js has function scope only.*

1st pass- compile,
2nd pass- execute

-----------------
var foo = “bar”;

function bar() {
	var foo = “baz”;
}

function baz(foo) {
	foo = “bam”;
	bam = “yay”;
}
--------------------

var foo = “bar”;
is not really 1 statement, it’s 2.
the variable gets done in first pass, the initialization to bar gets done is second.


COMPILING FUNCTION SCOPE
while bar is ignored in first line, the function declaration here is not:
assignment of function bodies happens on first pass.
function bar() {
	var foo = “baz”;
}

js compilers are very complex. because it sees you’re not calling bar, it may not do assignment. because JIT compiling.

js compiler guesses, monitors, maybe re-gresses again…

at function baz(foo) {
, foo is declared even without a var as a local variable.


on second pass, var foo = “bar”;
is just foo = “bar”;

LHS and RHS, left hand side…
foo is an LHS reference.
LHS is the target
RHS is the source

when you have an LHS that’s a reference to a variable, you need to ask where that variable exists.



EXECUTION OF FUNCTION CODE
lines 3-10 don’t exist anymore because they’ve been handled.
but, if you call bar(),
call baz(), at bam = “yay”,
there is no reference for bam.
so you go out one scope.
keep going out until you get to global.

(not is strict mode here)
when you ask global if it has a bam, it says YES,
I just created one for you.
And everyone is pissed off.
in the global scope. 
and only because it’s an LHS.
won’t do it for an RHS.

undeclared is very different than undefined.



SCOPE AND EXECUTION EXAMPLE
-----------------
var foo = “bar”;

function bar() {
	var foo = “baz”;

	function baz(foo) {
		foo = “bam”;
		bam = “yay”;
	}
	baz();
}

bar();
foo;		// ???   bar
bam; 	// ???   yay
baz(); 	// ???   referenceError

--------------------

At bar(), bar counts as an RHS 
because it’s not an LHS



FUNCTION DECLARATIONS, FUNCTION EXPRESSIONS,
AND BLOCK SCOPE
——————————
var foo = function bar() {  //FUNCTION EXPRESSION
	var foo = “baz”;

	function baz(foo) {  //FUNCTION DECLARATION
		foo = bar;
		foo; 		// function…
	}
	baz();
};

foo();
bar();   //Error!
--------------------

If function is the very first word in the statement, then it’s a FUNCTION DECLARATION

you often see expressions as anonymous functions
line 1 is a named expression because bar.

bar does not exist in the global scope

3 major problems with anonymous function expressions:
-no way to refer to ourself in case of recursion or canceling a click handler
-when debugging, it’s a crap
-self documenting opportunity lost


——————————
var foo;

try {
	foo.length;
}
catch (err) {
	console.log(err);  //TypeError
}

console.log(err);   /ReferenceError
—————————————
function is not only atomic unit of scope
block also.



LEXICAL SCOPE
lexical scope is compile time scope

other model is dynamic scope,
rare.
bash scripting uses, an option in Perl to use.

all decisions are made at author time or compile time.
all bubbles are within each other



CHEATING LEXICAL SCOPE: EVAL
modifies the lexical scope and adds something to it.
———————————
var bar = “bar”;

function foo(str) {
	eval(str);   //cheating!
	console.log(bar);   //42
}

foo(“var bar = 42;”);
—————————
adds a new declaration, bar, to foo, at run time.

now your code can’t do any of the lookup optimizations at all.

strict mode can still run as fast - creates a new scope, doesn’t modify original one

don’t ever use it!

also, don’t use setTimeout with a string reference
only function reference


another cheat out is “with”
—————————
var obj = {
	a : 2,
	b : 3,
	c : 4
};

obj.a = obj.b + obj.c;
obj.c = obj.b - obj.a;

//shortcut would be
with (obj) {
	a = b + c;
	d = b - a;
	d = 3;   //  ?? except for this. this would end up getting declared in the global scope
}

obj.d;  // undefined
d;  // 3 — oops!
———————————

even more evil than eval

creates a new lexical scope at run time.
disables optimizations also
not even allowed in strict mode.



IIFE PATTERN













 


























SCOPE.

where to look for things.

an interpreted language has no idea what’s on line 4 when it’s on line 3
a compiled language has read all, then is passing back through to execute.

js= function scoped only



//variable declaration
//1 line but 2 entirely different operations happening
//1 declaration
//2 initialization
//global scope, i have an identifier called foo.

var foo = “bar”;

//This is a FUNCTION DECLARATION
//this is also a declaration, just like a var statement
//because bar is not being called, it defers the compilation of the function
//the compiler will guess what the compilation will be and test and recompile
//global scope, i have an identifier called bar.
//recursively descend into the function, and, looks for vars, sees foo, registers it in the scope of bar.

function bar() {
	var foo = “baz”;
}

//global scope, i have an identifier called baz.
//foo is declared just like a local variable
//scope of baz, i have an identifier called foo.
//but not the same for bam!!

function baz(foo){
	foo = “bam”;
	bam = “yay”;
}



first pass:
finding declarations of variables and functions and putting them into their right spots.

next pass, var’s are all gone.

LHS      TARGET
RHS     SOURCE

foo is an LHS reference

RHS, LHS behave differently with respect to scope.


//hey scope of bar i have an LHS reference to a var called foo. Ever heard of him?
//yes.
function bar() {
	var foo = “baz”;
}


//hey scope of baz, i have an LHS reference to a var called bam. Ever heard of him?
//no. go fish.
//hey global scope, i have an LHS reference to a var called bam. Ever heard of him?
//It’s an LHS reference, we got to the global scope, we’re not in strict mode, so…
//yes, i just created him for you!!! <<puke>>
//made in the global scope not the biz scope == leakage of global variables
function baz(foo){
	foo = “bam”;
	bam = “yay”;
}


UNDECLARED is not the same as UNDEFINED!!


if you had
function baz(foo){
	var foo = “bam”;
	bam = “yay”;
}

foo would get declared on first line, then checked for in next line and passed over cause already have.
so no diff.





var foo = “bar”;

function bar() {
	var foo = “baz”;

	function baz(foo){
		foo = “bam”;
		bam = “yay”;
	}
	baz();
}

bar();
foo;
bam;
baz();


ok, 2nd pass, line 1 goes.
then everything else gets skipped until bar();

at bar();
it says, hey global scope, do i have an RHS reference for a variable called bar.
IF IT’s NOT AN LHS, it’s AN RHS.

Goes and retrieves the function object.
execute the bar function





Is it a function expression?
Well is it a function declaration?
If not, it’s a function expression.

is the function keyword the first thing in the statement?
then it’s a function declaration.

you can have a named function expression or an anonymous one, but both are function expressions.

var foo = function bar() {
bar is a named function expression
bar is NOT declared in the global scope.
bar is declared in the bar scope






lexical vs dynamic scope
lexical= compile time scope
compiler decides what your scopes are

don’t use eval or with




the IIFE pattern:
uses a function to create a new scope
by wrapping in parens, it’s not a declaration, so does not go to global scope

(function(){
	var foo = “foo2”; //want to hide this in a new scope
 	console.log(foo);    //“foo2”
})();

Immediately invoked function expression

coined by: ben alman “cowboy” 





one variation is to pass in window and call it global
then everything inside the IIFE is private except
what you explicitly say is 
global.xxx

(function(global){
	var foo = “foo2”;  //private
 	var global.baz = “”;  //global
})(window);



if you like crockford, you can write
(function(){
	var foo = “foo2”;  //private
 	var global.baz = “”;  //global
}());
  ^ to hide the donkey balls




let keyword
block scoping

the let keyword will attach that variable implicitly to whatever block it appears in 
rather than attaching it to the function

function foo() {
	for (let i = 0; …){
	}
}
i attaches only to it’s block

function foo() {
	for (var i = 0; …){
	}
}
i attaches to function foo




the let keyword does not hoist

so you might refactor let declarations
function foo(bar){
	if (bar) {
		let baz = bar;
		if (baz) {
			let bam = baz;
		}
		console.log(bam); //error
	}
	console.log(baz);  //error
}

into let blocks because they are explicit
function foo(bar){
	let (baz = bar) {
		console.log(baz); //bar
	}
	console.log(baz);  //error
}
foo(“bar);

EXCEPT THAT YOU CAN’t! Not in ES6


so maybe this:
function foo(bar){
	/* let */ { let (baz = bar) 
		console.log(baz); //bar
	}
	console.log(baz);  //error
}
foo(“bar);


and then he wrote a traspiler forget blocks
so go use that.
getify/let-er



DYNAMIC SCOPE
theoretical


QUIZ
What type of scoping rules does js have? lexical
Exceptions? eval and with

what are the diff ways you can create a new scope?
function
catch block
curly braces with let

what’s the diff btw undeclared and undefined
undefined is a value, doesn’t CURRENTLY have a value
undeclared hasn’t been registered in any scope













































