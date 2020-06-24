
write a react Component
render data to the page
make components talk
handle user events
capture user input
talk to remote servers

Components:

StoryBox
	StoryForm
	Story


a component generates html

when a render function is called, a snapshot of the virtualDom is taken.
the render method returns markup but it's not the final html
only the change from the last virtualDom will become html

every component must include a render funciton.



class StoryBox extends React.Component {
	render(){
		return( <div>Story Box</div>);
	}
}										/

//Renderer
ReactDOM.render(
	<StoryBox />, document.getElementById('story-app')
	//component, target
);


every time you make a new react component,
you use it by writing an element named after the class


Process:
static html is loaded.
react and component are loaded
reactDom renders the component to the virtualDom



class RobotBox extends React.Component {
  render() {
    return (<div>Hello From React</div>);
  }
}													/

let target = document.getElementById('robot-app');

ReactDOM.render( <RobotBox />, target );



steps:
1) id on an html page.
2) declare a react component using a js class that extends React.Component
	and contains a render method.
3) call ReactDOM.render() to make it show at the id.




1.7 JSX

//HMTL elements are in lower case:
<div>Hello From React</div>

///React elements are in upper camel case:
<RobotBox />

///jsx is transpiled

<div>Hello From React</div>
//transpiles to
React.createElement(type, props, children)
React.createElement('div', null, 'Story Box')

<RobotBox />
//transpiles to
React.createElement(StoryBox, null)


//looks like HTML but gets transformed into js.


class ComponentName extends React.Component {
  render() {
    return (

    );
  }
}


class ComponentName extends React.Component {
  render() {
    return (
    	<div>
    		<h3>Stories App</h3>						/
    		<p className="lead">Sample paragraph</p>
    	</div>
    );
  }
}

class is a js reserved name so you have to use className

transpiles to:
React.createElement("div", null,
	React.createElement("h3", null, "Storis App"),
	React.createElement("p", {className: "lead"}, "Sample paragraph")
);


the HTML is rendered by the browser (reading the js)




class ComponentName extends React.Component {
  render() {
    const now = new Date();

    return (
    	<div>
    		<h3>Stories</h3>						/
    		<p className="lead">
    			Current time: {now.toTimeString()}
    		</p>
    	</div>
    );
  }
}

{inside here is literal js}





class ComponentName extends React.Component {
  render() {
  	const topicsList = ['HTML', 'JS', 'React'];
    return (
    	<div>
    		<ul>
    			{topicsList.map( topic => <li>{topic}</li>)}
    		</ul>
    	</div>
    );
  }
}



JSX transpiles to js which transpiles to html.
things inside {} stay js.





/
2.1 Props and components communication

//building a commenting engine

CommentBox
Comment

pattern:
1) declare a class 2) that extends React.Component 3) that returns
JSX from a render function.

class NewComponent extends React.Component {
	render() {
		return (...);
	}
}


//HTML to be converted to react:
<div class="commment-box">
	<h3>Comments</h3>
	<h4 class="comment-count">2 comments</h4>
	<div class="comment-list">
		<div class="comment">
			<p class="comment-header">Anne Droid</p>
			<p class="comment-body">I wanna know what love is...</p>
			<div class="comment-footer">
				<a href="#" class="comment-footer-delete">Delete Comment</a>
			</div>
		</div>
	</div>
</div>


//Comment componant:
class Comment extends React.Component {
	render() {
		return (
			<div className="comment">
				<p className="comment-header">Anne Droid</p>
				<p className="comment-body">I wanna know what love is...</p>
				<div className="comment-footer">
					<a href="#" className="comment-footer-delete">Delete Comment</a>
				</div>
			</div>
		);
	}
}

/   <Comment />   /


/
//CommentBox
class CommentBox extends React.Component {
	render() {
		return (
			<div className="commment-box">
				<h3>Comments</h3>
				<h4 className="comment-count">2 comments</h4>
				<div className="comment-list">
					<Comment />
					<Comment />
				</div>
			</div>
		);
	}
}


The arguments you send into Comment to create diff comments are called
PROPS.

//Passing PROPS:
class CommentBox extends React.Component {
	render() {
		return (
			<div className="commment-box">
				<h3>Comments</h3>
				<h4 className="comment-count">2 comments</h4>
				<div className="comment-list">
					<Comment author="Morgan" body="Great Picture!" />
					<Comment author="Bender" body="Excellent stuff!" />
				</div>
			</div>
		);
	}
}

//Receiving props:
class Comment extends React.Component {
	render() {
		return (
			<div className="comment">
				<p className="comment-header">{this.props.author}</p>
				<p className="comment-body">{this.props.body}</p>
				<div className="comment-footer">
					<a href="#" className="comment-footer-delete">Delete Comment</a>
				</div>
			</div>
		);
	}
}


///props are the iterpolated part of the template.

components are able to take arguments
those arguments are called props.
they look like HTML attributes.
this.props reads the attributes.

set it in the box and then read it in the comment?




2.8
Passing Dynamic arguments
//how to pass dynamic props using variables
//how to map object arrays to jsx arrays for display

// typically returned from ajax
const commentList = [
	{id:1, author: '...', body:'...'},
	{id:2, author: '...', body:'...'}
];


//underscore helps distinguish custom methods from React methods
class CommentBox extends React.Component {
	...
	_getComments(){ //returns an array of jsx elements

		const commentList = [
			{id:1, author: '...', body:'...'},
			{id:2, author: '...', body:'...'}
		];

		return commentList.map(() => {
			return (<Comment            />);
		});
	}
}


//Now pass in props:
		return commentList.map((comment) => {
			return (
				<Comment
				  author={comment.author}
				  body={comment.body}
				  key={comment.id}   />);         //key is a good idea
		});
/


anything in jsx inside {}
is interpreted as literal js.
even variables



class CommentBox extends React.Component {
	render() {
		const comments = this._getComments();

		return (
			<div className="commment-box">
				<h3>Comments</h3>
				<h4 className="comment-count">
					{this._getCommentsTitle(comments.length)}
				</h4>
				<div className="comment-list">
					{comments}    //jsx renders arrays automatically
				</div>
			</div>
		);
	}

	_getComments(){ //returns an array of jsx elements
		const commentList = [
			{id:1, author: 'a', body:'aa a a a a a '},
			{id:2, author: 'b', body:'bbb b b b b b b'},
		];

		return commentList.map((comment) => {
			return (
				<Comment
				  author={comment.author}
				  body={comment.body}
				  key={comment.id}
				 />
			);
		});
	}
///
	_getCommentsTitle(commentCount){
		if(commentCount === 0){
			return 'No comments yet';
		} else if {
			return '1 comment';
		} else {
			return '${commentCount} comments';
		}
	}
}



alt={`${this.props.author}'s picture`}







LEVEL 3: COMPONENT STATE
//handling data changes with state.



we want to add a toggle behavior that
1) show/hides the comments
2) changes the text on the button

indirect DOM manipulation with react.

we modify a component state Object
and that modifies the DOM

events --> Update State --> DOM updates
             user code         react


render(){
	if(this.state.showComments){
		//code displaying comments
	} else {
		//code hiding
	}
}

state is a js object that lives inside each component.
this.state


//new variable called commentNodes
class CommentBox extends React.Component {
	render() {
		const comments = this._getComments();
		let commentNodes;

		if(this.state.showComments){
			commentNodes = <div className="comment-list">{comments}</div>
		}

		return (
			<div className="commment-box">
				<h3>Comments</h3>
				<h4 className="comment-count">
					{this._getCommentsTitle(comments.length)}
				</h4>
				{commentNodes}
			</div>
		);
	}

	_getComments(){ //returns an array of jsx elements
		const commentList = [
			{id:1, author: 'a', body:'aa a a a a a '},
			{id:2, author: 'b', body:'bbb b b b b b b'},
		];

		return commentList.map((comment) => {
			return (
				<Comment
				  author={comment.author}
				  body={comment.body}
				  key={comment.id}
				 />
			);
		});
	}
///
	_getCommentsTitle(commentCount){
		if(commentCount === 0){
			return 'No comments yet';
		} else if {
			return '1 comment';
		} else {
			return '${commentCount} comments';
		}
	}
}


//we set the initial value of showComments to false
//in a class constructor
inside CommentBox:
constructor(){
	super();  //super must be called in a constructor

	this.state = {
		showComments: false //sets value
	};
}


//now change state in repsonse to user action.
DO NOT assign to the component's state directly.
call setState

this.setState({showComments:true})




inside CommentBox:
inside return:
<button onClick={this._handleClick.bind(this)}>{buttonText}</button>

/
inside render:
let buttonText = 'Show Comments';

if(this.state.showComments){
	buttonText = "Hide Comments";
}

/
outside return:
_handleClick(){
	this.setState({
		showComments: !this.state.showComments
	});
}




state represents data that changes over time.

we declare an initial state in the component's constructor'

we update state by calling this.setState()

Calling this.setState() causes our component to rerender



    let commentBody;
    
    if(!this.state.isAbusive){
      commentBody = this.props.body;
    }




_toggleAbuse(event){
    event.preventDefault();
    if(this.state.isAbusive){
      this.setState({isAbusive : false});
    }else{
      this.setState({isAbusive : true});
    }
}



 <a href="#" onClick={this._toggleAbuse.bind(this)}>Report as Abuse</a>
        </div>






//arrow functions review:
items.filter( function(item){
	return item.type === 'attack'
})

items.filter(item => item.type === 'attack')

IF arrow function, remove function.
IF your logic is one statement you can remove the return and the {}.
IF you only have 1 argument, you can remove the () on it.





4.1 SYNTHETIC events
capturing user actions.

let users add new comments.
commentsForm
use refs to assign form values to properties on the component object.


class CommentForm extends React.Component {
  render() {
    return (
    	<form className="commment-form" onSubmit="{this._handleSubmit.bind(this)}">
    		<label>Join the discussion</label>
    		<div className="comment-form-fields">
    			<input placeholder="Name:" ref="{(input) => this._author = input}" />
    			<textarea placeholder="Comment:" ref="{(textarea) => this._body = textarea}"></textarea>
    		</div>
    		<div className="comment-formactions">
    			<button type="submit"></button>
    		</div>
    	</form>
    );
  }

  _handleSubmit(e){
  	e.preventDefault();
  }
}											/


ref="{(input) => this._author = input}"
//is the same as:
ref={
	function(input){   //DOM element passed into callback
		this._author = input;  //creates a new class property named _author
	}.bind(this)  //this refers to CommentForm
}/>


///react runs ref callbacks on render.


  _handleSubmit(e){
  	e.preventDefault();

  	let author = this._author;
  	let body = this._body;      //populated from refs in jsx

  	this.props.addComment(author.value, body.value);
  }
                  //^ this method is passed as an argument to CommentForm


//common pattern to pass functions from parent to child components
//ITC from CommentBox to CommentForm

we need to propogate data from Form to Box
CommentForm has the new data, CommentBox has the comment array

functions in js are first class citizens
so we pass them as props to other components.

//back in...
class CommentBox extends React.Component{
	render(){
		return(
			<div className="comment-box">
				<CommentForm addComment={this._addComment.bind(this)} />
			...
			</div>
		);
	}

	_addComment(author, body){
		const comment = {
			id: this.state.comments.length + 1,
			author,
			body
		};
		this.setState({ comments: this.state.comments.concat([comment]) });
	}
}


but currently we're' making a new array every time _getComments is called.
let's move this data to the state.'

current:
	_getComments(){ //returns an array of jsx elements
		const commentList = [
			{id:1, author: 'a', body:'aa a a a a a '},
			{id:2, author: 'b', body:'bbb b b b b b b'}
		];

		return commentList.map((comment) => {
			return (
				<Comment
				  author={comment.author}
				  body={comment.body}
				  key={comment.id}
				 />
			);
		});
	}

/new:
	_getComments(){

		constructor(){
			super();

			this.state = {
				showComments=false,
				comment = [
					{id:1, author: 'a', body:'aa a a a a a '},
					{id:2, author: 'b', body:'bbb b b b b b b'}
				];
			};
		}
		//now rendering comments from the state:
		return this.state.comments.map((comment) => {
			return (
				<Comment
				  author={comment.author}
				  body={comment.body}
				  key={comment.id}
				 />
			);
		});
	}


react wraps the browser's native events in synthetic events,
so that browser behavior is consistent.


onSubmit
might be called
eventSubmit, submitEvent, theSubmitEvent by diff browsers




we use react's event system to capture user input.

refs allow us to reference DOM elements
after the component has been rendered.

parent components can pass callback functions as props
to child components to allow 2-way communication.

synthetic events are a cross browser wrapper
around the browsers native event system

/

  _getCharacterCount(){
    let characters = this._body.value.length;
    this.setState({characters : characters});
  }

onKeyUp={this._getCharacterCount().bind(this)}



    if(!this._author.value || !this._body.value){
      alert("Please enter your name and comment");
      return
    }








5.1 LIFECYCLE METHODS --pulling from apis.

first step is to set comments array to empty in the constructor.
in CommentBox:

class CommentBox extends React.Component{
	_fetchComments() {
		$.ajax({
			method: 'GET',
			url: '/api/comments',
			success: (comments) => {      //arrow function preserves the this binding to our class
				this.setState({ comments }) //this refers to CommentBox
			}
		});
	}
}

now who calls _fetchComments?

if you put it in the render function of CommentBox,
	that would be an infinite loop
	because _fetchComments calls setState
	which re-calls render...

we need to call _fetchComments BEFORE render.

Lifecycle methods:
constructor()
componentWillMount()
render()
componentDidMount()
componentWillUnmount()


MOUNTING means being rendered for the first time.

so:
componentWillMount() {
	this._fetchComments();
}

how do you get updates?
polling

componentDidMount() {
	setInterval(() => this._fetchComments(), 5000);
}


it will check every 5 secs, and call render, but not render if there's'
no DOM change.


memory leaks on page change
page changes in a SPA will cause CommentBox
to keep adding timers.

so remove timers when it leaves DOM.


change this:
componentDidMount() {
	setInterval(() => this._fetchComments(), 5000);
}

to:
componentDidMount() {
	this._timer = setInterval(  //store timer as an object property
		() => this._fetchComments(),
		5000
	);
}

and add:
componentWillUnmount() {
	clearInterval(this._timer);
}




//We added a new method to CommentBox called _getAvatars(). 
//Make this method return an array of avatarUrl strings by using 
//the map() function on the comments property of the state.

return this.state.comments.map( (e) => e.avatarUrl );



//Lastly, let's pass an avatars prop to the CommentAvatarList component 
//with the value returned by the this._getAvatars() method.

<CommentAvatarList avatars={this._getAvatars()} />





5.6 Talking to Remote Servers.
Adding and Deleting Comments on the Server Side.
/

class CommentBox extends React.Component{...

	_deleteComment(comment){
		jQuery.ajax({
			method: 'DELETE',
			url: '/api/commments/${comment.id}'  //ES6 sting template syntax
		});
	}
	//we won't wait for the request to finish before we update the state.
	//optimistic update.

	//create a new array by copying the elements of the state.
	const comments = [...this.state.comments];  //use spread operator
	//to clone existing array
	const commentIndex = comments.indexOf(comment);
	comments.splice(commentIndex, 1);

	this.setState({ comments });

}


delete events are fired from the comment component.
event handler is defined in parent.
passed to child as a prop named onDelete.



so here:
class CommentBox extends React.Component{...
	_getComments(){

		constructor(){
			super();

			this.state = {
				showComments=false,
				comment = [
					{id:1, author: 'a', body:'aa a a a a a '},
					{id:2, author: 'b', body:'bbb b b b b b b'}
				];
			};
		}
		//now rendering comments from the state:
		return this.state.comments.map((comment) => {
			return (
				<Comment
				  author={comment.author}
				  body={comment.body}
				  key={comment.id}
				 />
			);
		});
	}



/we go:
class CommentBox extends React.Component{...
	_getComments(){

		constructor(){
			super();

			this.state = {
				showComments=false,
				comment = [
					{id:1, author: 'a', body:'aa a a a a a '},
					{id:2, author: 'b', body:'bbb b b b b b b'}
				];
			};
		}
		//now rendering comments from the state:
		return this.state.comments.map((comment) => {
			return (
				<Comment
				  author={comment.author}
				  body={comment.body}
				  key={comment.id}
				  onDelete={this._deleteComment.bind(this)}
				  //will later be called in the context of the CommentBox component
				  //sends this._deleteComment as an argument to child component
				 />
			);
		});
	}

//and add an event listener to the delete button:
so here:
class Comment extends React.Component {
	render() {
		return (
			<div className="comment">
				<p className="comment-header">Anne Droid</p>
				<p className="comment-body">I wanna know what love is...</p>
				<div className="comment-footer">
					<a href="#" className="comment-footer-delete">Delete Comment</a>
				</div>
			</div>
		);
	}
}

/to here:
class Comment extends React.Component {
	render() {
		return (
			<div className="comment">
				<p className="comment-header">Anne Droid</p>
				<p className="comment-body">I wanna know what love is...</p>
				<div className="comment-footer">
					<a href="#" className="comment-footer-delete" onClick={this._handleDelete.bind(this)}>Delete Comment</a>
				</div>
			</div>
		);
	}

	_handleDelete(event){
		event.preventDefault();
		this.props.onDelete(this.props.comment);
	}
}


/Now add a user confirm before delete.



parent components can send data to child components using props.

child components can accept
callback functions as props
to communicate back with parent components







































