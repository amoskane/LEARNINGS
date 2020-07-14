const obj = {
  name: 'Amos',
  address: {
    street: '158 Garretson Ave.',
    city: 'Rodeo',
    state: 'CA',
    zip: '94572',
  },
  phone: '(510) 316-1332',
};

let obj2 = new Object();
obj2 = {
  name: 'Amos',
  address: {
    street: '158 Garretson Ave.',
    city: 'Rodeo',
    state: 'CA',
    zip: '94572',
  },
  phone: '(510) 316-1332',
};

console.log(Object.entries(obj));

for (let [key, value] in Object.entries(obj2)) {
  console.log(`${key}: ${value}`);
}
// 0: undefined
// 1: undefined
// 2: undefined

for (let [key, value] of Object.entries(obj2)) {
  console.log(`${key}: ${value}`);
}
// name: Amos
// address: [object Object]
// phone: (510) 316-1332

console.log(obj.hasOwnProperty('name'));
console.log(obj.hasOwnProperty('street'));
//returns a boolean.

console.log(Object.keys(obj));
console.log(Object.keys(obj.address));

//CONVERSIONS
//n to s
console.log((3).toString(10));
console.log(typeof (3).toString(10));
//s to n
console.log(parseInt('3', 10));
console.log(typeof parseInt('3', 10));

//a to s
console.log(['a', 'b', 'c'].toString());
console.log(['a', 'b', 'c'].join(''));
//s to a
console.log('abc'.split(''));

//o to a
//a to o
const zoo = {
  lion: '🦁',
  panda: '🐼',
};

console.log(Object.keys(zoo));
// ['lion', 'panda']

console.log(Object.values(zoo));
// ['🦁', '🐼']

console.log(Object.entries(zoo));
// [ ['lion', '🦁'], ['panda', '🐼'] ]

//Object.entries + Destructuring
const objectArray = Object.entries(zoo);

objectArray.forEach(([key, value]) => {
  console.log(key);
  console.log(value);
});

//back to array:
// const array = [
//   ['one', 1],
//   ['two', 2],
// ];
//////console.log(Object.fromEntries(array));
//not yet.

//n to a
///////console.log(Array.from(555));
//a to n
///////console.log([1, 2, 3].toNumber());

//Document methods

// getElementById();
// getElementsByClassName();
// getElementsByName(); //<input name=
// getElementsByTagName(); //<div
// getElementsByTagNameNS(); //svg, not all lowercased

// Document.querySelector();
// Element.querySelector();

// //finds 1st:
// var el = document.querySelector('.myclass');
// //finds specific
// var el = document.querySelector("div.user-panel.main input[name='login']");
// //negation:
// var el = document.querySelector(
//   "div.user-panel:not(.main) input[name='login']"
// );

// Document.querySelectorAll();
// Element.querySelectorAll();
//can use .forEach on these results.
