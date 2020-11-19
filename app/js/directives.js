(function() {
  'use strict';

  /* Directives */
  /* global angular */
  angular.module('myApp.directives', [])
    .directive('filter', function() {
      return {
        restrict: 'E',
        scope: {
          applyFilter: '&onFilter'
        },
        templateUrl: 'partials/filter.html'
      };
    })
    .directive('contactEdit', ['$parse',
      function($parse) {
        return {
          restrict: 'EA',
          scope: {
            save: '&onEdit',
            revert: '&onCancel'
          },
          replace: true,
          templateUrl: 'partials/contactEdit.html',
          controller: ['$scope',
            function($scope) {
              $scope.trySave = function(contact) {
                if (!$scope.save({
                  newPerson: contact
                })) {
                  $scope.taken = contact.email;
                }
              };
            }
          ],
          link: function(scope, el, attrs) {
            // acquire local copy of contact, so ng-model won't overwrite it
            scope.contact = angular.copy($parse(attrs.contactEdit)(scope.$parent));
          }
        };
      }
    ])
    .directive('contact', function() {
      return {
        restrict: 'EA',
        scope: {
          contact: '=',
          initEdit: '&',
          delete: '&onDelete'
        },
        replace: true,
        templateUrl: 'partials/contact.html'
      };
    })
    .directive('pagination', function() {
      return {
        restrict: 'E',
        scope: {
          page: '=',
          byPage: '=',
          itemCount: '=',
          rangeCalculator: '&rangeCalc',
          canChangePage: '&requestChange'
        },
        templateUrl: 'partials/pagination.html',
        replace: true,
        controller: ['$scope',
          function($scope) {
            $scope.$watch(function() {
              return [$scope.page, $scope.byPage, $scope.itemCount].join('|');
            }, function() {
              $scope.range = $scope.rangeCalculator({
                page: $scope.page,
                byPage: $scope.byPage,
                itemCount: $scope.itemCount
              });
            });
            $scope.increasePage = function() {
              if ($scope.canChangePage()) {
                $scope.page = $scope.page + 1;
              }
            };
            $scope.decreasePage = function() {
              if ($scope.canChangePage()) {
                $scope.page = $scope.page - 1;
              }
            };
          }
        ]
      };
    })
    .directive('onBeforeunload', ['$parse', '$window', function ($parse, $window) {
      return {
        restrict: 'A',
        scope: false,
        link: function(scope, el, attrs){
          if ($window.onbeforeunload) {
            throw new Error('Cannot do two things onbeforeunload, sorry.');
          }
          $window.onbeforeunload = $parse(attrs.onBeforeunload).bind(this, scope);
        }
      };
    }]);
})();