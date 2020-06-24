1 AJAX BASICS

It was:
$('.confirmation').on('click', 'button', function(){
	$(this).find('.ticket').slideDown();
});
$('.confirmation .view-boarding-pass').on('click', function(){
	$(this).closest('.ticket').find('img').show();
});

changes to:
$('.confirmation').on('click', 'button', function(){
	//relative URLS here, same domain
	$.ajax('confirmation.html', {
		success: function(response){
			$('.ticket').html(response).slideDown();
		}
	});	
});


The response that gets returned:
<div>
	<strong>Boarding Pass</strong>
	<a href="" class="">View Boarding Pass</a>
	<img src="" alt="" class="" />
</div>


AJAX METHOD is:
$.ajax(url[, settings])


A shorthand for .ajax is .get.
Only takes 2 params: url and success.
-->
$.get('confirmation.html', function(response){
	$('.ticket').html(response).slideDown();
});	


Sending parameters with requests:
$.ajax('confirmation.html?confNum=1234', {
	success: function(response){
		$('.ticket').html(response).slideDown();
	}
});

same:
$.ajax('confirmation.html', {
	success: function(response){
		$('.ticket').html(response).slideDown();
	},
	data: { "confNum": 1234 } //takes a JS object.
	}
});

or if data is dynamic:
$.ajax('confirmation.html', {
	success: function(response){
		$('.ticket').html(response).slideDown();
	},
	data: { "confNum": $(".ticket").data("confNum") } //takes a JS object.
	}
});
WITH HTML:
<div class="ticket" data-confNum="1234">




AJAX OPTIONS:
-----------------------------------
handling errors:

$('.confirmation').on('click', 'button', function(){
	$.ajax('confirmation.html', {
		success: function(response){
			$('.ticket').html(response).slideDown();
		},
		error: function(request, errorType, errorMessage){
			alert('Error: '+errorType+ ' with message: '+errorMessage);
		},	
		//error time changes per browser so standardize it this way
		timeout:3000,
		//runs before ajax request. Good time for a spinner.
		beforeSend: function(){
			$('.confirmation').addClass('is-loading');
		},
		//runs after success AND error, last thing. Turn off spinner.
		complete: function(){
			$('.confirmation').removeClass('is-loading');
		}
	});	
});


OK, now we see that this click handler is broken:
$('.confirmation .view-boarding-pass').on('click', function(){
	$(this).closest('.ticket').find('img').show();
});

because the click handler only runs once at page load, 
and .view-boarding-pass did not exist yet then.

Use event delegation to handle this.

$('.confirmation').on('click', '.view-boarding-pass' function(){
});

so- listen for click events inside .confirmation.
When they happen, see if it was for .view-boarding-pass.




JS & jQuery
-----------------------------
OK, Lets take this mess of code now and refactor it into js objects:

$(document).ready(function(){
	$('.confirmation').on('click', 'button', function(){
		$.ajax('confirmation.html', {
			success: function(response){
				$('.ticket').html(response).slideDown();
			},
			error: function(request, errorType, errorMessage){
				alert('Error: '+errorType+ ' with message: '+errorMessage);
			},	
			timeout:3000,
			beforeSend: function(){
				$('.confirmation').addClass('is-loading');
			},
			complete: function(){
				$('.confirmation').removeClass('is-loading');
			}
		});	
	});
	$('.confirmation').on('click', '.view-boarding-pass' function(e){
		e.preventDefault();
		$('.view-boarding-pass').hide();
		$('.boarding-pass').show();
	});
});


Like this:
//just contains a js object that has an init key that has a function.
var confirmation = {
	init: function(){
		//our existing event handlers
	}
}

call it like this:
$(document).ready(function(){
	confirmation.init();
});

Next improvementis to pull out the callback funcitons--
var confirmation = {
	init: function(){
		$('.confirmation').on('click', 'button', this.loadConfirmation);
		$('.confirmation').on('click', '.view-boarding-pass', this.showBoardingPass); 
	},
	loadConfirmation: function(){
		$.ajax('confirmation.html', {
			success: function(response){
				$('.ticket').html(response).slideDown();
			},
			error: function(request, errorType, errorMessage){
				alert('Error: '+errorType+ ' with message: '+errorMessage);
			},	
			timeout:3000,
			beforeSend: function(){
				$('.confirmation').addClass('is-loading');
			},
			complete: function(){
				$('.confirmation').removeClass('is-loading');
			}
		});		
	}, 
	showBoardingPass: function(e){
		e.preventDefault();
		$('.view-boarding-pass').hide();
		$('.boarding-pass').show();
	}



JS Functions:
------------------------------------
object vs. function

//object-- can only have 1 confirmation object per page
var vacation = { 
	init: function(){
	}
};

$(document).ready(function(){
	vacation.init();
});



//do a function if u need more than 1 per page:
function Vacation(destination){
	//init vaca to destination
	}
}

$(document).ready(function(){
	var paris = new Vacation('Paris');
	var london = new Vacation('London');
});



//then:
function Vacation(destination){
	//create a details method that prints dest to console
	this.details= function(){
		console.log(destination);
	}
}

$(document).ready(function(){
	var paris = new Vacation('Paris');
	//call details method
	paris.details();

	var london = new Vacation('London');
	london.details();
});

//cannot call paris.destination 
//b/c destination is a locally scoped variable





refactoring to funcitons:
function Confirmation(el){
	this.el = el; //saves ref to the passed in element to use in callbacks
	//$(ticket).html(response).slideDown();
	//will target all tickets, not just the one that was clicked, unless you do this:
	this.ticket = this.el.find('.ticket');
	var confirmation = this;

	//helper methods
	this.loadConfirmation = function(){
		$.ajax('confirmation.html',{
			timeout:3000,
			context: confirmation,
			success: function(response){
				//inside an ajax callback, this is set to the AJAx settings.
				this.ticket.html(response).slideDown();
			}
		});
	}
	this.showBoardingPass = function(event){...}

	//event handlers
	this.el.on('click', 'button', this.loadConfirmation);
	this.el.on('click', '.view-boarding-pass', this.showBoardingPass);
}

$(document).ready(function(){
	//create a new confirmation for each ticket
	var paris = new Confirmation($('#paris'));
	//...
})


//sometimes jquery changes the value of this, so:
add
var confirmation = this;
and
context: confirmation,




Refactoring hard coded elements:
//first version of showBoardingPass:
this.showBoardingPass = function(event){
	event.preventDefault();
	$('.view-boarding-pass').hide();//fix
	$('.boarding-pass').show();//fix

	console.log(this);-->the DOM object for .view-boarding-pass
	console.log(confirmation);-->the confirmation object in the parent scope
}

SO:

this.showBoardingPass = function(event){
	event.preventDefault();
	$(this).hide();//this will be the link that was clicked.
	confirmation.el.find('.boarding-pass').show();//find using variables form the parent scope.
}


EXERCISES:
-------------------------
//In order to add a bit of functionality to our Tour, 
//let's pass in the nightly cost of the Tour when we 
//create a new one - maybe 100 for now. In the Tour function, 
//update the declaration to accept this new price argument.

//In order to use this price, create a new function 
//within the Tour named cost, which can be called with a number of nights. This cost function should console.log the number of nights multiplied by the price. We've added the call to cost within $(document).ready(), 
//which you can uncomment once you've implemented.
function Tour(price) {
  console.log("A new Tour was created");
  this.cost = function(nights){
    console.log(nights*price); 
  }  
}
$(document).ready(function() { 
  var tour = new Tour(100);
  tour.cost(4);
});


function Tour(el) {
  var tour = this;
  this.el = el;
  this.fetchPhotos = function() {
    $.ajax('/photos.html', {
      data: {location: tour.el.data('location')},
      context: tour,
      success: function(response) {
        this.el.find('.photos').html(response).fadeIn();
      },
      error: function() {
        this.el.find('.photos').html('<li>There was a problem fetching the latest photos. Please try again.</li>');
      },
      timeout: 3000,
      beforeSend: function() {
        this.el.addClass('is-fetching');
      },
      complete: function() {
        this.el.removeClass('is-fetching');
      }
    });
  };
  this.el.on('click', 'button', this.fetchPhotos);
}
$(document).ready(function() { 
  var paris = new Tour($('#paris'));
});





-----------------------------------
3 FORMS WITH AJAx

$('form').on('submit', function(event){
	event.preventDefault();
	$.ajax('/book', {
		type:'POST'
		data: { "destination": $('#destination').val(),
				"quantity": $('#quantity').val() }
	});
});

default behavior on a submit is to refresh page.

//Better: use serialize()
//to merge all fields for submission

data: $('form').serialize()

//after you add a success callback, you're looking up 
//'form' twice:

success: function(result){
	$('form').remove();
	$('vacation').hide().html(result).fadeIn();
	//hide the div, fill it with the new data, 
	//fade it back in.
}
//so:
var form = $(this);

//then
data: form.serialize(),
success: function(result){
	form.remove();
	...
}



AJAX WITH JSON

HTML:
<p> Your vacation to Paris, France has been booked
for $2,196.00 for 4 nights. Confirmation #345feab.</p>

JSON:
{
	totalPrice: 2196.00,
	nights: 4,
	location: 'Paris',
	confirmation: '345feab'	
} 


add in:
dataType: 'json'   //expect the response as
contentType: 'application/json' //ask the server to respond with

//into success:
form.remove();
var msg = $("<p></p>");
msg.append("Destination: " +result.location + ". ");
msg.append("Price: " +result.totalPrice + ". ");
msg.append("Nights: " +result.nights + ". ");
msg.append("Confirmation: " +result.confirmation + ". ");

$('#vacation').hide().html(msg).fadeIn();


//there's a duplication in js and html:
$.ajax('/book', { ... });
<form action='/book' method="POST">
...
</form>

//instead write:
$.ajax($('form').attr('action'), { ... });




-----------------------------------
4 UTILITY FUNCTIONS

Review:
$('button').on('click', function(){
	$.ajax('/cities/favorite/1', {
		contentType: 'application/json',
		dataType: 'json',
		success: function(result){
			var favorite = $('.favorite');
			favorite.find('p').html(result.name);
			favorite.find('img').attr('src', result.image);			
		}
	});
});

//but what if we have multiple favorites?
//need to loop through each city.

Utiity Method: each
$.each(collection, function(<index>, <object>) {})

success: function(result){
	$.each(result, function(index, city){
			var favorite = $('.favorite-' + index);
			favorite.find('p').html(city.name);
			favorite.find('img').attr('src', city.image);			
	});
});	

//Alternatively you could write this:

$.getJSON(url, success);

success: function(result){
	$.getJSON('/status', function(result){
		//take the JSON results and trnslate into some HTML, li's
		var statusElements = ?
		//then uodate status list element with that HTML
		$('.status-list').html(statusElements) 
	});
});

//you could go through each with each, build up a string, then
//append the string, or use .map

$.map(collection), function(<item>, <index>){};
         (array)

var myNumbers = {1,2,3,4};
var newNumbers = $.map(myNumbers, function(item, index){ return item + 1});        

//myNumbers stays the same. newNumbers is the new array.

$.map(result, function(status, i){
	var listItem = $('<li></li>');
	$('<h3>'+status.name+'</h3>').appendTo(listItem);
	$('<p>'+status.status+'</p>').appendTo(listItem);
	return listItem;
});

//ALL together now:
$('.update-flight-status').on('click', function(){
	$.getJSON('/status', function(result){
		var statusElements = $.map(result, function(status, i){
			var listItem = $('<li></li>');
			$('<h3>'+status.name+'</h3>').appendTo(listItem);
			$('<p>'+status.status+'</p>').appendTo(listItem);
			return listItem;
		});
		$('.status-list').html(statusElements); 
	});
});


$.each vs. $.map
each returns same aray we started with,
map returns a new array

$.each(cities, function(index, city){
	var result = city + " " + index;
	console.log('result');
});

//gives
Paris 0
London 1
Orlando 2

$.map(cities, function(city, index){
	var result = city + " " + index;
	console.log('result');
	return result;
});

//same

//optimize this a bit with the detach function
//detach removes an element from the DOM, do things to it, 
//then append back to the DOM.

//so
$('.status-list').detach()
				 .html(statusElements)
				 .appendTo('status'); 


$('.update-available-flights').on('click', function() {
  $.getJSON('/flights/late', function(result) {
    var flightElements = $.map(result, function(flightItem, index){
      var flights = $('<li></li>');
			$('<h3>'+flightItem.flightNumber+'</h3>').appendTo(flights);
			$('<p>'+flightItem.time+'</p>').appendTo(flights);
			return flights;
    });
    $('.flight-times').html(flightElements); 
  });
});



EXERCISE:
Insert the data from an individual dealItem into the correct dealElement

$('button').on('click', function() {
  $.ajax('/cities/deals', {
    type: 'get',
    success: function(result) {
      $.each(result, function(index, dealItem) {
        var dealElement = $('.deal-' + index);
        dealElement.find('.name').html(dealItem.name);
        dealElement.find('.price').html(dealItem.price);
      });
    }
  });
});






Advanced Events
EVENTS for PLUGINS
-------------------------------
//you can remove all functions fired for an event by saying
$('button').off('click');
//stops watching for the event alltogether

//but what if you only want to turn off 1 event?
NAMESPACING
function picture(){ console.log('Show Plane'); }
function status(){ console.log('In Service'); }

$(document).ready(funciton(){
	$('button').on('click.image', picture);
	$('button').on('click.details', status);
	$('button').on('mouseover.image', zoom);

	$('button').off('click.image');
	//or this would turn off all events for that namespace:
	$('button').off('.image');
	//or this will trigger the event thru js, not thru user interaction
	$('button').trigger('click');
	//or
	$('button').trigger('click.details');

});

//click to show price on 3 vaca's, and a show all button
$('.vacation').on('click.price', 'button', showPrice)
//we namespace the event since it's part of the 'price' responsibility

$('.vacation button').on( //...would be the wrong delegation syntax

var showPrice = function(){
	var vacation = $(this).closest('.vacation');
	var price = vacation.data('price');
	var details = $('<p>Book 3 days for $'+(3 * price)+'</p>');
	vacation.append(details);
};

//to implement show all using the same showPrice
//Creating a custom event

//typical event handler format:
$(<dom element>).on("<event>.<namespace>", <method>)

//the <event> can also be custom(instead of click, hover, etc.), so:
$('.vacation').on('show.price', 'button', showPrice)

//but there's no event----so you use trigger
$('.vacation').trigger('show.price');
//to trigger on just one vacation:
$('vacation:last').trigger('show.price');

//all together:
<a href="#" class="show-prices">Show All Prices</a>

var showPrice = function(){...};

$('.vacation').on('click.price', 'button', showPrice);
$('.vacation').on('show.price', showPrice);

$('.show-prices').on('click', function(event){
	event.preventDefault();
	$('.vacation').trigger('show.price');
});



------------------------------------
5 jQuery PLUGINS

$.fn.priceify = function(){
	console.log(this);
}
//fn makes this method available to all jquery objects.
//this will be the jQuery object the plugin was called on.

$('.vacation').priceify();
--> [li.vacation onsale, li.vacation expiring, li.vacation]

//adding a click handler to append price details
$.fn.priceify = function(){
	var vacation = this; //this will be $('.vacation')
	vacation.on('click.priceify', 'button', function(){
		var price = vacation.data('price');
		var details = $('<p>Book 3 days for $'+(3 * price)+'</p>');
		$(this).hide;
		vacation.append(details);
	});
};

$(document.ready(function(){
	$('.vacation').priceify();
});
//but this will add the same price to all list items. BAD

//implement each to iterate through list items.
//each in this case is a jQuery Object Method 
each(<function>)

$.fn.priceify = function(){
	this.each(function(){  //this is an array of all li's
		var vacation = this; //this will be $('.vacation')
		vacation.on('click.priceify', 'button', function(){
			var price = vacation.data('price');
			var details = $('<p>Book 3 days for $'+(3 * price)+'</p>');
			$(this).hide;
			vacation.append(details);
		});
	});	
};

$(document.ready(function(){
	$('.vacation').priceify();
});

//Plugins with parameters
//use options
$('.vacation').priceify({ days: 5});  //makes the plugin accept an argument

//adjust plugin:
$.fn.priceify = function(options){
	...
	var price = vacation.data('price');
	var details = $('<p>Book ' +  options.days + ' days for $' +(options.days * price)+'</p>');

//make options optional by specifying a default
//use utility method $.extend
//takes 2 js objects and combines them.
$.extend(target[, object1][, objectn])

$.extend({ days: 3 }, { price: 5 });
--> { days: 3, price: 5 }

$.extend({ days: 3 }, {});
--> { days: 3 }

$.extend({ days: 3 }, { days: 5 });
--> { days: 5 }

//so
$.fn.priceify = function(options){
	this.each(function(){
		var settings = $.extend({ days: 3}, options);

//why not put all the settings inside settings?
$.fn.priceify = function(options){
	this.each(function(){  
		var settings = $.extend({ 
			days: 3,
			vacation = this,
			price = vacation.data('price')
		}, options);

//then update event handler, too
		settings.vacation.on('click.priceify', 'button', function(){
			var details = $('<p>Book '+ settings.days +' days for $'+(settings.days * settings.price)+'</p>');
			$(this).hide;
			settings.vacation.append(details);
		});
	});	
};

//to build 'show all prices', we could trigger ('click.priceify') on all buttons
//but we shoudl create a new event and call the same function in line 488

//first, split out that function and call it 'show'
$.fn.priceify = function(options){
	this.each(function(){  
		var settings = $.extend({ 
			days: 3,
			vacation = this,
			price = vacation.data('price')
		}, options);

		var show = function() {
			var details = $('<p>Book '+ settings.days +' days for $'+(settings.days * settings.price)+'</p>');
			$(this).hide;
			settings.vacation.append(details);
		};
		settings.vacation.on('click.priceify', 'button', show);
		//new custom event that calls show also
		settings.vacation.on('show.priceify', show);
	});	
};

//now just trigger with a click handler
$('show-prices').on('click', function(event){
	event.preventDefault();
	$(.vacation).trigger('show.priceify');
});

//removing behavior of a plugin
//to implement th not interested link
//create a remove function, then aclick handler
$.fn.priceify = function(options){
	...
	var remove = function(){
		settings.vacation.hide().off('.priceify');//removes all priceify event handlers
	};
	settings.vacation.on('click.priceify', ',remove-vacation', remove);
};	




//Getting out of Callback Hell

//synchronous function:
function getUser(name) {
	var sql = 'SELECT * FROM users WHERE name=?';
	var user = query(sql, name); //<--blocking
	if (!user) throw new Error('no user!');
	return user;
}

//same function, asynchronous:
function getUser(name, callback) {
	var sql = 'SELECT * FROM users WHERE name=?';
	query(sql, name, function(error, user){
		if (error) {
			callback(error);
		} else if (!user){
			callback(new Error('no user!'));
		} else {
			callback(null, user);
		}
	});
}

//There can't be any RETURNs or THROWs in async.
//Nobody's there to catch them.

//There is NO STACK with async.







































