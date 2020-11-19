'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  beforeEach(module('templates'));
  beforeEach(module('myApp.directives'));

  describe('pagination directive', function() {
    beforeEach(module('myApp.controllers'));
    var MAX_COUNT = 27, BY_PAGE = 10;
    var MAX_PAGE = Math.floor(MAX_COUNT / BY_PAGE) + ((MAX_COUNT % BY_PAGE) ? 1 : 0) - 1;
    var element, $scope;

    // set up $scope & borrow some methods from ContactsTableController
    beforeEach(inject(function($compile, $rootScope, $controller) {
      $scope = $rootScope.$new();
      var ctrlScope;
      var ctrlScope = {$watch: function(){}}
      spyOn(ctrlScope, '$watch')
      $controller('ContactsTableController', { PeopleStorage: jasmine.createSpyObj('PeopleStorage', ['list']), $scope: ctrlScope })
      $scope.rangeCalculator = ctrlScope.rangeCalculator;
      $scope.canChange = ctrlScope.canChange;
    }))

    // set up element & $compile it
    beforeEach(inject(function($compile, $rootScope, $controller) {
      element = angular.element("<pagination request-change='canChange()' range-calc='rangeCalculator(page, byPage, itemCount)' page='page' by-page='byPage' item-count='itemCount'></pagination>")
      $compile(element)($scope);
    }));

    // set up initial state variables
    beforeEach(function(){
      $scope.page = 0;
      $scope.byPage = BY_PAGE;
      $scope.itemCount = MAX_COUNT;
      $scope.$digest()
    })


    describe('with binding', function(){
      it('should have one for page', function(){
        $scope.page = 1;
        $scope.$digest()
        expect(element.scope().page).toEqual(1)
      })
      it('should have one for byPage', function(){
        $scope.byPage = 5;
        $scope.$digest()
        expect(element.scope().byPage).toEqual(5)
      })
      it('should have one for itemCount', function(){
        $scope.itemCount = 5;
        $scope.$digest()
        expect(element.scope().itemCount).toEqual(5)
      })
    })
    describe('should render itself', function() {
      describe("when on the first page", function(){
        beforeEach(function(){
          $scope.page = 0;
          $scope.$digest();
        })
        it('should have single link (next page)', function() {
          expect(element.find('a').length).toEqual(1)
        });
        it('should have text for current range', function() {
          expect(element.text()).toMatch(/Showing \d+-\d+ of \d+ users/m);
        });
        it('should have text for next page link', function() {
          expect(element.text()).toMatch(/Next \d+ users »/m);
        });
      })
      describe('when on the page somewhere between first and last (1)',function(){
        beforeEach(function(){
          $scope.page = 1;
          $scope.$digest();
        })
        it('should have both link to previous and next', function(){
          expect(element.find('a').length).toEqual(2)
        })
        it('should have text for both links & range', function(){
          expect(element.text()).toMatch(/\« Previous \d+ users\s+Showing \d+-\d+ of \d+ users\s+Next \d+ users »/m);
        })
      })
      describe('when on the last page', function(){
        beforeEach(function(){
          $scope.page = MAX_PAGE;
          $scope.$digest();
        })
        it('should have single link (prev page)', function() {
          expect(element.find('a').length).toEqual(1)
        });
        it('should have text for current range', function() {
          expect(element.text()).toMatch(/Showing \d+-\d+ of \d+ users/m);
        });
        it('should have text for prev page link', function() {
          expect(element.text()).toMatch(/« Previous \d+ users/m);
        });
      })
      describe('when no items are provided', function(){
        beforeEach(function(){
          $scope.itemCount = 0;
          $scope.$digest();
        })
        it('should have text for empty set', function(){
          expect(element.text()).toMatch(/Nothing to page through./)
        })
      })
      describe('when next link is clicked', function(){
        beforeEach(function(){
           spyOn($scope, 'canChange').andCallThrough(true);
        })
        beforeEach(function(){
          $scope.page = 0;
          $scope.$digest()
        })
        beforeEach(function(){
          element.find('a').triggerHandler('click')
          $scope.$digest()
        })
        it('should call canChange', function(){
          expect($scope.canChange).toHaveBeenCalled();
        })
        it('should increase page count', function(){
          expect($scope.page).toEqual(1)
          expect(element.scope().page).toEqual(1)
        })
      })
      describe('when prev link is clicked', function(){
        beforeEach(function(){
          spyOn($scope, 'canChange').andCallThrough(true);
        })
        beforeEach(function(){
          $scope.page = MAX_PAGE;
          $scope.$digest();
        })
        beforeEach(function(){
          element.find('a').triggerHandler('click')
          $scope.$digest()
        })
        it('should call canChangePage', function(){
          expect($scope.canChange).toHaveBeenCalled();
        })
        it('should decrease page count', function(){
          expect($scope.page).toEqual(MAX_PAGE - 1)
          expect(element.scope().page).toEqual(MAX_PAGE - 1)
        })
      })

    });
  });
});
