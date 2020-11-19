'use strict';

/* jasmine specs for controllers go here */
/* globals describe, beforeEach, module, inject, spyOn, jasmine, it, expect */
describe('controllers', function() {
  beforeEach(module('myApp.controllers'));

  describe('ContactsTableController', function() {
    var contactsCtrl, contactsCtrlScope, PeopleStorage;
    beforeEach(inject(function($controller, $rootScope) {
      PeopleStorage = jasmine.createSpyObj('PeopleStorage', ['list', 'create', 'save', 'update', 'removeById']);
      contactsCtrlScope = $rootScope.$new();
      contactsCtrl = $controller('ContactsTableController', {
        PeopleStorage: PeopleStorage,
        $scope: contactsCtrlScope
      });
    }));
    it('should be defined', function() {
      expect(contactsCtrl).toBeDefined();
    });
    describe('#rangeCalculator', function() {
      it('should be defined', function() {
        expect(contactsCtrlScope.rangeCalculator).toBeDefined();
      });
      describe('when given page, byPage & itemCount', function() {
        it('should return proper ranges for first page ({lower: 1, upper:10} for 0, 10, 27', function() {
          expect(contactsCtrlScope.rangeCalculator(0, 10, 27)).toEqual({
            lower: 1,
            upper: 10
          });
        });
        it('should return proper ranges for page in the middle ({lower: 11, upper:20} for 1, 10, 27', function() {
          expect(contactsCtrlScope.rangeCalculator(1, 10, 27)).toEqual({
            lower: 11,
            upper: 20
          });
        });
        it('should return proper ranges for last page ({lower: 21, upper:27} for 2, 10, 27', function() {
          expect(contactsCtrlScope.rangeCalculator(2, 10, 27)).toEqual({
            lower: 21,
            upper: 27
          });
        });
      });
    });
    describe('#applyFilter', function() {
      it('should be defined', function() {
        expect(contactsCtrlScope.applyFilter).toBeDefined();
      });
      describe('given new value is passed as argument', function() {
        // should call canChange
        var canChangeSpy;
        beforeEach(function() {
          canChangeSpy = spyOn(contactsCtrlScope, 'canChange');
          canChangeSpy.andReturn(true);
        });
        var newFilter = 'ctrl';
        beforeEach(function() {
          contactsCtrlScope.applyFilter(newFilter);
        });
        it('should call canChange method', function() {
          expect(contactsCtrlScope.canChange).toHaveBeenCalled();
        });
        describe('given #canChange returns true', function() {
          it('should set $scope.filter to it', function() {
            expect(contactsCtrlScope.filter).toEqual(newFilter);
          });
        });
        describe('given #canChange return false', function() {
          beforeEach(function() {
            canChangeSpy.andReturn(false);
          });
          var oldFilter = 'lame';
          beforeEach(function() {
            contactsCtrlScope.filter = oldFilter;
          });
          beforeEach(function() {
            contactsCtrlScope.applyFilter(newFilter);
          });
          it('should keep old filter', function() {
            expect(contactsCtrlScope.filter).toEqual(oldFilter);
          });
        });

      });
      describe('given same value is passed as argument', function() {
        it('should return null', function() {
          var oldFilter = 'already there';
          contactsCtrlScope.filter = oldFilter;
          expect(contactsCtrlScope.applyFilter(oldFilter)).toEqual(null);
          expect(contactsCtrlScope.filter).toEqual(oldFilter);
        });
      });
    });
    describe('#toggleSorting', function() {
      var toggleSorting, defaultSorting;
      beforeEach(function() {
        defaultSorting = {
          field: 'lastName',
          order: false
        };
        toggleSorting = contactsCtrlScope.toggleSorting;
      });
      it('should be defined', function() {
        expect(toggleSorting).toBeDefined();
      });
      describe('given field name', function() {
        describe('when it is not current field sorted on', function() {
          beforeEach(function() {
            contactsCtrlScope.sorting = defaultSorting;
          });
          describe('given canChange return true', function() {
            beforeEach(function() {
              spyOn(contactsCtrlScope, 'canChange').andReturn(true);
            });
            it('should switch sorting field to new name', function() {
              var newField = 'age';
              toggleSorting(newField);
              expect(contactsCtrlScope.sorting.field).toEqual(newField);
            });
            it('should set order to false (descending)', function() {
              expect(contactsCtrlScope.sorting.order).toEqual(false);
            });
          });
          describe('given canChange return false', function() {
            beforeEach(function() {
              spyOn(contactsCtrlScope, 'canChange').andReturn(false);
            });
            it('should not switch sorting', function() {
              var newField = 'age';
              toggleSorting(newField);
              expect(contactsCtrlScope.sorting).toEqual(defaultSorting);
            });
          });
        });
        describe('when it is not current field sorted on', function() {
          beforeEach(function() {
            contactsCtrlScope.sorting = defaultSorting;
          });
          describe('given canChange return true', function() {
            beforeEach(function() {
              spyOn(contactsCtrlScope, 'canChange').andReturn(true);
            });
            it('should keep the field name the same', function() {
              var oldField = defaultSorting.field;
              toggleSorting(oldField);
              expect(contactsCtrlScope.sorting.field).toEqual(oldField);
            });
            it('should toggle the order (true for {order: false, ...}', function() {
              var oldOrder = defaultSorting.order;
              toggleSorting(defaultSorting.field);
              expect(contactsCtrlScope.sorting.order).toEqual(!oldOrder);
            });
            it('should toggle the order (false for {order: true, ...}', function() {
              contactsCtrlScope.sorting.order = true;
              var oldOrder = contactsCtrlScope.sorting.order;
              toggleSorting(defaultSorting.field);
              expect(contactsCtrlScope.sorting.order).toEqual(!oldOrder);
            });
          });
          describe('given canChange returns false', function() {
            beforeEach(function() {
              spyOn(contactsCtrlScope, 'canChange').andReturn(false);
            });
            it('should not toggle anything', function() {
              var oldField = defaultSorting.field;
              toggleSorting(oldField);
              expect(contactsCtrlScope.sorting).toEqual(defaultSorting);
            });
          });

        });
      });
    });
    describe('#isThisSorting', function() {
      describe('given scope has sorting on first name, ascending ', function() {
        beforeEach(function() {
          contactsCtrlScope.sorting = {
            field: 'firstName',
            order: false
          };
        });
        it('should return true if sorting matches', function() {
          expect(contactsCtrlScope.isThisSorting('firstName', 'asc')).toEqual(true);
        });
        it('should return true otherwise', function() {
          expect(contactsCtrlScope.isThisSorting('firstName', 'desc')).not.toEqual(true);
          expect(contactsCtrlScope.isThisSorting('lastName', 'asc')).not.toEqual(true);
        });
      });
    });
    describe('#createNewPerson', function() {
      beforeEach(function() {
        var dummy = {
          'lastName': '',
          'firstName': '',
          'age': 21,
          'email': '',
          'isActive': false,
          'edit': true
        };
        PeopleStorage.create.andReturn(dummy);
      });
      beforeEach(function() {
        contactsCtrlScope.createNewPerson();
      });
      it('should call PeopleStorage.create', function() {
        expect(PeopleStorage.create).toHaveBeenCalled();
      });
      it('should set $scope.newPerson to returned value', function() {
        expect(contactsCtrlScope.newPerson).toEqual({
          'lastName': '',
          'firstName': '',
          'age': 21,
          'email': '',
          'isActive': false,
          'edit': true
        });
      });
    });
    describe('#destroyEmpty', function() {
      it('should set $scope.newPerson to null', function() {
        contactsCtrlScope.newPerson = {
          even: 'dummier'
        };
        contactsCtrlScope.destroyEmpty();
        expect(contactsCtrlScope.newPerson).toEqual(null);
      });
    });
    describe('#startEditing', function() {
      beforeEach(function() {
        contactsCtrlScope.beingEdited = [];
      });
      beforeEach(function() {
        contactsCtrlScope.startEditing({
          id: 1
        });
      });
      it('should add person\'s in question id into list of edited', function() {
        expect(contactsCtrlScope.beingEdited).toContain(1);
      });
    });
    describe('#isBeingEdited', function() {
      beforeEach(function() {
        contactsCtrlScope.beingEdited = [1];
      });
      it('should return true if person\'s in question id is in list of edited', function() {
        expect(contactsCtrlScope.isBeingEdited({
          id: 1
        })).toEqual(true);
      });
      it('should return false if person\'s in question id is not in list of edited', function() {
        expect(contactsCtrlScope.isBeingEdited({
          id: 2
        })).toEqual(false);
      });
    });
    describe('#revert', function() {
      describe('when called with person object that has id', function() {
        beforeEach(function() {
          contactsCtrlScope.beingEdited = [1];
        });
        beforeEach(function() {
          contactsCtrlScope.revert({
            id: 1
          });
        });
        it('should stop editing person', function() {
          expect(contactsCtrlScope.beingEdited).not.toContain(1);
        });
      });
    });
    describe('#canChange', function() {

      describe('given no items being edited', function() {
        beforeEach(function() {
          contactsCtrlScope.beingEdited = [];
        });
        it('should return true', function() {
          expect(contactsCtrlScope.canChange()).toEqual(true);
        });
      });
      describe('given some items are edited', function() {
        beforeEach(function() {
          contactsCtrlScope.beingEdited = [1, 2];
        });
        describe('if we have more than one page', function() {
          beforeEach(function() {
            contactsCtrlScope.byPage = 2;
            contactsCtrlScope.people = [{
              id: 1
            }, {
              id: 2
            }, {
              id: 3
            }, {
              id: 4
            }];
          });
          describe('given user confirms', function() {
            beforeEach(function() {
              spyOn(window, 'confirm').andReturn(true);
            });
            var result;
            beforeEach(function() {
              result = contactsCtrlScope.canChange();
            });
            it('should ask for confirm', function() {
              expect(window.confirm).toHaveBeenCalled();
            });
            it('should return true', function() {
              expect(result).toEqual(true);
            });
          });
          describe('given use does not confirm', function() {
            beforeEach(function() {
              spyOn(window, 'confirm').andReturn(false);
            });
            var result;
            beforeEach(function() {
              result = contactsCtrlScope.canChange();
            });
            it('should ask for confirm', function() {
              expect(window.confirm).toHaveBeenCalled();
            });
            it('should return true', function() {
              expect(result).toEqual(false);
            });
          });
        });
        describe('if we have less that page worth items', function() {
          beforeEach(function() {
            contactsCtrlScope.byPage = 10;
            contactsCtrlScope.people = [{
              id: 1
            }, {
              id: 2
            }, {
              id: 3
            }, {
              id: 4
            }];
          });
          beforeEach(function() {
            spyOn(window, 'confirm');
          });
          var result;
          beforeEach(function() {
            result = contactsCtrlScope.canChange();
          });
          it('should not call confrim', function() {
            expect(window.confirm).not.toHaveBeenCalled();
          });
          it('should return true', function() {
            expect(result).toEqual(true);
          });
        });
      });
    });
    describe('#save', function() {
      beforeEach(function() {
        contactsCtrlScope.startEditing({ id: 3 });
      });
      beforeEach(function() {
        spyOn(contactsCtrlScope, 'destroyEmpty').andCallThrough();
      });
      describe('given model is valid and save return truthy value', function() {
        var dummy = {
            id: 3
          },
          result;
        beforeEach(function() {
          PeopleStorage.save.andReturn(true);
        });
        beforeEach(function() {
          result = contactsCtrlScope.save(dummy);
        });
        it('should not be null', function() {
          expect(result).not.toBe(null);
        });
        it('should call PeopleStorage#save', function() {
          expect(PeopleStorage.save).toHaveBeenCalled();
        });

        it('should pass person argument to PeopleStorage#save', function() {
          expect(PeopleStorage.save).toHaveBeenCalledWith(dummy);
        });
        it('should call destroyEmpty', function() {
          expect(contactsCtrlScope.destroyEmpty).toHaveBeenCalled();
        });
        it('should remove item from edited list', function() {
          var isEdited = contactsCtrlScope.isBeingEdited({id: 3});
          expect(isEdited).toEqual(false);
        });
      });
      describe('given model is valid and save return truthy value', function() {
        var dummy = {
            id: 3
          },
          result;
        beforeEach(function() {
          PeopleStorage.save.andReturn(false);
        });
        beforeEach(function() {
          result = contactsCtrlScope.save(dummy);
        });
        it('should return falsy value', function() {
          expect(result).toBe(false);
        });
        it('should call PeopleStorage#save', function() {
          expect(PeopleStorage.save).toHaveBeenCalled();
        });

        it('should pass person argument to PeopleStorage#save', function() {
          expect(PeopleStorage.save).toHaveBeenCalledWith(dummy);
        });
        it('should not remove item from edited list', function() {
          var isEdited = contactsCtrlScope.isBeingEdited({ id: 3 });
          expect(isEdited).toEqual(true);
        });
      });
    });
    describe('#update', function() {
      describe('given model is valid', function() {
        var dummy = {
            id: 3
          },
          result;
        beforeEach(function() {
          PeopleStorage.update.andReturn(true);
        });
        beforeEach(function() {
          result = contactsCtrlScope.update(dummy);
        });
        it('should return non-null', function() {
          expect(result).not.toBe(null);
        });
        it('should call PeopleStorage#save', function() {
          expect(PeopleStorage.update).toHaveBeenCalled();
        });
        it('should pass person argument to PeopleStorage#save', function() {
          expect(PeopleStorage.update).toHaveBeenCalledWith(dummy);
        });
        it('should remove item from edited list', function() {
          var isEdited = contactsCtrlScope.isBeingEdited({ id: 3 });
          expect(isEdited).toEqual(false);
        });
      });
    });
    describe('#delete', function() {
      beforeEach(function() {
        contactsCtrlScope.delete(3);
      });
      it('should delegate to PeopleStorage#removeById', function() {
        expect(PeopleStorage.removeById).toHaveBeenCalled();
      });
      it('should pass id to PeopleStorage#removeById', function() {
        expect(PeopleStorage.removeById).toHaveBeenCalledWith(3);
      });
    });
  });
});