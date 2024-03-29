const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => {
    res
    .status(200)
    .send('Hello Express!')
})

// DIVIDE THE SUM OF TWO NUMBERS:
app.get('/sum', (req, res) => {
    const { a, b } = req.query;
  
    if (!a) {
      return res
        .status(400)
        .send('Value for a is needed');
    }
  
    if (!b) {
      return res
        .status(400)
        .send('Value for b is needed');
    }
  
    const numA = parseFloat(a);
    const numB = parseFloat(b);
  
    if (Number.isNaN(numA)) {
      return res
        .status(400)
        .send('Value for a must be numeric');
    }
  
    if (Number.isNaN(numB)) {
      return res
        .status(400)
        .send('Value for b must be numeric');
    }
  
    if (numB == 0) {
      return res
        .status(400)
        .send('Cannot divide by 0');
    }
  
    const ans = numA / numB;
  
    res
      .send(`${a} divided by ${b} is ${ans}`);
  });

//   GENERATE AN ARRAY:
  app.get('/generate', (req, res) => {
    const { n } = req.query;
    const num = parseInt(n);

    if(Number.isNaN(num)) {
        return res
        .status(400)
        .send('Invalid request')
    }
// Don't understand these functions:
//generates array 1..n >>
    const initial = Array(num)
    .fill(1)
    .map((_, i) => i + 1)
  
//shuffles the array 
  initial.forEach((e, i) => {
      let ran = Math.floor(Math.random() * num);
      let temp = intial[i];
      initial[i] = initial[ran];
      intial[ran] = temp
  })

  res.json(initial)
})

// GET THE MIDPOINT OF TWO LAT & LONG FIGS (and return an object):
function toRadians(deg) {
    return deg * (Math.PI / 180);
  }
  
  function toDegrees(rad) {
    return rad * (180 / Math.PI);
  }

app.get('/midpoint', (req, res) => {
    const { lat1, lon1, lat2, lon2 } = req.query;

    // for brevity the validation is skipped
  
    // convert to radians
    const rlat1 = toRadians(lat1);
    const rlon1 = toRadians(lon1);
    const rlat2 = toRadians(lat2);
    const rlon2 = toRadians(lon2);
  
    const bx = Math.cos(rlat2) * Math.cos(rlon2 - rlon1);
    const by = Math.cos(rlat2) * Math.sin(rlon2 - rlon1);
  
    const midLat = Math.atan2(
      Math.sin(rlat1) + Math.sin(rlat2),
      Math.sqrt(
        (Math.cos(rlat1) + bx)
        * (Math.cos(rlat1) + bx)
        + by * by
      )
    );
    const midLon = rlon1 + Math.atan2(by, Math.cos(rlat1) + bx);
  
    res.json({
      lat: toDegrees(midLat),
      lon: toDegrees(midLon)
    })
})

// Count the frequency of occurrence of each character in the String, 
// the total number of distinct characters, 
// the average frequency, 
// and the character with the highest frequency. 

app.get('/frequency', (req, res) => {
    const { s } = req.query;
  
    if (!s) {
      return res
        .status(400)
        .send('Invalid request');
    }
  
    const counts = s
      .toLowerCase()
      .split('')
      .reduce((acc, curr) => {
        if (acc[curr]) {
          acc[curr]++;
        } else {
          acc[curr] = 1;
        }
        return acc;
      }, {});
  
    const unique = Object.keys(counts).length;
    const average = s.length / unique;
    let highest = '';
    let highestVal = 0;
  
    Object.keys(counts).forEach(k => {
      if (counts[k] > highestVal) {
        highestVal = counts[k];
        highest = k;
      }
    });
  
    counts.unique = unique;
    counts.average = average;
    counts.highest = highest;
    res.json(counts);
  });

module.exports = app;

