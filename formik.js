the react solution is to use one event binder and
namespace it to each element on the form

//ES6 computed props
handleChange = (event) => {
	this.setState({
		[event.target.name]:event.target.value
	})
}

<input
 name="thing"
 onChange={this.handleChange}
 value={this.state.thing}
/>


<input
 name="other"
 onChange={this.handleChange}
 value={this.state.other}
/>



step one: find a helper library to validate fields
step two: organize so that you could build better primitives
so you can share



formik is a function that returns a component

values
touched
errors
isSubmitting
status



//using the "updater pattern"
handleChange = (event) => {
	event.persist()
	this.setState(prevState => ({
		values: {
			...prevState.values,
			[event.target.name]:event.target.value
		}
	})
}


you get these helpers and handlers for free

handleChange
handleBlur
handleSubmit

setFieldValue
setFieldTouched
setFieldError


if your object is not flat, you can flatten it with mapPropstoFields

event handlers are all named by a standard.




















