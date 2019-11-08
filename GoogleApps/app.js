const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

const googleApps = require('./playstore.js');

app.get('./apps', (req, res) => {

    const { search = " ", sort } = req.query;

    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res.status(400).send('Sort must be rating or app.')

        }
    }

    let genre = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
    for (i=0; i < genre.length; i++);
    if (genre[i] === req.query){
        return res.status(400).send('Please pick a valid genre.')
    }
        
    let results = googleApps
        .filter(googleApp =>
            googleApp
                .app
                .toLowerCase()
                .includes(search.toLowerCase()));

    if (sort) {
        results
            .sort((a, b) => {
                return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            })
    }

    res.json(results)
})

module.exports = app;