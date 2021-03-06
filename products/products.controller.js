(function () {
  'use strict';
  angular
    .module('products')
    .controller('MainController', function ($scope, ProductService, $routeParams, $location) {

      if ($location.url() === '/') {
        ProductService.getProducts().then(function(products) {
          $scope.products = products;
        });
      }

      if($routeParams.productId) {
        ProductService.getProduct($routeParams.productId).then(function(product) {
          $scope.product = product;
        });
      }

    });
})();
