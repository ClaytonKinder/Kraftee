(function () {
  'use strict';

  angular
    .module('kraftee', [
      'ngRoute',
      'underscore',
      'products',
      'cart'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/404', {
          template: '<h2>Sorry, page not found</h2>'
        })
        .otherwise({
          redirectTo: '/404'
        });
    })
    angular
      .module('underscore', [])
      .factory('_', function ($window) {
        return $window._;
    });
})();
