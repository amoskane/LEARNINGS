class Snapshot {
  constructor(array) {
    //this.array = array;
    var arr = array;
    this.arrCopy = [...array];
    this.getArr = function () {
      return arr;
    };
    this.restore = this.restore.bind(this);
  }

  restore() {
    //console.log(this.array);
    const newArr = this.array.slice();
    //console.log(newArr);
    return newArr;
  }
}

var array = [1, 2];
var snap = new Snapshot(array);
console.log(array.join()); //1,2
array[0] = 3;
console.log(array.join());
array = snap.restore();
console.log(array.join()); //It should log "1,2"

array.push(4);

array = snap.restore();
console.log(array.join()); //It should log "1,2"
