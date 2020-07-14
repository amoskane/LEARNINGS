***ARRAYS

splice(start index, number of items deleting, things to add)
push() adds to the end of an aaray
pop() removes the last element from an array and returns that element.
shift() removes the first element from an array and returns that removed element.

arr.splice(index, 0, item); will insert item into arr at the specified index (deleting 0 items first, that is, it's just an insert).



***CALL AND APPLY
call() accepts an argument list
apply() accepts a single array of arguments.

function.apply(thisArg, [argsArray])

thisArg
Optional. The value of this provided for the call to func. 
Note that this may not be the actual value seen by the method: 
if the method is a function in non-strict mode code, 
null and undefined will be replaced with the global object, 
and primitive values will be boxed.

argsArray
Optional. An array-like object, 
specifying the arguments with which func should be called, 
or null or undefined if no arguments should be provided to the function. 
Starting with ECMAScript 5 these arguments can be 
a generic array-like object instead of an array. 
See below for browser compatibility information.



Use apply to append an array to another.
you could write a loop and add each element at a time.
but you can't' concat, that creates a new array.
to add to existing array, use apply.



old solution:
var numbers = [5, 6, 2, 3, 7];
Math.max.apply(null, numbers);

new solution:
var numbers = [5, 6, 2, 3, 7];
Math.max(...numbers);





(JavaScriptCore has hard-coded argument limit of 65536)