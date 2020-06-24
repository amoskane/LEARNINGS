
@markbates

BACKBONE 
"minimal set of data structures and primitives used to build js apps."
do what you want, we wont tell.
very lightweight, leaves things up to you.

weight: minned + dependencies: 6.4kb
templating: unspecified
data adapter: 32k, jQuery
support: 17k= json2.js, 5k= underscore
total: 60k

mindshare: github 16

same app, 3 ways, BASIC MODELS (coffeescript):
class App.Beer extends Backbone.Model
class App.Beers extends Backbone.Collection
model: Beer

REMOTE MODELS (ways of talking to remote APIs)assumes RESTful JSON:
class App.Beer extends Backbone.Model
	urlRoot: "/api/v1/beers"

class App.Beers extends Backbone.Collection
	url:
		if @brewery_id?
			return "/api/v1/breweries/#{@brewery_id}/beers"
		else
			return "api/v1/beers"

model: Beer

ROUTERS: simple, yet bizarely complex
you have to do your own memory management, clean up views
using jquery to update HTML mainly.

CONTROLLERS/VIEWS:
1)rendering a template and binding to it, no built in, 
2)data binding updating as data updates, no data binding at all, all done with jQuery
3)saving theobject back to the server, collect all values, use jquery to send json
by far the most complex
extend, then say events

TEMPLATES:
no data binding so references to values go right into template which can get hairy later

PROS -lightweight, great for small widget type apps
	-not opinionated
	-simple
	-easy to read source
CONS -too simple: have to use a ton of other frameworks with it
	-not opinionated enough
	-memory management
	-unstructured
	-spaghetti code




EMBER
"framewok for creating ambitious web apps"
convention over configuration
ruby on rails kind of thinking:
if you name things correctly, and place them correctly then it does
	all the magic for you.

weight: 235k
templating: 73k - handlebars
data adapter: 210k - ember-data
support: 32k - jQuery
total: 550k

mindshare: github 7 

same app, 3 ways, BASIC MODELS (data mapper approach)no POJOS:
App.Beer = DS.Model.extend
	title: DS.attr("string")
	abv: DS.attr("number")
	country_id: DS.attr("number")
	brewery_id: DS.attr("number")
	brewery: DS.belongsTo("App.Brewery")
	country: DS.belongsTo("App.Country")

REMOTE MODELS (ways of talking to remote APIs):
same, plus set up rest adapter:

DS.RESTAdapter.reopen
	namespace: 'api/v1'

App.Store = DS.Store.extend
	revision: 14
	adapter: DS.RESTAdapter.create()

ROUTERS: nicest styled, 2 lines, Ruby styled
App.Router.map ->
	@resource "brewery", {path: "brewery/:brewery_id"}

Route Objects

CONTROLLERS/VIEWS:
1)rendering a template and binding to it, no render code, all built in
2)data binding updating as data updates, built in.
3)saving the object back to the server
save: ->
@store.commit()
done

TEMPLATES:
handlebars, tons of squiggly lines and special objects to embed views




ANGULAR
"toolset for building frameworks most suited to your web app."
(not really) framework unto itself and a good one
plain old js.
tool for using POJOS

weight: 99k
templating: built in
data adapter: built in
support: n/A
total: 99k

mindshare: interest has quaded in last year per google search
github leader 17

same app, 3 ways, BASIC MODELS:
App.Beer= {} //create a JS object.

REMOTE MODELS (ways of talking to remote APIs) use ngresource library:
App.factory "Beer", ($resource) ->
	return $resource "/api/v1/beers/:id",
		{id: "@id"},
		{update: {method:"PUT"}}

ROUTERS: more js approach
$routeProvider
.when call, .otherwise call
inline controllers with POJOS
powerful but not quite the nice syntax

CONTROLLERS/VIEWS:
1)rendering a template and binding to it
2)data binding updating as data updates
3)saving theobject back to the server
create POJO that uses angular helpers-- depend. inject.
pretty simple:

@EditBreweryController = ($scope, $routeParams, $location, Brewery) 
	
	$scope.brewery = Brewery.get(id: $routeParams.id) 

	$scope.save = 
		success = 
			$location.path("/breweries/#{routeParams.id}")
			$scope.errors = null
		failure = (object) 
			@scope.errors = object.data.errors
		$scope.brewery.$update {}, success, failure

TEMPLATES:
lets us go back to standard input fields 
with angular directives. ng-model, does binding

