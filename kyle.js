 "use strict";

function baz(foo){
	foo = “bam”;
	//bam = “yay”;
};

baz(2);




LHS is the target
RHS is the source

function bar(){}
is a FUNCTION DECLARATION


FUNCTION EXPRESSION
 


function baz(foo){
	foo = “bam”;
	bam = “yay”;
};

bam will get CREATED at run time, as a GLOBAL variable, 
which is just totally totally unexpected.

This is a leakage into the global.

strict mode would prevent that.

an undeclared variable means:
no present declaration
we were unable to find an LHS reference to it, in any area, a function or a var.
in any of the scopes we have access to.

undefined is different.
it IS declared, but it has this special distinction, undefined.
should be UNINITIALIZED.
undefined is a proper value.



when you are compiling a function, you recursively descend into it.

hey scope of baz, I have a named parameter for an identifier named foo.






SCOPE AND EXECUTION EXAMPLE

1	var foo = “bar”;
2
3	function bar(){
4		var foo = “baz”;
5
6		function baz(foo){
7			foo = “bam”;
8			bam = “yay”;
9		};
10		baz();
11	};
12
13	bar();
14	foo;
14	bam;
15	baz();



compiling phase:
hey global scope I have an LHS ref to a variable called foo.
hey global scope I have a declaration for a function called bar.
we also register the function declaration, so we go into the function.
compile the scope of bar.
hey scope of bar, i have an LHS ref to a variable called foo.
hey scope of bar, I have a declaration for a function called baz.
we also register the function declaration, so we go into the function.
compile the scope of baz. 
hey scope of baz, i have an LHS ref for a named parameter foo


ok, 2nd pass through, execution phase:
line 1 has no var, so line 1 is an assignment.
hey global scope I have an LHS ref to a variable called foo, ever heard of him?
yes. assignment made.
all lines until bar(); have been compiled away.

bar() executes and goes: 
hey, global scope, I have an RHS ref to a variable called bar.
there’s not an assignment going on, so it’s not an LHS. 
So it’s an RHS.
bar is being used, not assigned.
so i get the whole function object back, and since i have the (), now i’m going to run it.

hey, scope of bar, I have an LHS ref to a var called foo, ever heard of him?
yes. assignment made.

line 6-9 not there anymore because complied away.
so baz().
hey scope of bar, i have an RHS ref for a var called baz, ever heard of him?
yes. whole function returned and ().
hey scope of baz, i have an LHS ref for var foo, ever heard of him?
yes, assignment made.
hey scope of baz, i have an LHS ref for var bam, ever heard of him?
no.
hey scope of bar, i have an LHS ref for var bam, ever heard of him?
no.
hey scope of global, i have an LHS ref for var bam, ever heard of him?
yes, just made him, assignment made. to global bam.   AND EVERYONE IS LIKE WHAT.

next is line 14, foo;
hey global scope i have an RHS ref for var foo, ever heard of him?
yes. returns global’s foo ==== bar

next is line 15, bam;
hey global scope i have an RHS ref for var bam, ever heard of him?
yes. returns global’s bam ==== yay

next is line 16, baz();
hey global scope i have an RHS ref for var baz, ever heard of him?
no. reference error. strict or non-strict.

if it had been an LHS, it would have created one for us.



variatic functions- you can pass in a parameter or not, or too many or whatever.





FUNCTION DECLARATIONS, FUNCTION EXPRESSIONS, BLOCK SCOPE


1	var foo = function bar() {
2		var foo = "baz";
3
4		function baz() {
5			foo = bar;
6			foo;
7		};
8		baz();
9	};
10
11	foo();
12	bar();


the way you know if it's a function declaration or not is:
is the function keyword the very first thing in the statement?
if yes, it's a function declaration
if no, it's a function expression


if it was
var foo = function() {
then it would be an anonymous function.

this is a named function.


a function declaration goes into the parent scope.
a function expression goes into it's own scope.



3 major negatives of anonymous funcitons:
1 you cannot refer to yourself. you cannot do recursion or unbind yourself, etc.
2 errors in production code. you cannot tell where they happened.
3 self documents. you must look at outer context to name the function.



what if it's a function assigned as a property of an object?
it's definitely an expression then, because it's assigned.
so name it.



BLOCK SCOPE
1	var foo;
2
3	try {
4		foo.length;
5	}
6	catch (err){
7		console.log(err); //TypeError
8	}
9
10	console.log(err);  //ReferenceError

back in ES3, err on line 6 was scoped to the block.
IE6 messed this up, but then got right again in IE7.





LEXICAL SCOPE
lexical scope means compile time scope.
at write time, the decisions about scoping were made then.


EVAL
evil
inserts statements as if they were there at compile time.
presence of eval means the optimizations are unavailable.
all the caching you would have done in compile are not done.
1 your code runs slower.
2 silver lining - in strict mode, if a var is addded with eval, a new scope is created.
instead of modifying an existing one, so optimizations can stand.
 setTimeout uses eval under the hood, if you set the function off with quotes.

with keyword is completely disallowed in strict mode.



IIFE
( function(){

})();

same as
( function bob(){

}); bob();
but then you've leaked 'bob' out into the upper scope.'


Ben Alman.

crockford's way is'
( function(){

}());
because ()==donkey balls






let
when you use let, it will implicitly hijack
the scope of whichever block we happen to be in
and it will add that variable
to that block instead of the enclosing function

let does block scoping.


let problems:
1 the let keyword does not hoist. so you'd ahve to manually put all your
lets at the top to demonstrate that they're valid throughout

2 mental tax in refactoring, moving things around until they work.

3 this is implicit and hard to see. explicit would be easier.

one solution is to set up the block
so you can reason about it:

let statements or let blocks:
function foo(bar){
	let (baz = bar){
		console.log(baz);  //"bar"
	}
	console.log(baz);  //error
}

foo("bar");

but ES6 rejected let blocks.
so:
function foo(bar){
	/*let*/ { let baz = bar;
		console.log(baz);  //"bar"
	}
	console.log(baz);  //error
}

foo("bar");


OR, you can use his Let-er transpiler to get
let (foo) {
	foo = "foo";
	console.log(foo);  //"foo"
}

foo;  //ReferenceError
//on the inside, its casting it into a try catch block
and catch is always block scoped.

the google tracer transpiler tool uses this too.




DYNAMIC SCOPE DEPICTION
scoping is a run time decision instead of
an author time decision.

it looks at the call stack to see where it was 
fired from and then looks inside there.




QUIZ
1 what type os scoping rules does js have?
lexical
exceptions?
eval and with.
2 diff ways to create a new scope
functions
catch blocks
curly braces with the let keyword
3 diff between undeclared and undefined
undefined IS a value.
undefined means doesn't currently have a value.'
an undeclared var would give you a referenceError.




HOISTING
all the LHS stuff happens at compile
the RHS stuff happens at execution


console.log("first a is "+a);
console.log("first b is "+b);
var a = b;
var b = 2;
console.log("second b is "+b);
console.log("second a is "+a);

all render as 2.





var a = b();
var c = d(); //fails at d();

console.log("first a is "+a);
console.log("first c is "+c);

function b(){return c;}

var d = function(){return b();};

//Uncaught TypeError: d is not a function


line 1:
i have an LHS ref for var a, yes, exists
i have an RHS ref for function b
b has been declared,
when i run b though, c is as of yet undefined.
so a will be undefined.


line 2:
i have an LHS ref for var c, yes, exists
i have an RHS ref for function d
d has not been declared.


this is how it fires:
function b(){return c;}
var a;
var c;
var d;
a = b();
c = d();
a;
c;
d = function(){return b();};



proof that functions get hoisted first:
foo();  //"foo"

var foo = 2;  //this lifted 3rd, ignored because function takes precedence.

function foo(){  //this lifted 1st
	console.log("bar");
};

function foo(){  //this lifted 2nd, overwrites 1st
	console.log("foo");
};


function declarations, the value comes with it,
var declarations, the value is left.




//39
super hard problem:
a(1);

function a(foo){
	if(foo > 20) return foo;
	return b(foo+2);
}
function b(foo){
	return c(foo)+1;
}
function c(foo){
	return a(foo*2);
}

b(3)
c(3) +1
c(3) +1
a(6) +1
b(8) +2
c(8) +2
a(16) +2
b(18) +3
c(18) +3
a(36) +3
36 +3
39






the this keyword.

Every function,
while executing,
has a reference to its current execution context
called this.

execution context: how the function was called.

4 rules for how the this gets bound
and they all depend on the call site.


1
default binding rule is the 4th, catch-all rule.
the default binding rule.

line 2, this must refer to an object. not a number or a boolean.
when called from line 9, called in an undecorated sense
just a ref to a function and
there's nothing else to that function call
then the default binding rule applies.
true also with IIFEs

default binding rule says:
if you are in strict mode,
default the this keyword to the undefined value.
if you are not in strict mode,
default the this keyword to the global object.

so this in line 9 is a ref to the global object, so bar1.



2
or 3rd of 4 rules in precedence
implicit binding rule.
in line 6, for foo:foo,
there are 2 references to the same thing,
global foo AND o2.foo.

when the calling site is a
reference to a function VIA the object property reference.
then that object becomes the this keyword.

so this in line 10 is o2.


1 function foo(){
2 	console.log(this.bar);
3 };
4
5 var bar = "bar1";
6 var o2 = { bar: "bar2", foo: foo };
7 var o3 = { bar: "bar3", foo: foo };
8
9 foo();		// bar1
10 o2.foo();	// bar2
11 o3.foo();	// bar3



what happens if o2 doesn't have a bar property,'
does it default back to the global?
no, definitely does not,
because prototype chain. later.



binding confusions:

function foo(){
	var bar = "bar1";
	baz();
}
function baz(){
	console.log(this.bar);
}

var bar = "bar2";
foo();   //??

if baz was a 3rd party function
that you knew had a ref to this.bar
and you wanted the this to refer to your own lexical scope,
you might think foo would work.

adding
this.baz = baz;
this.baz();

does not change the this ref inside baz.
both of those this's refer to the global object.





OK, 3rd rule:
explicit binding.
if you use a .call or a .apply at the call site,
	then each takes as its first parameter a this binding

foo.call(obj);
you are explicitly stating that this is obj.



one way to prevent unintended this's
is hard binding.

a lot of times when you are passing functions around as
callbacks, the this gets reset to the global unintentionally


function foo(){
	console.log(this.bar);
}
var obj = { bar: "bar" };
var obj2 = { bar: "bar2" };

var orig = foo;
foo = function(){ orig.call(obj); };

foo();  			//bar
foo.call(obj2);  	// would still be bar
says run foo with obj2
but when foo runs it runs
orig.call(obj)




OR you could accomplish this with a bind utility:
function bind(fn, o){
	return function(){
		fn.call(o);
	}
}
function foo(){
	console.log(this.bar);
}

var obj = { bar: "bar" };
var obj2 = { bar: "bar2" };

foo = bind(foo, obj);

foo();    //"bar"
foo.call(obj2) //"bar"




or you add to the prototype.
by using .apply instead of .call
you can pass through arguments and make returns.

in fact, .bind is built in to ES5.






4th rule: new
new has nothing to do with instantiating classes.
new turns a function call into a constructor call.

when you put new, 4 things happen.
1 a brand new object will be created
2 *this object gets linked to another object (explain later)
3 the brand new object gets bound as the this for the function call.
4 if the function doesn't have a return, it will insert a
return this
right before finishing.



function foo(){
	this.baz = "baz";
	console.log(this.bar +" "+ baz);
};

var bar = "bar";
var baz = new foo();
baz.baz;

new foo();
//same as
foo.call(obj)
	this.baz === obj.baz == "baz"
	console.log( obj.bar + " " + foo.baz);
				//undefined  undefined

obj is returned to var baz though.

so baz= the obj object
and the obj object has a property baz.
so baz.baz renders
"baz"





OK, the 4 rules have a precedence.
1 was the function called with the new keyword?
	if so, use that object.
	(new keyword overwrites all other rules)
2 was the function called with the .call or .apply?
	if so, use that object.
3 was the function called via a containing/owning object (context)?
	if so, use that object.
4 DEFAULT: use global object (except strict mode)


unexpected result might be that the new keyword
can even override hard binding.





QUIZ:
1 What determines which object this points to?
	the 4 rules.
	the default is the global object.
2 How do you borrow a function by implicit assignment
of this?
	by mutating an object to put a ref to a function on
	the object so that we could then say object.method
3 how do you explicitly bind this?
	by using .call or .apply at the call site
	then you have to pass the obj in as a param.
4 how do you seal a specific this to a function?
	.bind
		why?
			predictability
		why not?
			loss of all flexibility of using the this
			keyword to begin with.
5 how do you create a new this?
	the new keyword.
	makes a new object and binds this to it


so "this" is a dynamic binding mechanism
based on how you called something.






CLOSURE

comes from lambda calculus

closure is when a function
remembers its lexical scope
even when executed outside that lexical scope.
















































