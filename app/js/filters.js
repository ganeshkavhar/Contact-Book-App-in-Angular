(function () {
  'use strict';

  /* Filters */
  /* global angular */
  /* jshint -W041 */
  angular.module('myApp.filters', [])
    .filter('range', function(){
      return function(items, opts) {
        // slice returns shallow copy of the array
        // but angular.copy would mean returning different arrays every time
        // this implementation good till we decide to change values in view
        opts = opts || {};
        var lower = opts.lower,
          upper = opts.upper;
        if (!items) { return []; }
        if ((lower == null) &&
            (upper == null)) {
          return items;
        }
        if (upper == null) { return items.slice(lower - 1); }
        if (lower == null) { return items.slice(0, upper); }
        return items.slice(lower - 1, upper);
      };
    });

})();


