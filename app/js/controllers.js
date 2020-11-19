(function(){
  'use strict';

  /* Controllers */
  /* global angular, confirm */
  angular.module('myApp.controllers', [])
    .controller('ContactsTableController', ['$scope', 'PeopleStorage', function ($scope, PeopleStorage) {
      $scope.page = 0;
      $scope.byPage = 10;

      $scope.people = PeopleStorage.list();
      $scope.beingEdited = [];

      $scope.sorting = {
        field: 'lastName',
        order: false
      };

      $scope.applyFilter = function(newFilter) {
        if (newFilter !== $scope.filter && !$scope.canChange()) {
          return null;
        }
        $scope.filter = newFilter;
      };

      $scope.toggleSorting = function (field) {
        if (!$scope.canChange()) {
          return null;
        }
        if ($scope.sorting.field === field) {
          $scope.sorting.order = !$scope.sorting.order;
          return $scope.sorting.order;
        }
        $scope.sorting.field = field;
        $scope.sorting.order = false;
      };

      $scope.isThisSorting = function(field, order) {
        var shouldBe = (order === 'asc') ? false : true;
        return ($scope.sorting.field === field && $scope.sorting.order === shouldBe);
      };

      $scope.rangeCalculator = function(page, byPage, itemCount) {
        return {
          lower: byPage*page + 1,
          upper: (byPage*(page + 1) < itemCount) ? byPage*(page + 1) : itemCount
        };
      };

      $scope.createNewPerson = function(){
        $scope.newPerson = PeopleStorage.create();
      };

      $scope.destroyEmpty = function(){
        $scope.newPerson = null;
      };

      $scope.startEditing = function(person){
        $scope.beingEdited.push(person.id);
      };

      $scope.isBeingEdited = function(person){
        return $scope.beingEdited.indexOf(person.id) > -1;
      };

      $scope.revert = function(person){
        stopEditing(person);
      };

      function stopEditing(person) {
        $scope.beingEdited = $scope.beingEdited.filter(function(id){ return id != person.id; });
      }

      $scope.canChange = function(){
        if ($scope.beingEdited.length && ($scope.people.length > $scope.byPage)) {
          return confirm('Some of the contacts are not saved. Do you wish to change view anyway?');
        }
        return true;
      };

      $scope.save = function(person){
        var result = PeopleStorage.save(person);
        if (!result) { return result; }
        $scope.destroyEmpty();
        stopEditing(person);
      };
      $scope.update = function(person, originalPerson){
        var result = PeopleStorage.update(person);
        if (!result) { return result; }
        stopEditing(originalPerson);
      };

      $scope.delete = PeopleStorage.removeById;
      // onbeforeunload popup will be shown in IE in anyway, should handle separately
      $scope.notifyChanges = function(){
        return $scope.beingEdited.length ? "There are some unsaved changes" : null
      }
      $scope.$watch('page', function(newValue, oldValue) {
        if (newValue !== oldValue ) {
          $scope.beingEdited = [];
        }
      });
      $scope.$watch('[sorting, filter].join(",")', function(newValue, oldValue){
        if (newValue !== oldValue) {
          $scope.beingEdited = [];
          $scope.page = 0;
        }
      });
    }]);
})();
