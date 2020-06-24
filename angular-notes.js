//Hoisting is the JavaScript interpreter’s action of moving all variable and function declarations 
//to the top of the current scope. However, only the actual declarations are hoisted. 
//Any assignments are left where they are.

//accessing properties with dot notation:
object.foo = object.foo + 1;

//accessing properties with bracket notation:
object["foo"] = object["foo"] + 1;

//with bracket notation you can build the object on the fly:
var f = "f";
object[f + "oo"] = "bar";





//To run a function on change:
<form ng-controller="StartUpController"> 
	Starting: <input ng-change="computeNeeded()" ng-model="funding.startingEstimate"> 
	Recommendation: {{funding.needed}}
</form>

function StartUpController($scope) { 
	$scope.funding = { startingEstimate: 0 };

	$scope.computeNeeded = function() {
        $scope.funding.needed = $scope.funding.startingEstimate * 10;
    };
}


//When an element might be bound to more than one event, set a watch ($scope function)
									
<form ng-controller="StartUpController">
	Starting: <input ng-model="funding.startingEstimate"> 
	Recommendation: {{funding.needed}}
</form>					
					
function StartUpController($scope) { 
	$scope.funding = { startingEstimate: 0 };
	
	var computeNeeded = function() {
    	$scope.funding.needed = $scope.funding.startingEstimate * 10;
  	};

	$scope.$watch('funding.startingEstimate', computeNeeded);
}
//Note that the expression to watch is in quotes. Yes, it is a string. This string is evaluated as something called 
//an Angular expression. Expressions can do simple operations and have access to the properties in the $scope object. 

//SYNTAX:
$scope.$watch('Value you want to watch', f(x) to fire on change));


// SHOW/HIDE
<div ng-controller='DeathrayMenuController'>
	<button ng-click='toggleMenu()'>Toggle Menu</button> 
		<ul ng-show='menuState.show'>
			<li ng-click='stun()'>Stun</li>
			<li ng-click='disintegrate()'>Disintegrate</li> 
			<li ng-click='erase()'>Erase from history</li>
		</ul> 
</div>

function DeathrayMenuController($scope) { 
	$scope.menuState = { show: false };

	$scope.toggleMenu = function() { 
		$scope.menuState.show = !$scope.menuState.show;
	};
      // death ray functions left as exercise to reader
}


//working with CSS classes:
<li class='menu-disabled-{{isDisabled}}' ng-click='stun()'>Stun</li>

function DeathrayMenuController($scope) {
	$scope.isDisabled = false;
	$scope.stun = function() {
		// stun the target, then disable menu to allow regeneration $scope.isDisabled = 'true';
	}; 
}
//no stlye for menu-disbled-false, so no effect.

//also inline:
style="{{some expression}}"


//Let’s imagine that you want to display errors and warnings to your users in a standard location 
//in the application’s header. Using the ng-class directive, you could do some‐ thing like this:

.error { background-color: red;
}
.warning { background-color: yellow;
}

<div ng-controller='HeaderController'> 
...
<div ng-class='{error: isError, warning: isWarning}'>{{messageText}}</div>
...
<button ng-click='showError()'>Simulate Error</button>
<button ng-click='showWarning()'>Simulate Warning</button>
</div>

function HeaderController($scope) { 
	$scope.isError = false; 
	$scope.isWarning = false;
	$scope.showError = function() { 
		$scope.messageText = 'This is an error!'; 
		$scope.isError = true;
		$scope.isWarning = false;
	};
	$scope.showWarning = function() {
		$scope.messageText = 'Just a warning. Please carry on.'; 
		$scope.isWarning = true;
		$scope.isError = false;
	}; 
}






//GOOD
<div ng-controller="CartController"> 
	<div ng-repeat="item in items">
		<span>{{item.title}}</span>
		<input ng-model="item.quantity">
		<span>{{item.price | currency}}</span> 
		<span>{{item.price * item.quantity | currency}}</span>
	</div>
	
	<div>Total: {{totalCart() | currency}}</div> 
	<div>Discount: {{bill.discount | currency}}</div> 
	<div>Subtotal: {{subtotal() | currency}}</div>
</div>

//With a CartController, it would look like the following: 
function CartController($scope) {
    $scope.bill = {};
	
	$scope.items = [
        {title: 'Paint pots', quantity: 8, price: 3.95},
        {title: 'Polka dots', quantity: 17, price: 12.95},
        {title: 'Pebbles', quantity: 5, price: 6.95}
	];
	
	$scope.totalCart = function() {
		var total = 0;
		for (var i = 0, len = $scope.items.length; i < len; i++) {
	    	total = total + $scope.items[i].price * $scope.items[i].quantity;
	    }
	return total; 
	}
	
	$scope.subtotal = function() {
		return $scope.totalCart() - $scope.bill.discount;
	};
	
	function calculateDiscount(newValue, oldValue, scope) { 
		$scope.bill.discount = newValue > 100 ? 10 : 0;
	}
    
    $scope.$watch($scope.totalCart, calculateDiscount);
}

//but totalCart runs 6 times.




//BETTER:

<div>Total: {{bill.total | currency}}</div> 
<div>Discount: {{bill.discount | currency}}</div> 
<div>Subtotal: {{bill.subtotal | currency}}</div>

//Then, in JavaScript, we’d watch the items array, and call a function to calculate the totals on any change to that array, like so:
function CartController($scope) { 
	$scope.bill = {};
    
    $scope.items = [
        {title: 'Paint pots', quantity: 8, price: 3.95},
        {title: 'Polka dots', quantity: 17, price: 12.95},
        {title: 'Pebbles', quantity: 5, price: 6.95}
	];

	var calculateTotals = function() {
		var total = 0;
		
		for (var i = 0, len = $scope.items.length; i < len; i++) {
        	total = total + $scope.items[i].price * $scope.items[i].quantity;
        }
        
        $scope.bill.total = total;
        $scope.bill.discount = total > 100 ? 10 : 0;
        $scope.bill.subtotal = total - $scope.bill.discount;
	};

	$scope.$watch('items', calculateTotals, true); 
}

//However, since we’re watching the items array, Angular will have to make a copy of it to compare it for us. 
//For a large list of items, it may perform better if we just recalculate the bill properties 
//every time Angular evaluates the page. We can do this by creating a $watch with only a watchFn 
//that will recalculate our properties like this:




//BEST

$scope.$watch(function() {
	var total = 0;
	
	for (var i = 0; i < $scope.items.length; i++) {
		total = total + $scope.items[i].price * $scope.items[i].quantity;
	}

	$scope.bill.total = total;
	$scope.bill.discount = total > 100 ? 10 : 0;
	$scope.bill.subtotal = total - $scope.bill.discount;
});



//WITH MODULES:
function ShoppingController($scope, Items) { 
	$scope.items = Items.query();
}
//arguments are order independant, can be $scope, Items or Items, $scope




//CREATE SERVIcE USING factory()

// Create a module to support our shopping views
var shoppingModule = angular.module('ShoppingModule', []);

// Set up the service factory to create our Items interface to the
// server-side database
shoppingModule.factory('Items', function() {
	var items = {};
	
	items.query = function() {
	// In real apps, we'd pull this data from the server...
	    return [
    	    {title: 'Paint pots', description: 'Pots full of paint', price: 3.95},
        	{title: 'Polka dots', description: 'Dots with polka', price: 2.95},
        	{title: 'Pebbles', description: 'Just little rocks', price: 6.95}
		]; 
	};
    
    return items;
 });


//OR
angular.module('myApp.services', [])
  .factory('githubService', function() {
    var serviceInstance = {};
    // Our first service
    return serviceInstance;
  });




//ROUTES
var someModule = angular.module('someModule', [...module dependencies...]) 

someModule.config(function($routeProvider) {
	$routeProvider.

	when('url', {controller:aController, templateUrl:'/path/to/template'}). 

	when(...other mappings for your app...).
	…
	otherwise(...what to do if nothing else matches...);				
)}; 



//Write 3 html templates, then add to controllers.js:


// Create a module for our core AMail services
var aMailServices = angular.module('AMail', []);

// Set up our mappings between URLs, templates, and controllers
function emailRouteConfig($routeProvider) { 
	$routeProvider.
	when('/', {
        controller: ListController,
        templateUrl: 'list.html'
    }).
    // Notice that for the detail view, we specify a parameterized URL component
    // by placing a colon in front of the id
    when('/view/:id', {
        controller: DetailController,
        templateUrl: 'detail.html'
    }).
    otherwise({
        redirectTo: '/'
    });
}

// Set up our route so the AMail service can find it
aMailServices.config(emailRouteConfig);

// Some fake emails
messages = [{
  id: 0, sender: 'jean@somecompany.com', subject: 'Hi there, old friend',
  date: 'Dec 7, 2013 12:32:00', recipients: ['greg@somecompany.com'],
  message: 'Hey, we should get together for lunch sometime and catch up.'
  +'There are many things we should collaborate on this year.'
}, {
  id: 1,  sender: 'maria@somecompany.com',
  subject: 'Where did you leave my laptop?',
  date: 'Dec 7, 2013 8:15:12', recipients: ['greg@somecompany.com'],
  message: 'I thought you were going to put it in my desk drawer.'
  +'But it does not seem to be there.'
}, {
  id: 2, sender: 'bill@somecompany.com', subject: 'Lost python',
  date: 'Dec 6, 2013 20:35:02', recipients: ['greg@somecompany.com'],
  message: 'Nobody panic, but my pet python is missing from her cage.'
      +'She doesn\'t move too fast, so just call me if you see her.'
} ];

// Publish our messages for the list template
function ListController($scope) { 
	$scope.messages = messages;
}

// Get the message id from the route (parsed from the URL) and use it to
// find the right message object.
function DetailController($scope, $routeParams) {
	$scope.message = messages[$routeParams.id];
}





//GETTING DATA FROM THE SERVER
//we could write the query like so:
function ShoppingController($scope, $http) { 
	$http.get('/products').success(function(data, status, headers, config) {
        $scope.items = data;
      });
}

//and use it in a template like this:
<body ng-controller="ShoppingController"> 
<h1>Shop!</h1>
<table>
	<tr ng-repeat="item in items">
		<td>{{item.title}}</td> 
		<td>{{item.description}}</td> 
		<td>{{item.price | currency}}</td>
    </tr>
</table>
</body>
//but it's better to put these types of functions into services


//WRITING CUSTOM DIRECTIVES:
//As with services, you define directives through the module object’s API by calling its 
//directive() function, where directiveFunction is a factory function that defines your 
//directive’s features.
var appModule = angular.module('appModule', [...]); 
appModule.directive('directiveName', directiveFunction);





//FORM validation
required
ng-maxlength='3' 
ng-minlength='1'
$valid= Angular will set this to true when all the inputs in the form are valid.
ng-disabled: add to submit button unless $valid is true








//This will not work:

function MyController($scope, $resource) {
	// Stuff here
}


//You will need to do one of the following instead:
function MyController($scope, $resource) { 
	// Same stuff here
}
MyController.$inject = [‘$scope’, ‘$resource’]; 


//or use the module, like so:
myAppModule.controller(‘MyController’, [‘$scope’,
                                        ‘$resource’,
										 function($scope, $resource) {
										 	//same stuff here
										 }]);	


//This is the only way AngularJS can figure out which service or variable you were
//originally asking for once all the variables are obfuscated or compressed.

//It is generally good practice to use the array-style injection all the time, 
//to avoid bugs later when you start compiling the code. Scratching your head later 
//and trying to figure out why the provider of the $e variable 
//(the minified, obfuscated version of some service) is suddenly missing is just not worth it.




//DEBUGGING:
//• Always, always switch to the non-minified version of all your source code and dependencies 
//when you want to debug. Not only will you get better variable names, you’ll also get line numbers 
//and actual useful information and debugging capabilities.
//• Try to keep your source code in individual JS files, not inlined in HTML.
//• Breakpoints are useful! They allow you to check the state of your application, 
//its models, and everything in between at a given point in time.
//• “Pause on all exceptions” is a very useful option that is built in to most developer tools nowadays. 
//The debugger will halt when an exception occurs, and highlight the line causing it.




//We need to fetch the current profile of a user.
//without promises:
var currentProfile = null; 
var username = 'something';

fetchServerConfig(function(serverConfig) { 
	fetchUserProfiles(serverConfig.USER_PROFILES, username,
		function(profiles) {
        currentProfile = profiles.currentProfile;
    });
});


//With promises
var currentProfile = 
	fetchServerConfig().then(function(serverConfig) {
		return fetchUserProfiles(serverConfig.USER_PROFILES, username);
	}).then(function(profiles) { 
		return profiles.currentProfile;
	}, function(error) {
		// Handle errors in either fetchServerConfig or 
		// fetchUserProfiles here
	});

//calling resolve on it calls the success handler,
//calling reject calls the error handler



ng-init
The ng-init directive is a function that runs at bootstrap time (before runtime). 
It allows us to set default variables prior to running any other functions during runtime.


ng-show, ng-hide
<button ng-init="shouldShow = true" ng-click="shouldShow = !shouldShow">Flip the shouldShow variable</button>
<div ng-show="shouldShow">
  <h3>Showing {{ shouldShow }}</h3>
</div>
<div ng-hide="shouldShow">
  <h3>Hiding {{ shouldShow }}</h3>
</div>



$scope.roommates = [
  { name: 'Ari'},
  { name: 'Q'},
  { name: 'Sean'},
  { name: 'Anand'}
];
We can use ng-repeat to loop through them in our view:

<ul>
  <li ng-repeat="person in roommates">{{ person.name }}</li>
</ul>



$scope.people = {
  'Ari': 'orange',
  'Q': 'purple',
  'Sean': 'green'
}
We can use the repeat expression: (key, value) in object, like so:

<ul>
  <li ng-repeat="(name, color) in people">{{ name }}"'s favorite color is "{{ color }}
  </li>
</ul>



From http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html

//This is because JavaScript has function-level scope. Blocks, such as if statements, do not create a new scope. 
//Only functions create a new scope.

//If you must create temporary scopes within a function, do the following:

function foo() {
	var x = 1;
	if (x) {
		(function () {
			var x = 2;
			// some other code
		}());
	}
	// x is still 1.
}


In JavaScript, a name enters a scope in one of four basic ways:

1) Language-defined: All scopes are, by default, given the names this and arguments.
2) Formal parameters: Functions can have named formal parameters, which are scoped to the body of that function.
3) {{whole function body HOISTED}} Function declarations: These are of the form function foo() {}.
4) {{NAME HOISTED, not assignment}} Variable declarations: These take the form var foo;.


function test() {
	foo(); // TypeError "foo is not a function"
	bar(); // "this will run!"
	var foo = function () { // function expression assigned to local variable 'foo'
		alert("this won't run!"); //only foo is hoisted, not the function expression.
	}
	function bar() { // function declaration, given the name 'bar'
		alert("this will run!");
	}
}
test();

In this case, only the function declaration has its body hoisted to the top. 
The name ‘foo’ is hoisted, but the body is left behind, to be assigned during execution.



Special case: name resolution order 
A function declaration takes priority over a variable declaration. 
The assignment to that name will work, but the declaration portion will be ignored. 

There are a few exceptions:

1) The built-in name arguments behaves oddly. 
It seems to be declared following the formal parameters, but before function declarations. 
This means that a formal parameter with the name arguments will take precedence over the built-in, even if it is undefined. 
This is a bad feature. Don’t use the name arguments as a formal parameter.

2) Trying to use the name this as an identifier anywhere will cause a SyntaxError. This is a good feature.
3) If multiple formal parameters have the same name, the one occurring latest in the list will take precedence, even if it is undefined.



Named Function Expressions

You can give names to functions defined in function expressions, 
with syntax like a function declaration. This does not make it a function declaration, 
and the name is not brought into scope, nor is the body hoisted. Here’s some code to illustrate what I mean:

foo(); // TypeError "foo is not a function"
bar(); // valid
baz(); // TypeError "baz is not a function"
spam(); // ReferenceError "spam is not defined"

var foo = function () {}; // anonymous function expression ('foo' gets hoisted)
function bar() {}; // function declaration ('bar' and the function body get hoisted)
var baz = function spam() {}; // named function expression (only 'baz' gets hoisted)

foo(); // valid
bar(); // valid
baz(); // valid
spam(); // ReferenceError "spam is not defined"



How to Code With This Knowledge

Now that you understand scoping and hoisting, what does that mean for coding in JavaScript? 
The most important thing is to always declare your variables with a var statement. 
I strongly recommend that you have exactly one var statement per scope, and that it be at the top. 
If you force yourself to do this, you will never have hoisting-related confusion. 
However, doing this can make it hard to keep track of which variables have actually been declared in the current scope. 
I recommend using JSLint with the onevar option to enforce this. 
If you’ve done all of this, your code should look something like this:

/*jslint onevar: true [...] */
function foo(a, b, c) {
    var x = 1,
    	bar,
    	baz = "something";
}



var a = 1;
function b() {
	a = 10;
	return;
	function a() {}
}
b();
alert(a);

-->1

The `function a(){}` does scope `a` a to the function `b`, but that `a = 10` does work to change it. 
Thus, after `b` finishes, its local `a` has the value `10`. 
However, because that `a` was local (due to the function declaration), the global `a` is unchanged, thus `1`. 




from N Zakas:
http://www.nczonline.net/blog/2010/01/26/answering-baranovskiys-javascript-quiz/

Ex 1:
if (!("a" in window)) {
    var a = 1;
}
alert(a);

browser executes as 
var a;
if (!("a" in window)) {
    a = 1;
}
alert(a);

so -->"undefined"

All global variables are properties of window. Writing var a = 1 is functionally equivalent to writing window.a = 1.

You can check to see if a global variable is declared, therefore, by using the following:

"variable-name" in window


Ex 2:
var a = 1,
    b = function a(x) { //this is a named function expression, not a function declaration
        x && a(--x);
    };
alert(a);

var a
var b
function a defined
a=1
b= true if x is true and a(x-1) is true
alert a


RUNS as:
var a = 1,
    b = function(x) {
        x && b(--x);
    };
alert(a);


All function declarations are hoisted to the top of the containing scope along with variable declarations.


-------------------------------------------------------
Just to be clear, a function declaration looks like this:
function functionName(arg1, arg2){
    //function body
}

This is opposed to a function expression, which is a variable assignment:
var functionName = function(arg1, arg2){
    //function body
};
--------------------------------------------------------


function declarations override variable declarations but not variable initializations. 
function value(){
    return 1;
}
var value;
alert(typeof value);    //"function"



The variable value ends up as a function even though the variable declaration appears after the function declaration. 
The function declaration is given priority in this situation. 
However, throw in variable initialization and you get a different result:

function value(){
    return 1;
}
var value = 1;
alert(typeof value);    //"number"
Now the variable value is set to 1. The variable initialization overrides the function declaration.




Ex 3:
function a(x) {
    return x * 2;
}
var a;
alert(a);


a is saved
a is assigned
alert returns the funciton body




Ex 4:
function b(x, y, a) { //function declaration
    arguments[2] = 10;
    alert(a);
}
b(1, 2, 3);


3 or 10?

10
In short, each entry in the arguments object is a duplicate of each named argument. 
Note that the values are shared, but not the memory space. 
The two memory spaces are kept synchronized by the JavaScript engine, 
which means that both arguments[2] and a contain the same value at all times. 
That value ends up being 10.




Ex 5:
function a() {
    alert(this);
}
a.call(null);


First,  this points to the object on which the method resides. Example:

var object = {
    method: function() {
        alert(this === object);    //true
    }
}
object.method(); 

function method() {
    alert(this === window);    //true
}
method(); 



Second, The call() method executes a function as if it were a method of another object. 
The first argument becomes this inside the method, and each subsequent argument 
is passed as an argument to the function. 

function method() {
    alert(this === window);
}
method();    //true
method.call(document);   //false


So whenever null is passed to call() (or its sibling, apply()), 
it defaults to the global object, which is window. 
Given that, the example code can be rewritten in a more understandable way as:

function a() {
    alert(this);
}
a.call(window);












