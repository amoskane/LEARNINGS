function startTimer(callback, interval) {
  // Write the code that goes here

  //   let i = 1;
  //   while (i < 5) {
  //     console.log(i);
  //   let inter;
  //   while (callback === true) {
  for (let i = 1; i < 5; i++) {
    setInterval(function () {
      callback(i);
    }, interval);
  }
  return 0;
  //}
  //clearInterval(inter);
}

const callback = (counter) => {
  console.log(counter);
  //counter++;
  return counter < 5;
};
//counter = 1, callback()=true
//counter = 2

console.log(callback(1));

// Expected: 1, 2, 3, 4, 5 with 50ms interval.
startTimer(callback, 50);
