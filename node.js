NODE

level 1
hello.js

var http = require('http');   //how we include modules

http.createServer(function(request, response){
	response.writeHead(200);
	response.write("Hello, this is dog.");
	response.end();
}).listen(8080); //listen for connections on this port

console.log("Listening on port 8080...");

node hello.js >> runs the server.


curl http://localhost:8080




level 2
DOM events

var EventEmitter = require('events').EventEmitter;

var logger = new EventEmitter();    //events:error, warn info

logger.on('error', function(message){
	console.log('Err: '+ message);
});

logger.emit('error', 'Spilled Milk');





level 3
How to read from a request stream

request and response are streams.


here, we are logging the data we get from the client;

http.createServer(function(request, response){
	response.writeHead(200);
	request.on('readable', function(){
		var chunk = null;
		while(null !== (chunk = request.read())){
			console.log(chunk.toString());  //chunks are buffers that may be binary
		}
	});
	request.on('end', function(){
		response.end();
	});
}).listen(8080)


here, we are echoing back the data we get from the client:

http.createServer(function(request, response){
	response.writeHead(200);
	request.on('readable', function(){
		var chunk = null;
		while(null !== (chunk = request.read())){
			response.write(chunk);   //response.write does the tostring for us
		}
	});
	request.on('end', function(){
		response.end();
	});
}).listen(8080)



pipe sends result of one op into another. so all this can be shortened to:

http.createServer(function(request, response){
	response.writeHead(200);
	request.pipe(response);
}).listen(8080)



streaming a file over the wire:
var fs = require('fs');

var file = fs.createReadStream("readme.md");
var newFile = fs.createWriteStream("readme_copy.md");

file.pipe(newFile);




upload a file:
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response){
	var newFile = fs.createWriteStream("readme_copy.md");
	request.pipe(newFile);

	request.on('end', function(){
		response.end('uploaded!');
	});
}).listen(8080)

curl --upload-file readme.md http://localhost:8080

--->uploaded!





to receive progress as uploads:
http.createServer(function(request, response){
	var newFile = fs.createWriteStream("readme_copy.md");
	var fileBytes = request.headers['content-length'];  //get total size to amke calcs
	var uploadedBytes = 0;

	request.on('readable', function(){
		var chunk = null;
		while(null !== (chunk = request.read())){
			uploadedBytes += chunk.length;
			var progress = (uploadedBytes / fileBytes) * 100;
			response.write("progress: " + parseInt(progress, 10)+ "%\n")
		}
	});

	request.pipe(newFile);
}).listen(8080)





3.2 Use the fs module to create a Readable stream for fruits.txt. Store the new stream in a variable called file.
Next, listen to the readable event on the newly created stream and give it a callback.
Inside the callback, read the data chunks from the stream and print them to the console using console.log() - you might want to use a while loop to do this. Don't forget to call toString() on the data before printing it.

var fs = require('fs');
var file = fs.createReadStream("fruits.txt");
file.on('readable', function(){
        var chunk = null;
        while(null !== (chunk = file.read())){
      console.log(chunk.toString());
    }
});



3.3 Instead of manually listening for the 'readable' event on the Readable stream, let's use pipe to read from the stream and write directly to process.stdout.

var fs = require('fs');

var file = fs.createReadStream('fruits.txt');
var newfile = fs.createWriteStream('newfruits.txt');
file.pipe(process.stdout);


3.4 don't close pipe
var fs = require('fs');

var file = fs.createReadStream('origin.txt');
var destFile = fs.createWriteStream('destination.txt');

file.pipe(destFile, { end: false });

file.on('end', function(){
  destFile.end('Finished!');
});


3.5 Use pipe() to send index.html to the response.
var fs = require('fs');
var http = require('http');

http.createServer(function(request, response) {
  response.writeHead(200, {'Content-Type': 'text/html'});

  var file = fs.createReadStream('index.html');
  file.pipe(response);
}).listen(8080);




4 MODULES

create our own modules.


custom_hello.js  //exposes only one method, can only have one hello object
var hello = function(){
	console.log("hello!");
}
module.exports = hello;  //this is the only public module in this method


custom_goodbye.js //exposes many
exports.goodbye = function(){  //can set multiple methods as public
	console.log("bye!");
}


app.js
var hello = require('./custom_hello');
var gb = require('./custom_goodbye');
hello();
gb.goodbye();

if you only need to call once, you could do
require('./custom_goodbye').goodbye();



making http requests:

var http = require('http');

var options = {
	host:'localhost', port:8080, path: '/', method:'POST'
}

var request = http.request(options, function(response){
	response.on('data', function(data){
		console.log(data);
	});
});

request.write(message);
request.end();





//encapsulate
var http = require('http');
var makeRequest = function(message){
	var options = {
		host:'localhost', port:8080, path: '/', method:'POST'
	}

	var request = http.request(options, function(response){
		response.on('data', function(data){
			console.log(data);
		});
	});

	request.write(message);
	request.end();
}

makeRequest("Here's looking at you kid.")




//encapsulate in a module, make_request.js
var http = require('http');
var makeRequest = function(message){
	var options = {
		host:'localhost', port:8080, path: '/', method:'POST'
	}

	var request = http.request(options, function(response){
		response.on('data', function(data){
			console.log(data);
		});
	});

	request.write(message);
	request.end();
}
module.exports = makeRequest();

in app.js
var makeRequest = require('./make_request');
makeRequest("Here's looking at you kid.");
makeRequest("Hello, this is dog.");





require:
var makeRequest = require('./make_request'); //looks in same dir
../ up a dir
or absolute path

if none specified ('make_request'), then looks in
	/home/eric/my_app/node_modules/make_request.js
	/home/eric/node_modules/make_request.js
	/home/node_modules/make_request.js
	/node_modules/make_request.js

you can install modules globally, -g, but then they can't be required.

sem ver.
>=1.0.0 < 2.0.0   //dangerous. many minor version may break your app.
>=1.8.0 < 1.9.0   //API could change...
>=1.8.7 < 1.9.0   //safest.

 "dependencies": {
        "connect": "~2.1.1",
        "underscore": "~1.3.3"
  }





5 EXPRESS
var express = require('express');
npm install --save express     //save adds to package.json

var app = express();   //creates an instance

app.get('/', function(request, response){        //root route
	response.sendFile(__dirname + "/index.html");
});

app.listen(8080);

----curl http://localhost:8080/
>200 OK



create an endpoint to call and get the last 10 tweets.
var request = require('request');
var url = require('url');
		 //route definition
app.get('/tweets/:username', function(req, response){

	var username = req.params.username;

	options = {
		protocol: "http",
		host: 'api.twitter.com',
		pathname: '/1/statuses/user_timeline.json',
		query: { screen_name: username, count: 10}
	}

	var twitterUrl = url.format(options);
	request(twitterUrl).pipe(response);  //pipe the req to the response
})



set up some templates. EJS
npm install --save ejs
will look for templates under the views dir... /Home/eric/my_app/views

replace line 353 with:

request(url, function(err, res, body){
	var tweets = JSON.parse(body);
	response.locals = {tweets: tweets, name:username};
	response.render('tweets.ejs');
})

tweets.ejs:
//<h1>Tweets for @<%= name %></h1>
<ul>
	<% tweets.forEach(function(tweet{ %>
		<li><%= tweet.text %></li>
	<% }); %>
</ul>




5.3 route params
Start by creating a GET route for '/quotes' that takes a name parameter as part of the URL path.
app.get('/quotes/:name', function(req, res) {
  });




5.4 rendering
var express = require('express');
var app = express();

var quotes = {
  'einstein': 'Life is like riding a bicycle. To keep your balance you must keep moving',
  'berners-lee': 'The Web does not just connect machines, it connects people',
  'crockford': 'The good thing about reinventing the wheel is that you can get a round one',
  'hofstadter': 'Which statement seems more true: (1) I have a brain. (2) I am a brain.'
};

app.get('/quotes/:name', function(req, res) {
  var quote = quotes[req.params.name];
  res.render('quote.ejs', {
    name: req.params.name,
    quote: quote
  });
  
});

app.listen(8080);




5.7 Express server
var url = require('url');
var request = require('request');
var express = require('express');
var options = {
  protocol: "http:",
  host: "search.twitter.com",
  pathname: '/search.json',
  query: {
    q: "codeschool"
  }
};

var searchURL = url.format(options);

var app = express(); // Create server here
app.get('/', function(req, res){
  request(searchURL).pipe(res);
});

app.listen(8080);




6 SOCKET.io
npm install --save socket.io

var express = require('express');
var app = express();
var server = require('http').createServer(app);//create a server that dispatches reqs to express
var io = require('socket.io')(server); //also allow it to use the http server
//socket and express are sharing the same http server now
io.on('connection', function(client){
	console.log('client connected...');

	client.emit('messages', {hello:'world'});
	//emits the messages event on our client

	//give the client a nickname
	client.on('join', function(name){
		client.nickname = name;
	})

	//also want to send from browser to server, so
	client.on('messages', function(data){
		//console.log(data);

		var nickname = client.nickname;

		//client.broadcast.emit('messages', data);
		//broadcast the name and message
		client.broadcast.emit('messages', nickname + ": "+ message);

		//send my own messages too
		client.emit('messages', nickname + ": " + message);
	})

});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

server.listen(8080);

//index.html
//<script src="/socket.io/socket.io.js"></script>
<script>
	var socket = io.connect('http://localhost:8080');
	//listen for the messages event
	socket.on('messages', function(data){
		//alert(data.hello);
		insertMessage(data)
	})
	//send from browser to server
	$('#chat_form').submit(function(e){
		var message = $('#chat_input').val();
		//emit messages event on the server
		socket.emit('messages', message);
	})

	socket.on('connect', function(data){
		$('#status').html('Connected to chattr');
		nickname = prompt("What is your nickname?");
		server.emit('join', nickname); //notify the server of the nickname
	})

//</script>





7 persisiting data

//original code
io.sockets.on('connection', function(client){
	client.on('join', function(name){
		client.set('nickname', name);
		client.broadcast.emit("chat", name + " joined the chat");
	});
	client.on("messages", function(message){
		client.get("nickname", function(error, name){
			client.broadcast.emit("messages", name + " :"+ message);
			client.emit("messages", name + " :"+ message);
		});
	});
});


//persisting
var messages = [];

var storeMessage = function(name, data){
	messages.push({name:name, data:data});  //add message to end of queue
	if(messages.length > 10){
		messages.shift();  //push off last one to always keep 10
	}
}

io.sockets.on('connection', function(client){
	client.on('join', function(name){
		client.set('nickname', name);
		client.broadcast.emit("chat", name + " joined the chat");
		messages.forEach(function(message){
			client.emit("messages", message.name + ": "+ message.data);
		});
	});
	client.on("messages", function(message){
		client.get("nickname", function(error, name){
			client.broadcast.emit("messages", name + " :"+ message);
			client.emit("messages", name + " :"+ message);
			storeMessage(name, message);
		});
	});
});


//lose messages if you disconnect.
//have to store messages in a db.

//Redis Data Structures
//data Structure      commands
//strings				set, get, append, decr, incr
//hashes				hset, hget, hdel, hgetall
//lists				lpush, lrem, ltrim, rpop, linsert
//sets 				sadd, srem, smove, smembers
//sorted sets 		zadd, zrem, zscore, zrank


npm install redis --save

var redis = require('redis');
var client = redis.createClient();

client.set("message1", "hello, this is dog");
client.set("message2", "hello, no this is spider");

client.get("message1", function(err, reply){
	console.log(reply);
});


//add a string to the messages list
var message = "Hello this is dog";
client.lpush("messages", message, function(err, reply){
	console.log(reply);     //replies with a list length, 1
});


//using LPUSH and LTRIM
var message = "Hello this is dog";
client.lpush("messages", message, function(err, reply){
	client.ltrim("messages", 0, 1); //trim keeps the first 2 strings and removes the rest
});

//retrieving from list
client.lrange("messages", 0, -1, function(err, messages){
	console.log(messages);  //replies with all strings in a list
})





rewrite this to use redis:
var storeMessage = function(name, data){
	messages.push({name:name, data:data});  //add message to end of queue
	if(messages.length > 10){
		messages.shift();  //push off last one to always keep 10
	}
}

var storeMessage = function(name, data){
	var message = JSON.stringify({name:name, data:data}); //turns object into string

	redisClient.lpush("messages", message, function(err, response){
		redisClient.ltrim("messages", 0, 9);  //keeps newest 10
	});
}




rewrite this to use redis:
	client.on('join', function(name){
		client.set('nickname', name);
		client.broadcast.emit("chat", name + " joined the chat");
		messages.forEach(function(message){
			client.emit("messages", message.name + ": "+ message.data);
		});
	});




	client.on('join', function(name){
		redisClient.lrange("messages", 0, -1, function(err, messages){
			messages = messages.reverse();  //emit them in correct order

			messages.forEach(function(message){
				message = JSON.parse(message);  //parse into JSON object
				client.emit("messages", message.name + ": "+ message.data);
			});

		});

	});


//current chattr list, who is on?
sets are lists of unique data

client.sadd("names", "Dog");
client.sadd("names", "Spider");
client.sadd("names", "Gregg");

client.srem("names", "Spider");

//reply with all members of set
client.smembers("names", function(err, names){
	console.log(names);
})

//app.js
client.on('join', function(name){
	...
	client.broadcast.emit("add chatter", name);

	//emit all the currently logged in chatters
	redisClient.smembers('names', function(err, names){
		names.forEach(function(name){
			client.emit('add chatter', name);
		});
	});

	redisClient.sadd("chatters", name);
});


//index.html
socket.on('add chatter', function(name){
	var chatter = $('<li>'+name+'</li>').data('name', name);
	$('#chatters').append(chatter);
});



//remove chatter when they disconnect
client.on('disconnect', function(name){
	client.get('nickname', function(err, name){
		client.broadcast.emit("remove chatter", name);
		redisClient.srem("chatters", name);
	});
});


//index.html
socket.on('remove chatter', function(name){
	$('#chatters li[data-name='+ name + ']').remove();
});










