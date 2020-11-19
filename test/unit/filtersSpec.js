'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {
  beforeEach(module('myApp.filters'));


  describe('range', function() {
    var rangeFilter;
    beforeEach(inject(function($filter){
      rangeFilter = $filter('range');
    }))
    it('should be definded', function(){
      expect(rangeFilter).toBeDefined();
    })
    describe('given no items are given', function(){
      it('should return empty array', function(){
        expect(rangeFilter()).toEqual([])
      })
    })
    describe('given array of items and arguments', function(){
      describe('when no bounds are specified', function(){
        it('should return array of items as is ([1, 2, 3, 4] for [1,2,3,4])', function(){
          expect(rangeFilter([1, 2, 3, 4])).toEqual([1, 2, 3, 4])
        })
      })
      describe('when only lower bound is specified', function(){
        it('should return all the items after that element ([2,3,4] for [1,2,3,4], 1)', function(){
          expect(rangeFilter([1, 2, 3, 4], {lower: 2})).toEqual([2,3,4])
        })
      })
      describe('when only upper bound is specified', function(){
        it('should return all the preceding items ([1, 2, 3] for [1, 2, 3, 4],null, 3)', function(){
          expect(rangeFilter([1, 2, 3, 4], {upper: 3})).toEqual([1, 2, 3])
        })
      })
      describe('when both lower and upper bound specified ', function(){
        it('should return items in range ([3, 4, 5] for [1,2,3,4,5,6,7,8], 3,5)', function(){
          expect(rangeFilter([1,2,3,4,5,6,7,8], {lower: 3, upper: 5})).toEqual([3, 4, 5])
        })
        // sanity check
        describe('should return items in range', function(){
          var fixture;
          beforeEach(function(){
            fixture = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
          })
          it('for long case (1-10 for 1-20, 1, 10)', function(){
            expect(rangeFilter(fixture, {lower: 1, upper: 10})).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
          })
          it('for long case (11-20 for 1-20, 11, 20)', function(){
            expect(rangeFilter(fixture, {lower: 11, upper: 20})).toEqual([11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
          })
        })
      })
    })
  });
});
