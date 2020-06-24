BUILDING DIRECTIVES

angular.module('app.directives.contactCard', [])
	//this is dependency injected, ---^ you can require services, scope, whatever 
	.directive('contactCard', function(){
		//we'll be returning an object, which is our Directive:
		return{
			//how you're pulling it in
			restrict:'E',
			//A: instantiated using an attribute: <div contact-card> or <div data-contact-card>
			//E: instantiated using an element: <contact-card> 
			//C: instantiated using either
			
			//where stuff's coming from
			scope: {
				data: '=' //goes to markup looking for attribute 'data', will find object friend if data=friend in the markup.
				friend: '=', //goes to markup, returns friend=""
				title: '='
				//= means binding is going both ways
			},

			//element would still be called contact-card without this. This changes it to a div. 
			//Must have one root element to use, so wrap template code in <div>
			replace:true,
			
			transclude:true, //use if you need html inside the directive tags, otherwise everything in there gets wiped out.
			//you also have to instruct it how to include it in the template. <div ng-transclude></div>
			//for if you need to custom tweek that element every time in the repeat

			//for if you want to bind to, listen to, or manipulate the DOM 
			//NOT dependency injected. Only 3 arguments possible
			link: function(scope, element ,attrs){
				element.click(function(){
					alert('click');
				});
			},

			templateURL: ".html",
			link: function(scope, element, attrs){
				element.click(function(){
					alert('click');
				});
			},
			//also dependency injected
			controller: function($scope, $interval){
				console.log($scope.friend);
			}
		};
	});

TO BUILD:
	1) save this as /directives/contactCard.js
	2) add to build html file
	3) add as a dependency to app.js

IN MARKUP:
	<contact-card> will be app.directives.contactCard 
	or <div contact-card>
	or <div data-contact-card>

ONLY restrict and controller are required.

> 705
> 684

768-868   
768-817    49

1024-1110
1024-1046   22



