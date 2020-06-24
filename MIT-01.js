srini
eric
nancy

this is 6046, design and analysis of algorithms

6006 is a prereq. data structures, classical algs like sorting, algs using dynamic programming, algs for shortest paths

look for objectives doc.

modules:
1 divide and conquer, breaking up a problem into smaller probs, ie merge sort
2 optimization: greedy algs, dykstra, shortest path is an example, dynamic programming htat can be applied to many probs
3 network flow
4 intractibility - probs that do not have a polynomial time solvable number. approximation
5 advanced topics: distributed algs, cryptogaphy, number theory


Today's lecture:

very small changes in problem statements can quickly make a solution intractable.

very similar problems can have very differenet complexity.


Recall: P: class of problems solvable in O(n to the k) polynomial time for some constant k

Shortest path problem: SP: O (v to the 2) when v is # of vertices in the graph

NP: class of problems whose solution is verifiable in polynomial time.
Hamiltonian cycle problem: given a directed graph, find a simple cycle (can repeat vertices) to contain each vertex in V.
Determine whether a cycle is hamiltonian or not

NPcompleteness: problem definition is in NP and is as hard as any definition in np.


Interval Scheduling Problem:
REsources and requests
single resource for first verison

request requires time per the resource.

s(i) start time.
f(i) finish time.
s(i)<f(i)

2 requests, i and j, are compatible provided they don't overlap.

s(i)<=f(i)
2 events can end and then start at the same time.


claim is that we can solve this problem using a greedy alg.

a greedy alg is a myopic alg that processes the input one piece at a time with no apparent look ahead.
very efficient.
















