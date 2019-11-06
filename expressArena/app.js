const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('Hello Express');
})

app.get ('/burgers', (req, res) => {
    res.send ('We have delicious plant based burgers!')
})

app.get ('/pizza', (req, res) => {
    res.send ('Ain\'t nothing like a good mushroom veggie-za!')
})
app.get('/pizza/pineapple', (req, res) => {
    res.send ('Yeah...NO! But wait, I like pineapple pizza...')
})

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
    Base URL: ${req.baseURL}
    Host: ${req.hostname}
    Path: ${req.path} 
    IP: ${req.ip}`;

    res.send(responseText);
})

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end();
})

app.get ('/greetings', (req, res) => {
    const name = req.query.name
    const race = req.query.race

    if (!name) {
        return res.status(400).send('Please provide a name')
    }

    if(!race){
        return res.status(400).send('Please provide a race')
    }

    const greeting = `Greetings ${name} the ${race}, welcome to our Kingdom, you big dork.`

    res.send(greeting)
})

// DRILL ONE: Create a sum route that takes two query params and adds them
app.get('/sum', (req, res) => {
    const a = req.query.a
    const b = req.query.b
    const aNum = parseInt(a, 10)
    const bNum = parseInt(b, 10)

    // ALSO CAN DO:
    // const { a, b } = req.query
    // const aNum = parseFloat(a)

    if (!a) {
        return res.status(400).send('I need a number!')
    }
    if(!b) {
        return res.status(400).send('I need another one!')
    }

    let total = (aNum + bNum)
    const math = `(${a} + ${b}) is ${total}`
    res.send(math)
})


// DRILL TWO:

app.get ('./cipher', (req, res) => {
    const text = req.query.text
    const shift = req.query.shift
    const shiftNum = parseInt(shift, 10)

    if (!text) {
        return res.status(400).send('I need some text!')
    }
    if (!shift) {
        return res.status(400).send('I need a number!')
    }
    
    if (Number.isNan(shiftNum)) {
        return res.status(400).send('Shift must be a number')
    }

    // Make the text uppercase for convenience
  // the question did not say what to do with punctuation marks
  // and numbers so we will ignore them and only convert letters.
  // Also just the 26 letters of the alphabet in typical use in the US
  // and UK today. To support an international audience we will have to
  // do more
  // Create a loop over the characters, for each letter, covert
  // using the shift

  const base = 'A'.charCodeAt(0);  // get char code 

  const cipher = text
    .toUpperCase()
    .split('') // create an array of characters
    .map(char => { // map each original char to a converted char
      const code = char.charCodeAt(0); //get the char code

      // if it is not one of the 26 letters ignore it
      if(code < base || code > (base + 26)) {
        return char;
      }
      
      // otherwise convert it
      // get the distance from A
      let diff = code - base;
      diff = diff + numShift; 
      
      // in case shift takes the value past Z, cycle back to the beginning
      diff = diff % 26;

      // convert back to a character
      const shiftedChar = String.fromCharCode(base + diff);
      return shiftedChar;
    })
    .join(''); // construct a String from the array

  // Return the response
  res
    .status(200)
    .send(cipher);  
});


// DRILL THREE:
app.get ('./lotto', (req, res) => {
    const numbers = req.query.numbers

   // validation: 
  // 1. the numbers array must exist
  // 2. must be an array
  // 3. must be 6 numbers
  // 4. numbers must be between 1 and 20

  if(!numbers) {
    return res
      .status(200)
      .send("numbers is required");
  }

  if(!Array.isArray(numbers)) {
    return res
      .status(200)
      .send("numbers must be an array");
  }

  const guesses = numbers
        .map(n => parseInt(n))
        .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));
  
  if(guesses.length != 6) {
    return res
      .status(400)
      .send("numbers must contain 6 integers between 1 and 20");
  }      

  // fully validated numbers

  // here are the 20 numbers to choose from
  const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);

  //randomly choose 6
  const winningNumbers = [];
  for(let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  //compare the guesses to the winning number
  let diff = winningNumbers.filter(n => !guesses.includes(n));

  // construct a response
  let responseText;

  switch(diff.length){
    case 0: 
      responseText = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    case 1:   
      responseText = 'Congratulations! You win $100!';
      break;
    case 2:
      responseText = 'Congratulations, you win a free ticket!';
      break;
    default:
      responseText = 'Sorry, you lose';  
  }


  // uncomment below to see how the results ran

  // validation: 
  // 1. the numbers array must exist
  // 2. must be an array
  // 3. must be 6 numbers
  // 4. numbers must be between 1 and 20

  if(!numbers) {
    return res
      .status(200)
      .send("numbers is required");
  }

  if(!Array.isArray(numbers)) {
    return res
      .status(200)
      .send("numbers must be an array");
  }

  const guesses = numbers
        .map(n => parseInt(n))
        .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));
  
  if(guesses.length != 6) {
    return res
      .status(400)
      .send("numbers must contain 6 integers between 1 and 20");
  }      

  // fully validated numbers

  // here are the 20 numbers to choose from
  const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);

  //randomly choose 6
  const winningNumbers = [];
  for(let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  //compare the guesses to the winning number
  let diff = winningNumbers.filter(n => !guesses.includes(n));

  // construct a response
  let responseText;

  switch(diff.length){
    case 0: 
      responseText = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    case 1:   
      responseText = 'Congratulations! You win $100!';
      break;
    case 2:
      responseText = 'Congratulations, you win a free ticket!';
      break;
    default:
      responseText = 'Sorry, you lose';  
  }


  // uncomment below to see how the results ran

  res.json({
    guesses,
    winningNumbers,
    diff,
    responseText
  });

});


});  

})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!')
})