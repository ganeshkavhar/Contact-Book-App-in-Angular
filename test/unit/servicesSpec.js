'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(function(){
    module('myApp.services')
  });


  describe('PeopleStorage', function() {
    var subject;
    beforeEach(inject(function(PeopleStorage) {
      subject = PeopleStorage;
    }));
    it('should be defined', function(){
      expect(subject).toBeDefined();
    });
    describe('#list', function(){
      var listResult;
      beforeEach(function(){
        listResult = subject.list()
      });
      it('should return an array', function(){
        expect(listResult instanceof Array).toBeTruthy();
      });
      it('should return an array with all objects matching person schema', function(){
       listResult.every(function(person){
          expect(person.id).toBeDefined()
          expect(person.lastName).toBeDefined()
          expect(person.firstName).toBeDefined()
          expect(person.age).toBeDefined()
          expect(person.email).toBeDefined()
          expect(person.createdOn).toBeDefined()
          expect(person.lastEdited).toBeDefined()
          expect(person.isActive).toBeDefined()
        })
      });
    });
    describe('#create', function(){
      describe('returning a new model, which', function(){
        var newPerson;
        beforeEach(function(){
          newPerson = subject.create();
        })
        it('should be defined', function(){
          expect(newPerson).toBeDefined();
        })
        it('should have certain properties', function(){
          // jasmine.objectContaining didn't quite work for this
          // too little time to rewrite matcher
          expect(Object.keys(newPerson))
            .toEqual(["lastName", "firstName", "age", "email", "isActive", "edit"]);
        })
        it('sh')
      })
    })
    describe('#remove', function(){
      var toBeDeleted
      beforeEach(function(){
        toBeDeleted = subject.list()[0].id
      })
      describe('provided id is in list', function(){
        var result;
        beforeEach(function(){
          result = subject.removeById(toBeDeleted);
        })
        it('should return true', function(){
          expect(result).toEqual(true);
        })
        it('should remove item from list', function(){
          subject.list().map(function(p){return p.id}).indexOf(toBeDeleted) === -1
        })
      })
      describe('provided id not in the list',function(){
        var result;
        beforeEach(function(){
          subject.removeById(toBeDeleted);
          result = subject.removeById(toBeDeleted);
        })
        it('should return false', function(){
          expect(result).toEqual(false);
        })
      })
    })
    describe('#save', function(){
      var validPerson;
      beforeEach(function(){
        validPerson = {
          lastName: 'Connor',
          firstName: 'John',
          age: '15',
          email: 'h4xx0r@hotmail.com'
        }
      })
      it('should be defined', function(){
        expect(subject.save).toBeDefined()
      })
      describe('given valid person', function(){
        var resultedPerson, oldDate;
        beforeEach(function(){
          oldDate = Date;
          spyOn(window, 'Date').andCallFake(function(params){
            if (params) {
              return new oldDate(params)
            } else {
              return new oldDate('2014-07-14')
            }
          })
        })
        beforeEach(function(){
          resultedPerson = subject.save(validPerson)
        })
        afterEach(function(){
          subject.removeById(resultedPerson.id);
        })
        afterEach(function(){
          Date = oldDate;
        })
        it('should return truthy value', function(){
          expect(resultedPerson).toBeTruthy();
        })
        it('should keep all existing fields', function(){
          expect(resultedPerson.lastName).toEqual(validPerson.lastName)
          expect(resultedPerson.firstName).toEqual(validPerson.firstName)
          expect(resultedPerson.age).toEqual(validPerson.age)
          expect(resultedPerson.email).toEqual(validPerson.email)
        })
        it('should add an id', function(){
          expect(resultedPerson.id).toEqual(jasmine.any(Number))
        })
        it('should set createdOn', function(){
          expect(resultedPerson.createdOn).toEqual(1405296000000)
        })
        it('should set lastEdited', function(){
          expect(resultedPerson.lastEdited).toEqual(1405296000000)
        })
        it('should add it to the list', function(){
          var withThisId = subject.list().filter(function(p){return p.id == resultedPerson.id});
          expect(withThisId.length).toEqual(1)
        })
      })
      describe('given invalid person', function(){
        describe('without firstName field', function(){
          var result;
          beforeEach(function(){
            delete validPerson.firstName
          })
          beforeEach(function(){
            result = subject.save(validPerson)
          })
          it('should return false', function(){
            expect(result).toEqual(false)
          })
        })
        describe('without lastName field', function(){
          var result;
          beforeEach(function(){
            delete validPerson.lastName
          })
          beforeEach(function(){
            result = subject.save(validPerson)
          })
          it('should return false', function(){
            expect(result).toEqual(false)
          })
        })
        describe('without email field', function(){
          var result;
          beforeEach(function(){
            delete validPerson.email
          })
          beforeEach(function(){
            result = subject.save(validPerson)
          })
          it('should return false', function(){
            expect(result).toEqual(false)
          })
        })
        describe('with duplicate email', function(){
          var result;
          beforeEach(function(){
            var existingMail = subject.list()[0].email;
            validPerson.email = existingMail
          })
          beforeEach(function(){
            result = subject.save(validPerson)
          })
          it('should return false', function(){
            expect(result).toEqual(false)
          })
        })
      })
    })
    describe('#update', function(){
      var freshPerson;
      beforeEach(function(){
        var validPerson = {
          lastName: 'Connor',
          firstName: 'John',
          age: 15,
          email: 'h4xx0r@hotmail.com'
        }
        freshPerson = subject.save(validPerson);
      });
      afterEach(function(){
        subject.removeById(freshPerson.id)
      })
      it('should be defined', function(){
        expect(subject.update).toBeDefined();
      })
      describe('given invalid update object', function(){
        describe('without firstName field', function(){
          var result;
          beforeEach(function(){
            delete freshPerson.firstName
          })
          beforeEach(function(){
            result = subject.update(freshPerson)
          })
          it('should return false', function(){
            expect(result).toEqual(false)
          })
        })
        describe('without lastName field', function(){
          var result;
          beforeEach(function(){
            delete freshPerson.lastName
          })
          beforeEach(function(){
            result = subject.update(freshPerson)
          })
          it('should return false', function(){
            expect(result).toEqual(false)
          })
        })
        describe('without email field', function(){
          var result;
          beforeEach(function(){
            delete freshPerson.email
          })
          beforeEach(function(){
            result = subject.update(freshPerson)
          })
          it('should return false', function(){
            expect(result).toEqual(false)
          })
        })
        describe('with duplicate email', function(){
          var result;
          beforeEach(function(){
            var existingMail = subject.list()[0].email;
            freshPerson.email = existingMail
          })
          beforeEach(function(){
            result = subject.save(freshPerson)
          })
          it('should return false', function(){
            expect(result).toEqual(false)
          })
        })
      })
      describe('given valid update object', function(){
        describe('when no changes were made', function(){
          it('should return same object', function(){
            expect(subject.update(freshPerson)).toEqual(freshPerson)
          })
        })
        describe('when something changed', function(){
          var result, fromList, lastMomentBeforeUpdate;
          beforeEach(function(){
            freshPerson.age = 22;
            freshPerson.lastName = "O'Connor";
          })
          beforeEach(function(){
            lastMomentBeforeUpdate = new Date();
            result = subject.update({
              id: freshPerson.id,
              firstName: "John",
              email: "h4xx0r@hotmail.com",
              lastName: "O'Connor",
              age: 22,
              createdOn: (new Date('2014-07-14')).getTime()
            })
            fromList = subject.list().filter(function(p){return p.id === freshPerson.id})[0]
          })
          describe('result of update', function(){
            it('should return updated property (22 for updated object age)', function(){
              expect(result.age).toEqual(22)
            })
            it('should return updated property ("O\'Connor" for updated lastName)', function(){
              expect(result.lastName).toEqual("O'Connor")
            })
            it('should return updated property (22 for updated object age)', function(){
              expect(fromList.age).toEqual(22)
            })
            it('should return updated property ("O\'Connor" for updated lastName)', function(){
              expect(fromList.lastName).toEqual("O'Connor")
            })
            it('should have createdOn property', function(){
              expect(result.createdOn).toBeDefined()
            })
            it('should have lastEdited property', function(){
              expect(result.lastEdited).toBeDefined()
            })
            it('should have other properties that were not updated', function(){
              expect(result.email).toEqual('h4xx0r@hotmail.com')
            })
            it('should have new lastEdited property', function(){
              var newLastEdited = new Date(fromList.lastEdited).getTime(),
                prevLastEdited = new Date(freshPerson.lastEdited).getTime();
              expect(newLastEdited).not.toBeLessThan(lastMomentBeforeUpdate.getTime())
              expect(prevLastEdited).not.toBeLessThan(newLastEdited)
            })
          })
          describe('object in list', function(){
            it('should return updated property (22 for updated object age)', function(){
              expect(fromList.age).toEqual(22)
            })
            it('should return updated property ("O\'Connor" for updated lastName)', function(){
              expect(fromList.lastName).toEqual("O'Connor")
            })
          })

        })
      })
    })
  });
});
