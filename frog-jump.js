// function solution(X, Y, D) {
//   // write your code in JavaScript (Node.js 8.9.4)
//   //x start
//   //y end or greater
//   //d jump length
//   let jumps = 0;
//   let length = X;
//   const jumpOnce = () => {
//     jumps++;
//     length = length + D;
//   };
//   while (length <= Y) {
//     jumpOnce();
//   }
//   console.log(jumps);
//   return jumps;
// }

// solution(10, 8500, 2);
// console.time();
// function solution(X, Y, D) {
//   //x start
//   //y end or greater
//   //d jump length
//   let jumps = 0; //0//1//2
//   let length = X; //1//3//5
//   while (length < Y) {
//     jumps++;
//     length = length + D;
//   }
//   console.log(jumps); //
//   return jumps;
// }
// console.timeEnd();
// solution(3, 999111321, 2);
// solution(3, 999111321, 99);
// solution(3, 999111321, 1283);
// solution(3, 999111321, 1283);

console.time();
function solution(X, Y, D) {
  //x start
  //y end or greater
  //d jump length
  let jumps = 0; //0//1//2
  let jumpLength = Y - X;

  //calc jumps to Y
  if (jumpLength % D === 0) {
    jumps = jumpLength / D;
  } else {
    jumps = Math.floor(jumpLength / D) + 1;
  }

  console.log(jumps); //
  return jumps;
}
console.timeEnd();
solution(3, 999111321, 2);
