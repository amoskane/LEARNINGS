// .first does the same thing as .filter but only returns the first!
// so array => item

// reduce = the mother of all list transformations.

var orders = [
  { amount: 250 },
  { amount: 400 },
  { amount: 100 },
  { amount: 325 },
];

// var total = 0;
// for (let i = 0; i < orders.length; i++) {
//   total += orders[i].amount;
// }

var total = orders.reduce(function (sum, order) {
  return sum + order.amount;
}, 0);

var total = orders.reduce((sum, order) => sum + order.amount, 0);

//console.log(total);

// TARGET OUTPUT!
// {
//     'mark johansson': [
//         {name: 'waffle iron', price: '80', quantity: '2'},
//         {name: 'blender', price: '200', quantity: '1'},
//         {name: 'knife', price: '10', quantity: '4'}
//     ],
//     'nikita Smith': [
//         {name: 'waffle iron', price: '80', quantity: '1'},
//         {name: 'knife', price: '10', quantity: '2'},
//         {name: 'pot', price: '20', quantity: '3'}
//     ]
// }

var fs = require('fs');
//import fs from 'fs';

var output = fs
  .readFileSync('data.tsv', 'utf8')
  .split('\n')
  .map((line) => line.trim('\r'))
  .map((line) => line.split('\t'))
  .reduce((customers, line) => {
    //customers[ copy over their name] and set it to []
    //overwrites the copies.
    customers[line[0]] = customers[line[0]] || [];
    customers[line[0]].push({
      name: line[1],
      price: line[2],
      quantity: line[3],
    });
    return customers;
  }, {});

console.log('output', JSON.stringify(output, null, 2));

//reduce takes 2 arguments: reducer and the starting target
//reducer takes 2 arguments: the target 'customers'
//          and the thing you are iterating (the line here)
