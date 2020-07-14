function formatDate(userDate) {
  // format from M/D/YYYY to YYYYMMDD
  const x = userDate.split('/');
  console.log(x);
  const mo = x[0].length == 2 ? x[0] : 0 + x[0];
  const day = x[1].length == 2 ? x[1] : 0 + x[1];
  const year = x[2];
  const result = year + mo + day;
  console.log(result);
  return result;
}

console.log(formatDate('1/3/2014'));
