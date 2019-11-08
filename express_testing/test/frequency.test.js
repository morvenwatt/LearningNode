const app = require('../app');
const expect = require('chai').expect;
const supertest = require('supertest');

describe('GET /frequency endpoint', () => {
    it('should return 400 if string is null', () => {
        return supertest(app)
        .get('/frequency')
        .query ({ s: ' ' })
        .expect (400, 'Invalid Request')
    })
    it('should return 400 if input is anything other than string', () => {
        return supertest(app)
        .get('/frequency')
        .query({ s: [] }) || ({ s: {} })
        .expect(400, 'Invalid Request')
    })
    it ('should return an object', () => {
        return supertest(app)
        .get('/frequency')
        .query({s: 'aabbaabbaa'})
        .expect (200)
        .expect('Content-type', /json/)
        .then(res => {
            expect(res.body).to.be.an('object');
        })
    })
    it ('should return the most frequent value', () => {
        return supertest(app)
        .get('/frequency')
        .query({s: 'aabbaabbaa'})
        .expect (200)
        .expect('Content-type', /json/)
        .then (res => {
            expect(res.body).to.include({ 'a': 6 })
        })
    })
    it ('should return the values alphabetically if two values match', () => {
        return supertest(app)
        .get('/frequency')
        .query({s: 'aabbaabbaabb'})
        .expect (200)
        .expect('Content-type', /json/)
        .then (res => {
            expect(res.body).to.include({ 'a': 6, 'b': 6 })
        })
    })
})


/*
It should throw an error if nothing is put in
It should throw an error if there is anything other than a string put in
It should return an object
It should return the highest frequency value
If there are two matching high values, A should come before B and so on. 

*/