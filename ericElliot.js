ericElliot


Favor object composition over class inheritance.

A class is a bluepprint for how to build something.
A prototype is a working example of the thing.


3 kinds of prototypes.


1) delegate prototype: shared methods.
when you don't find what you need on the object you go look
at it's prototype. that prototype is a delegate.
Delegating the property lookup to another object.
flyweight objects for free. (those methods/functions don't
	have to be on every object.)


OLD WAY:
//create a constructor function
function Greeter(name) {
	this.name = name || 'John Doe';
}

//and then attach to that constructor function's prototype property
Greeter.prototype.hello = function hello() {
	return 'Hello, my name is '+this.name;
}

//and then instantiate a new object with the 'new' keyword
var george = new Greeter('George');


NEW WAY:
//create a prototype
var proto = {
	hello: function hello() {
		return 'Hello, my name is '+this.name;
	}
};
//pass that proto into object.create and out pops an object
var george = Object.create(proto);
//set whatever because dynamic object extension
george.name = 'George';


2) Cloning / Concatenation
great for default state and mixins

Exisiting sample objects that you can copy.

Mixin style:
//have a prototype
var proto = {
	hello: function hello() {
		return 'Hello, my name is '+this.name;
	}
};
//using a utility functions, jquery.extend, _.extend
var george = _extend({}, proto, {name: 'George'});
each object that you pass in will be copied into first object,
the ones that get passed in later, take precedence.
defaults and overrides.


One common use is to turn anything into an event emitter:
so anything can inform you of its status.

var foo = _.extend({
	attrs: {},
	set: function(name, value){
		this.attrs[name] = value;
		this.trigger('change', {
			name: name,
			value: value
		});
	},
	get: function(name, value){
		return this.attrs[name];
	}
}, Backbone.Events);
set method will trigger a change event and then you
pass in Backbone.events and out pops a new object that has an event emitter




3) Functional Inheritance

not really a type of prototype
not really funcitonal

but you can use it in conjunction with prototypal inheritance to create rich functional objects.
-great for encapsulation/privacy
-functional mixins

can compose together as many as you want

can replace:
constructor functions
Init functions
super()


a simple model implementation:
var model = function(){
	var attrs = {};

	this.set = function(name, value){
		attrs[name] = value;
		this.trigger('change', {
			name: name,
			value: value
		});
	};

	this.get: function(name, value){
		return attrs[name];
	};

	_.extend(this, Backbone.Events);
};



now we have a function wrapper instead of extending an object.

this time the attrs are private.

there is a closure scope here.

The Result:

var george = {};
model.call(george).set('name', 'George');
george.get('name');  // 'George'

george.on('change', function(event){
	console.log(event.name, event.value);
};

george.set('name', 'Simon'); //name Simon

//you use call method on the functino prototype.
//that just tells it that ""this"" inside of that function
//is going to be the object that you pass in.



You Can do everything by combining these 3 prototypes,
but if you want it without all the hoops, use factory funcs.


-like constructors but you dont need new or this
-mix and match all 3 types of prototypes
-use .call() and .apply() to swap out source prototypes at instantiation time.


His prefernces for when to use each of the 3:
.methods() for delegation
.state() for cloning/concat
.enclose() for functional/data privacy





BAR Example

var availibility = stampit().enclose(function(){
	var isOpen = false; //private

	return stampit.extend(this, {
		open: function open(){
			isOpen = true;
			return this;
		},
		close: function close(){
			isOpen = false;
			return this;
		},
		isOpen : function isOpenMethod(){
			return isOpen;
		}
	})
})

var membership = stampit({
	add: function (member){
		this.members[member.name] = member;
		return this;
	},
	getMember: function(name){
		return this.members[name];
	}
},
{
	members: {}  //public
});

var defaults = stampit().state({
	name: 'The Saloon',
	specials: 'Whisky, Gin, Tequila'
})

"FAVOR OBJECT COMPOSITION OVER CLASS INHERITANCE"
so:

var bar = stampit.compose(defaults, availibility, membership);

//note that you can override state on instantiation
var myBar = bar({name: 'Moe\'s'})

//proves that everythign is as should be!
myBar.add({name: 'Homer'}).open.getMember('Homer');
// => {name: 'Homer'}




Classes deal with the idea of an object. //abstract
Prototypes deal with the objects themselves. //direct access
objects are extensible
easier to swap things out to make classes polymorphic




performance:
easiest way to create objects is to declare a literal.
2nd fastest is to use new
but using new is a really really small perf improvement!

















