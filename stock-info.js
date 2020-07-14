// async function getStockInformation(date) {
//   // write your code here
//   // API endpoint:
//   const URI = `https://jsonmock.hackerrank.com/api/stocks?date=${date}`;
//   console.log(URI);
//   fetch(URI)
//     .then(response => response.json())
//     .then(data => console.log(data));
// }

// getStockInformation('5-January-2000');

// const URI = `https://jsonmock.hackerrank.com/api/stocks?date=${date}`;
// let request = new XMLHttpRequest();
// let res;
// request.open('GET', URI);
// request.responseType = 'json';

// request.onload = function () {
//   res = request.response;
// };

// request.send();

'use strict';

const fs = require('fs');
const https = require('https');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on('end', function () {
  inputString = inputString.split('\n');
  main();
});

function readLine() {
  return inputString[currentLine++];
}

async function getStockInformation(date) {
  const URI = `https://jsonmock.hackerrank.com/api/stocks?date=${date}`;
  //console.log(URI)
  return new Promise(function (resolve, reject) {
    https
      .get(URI, resp => {
        let data = '';

        resp.on('data', chunk => {
          data += chunk;
        });

        resp.on('end', () => {
          const resPrep = JSON.parse(data);
          const res = resPrep.data[0];
          // const open = `Open: ${res.open}`
          // const high = `High: ${res.high}`
          // const low = `Low: ${res.low}`
          // const close = `Close: ${res.close}`
          // console.log(`${open}\n${high}\n${low}\n${close}`)
          console.log(res);
          return res;
          //`${open}\n${high}\n${low}\n${close}`
        });
      })
      .on('error', err => {
        console.log('Error: ' + err.message);
      });
  });
}

async function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const date = readLine().trim();

  const result = await getStockInformation(date);
  const isEmpty = !Object.keys(result).length;
  if (isEmpty) {
    ws.write('No Results Found');
  } else {
    ws.write(`Open: ${result.open}\n`);
    ws.write(`High: ${result.high}\n`);
    ws.write(`Low: ${result.low}\n`);
    ws.write(`Close: ${result.close}\n`);
  }
}

getStockInformation('5-January-2000');

return new Promise((resolve, reject) => {
  const req = https.request(urlOptions, res => {
    let body = '';
    res.on('data', chunk => (body += chunk.toString()));
    res.on('error', reject);
    res.on('end', () => {
      if (res.statusCode >= 200 && res.statusCode <= 299) {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: body
        });
      } else {
        reject('Request failed. status: ' + res.statusCode + ', body: ' + body);
      }
    });
  });
  req.on('error', reject);
  req.write(data, 'binary');
  req.end();
});
