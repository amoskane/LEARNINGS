function ensure(value) {
  if (typeof value === 'undefined') {
    //console.log('me');
    throw new Error('argument is falsey');
  } else {
    return value;
  }
}

try {
  console.log(ensure(0));
} catch (err) {
  console.log(err);
}
