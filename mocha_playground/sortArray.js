
  function sort(list) {
    for(let i = 2; i < list.length; i++){
      let j = i;
      while(j > 0 && list[j - 1] > list[j]){
        let temp = list[j];
        list[j] = list[j - 1];
        list[j - 1] = temp;
        j--;
      }
    }
    return list;
  }

  module.exports = sort

  describe('Sort function', () => {
    it ('should arrange the array into ascending order', () => {
        const givenArr = [5, 13, 4, 7, 21];
        const expectedResult = [4, 5, 7, 13, 21];
        
        expect().to.equal(expectedResult);
    })
    it ('should throw an error if the array is anything other than numbers', () => {
        arr1 = [1,2,3]
        arr2 = [1,2,3]
        expect(arr1).to.deep.equal(arr2) 
    })
    it ('should throw an error if only one value is given', () => {
        const givenArr = [5, 13, 4, 7, 21];
        const faultyArr = [1]

    })

  })

