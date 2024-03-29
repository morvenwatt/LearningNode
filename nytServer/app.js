const express = require('express');
const morgan = require ('morgan');
const cors = require ('cors');


const app = express();
app.use(cors());

app.use(morgan('common'));
const books = require('./books-data.js');

app.get('/books', (req, res) => {
// This is how we get a search param and default it >
    const { search = " ", sort} = req.query;

    if (sort) {
        if (!['title', 'rank'].includes(sort)){
            return res.status(400).send('Sort must be one of title or rank.')

        }
    }
    let results = books 
        .filter(book => 
            book
                .title
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