(function () {
  'use strict';

  angular
    .module('kraftee', [
      'ngRoute',
      'underscore'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/main.html',
          controller: 'MainController'
        })
        .when('/detail/:productId', {
          templateUrl: 'views/detail.html',
          controller: 'MainController'
        })
        .when('/cart', {
          templateUrl: 'views/cart.html',
          controller: 'CartController'
        })
        .when('/404', {
          template: '<h2>Sorry, page not found</h2>'
        })
        .otherwise({
          redirectTo: '/404'
        });
    })
    .directive("productSort", function() {
      return {
        restrict: 'E',
        templateUrl: 'views/productSort.html',
        controller: function(CartService, ProductService) {
          this.sort = 1;

          this.isSet = function(checkSort) {
            return this.sort === checkSort;
          };

          this.setSort = function(activeSort) {
            this.sort = activeSort;
          };
        },
        controllerAs: 'sort'
      };
    })
    angular
      .module('underscore', [])
      .factory('_', function ($window) {
        return $window._;
    });
})();
