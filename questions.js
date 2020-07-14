//what is the output?
// var num = 4;
// console.log('1 is ' + num);

// function outer() {
//   var num = 2;
//   console.log('2 is ' + num);

//   function inner() {
//     console.log('before 3 is ' + num);
//     num++;
//     console.log('3 is ' + num);
//     var num = 3;
//     console.log('4 is ' + num);
//     console.log(num);
//   }
//   inner();
//   console.log('5 is ' + num);
// }
// outer();
// console.log('6 is ' + num);

// const num = 4;
// console.log('1 is ' + num);

// const outer = () => {
//   const num = 2;
//   console.log('2 is ' + num);

//   const inner = () => {
//     console.log('before 3 is ' + num);
//     num++;
//     console.log('3 is ' + num);
//     num = 3;
//     console.log('4 is ' + num);
//     console.log(num);
//   };
//   inner();
//   console.log('5 is ' + num);
// };
// outer();
// console.log('6 is ' + num);

//how do you create a private variable?
// function secretVar() {
//   var private = 'super secret code';
//   return function () {
//     console.log(private);
//     return private;
//   };
// }

// var getPrivVar = secretVar();
// //console.log(secretVar());
// console.log(getPrivVar());

// typeof typeof 1;
// typeof 1 == 'number';
// (typeof 'number' == string) == string;

//what is th output?
var hero = {
  _name: 'John Doe',
  getSecretIdentity: function () {
    return this._name;
  },
};

//does not work
var stoleSecretId = hero.getSecretIdentity;

//works
//var stoleSecretId = hero.getSecretIdentity.bind(hero);
//bind hero to stoleSecretId

console.log(stoleSecretId());

//works
console.log(hero.getSecretIdentity());
