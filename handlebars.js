handlebars

{{#if author}}
    shows if author is truthy
  {{/if}}

 {{else}}

{{^if author}} (else)
    shows if author is falsey
{{/if}}

 {{#unless license}}
	the inverse, shows if license is falsey


{{#each people}}
	iterate over list people
	{{this}} spits out people[0], people[1]…
	{{else}} renders if people is empty
	{{@index}} renders current loop index
		The first and last steps of iteration are noted via the @first and @last variables when iterating over an array. 	
	{{@key}} renders current key value in the object’s key-value pair
		When iterating over an object only the @first is available.
	

{{@../index}} To access the parent index


get template
compile template
render template with data
insert rendered template into the DOM


PARTIALS
Handlebars.registerPartial(‘dog’, dog_template);
{{> dog}}
partials receive the same rendering context as the outer template

declaring variables within your partial
{{> dog language=@root.language}}

then all the @root.language ’s can just be 
 {{language.yep}}



{{{passes raw html through}}}

{{~prop1}}
{{prop1~}}
{{~prop1~}} kills the whitespace


nested paths just means you can access into the son structure with dot notation





HELPERS:
properties that are functions.
globally scoped.
instead of returning the function body, handlebars returns the function result.
are global references to js functions
accept arguments
accept templates
output strings to render


making a helper:
function exampleHelperFunction(){
 	//do helper stuff
}
Handlebars.registerHelper(‘myHelper’, exampleHelperFunction);
					Helper Reference, Helper function

this, inside the helper function, will refer to where helper was called
so they complicate unit testing.


-must register before rendering
-helper references will override properties: helper will ender instead of property if they have the same name.

calling a helper from inside a template:
{{myHelper arg1 ‘arg2’}}


adding this 
<a class="mdl-navigation__link mdl-typography--text-uppercase" href="?filter=dogs{{getLanguageFilter langId}}">{{dogsFilter}}</a>

maintains the language selection regardless of the filter you’ve clicked.




BLOCK HELPER syntax

like #each and #if, but home made

{{#myHelper onlyArg}}
	//hrlper stuff
{{/myHelper}}

only one arg.
if you need to add more args, you do it in a hash pattern
{{ #myHelper onlyArg arg2=arg2 arg3=‘arg3’ }}

function blockHelperFunction(context, options){
	//block helper stuff
	return options.fn(context);     //like
} 
					//arg from template
							//special object

Options argument properties:
hash : holds any hash arguments. contains hash arguments from template expression
fn : compiled function containing inner template, 







