//let president = {
//   name: 'Pooh',
//   next: null
// };

// president.next = {
//   name: 'Paddington',
//   next: president
// };

//console.log(president.next.next.name);

// let president = {
//   name: 'Pooh',
//   next: president
// };

let president = {
  name: 'Pooh'
};
president.next = president;

//console.log(president);

let station = {
  Owner: { name: 'Fred' }
};

let name = station.owner.name; //TypeError
//console.log(name);
