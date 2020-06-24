
array
tree
promise
stream
are all functors

promise
stream
are monads because we can flatMap them.


a functor is something that you can map

a monad is a functor that you can flatMap


let potuguese = [
	'galinha',
	'vaca',
	'milho'
]



let _ = require('lodash')

_.capitalize('galinha')

>>Galinha



portuguese.map(_.capitalize)
>> ["Galinha", "Vaca", "Milho"]


map is a method on array that takes a funciton.
capitalize is the "mapper"




streams are like arrays, but asynchronous

a promise is a stream, but with only one value.


.then












