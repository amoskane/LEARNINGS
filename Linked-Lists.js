Singly linked lists
each data has a pointer to the next item.
The last item's pointer is NULL'
can only be traversed beginning to end.
a complete traversal requires starting at the beginnning.

The term "linked list" is often a shorthand way of saying "the pointer to the first element"
any operation that could change the first element must be passed a pointer to the head pointer.
(or else the calling function with the pointer to item 1 won't point to the list anymore)

Always test for the end element.
(If you don't it will return NULL and crash the function.')

deletion and insertion operations require a pointer to the preceding element.
(so you can reconnect the break in the list)

deletion always requires at least 2 pointer vars.
(you have to find the ref, then delete, then adjust the ref. You lose the ref if you delete first.)



Problem 1: Stack implementation
to develop a stack data structure, you would create:

pop, 1st param, a pointer to the 1st element (or "the stack"). Returns the popped value.
push, 1st param, a pointer to the 1st element (or "the stack"), 2nd param, the data.

both pop and push need a pointer to the pointer to the stack
so that the calling routine can get an updated pointer to the stack.
because both pop and push COULD shange the 1st element.

you must consider error handling. and symmetry.
if push takes a data and returns an error code,
and pop takes an error code and returns data, then you are lopsided.


createStack
deletStack

not strictly necessary, but gives you implementation independence and efficiency.



createStack
	sets pointer to NULL and returns success
push
	allocates new element
	checks for failure
	sets the data of the new element
	places it on top of the stack
	adjusts the pointer
deleteStack
	traverses stack freeing datas, keeping a pointer to next at each step
pop
	checks for empty
	fetches data from top element
	adjusts pointer
	frees the element





Problem 2: 'Maintain linked list head tail pointer'

create a Delete function and an InsertAfter function

Delete
first and last element operations are special cases
mid list is regular case.
also special cases for null list, single list, 2 item list.
more than 2 item list is regular case.

then repeat for Insert.





Problem 3: Bugs in removeHead

debugging
but without worry about how this piece will affect others
and without a debugger.

4 common problems:
1 check that the data comes in properly.
2 check that each line works properly.
3 check that the data comes out properly.
4 check the common error conditions.




Problem 4: mth to the last element

find the m-th to the last element such that when m=0, the last element of the list is returned.

seems like you have to go through twice, once to find total length and again to find element M.

can we do it in 1?

you could go through once and keep a history of all the elements,
so when you hit end you could (end - M) and get the value,
but then you'd basically be re-storing the entire input.

this is one pass but can we improve the storage space?
we don;t really need to keep the entire history.
we only care about the historical point m behind current position.
so you use 2 pointers, current and (current - m)
when current reaches end, your answer is (current - m).






Problem 5: List Flattening

recursion.

start on the 1st level.
as long as youre not at the end,
	if the current node has a child,
		append the child to the end of the list
		update the tail pointer
	advance (r) to the next node.
	(if you can go right on this level go, if not go right from last one up)

would go
1-1, 2-1, 2-2, 3-2, 2-3, 3-3, 4-3, 1-2, 1-3, 1-4, 2-4, 3-4, 4-4, 4-5, 3-5, 2-5, 1-5

always navigate to children first.
but then how do you know when to go right on your current level or the upper level?
You must have to test for that.


to reverse: separate each child node from the one above it.
1-1 1-2 1-3 1-4 1-5
2-1 2-2 2-3 2-4 2-5
    3-2 3-3 3-4 3-5
        4-3 4-4 4-5


start on the 1st level.
as long as youre not at the end,
	if the current node has a child,
		separate the child from the node
		start again starting with child
	advance to the next node.





Problem 6: cyclic list or acyclic?

in an acyclic, the end pointer is NULL.
is there a node with 2 nodes pointing at it? hard to test for.
the end node's next node is one that you've encountered, but htat would make a whole copy of the input possibly.
compare the current node's next pointer to all previous nodes, but this is n^2


run 2 pointers at different speeds:

if the faster one hits NULL, you are done.
if the faster poin134166166145ter runs over or onto the slow one, its a cycle.
advance slow 1
advance fast 2










































