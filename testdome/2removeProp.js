function removeProperty(obj, prop) {
  for (const property in obj) {
    console.log(`${property}: ${obj[property]}`);
    if (property === prop) {
      console.log('delete me ' + prop);
      delete obj[prop];
      console.log(obj);
      return true;
    }
  }
  return false;
}

removeProperty({ make: 'Ford', model: 'fiesta', year: '1999' }, 'year');
