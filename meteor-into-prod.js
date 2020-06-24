


asynchronous I/O

           |  CPU  |          ---processer  at NOW
|   |   |   |     |     |     ---event loop or queue           


set timeout can store things back on the timeline.
set interval == set timeout over and over again
a callback can run at a later time on the timeline.

more properties of the event loop:
events, go on the event loop

runtime====the code that's running our code
runtime is node
node has machinery to control the even tloop
chrome has it too

i/o examples: 
readfile
httpget
tcp library mongo


in js, runtime runs on client 
i/o infers server/client relationship
node says- let the os do this task
the os can thread faster than 

all i/o is concurrent'


a fiber can yield- meaning it takes itself out of runtime and then puts itself back in.
meteor uses a node library that does this on a C++ level.

-------------------

meteor fires up 2 servers:
//spark on client, replaced by glaze
ddp
web

make a persistent connection
# of requests/sec. ~3000/sec is good for a client server scenario

how do you get data to the client
update the dom

in meteor you make one hhtp connection and keep it open

how you publish your data becomes more of a bottleneck than 
how many people are connecting

publish function says: this is the data that a client can see, 
and this is the data that will be kept up tp date.

2nd way- RPC methods in meteor- go get it and its done.
Remote Procedure Call

pub function (on the server) runs every time a client subscribes to it

find returns a cursor.
meteor sets up an observer
sends one DDP 'added' message for every item,
then sends a ready message

router== waitOn function (confusing)

     ddp
sub------->func()
	added
<--------	
	added
<--------	
	added
<--------	
	ready
<--------	


unsub - wait for everything to finish, get client up to date with data, take back data
that client shoudln't see anymore.'


chrome dev tools,
network,

frames



'tail a log' with a -f on *nix systems

read it continuously

oplog lives in db config files, is a log of all activity on primary db
you have a secondary, and you diff the oplog, and it polls.



berkelett
tom coleman















