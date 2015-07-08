(function () {
  'use strict';
  angular
    .module('products', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'products/views/main.html',
          controller: 'MainController'
        })
        .when('/detail/:productId', {
          templateUrl: 'products/views/detail.html',
          controller: 'MainController'
        })
    });
})();
