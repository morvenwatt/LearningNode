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


app.get('/grade', (req, res) => {
    // get the mark from the query
    const { mark } = req.query;
  
    // do some validation
    if (!mark) {
      // mark is required
      return res
        .status(400)
        .send('Please provide a mark');
    }
  
    const numericMark = parseFloat(mark);
    if (Number.isNaN(numericMark)) {
      // mark must be a number
      return res
        .status(400)
        .send('Mark must be a numeric value');
    }
  
    if (numericMark < 0 || numericMark > 100) {
      // mark must be in range 0 to 100
      return res
        .status(400)
        .send('Mark must be in range 0 to 100');
    }
  
    if (numericMark >= 90) {
      return res.send('A');
    }
  
    if (numericMark >= 80) {
      return res.send('B');
    }
  
    if (numericMark >= 70) {
      return res.send('C');
    }
  
    res.send('F');
  });


app.get('/video', (req, res) => {
    const video = {
      title: 'Cats falling over',
      description: '15 minutes of hilarious fun as cats fall over',
      length: '15.40'
    }
    res.json(video);
  });

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!')
})