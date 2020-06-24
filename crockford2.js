starts out at u of chicago- urbana champagne
at center for supercomputing
Tim Berners-Lee doesnt want image tag.
They do it anyway, netscape, it blows up. 
they make it like hypercard: could attach scripts to pages, cause things to happen  by bill atkinson

netscape hires brendan eich
wanted to writea scheme interpreter
they say no, do something more like VB or Java, something ppl like
combines Java (had to), +2 failed languages: Scheme and Self
Scheme, dialect of LISP inspired by actor model
Self: Smalltalkk stripped down to go faster and much better, moved to Sun

:Livescript

change to javascript
only one who would issue a standard is the EU Standards Commission
but only netscape can call it javascript, so ECMAScript

1999: 3rd edition, still in all browsers
2009: 5th ediiton, 2 versions: default and strict

3 causes of bad parts:
Legacy- bad things it inherited from Java from C from Fortran
Good Intentions- semicolon insertion, global variables, make it easier for beginners but harder for professionals
Haste- Smalltalk, 8 years. JS, 10 days.

Bad Parts are bad because theyre dangerous.

Objects.
not an instance of a class.
a dynamic collection of properties.
get, set, delete

a property is a named collection of attributes
there are data properties and accessor properties
writeable, enumerable, configurable: all boolean
read/write?, enumerated by for n? or whether or not you can change it.


Object Literals
better than initializers

var my_object = (foo:bar);

same as

var my_object = Object.defineProperties(
		Object.create(Object.prototype), {
	foo: {
		value:bar,
		writeable: true,
		enumerable: true,
		configurable
	}
});


An accessor property uses get or set.
Object.defineProperty(my_object,
		'inch', {
	get: function(){
		return this.mm / 25.4;
	},
	set: function(value){
		this.mm = value * 25.4;
	},
	enumerable:true
});


Biggest controversy is how it does it inheritance
classes vs. prototypes
you can simulate classes in protos but not the other way around

working with prototypes:
1) make an object you like
2) create new instances that inherit from it
3) cusotmize the new Objects
4)taxonomy and classification are not necessary.

sometimes called delegation or differential inheritance

the prototype attribute:
object or null
so a reference or not.

Object.create(object, properties) for making objects
Object.getPrototypeOf(object)-- do not use! used to get references to objects that made it.

used to have the new operator instead of create.
this is what new does:

function new(func, args){
	var that = Object.create(func.prototype), 
		result = func.apply(that, arcuments);
	return (typeof result === 'object' &&
		result) || that;
}

you can do everthing with create though, once you start thinking that way.
hazard: if oyu forget to put new, then you clobber the global scope with no warnings

didnt get right:
accidental collisions: fails when word === 'constructor'

function bump_count(word){
	if (word_count[word]){ //comes back truthy
		word_count[word] += 1; //tries to add 1 to the function which doesn't work
	} else{
		word_count[word]=1;
	}
}

so, you have to ask it if its a number before you run it:

function bump_count(word){
	if (typeof word_count[word] ===
		'number') {
		word_count[word]+=1;
	} else{
		word_count[word]=1;
	}
}

impossible to test for.
cant special case for all possible additions

The For in problem:
youre using for in to go thru all the properties of an object, but it pulls up all inherited methods cause theyre in the prototype chain
call hasOwn to filter results
to avoid having that kind of exposure
except that fails if the object contains a hasOwnproperty property casue that will prevent the method.
 you have to write:

for (name in object){
	if (object.prototype
		.hasOwnProperty
		.call(object, name){
			...
		})
}

Solutions in ES5:
can use object.create(null) to create a totally pristine object-- inherits nothing.
can set enumerable to false now= wont show up in for, or keys.
object.keys(object)= only gives you its own properties, no inherited props. Can hand into map.

keys must be strings. 

extensible attributes:
extensible:boolean
Object.isExtensible(object)
Object.preventExtensions(object) //can turn bit off, object is full, cannot add new props
Object.seal(object) //also turns off all configurable bits
Object.freeze(object) //also sets everything to read only. Now these are all immutable


Only 1 number type: no integers. //avoids tons of errors
64 bit floating point //plenty of memory now
ieee-754(aka "Double") //"double precision"

problem:
the associative law does not hold
computer numbers are finite

sometimes not:
 (a+b)+c === a+(b+c)
under 9 quadrillion ok, though.


decimal fractions are approximate.
a = 0.1;
b = 0.2;
c = 0.3;
(a+b)+c === a+(b+c)
false.

money doesnt add up sometimes!

x100, treat as cents, convert back.

numbers are objects in JS, have methods:
toExponential
toFixed
toLocaleString
toPrecision
toString
valueOf

all inherit from the number prototype:
you can augment number.prototype
like you can remove the fractional part.
shouldnt do it generally, but in libraries, sure.

numbers are first class objects:
can be stored in a variable
can be passed as a parameter
can be returned from a function
can be stored in an object

theres a math object, inherited from java unfort.
math also has constants

special number called Nan-- not a number is a number.
in IEEE standard.
toxic.
if it goes in, it comes out.
NaN===NaN is false
NaN!===NaN is true

British Mathemetician: George Boole

String:
no separate char type
strings are immutable (frozen)
similar strings are ===
multiline string literals:
	\ at the end of a line says this is a long line, ignore the carriage return
	but dont leave a space afer it, it will break.
	SO DOnT use!

Number converters
str = num.toString(); //throws exception
str = String(num); //works
generally same except null or undefined

String converters
num = Number(str);
num = +str;

strange parseInt function
goes through each char and stops when it doesnt see a digit, then returns number
problem for things with leading digits
parseInt("12em"); ===12
Radix 10 shoudl always be used so it doesnt switch to base whatever
parseInt("08")===0 //0 in base 8
parseInt("08", 10)===8 //8 in base 10. Correct.

methods:
trim added in EC5
takes off whitespace

charAt
	charCodeAt
	compareLocale
concat
indexOf
	lastIndexOf
	localeCompare
	match 
	replace
	search
	slice
	split
	substring
	toLocaleLowerCase
	toLocaleUpperCase
toString
toUpperCase
	trim
valueOf

you can add trim if your browser doesnt have it yet with prototypes

Array
contiguous sequence of equal size memory slots 
simulated with objects in JS
not as speedy as real arrays
dont have to define a length, though. good.
dont use for in with arrays, may not do it in order.
length is always 1 bigger than the last index. Not actually the number of objects.
cant use dot notation cause it looks like decimal points.

array methods:
concat
every
filter
forEach
indexOf
join
lastIndexOf
map
pop
push
reduce
reduceRight
reverse
shift
slice
some 
splice
toLocaleString
toString
unshift

sort method, surprising behavior:
evaluates numbers as strings and placed accordingly:
var n=[4,8,15,16,23,42];
n.sort;
//[15, 16, 23, 4, 42, 8]


deleting elements
using delete leave a hole, so use splice instead

myArray = ['a', 'b', 'c', 'd'];
delete myArray[1];
// ['a', undefined, 'c', 'd']

myArray = ['a', 'b', 'c', 'd'];
delete splice(1,1);
// ['a', 'c', 'd']

Arrays vs. Objects
can be confusing to know when for each
Use objects when the names are arbitrary strings
Use arrays when the names are sequential integers
Dont get confused by the term associative array


Date
based on javas

RegExp
Regular Expressions
mathing text and finding patterns but not good for more complex things
no whitespace
impossible to test and read
more than 2 inches, rethink.

functions: best parts. Next.

all values are objects except null and undefined
null: a value that isnt anything
undefined: a value that isnt even that
the default value for variables and parameters
the value of missing members in objects

typeOf operator
says array is an object, so doesnt actually tell you anything
reports that null is an object-- badbadbad


FALSY:
false
null
undefined
"" an empty string
0
NaN

ALL OTHER VALUES ARE truthy
including:
empty objects, string 0, string false

LOOSELY TYPED
not untyped
any type can be stored in any variable or passed as a parameter to any function

REFERENCE 
objects can be passed as arguments to functions and can be returned from functions
not passed by value: not copied. referenced by pointer
=== compares object references not values

JS is in the C family, but it differs in how it allows functions to be values.

everytihng should all be started lowercase 
unless for constructor functions
_ reserved for machines
$ reserved for code generators 

prefers just //comments
/* could be in an expression, ending comment early*/

== and != do type coercion
so always use !== and ===

evils of type coersion:
'' == '0'		//false
0 == ''			//true
0 == '0'		//true

false == 'false' //false
false == '0'	 //true

false == undefined	//false
false == null		//false
null == undefined	//true

' \t\r\n ' == 08 	//true

should all be false, 
=== will let all these be false


&& used to avoid null
guard operator

if first operand is truthy
	then result is 2nd operand
	else result is first operand

if (a){
	return a.member;
} else {
	return a;
}

can be written as:
return a && a.member;


||
logical or
or default operator

if 1st operand is truthy then result is 1st operand
else result is 2nd operand

	can be used to fill default values

!
logical not.
!! produces booleans.


bitwise operators
& | ^ >> >>> <<
convert operand to 32 bit, do code, then convert back to 64 bit floating point


break statement
breaks out of nested loops
loop: for ()

for

for in 

switch
case values can be strings, dont have to be numbers

throw exceptions

try block
only one case block

with statement
avoid like crazy
ES5 removes this.

with(o){
	foo=koda;
}
might do any of the following:
o.foo = koda;
o.foo = o.koda;
foo = koda;
foo = o.koda;

cant tell by reading the program, only by looking at the o object.








































































