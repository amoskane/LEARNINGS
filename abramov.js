Abramov

entire app is represented in a state object

you can not modify or write to the state object.

to change, dispatch an action


an action is a js object describing the change



2
if the state is the minimal representaiton of the data in your app
the action is the minimal representaiton of the change to that data


only req in an action object is     type: "actiontype"


"the state is redundant"
(of words or data) able to be omitted without loss of meaning or function.
ENGINEERING
(of a component) not strictly necessary to functioning but included in case of failure in another component.




3
pure vs impure functions
pure function returns only values that are dependant on the input.

also they do not alter what is passed in,

impure functions may
call the db or the network
they may have side effects
they may overwrite the values passed to them





4
the view layer is most predictable when it is described as a pure function of the application's state


redux adds:
your state mutations in your app need to be described as a pure function
that takes the previous state
and the action being dispatched
and returns the new state

this function must be pure

this function is called the reducer






5
write the reducer for the counter app

function counter(state, action){
	if(action.type === "INCREMENT"){
		return state + 1;
	}else if(action.type === "DECREMENT"){
		return state - 1;
	}else{
		return state;
	}
};

expect(
	counter(0, {type: 'INCREMENT'})
).toEqual(1);

expect(
	counter(1, {type: 'INCREMENT'})
).toEqual(2);

expect(
	counter(2, {type: 'DECREMENT'})
).toEqual(1);

expect(
	counter(1, {type: 'DECREMENT'})
).toEqual(0);

console.log("Tests passed!");  //runs


however, this test would fail:
expect(
	counter(1, {type: 'SOMETHING_ELSE'})
).toEqual(1);  //return current state

unless you add the else clause


also must add in
if (typeof state === 'undefined'){
	return 0;   //returns initial state
}


ES6 tweaks:
replace if clause with a switch statement
replace undefined clause with a default argument:
				counter(state = 0, action)
replace function() declaration with an arrow function. clearer semantics

function counter(state, action){
to
const counter = (state = 0, action)  => {
	switch (action.type){
		case 'INCREMENT':
			return state + 1;
		case 'DECREMENT':
			return state - 1;
		default:
			return state;
	}
}




6
javascript-redux-store-methods-getstate-dispatch-and-subscribe

script tag 
npm better

returns one global variable called Redux

const { createStore } = Redux;
//old style would be:
var createStore = Redux.createStore;
//npm style would be:
import { createStore } from 'redux';


when you create the store you need to tell it it's reducer which will update it's state

const store = createStore(counter);

the store binds together the 3 ideas of redux:
1> store.getState(); holds the current state of application
2> lets you dispatch actions.
3> reducer which tells how state is updated with actions

3 methods
getState()
dispath({})
subscribe()

dispatch  lets you dispatch actions   most common
store.dispatch({ type : 'INCREMENT' });


//render something to the body now
store.subscribe(() => {
	document.body.innerText = store.getState();
});


//and dispatch an action when clicked
document.addEventListener('click', () => {
	store.dispatch({ type: 'INCREMENT'})
});



but, on page load, the initial state was not rendered.
becasue i'm rendering inside the subscribe callback, which doesn't fire on very first time 

so
extract the subscribe logic into a render method, subscribe to it AND call it for first time.

const render = () = => {
	document.body.innerText = store.getState();
}

store.subscribe(render);
render();


SO:
//////////////////////////////
const counter = (state = 0, action) => {
	switch (action.type){
		case 'INCREMENT' :
			return state + 1;
		case 'DECREMENT' :
			return state - 1;
		default :
			return state;
	}
}
//returns one global variable called Redux
const { createStore } = Redux;
//tell it it's reducer which will update it's state
const store = createStore(counter);

const render = () = => {
	document.body.innerText = store.getState();
}

store.subscribe(render);
render();

//and dispatch an action when clicked
document.addEventListener('click', () => {
	store.dispatch({ type: 'INCREMENT'})
});
//////////////////////////////////



7
javascript-redux-implementing-store-from-scratch

recreating this from scratch:
const { createStore } = Redux;

//really is doing all this:
const createStore = (reducer) => {
	let state;

	const getState = () = => state;

	const dispatch = (action) => {

	};

	const subscribe = (listener) => {

	};

	return {getState, dispatch, subscribe};
};


const createStore = (reducer) => {
	let state;
//now, because the subscribe function can be called many times,
//we need to keep track of the all the change listeners.
	let listeners= [];

	const getState = () = => state;
// calculate the new state by calling the reducer
//then notify every change listener by calling it.
	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach(listener => listener());
	};
//anytime it is called, push it into array
	const subscribe = (listener) => {
		listeners.push(listener);
//instead of a sophisticated remove method, just return a function
//from subscribe that unsubscribes by removing listener from array
		return () => {
			listeners = listeners.filter(l => l !== listener)
		}
	};

//by the time the state is returned we want to have the initial state calculated:
//so dispatch a dummy action:
	dispatch{()};

	return {getState, dispatch, subscribe};
};


FIRST TIME THROUGH:
///////////////////////////

//Now we recreate the createStore function from scratch
const { createStore } = Redux;   ===


const createStore = (renducer) => {  //1 the only argument passed to createStore is the reducer function
	let state; //2 the store holds the current state
	let listener = [];  //5 because the subscribe function can be called many times, we need to keep track of all the change listeners

	const getState = () => state; //3 so we keep it in a variable. returns the current value of that variable

	const dispatch = (action) => { //4 this combined with the dispatch and subscribe function
		//on a single object is called the redux store
		state = reducer(state, action); // 6 only way to change state is to call reducer, this calculates new state
		listeners.forEach(listener => listener()); // 6 after state updated, notify all the listeners by calling them
	};

	const subscribe = (listener) => {
		listeners.push(listener); //5, part 2.
		return () => {  //7 only thing missing is a way to unsubscribe . return a function from the subscribe method that removes
			//this listener form the listener array
			listeners = listeners.filter(l => l !== listener);
		};
	};

	dispatch({}); //8 by the time the store is returned, we want it to have the initial state populated. 
	//this dispatches a dummy action

	return { getState, dispatch, subscribe}
}










8
javascript-redux-react-counter-example


remove updating the DOM manually:
const render = () = => {
	document.body.innerText = store.getState();
}

and
document.addEventListener('click', () => {
	store.dispatch({ type: 'INCREMENT'})
});


then use react.

add react and react-dom js and an id to render to.

const render = () = => {
	ReactDOM.render = () => {
		<Counter
			value={store.getState()}//passes the current state in
			onIncrement={() =>
				store.dispatch({
					type: 'INCREMENT'
				})
			}
			onDecrement={() =>
				store.dispatch({
					type: 'DECREMENT'
				})
			}
		/>,											/
		document.getElemetById('root')
	};
};


//DUMB component. No business logic.
//how to display and how to bind events only.
const Counter = ({
	value,
	onIncrement,
	onDecrement
}) => (
<div>
	<h1>{value}</h1>
	<button onClick={onIncrement}>+</button>
	<button onClick={onDecrement}>-</button>
</div>
);




9
javascript-redux-avoiding-array-mutations-with-concat-slice-and-spread

You must not mutate the listener array.
modify it but not mutate.


push mutates.
so instead use concat.
return list.concat([0]);

//ES6 style:
return [...list, 0];


splice mutates.
to remove, usually you would use splice:
list.splice(index,1);
return list;

use .slice instead:
return list.slice(o, index)
.concat(list.slice(index + 1));

//ES6 style:
return [
	...list.slice(o, index),
	...list.slice(index + 1)
];


++ mutates.
list[index]++

return list
	.slice(o, index)
	.concat([list[index] + 1]);
	.concat(list.slice(index + 1));

//ES6 style:
return [
	...list.slice(o, index),
	list[index] +1,
	...list.slice(index + 1)
];

//use deepFreeze to protect yourself from mutations




10
avoiding-object-mutations-with-object-assign-and-spread


const toggleTodo = (todo) => {
	todo.completed = !todo.completed;
	return todo;
};

const addToQueue = ( state, {payload} ) => {
	state
	return state;
};

//this would mutate the completed field.
//one way to do it would be to create an object,
//copy all fields except the completed which would be flipped.

const toggleTodo = (todo) => {
	return {
		id: todo.id,
		text: todo.text,
		completed: !todo.completed
	};
};

//but if we add more properties to todo later,
//we may forget to update this section.

//so do it with new ES6 way Object.assign

const toggleTodo = (todo) => {
	return Object.assign({}, todo, {
		completed: !todo.completed
	});
};

//lets you assign properties of several objects onto a target object
//argument order corresponds to that of the js assignment operator

//the left argument, {}, is the one whose properties are going to be assigned
//so it's going to be mutated.
//everything after {} will be considered one of the source objects
//whose properties will be copies to {}

//the last assignment wins, which is why completed is overwritten correctly.





11

<script src="https://wzrd.in/standalone/expect@latest"></script>/
<script src="https://wzrd.in/standalone/deep-freeze@latest"></script>/

writing-a-todo-list-reducer-adding-a-todo

//reducer, version 1
const todos = (state = [], action => {
	switch (action.type){
		case 'ADD_TODO':
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			];
		default:
			return state;
	}
});

//the test
const testAddTodo = () = => {
	const stateBefore = [];
	const action = {
		type: 'ADD_TODO',
		id: 0,
		text: 'Learn Redux'
	};
	const stateAfter = [
		{
			id: 0,
			text: 'Learn Redux',
			copleted: false
		}
	];

	deepFreeze(stateBefore);
	deepfreeze(action);

	expect(
		todos(stateBefore, action)
	).toEqual(stateAfter);
};

testAddTodo();
console.log("All tests passed.");







12 continued


//reducer, version 2
const todos = (state = [], action => {
	switch (action.type){
		case 'ADD_TODO':
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			];
		case 'TOGGLE_TODO':
			return state.map(todo => {
				if (todo.id !== action.id){
					return todo;
				}

				return {
					...todo,
					completed: !todo.completed
				};
			});
		default:
			return state;
	}
});

const testAddTodo = () = => {
	const stateBefore = [];
	const action = {
		type: 'ADD_TODO',
		id: 0,
		text: 'Learn Redux'
	};
	const stateAfter = [
		{
			id: 0,
			text: 'Learn Redux',
			copleted: false
		}
	];

	deepFreeze(stateBefore);
	deepfreeze(action);

	expect(
		todos(stateBefore, action)
	).toEqual(stateAfter);
};


const testToggleTodo = () => {
	const stateBefore = [
		{
			id: 0,
			text: 'Learn Redux',
			completed: false
		},
		{
			id: 1,
			text: 'Go shopping',
			completed: false
		}
	];
	const action = {
		type: 'TOGGLE_TODO',
		id: 1
	};
	const stateAfter = [
		{
			id: 0,
			text: 'Learn Redux',
			completed: false
		},
		{
			id: 1,
			text: 'Go shopping',
			completed: true
		}
	];

	deepFreeze(stateBefore);
	deepfreeze(action);

	expect(
		todos(stateBefore, action)
	).toEqual(stateAfter);
};

testAddTodo();
testToggleTodo();
console.log("All tests passed.");












13
reducer-composition-with-arrays


const todos = (state = [], action => {
	switch (action.type){
		case 'ADD_TODO':
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			];
		case 'TOGGLE_TODO':
			return state.map(todo => {
				if (todo.id !== action.id){
					return todo;
				}

				return {
					...todo,
					completed: !todo.completed
				};
			});
		default:
			return state;
	}
});

//hard to undestand, because doing 2 things:
//1) how the todo's array is updated and
//2) how the todo is updated











































