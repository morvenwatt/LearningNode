const divide = require('../index');
const expect = require('chai').expect;

describe('Divide function', () => {

    it('should divide positive integers correctly', () => {
        const a = 8
        const b = 4
        const expectedAnswer = 2
        const actualAnswer = divide (a, b)
        
        expect(actualAnswer).to.equal(expectedAnswer);
    })
    it('should throw an error when divide by zero', () => {
        const a = 8
        const b = 0
        const fn = () => {
            divide (a, b)
        };
        expect(fn).to.throw();
    });
})


// SHORT VERSION::
// const expect = require('chai').expect;
// const divide = require('../index');

// describe('Divide function', () => {
//   it('should divide positive integers correctly', () => {
//     expect(divide(8, 4)).to.equal(2);
//   });

//   it('should throw an error when divide by zero', () => {
//     expect(() => { divide(8, 0) }).to.throw();
//   });
// });