(function() {
  'use strict';

  /* Services */
  /* global angular */

  var services = angular.module('myApp.services', []);
  var fixture = [{
    'id': 0,
    'lastName': 'Salinas',
    'firstName': 'Dawn',
    'age': 22,
    'email': 'dawnsalinas@slofast.com',
    'createdOn': '2014-05-24T07:54:07.710Z',
    'lastEdited': '2014-06-23T19:49:21.137Z',
    'isActive': false
  }, {
    'id': 1,
    'lastName': 'Wilder',
    'firstName': 'Casandra',
    'age': 39,
    'email': 'casandrawilder@slofast.com',
    'createdOn': '2014-04-10T20:04:59.333Z',
    'lastEdited': '2014-05-01T20:52:00.120Z',
    'isActive': true,
  }, {
    'id': 2,
    'lastName': 'Cummings',
    'firstName': 'Calhoun',
    'age': 34,
    'email': 'calhouncummings@slofast.com',
    'createdOn': '2014-02-14T14:15:36.066Z',
    'lastEdited': '2014-02-19T06:59:23.799Z',
    'isActive': true
  }, {
    'id': 3,
    'lastName': 'Doyle',
    'firstName': 'Erma',
    'age': 34,
    'email': 'ermadoyle@slofast.com',
    'createdOn': '2014-04-30T10:54:54.541Z',
    'lastEdited': '2014-07-06T13:09:23.380Z',
    'isActive': true
  }, {
    'id': 4,
    'lastName': 'Mckenzie',
    'firstName': 'Mueller',
    'age': 37,
    'email': 'muellermckenzie@slofast.com',
    'createdOn': '2014-03-21T00:39:19.938Z',
    'lastEdited': '2014-03-25T06:18:17.215Z',
    'isActive': true
  }, {
    'id': 5,
    'lastName': 'George',
    'firstName': 'Adrian',
    'age': 34,
    'email': 'adriangeorge@slofast.com',
    'createdOn': '2014-06-08T17:06:29.780Z',
    'lastEdited': '2014-06-30T05:42:13.929Z',
    'isActive': false
  }, {
    'id': 6,
    'lastName': 'Reid',
    'firstName': 'Goodwin',
    'age': 22,
    'email': 'goodwinreid@slofast.com',
    'createdOn': '2014-05-19T19:58:22.154Z',
    'lastEdited': '2014-06-13T04:20:51.098Z',
    'isActive': true
  }, {
    'id': 7,
    'lastName': 'Saunders',
    'firstName': 'Stewart',
    'age': 35,
    'email': 'stewartsaunders@slofast.com',
    'createdOn': '2014-05-27T19:53:44.489Z',
    'lastEdited': '2014-06-16T20:28:55.405Z',
    'isActive': true
  }, {
    'id': 8,
    'lastName': 'Christian',
    'firstName': 'Dalton',
    'age': 28,
    'email': 'daltonchristian@slofast.com',
    'createdOn': '2014-04-25T19:54:34.213Z',
    'lastEdited': '2014-06-08T22:32:17.101Z',
    'isActive': false
  }, {
    'id': 9,
    'lastName': 'Reynolds',
    'firstName': 'Abby',
    'age': 35,
    'email': 'abbyreynolds@slofast.com',
    'createdOn': '2014-02-18T06:33:52.943Z',
    'lastEdited': '2014-05-07T03:32:23.977Z',
    'isActive': true
  }, {
    'id': 10,
    'lastName': 'Dawson',
    'firstName': 'Tate',
    'age': 31,
    'email': 'tatedawson@slofast.com',
    'createdOn': '2014-04-05T13:09:51.607Z',
    'lastEdited': '2014-04-27T02:27:40.090Z',
    'isActive': false
  }, {
    'id': 11,
    'lastName': 'Beck',
    'firstName': 'Debra',
    'age': 36,
    'email': 'debrabeck@slofast.com',
    'createdOn': '2014-05-05T12:00:12.607Z',
    'lastEdited': '2014-05-24T21:58:24.810Z',
    'isActive': true
  }, {
    'id': 12,
    'lastName': 'Larsen',
    'firstName': 'Charlotte',
    'age': 39,
    'email': 'charlottelarsen@slofast.com',
    'createdOn': '2014-03-11T19:02:47.134Z',
    'lastEdited': '2014-05-13T00:59:37.236Z',
    'isActive': true
  }, {
    'id': 13,
    'lastName': 'Mejia',
    'firstName': 'Susan',
    'age': 21,
    'email': 'susanmejia@slofast.com',
    'createdOn': '2014-01-08T01:40:25.176Z',
    'lastEdited': '2014-05-22T14:40:47.988Z',
    'isActive': true
  }, {
    'id': 14,
    'lastName': 'Phillips',
    'firstName': 'Randall',
    'age': 32,
    'email': 'randallphillips@slofast.com',
    'createdOn': '2014-04-21T05:41:06.055Z',
    'lastEdited': '2014-06-21T18:58:45.631Z',
    'isActive': true
  }, {
    'id': 15,
    'lastName': 'Munoz',
    'firstName': 'Jana',
    'age': 27,
    'email': 'janamunoz@slofast.com',
    'createdOn': '2014-05-02T17:14:33.754Z',
    'lastEdited': '2014-07-09T06:22:33.507Z',
    'isActive': false
  }, {
    'id': 16,
    'lastName': 'Lawson',
    'firstName': 'Brittany',
    'age': 37,
    'email': 'brittanylawson@slofast.com',
    'createdOn': '2014-03-06T22:42:50.275Z',
    'lastEdited': '2014-03-18T05:03:49.091Z',
    'isActive': false
  }, {
    'id': 17,
    'lastName': 'Cox',
    'firstName': 'Justice',
    'age': 20,
    'email': 'justicecox@slofast.com',
    'createdOn': '2014-01-21T14:34:31.064Z',
    'lastEdited': '2014-04-13T06:10:09.017Z',
    'isActive': false
  }, {
    'id': 18,
    'lastName': 'Hodge',
    'firstName': 'Ginger',
    'age': 38,
    'email': 'gingerhodge@slofast.com',
    'createdOn': '2014-05-18T18:36:28.230Z',
    'lastEdited': '2014-07-01T14:24:51.334Z',
    'isActive': true
  }, {
    'id': 19,
    'lastName': 'Kinney',
    'firstName': 'Solis',
    'age': 26,
    'email': 'soliskinney@slofast.com',
    'createdOn': '2014-05-25T00:05:40.860Z',
    'lastEdited': '2014-07-08T21:35:16.072Z',
    'isActive': false
  }, {
    'id': 20,
    'lastName': 'Duran',
    'firstName': 'Margaret',
    'age': 29,
    'email': 'margaretduran@slofast.com',
    'createdOn': '2014-06-13T21:38:35.142Z',
    'lastEdited': '2014-07-04T11:25:42.312Z',
    'isActive': false
  }, {
    'id': 21,
    'lastName': 'Burgess',
    'firstName': 'Tonia',
    'age': 38,
    'email': 'toniaburgess@slofast.com',
    'createdOn': '2014-01-10T14:47:47.281Z',
    'lastEdited': '2014-03-27T12:22:55.211Z',
    'isActive': true
  }, {
    'id': 22,
    'lastName': 'Garrison',
    'firstName': 'Fry',
    'age': 38,
    'email': 'frygarrison@slofast.com',
    'createdOn': '2014-02-28T06:10:04.635Z',
    'lastEdited': '2014-03-09T16:45:07.883Z',
    'isActive': true
  }, {
    'id': 23,
    'lastName': 'Snow',
    'firstName': 'Perkins',
    'age': 20,
    'email': 'perkinssnow@slofast.com',
    'createdOn': '2014-03-12T16:24:01.039Z',
    'lastEdited': '2014-05-21T23:04:24.886Z',
    'isActive': false
  }, {
    'id': 24,
    'lastName': 'Myers',
    'firstName': 'Hayden',
    'age': 23,
    'email': 'haydenmyers@slofast.com',
    'createdOn': '2014-01-23T23:57:55.627Z',
    'lastEdited': '2014-06-01T08:07:22.877Z',
    'isActive': false
  }, {
    'id': 25,
    'lastName': 'Carlson',
    'firstName': 'Zimmerman',
    'age': 23,
    'email': 'zimmermancarlson@slofast.com',
    'createdOn': '2014-01-01T00:32:34.992Z',
    'lastEdited': '2014-02-04T20:55:52.702Z',
    'isActive': true
  }, {
    'id': 26,
    'lastName': 'Suarez',
    'firstName': 'Norman',
    'age': 40,
    'email': 'normansuarez@slofast.com',
    'createdOn': '2014-01-09T04:05:56.394Z',
    'lastEdited': '2014-06-18T01:37:24.951Z',
    'isActive': true
  }];
  var blueprint = {
    'lastName': '',
    'firstName': '',
    'age': 21,
    'email': '',
    'isActive': false,
    'edit': true
  };
  services.service('PeopleStorage', function() {
    var people = fixture;

    function areRequiredOk(person) {
      return (person.firstName &&
        person.lastName &&
        person.email);
    }

    function isEmailUniqueAmongst(people, email) {
      return people.map(function(p) {
        return p.email;
      }).indexOf(email) === -1;
    }

    function validNew(person) {
      var isEmailUnique = isEmailUniqueAmongst(people, person.email);
      return areRequiredOk(person) && isEmailUnique;
    }

    function validUpdate(person) {
      var others = people.filter(function(p) {
        return p.id !== person.id;
      });
      return areRequiredOk(person) && isEmailUniqueAmongst(others, person.email);
    }
    return {
      list: function() {
        return people;
      },
      create: function() {
        return angular.copy(blueprint);
      },
      removeById: function(id) {
        var index = people.map(function(person) {
          return person.id;
        }).indexOf(id);
        if (index > -1) {
          people.splice(index, 1);
          return true;
        }
        return false;
      },
      save: function(person) {
        var newPerson = angular.copy(person);
        if (!validNew(newPerson)) {
          return false;
        }
        var timestamp = (new Date()).getTime();
        newPerson.id = timestamp + Math.round(Math.random() * 100000);
        newPerson.createdOn = timestamp;
        newPerson.lastEdited = timestamp;
        people.push(newPerson);
        return newPerson;
      },
      update: function(person) {
        if (!validUpdate(person)) {
          return false;
        }
        var index = people.map(function(p) {
          return p.id;
        }).indexOf(person.id);
        if (index === -1) {
          return false;
        }
        angular.extend(people[index], person);
        people[index].lastEdited = new Date();
        return angular.copy(people[index]);
      }
    };
  });

})();