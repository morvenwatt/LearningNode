const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /apps', () => {
    it('should return an array of apps', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                expect(res.body).to.have.lengthOf.at.least(1);
                const book = res.body[0]
                expect(book).to.include.any.keys(
                    'genre'
                )
            })
    })
    it('should be 400 if sort is incorrect', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'MISTAKE' })
            .expect(400, 'Sort must be one of app or rating.')
    })
    it('should sort by app', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'app' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array')
                let sorted = true;
                let i = 0;
                while (i < res.body.length - 1) {
                    // compare book at `i` with next book at `i + 1`
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i + 1];
                    // if the next book is less than the book at i,
                    if (appAtIPlus1.title < appAtI.title) {
                        // the books were not sorted correctly
                        sorted = false;
                        break; // exit the loop
                    }
                    i++
                }
                expect(sorted).to.be.true
            })
    })
    // it ('should only accept listed genres', () => {
    //     let genre = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']
    //     expect(genre).to.be.oneOf[genre]
    // })
})

/* 
It should return an array of apps (1)
It should be 400 if sort is incorrect (2)
It should only accept the listed genres (4)
It should sort by App (3)
*/