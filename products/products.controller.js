(function () {
  'use strict';
  angular
    .module('products')
    .controller('MainController', function ($scope, ProductService, $routeParams, $location) {

      if ($location.url() === '/') {
        console.log('Got all products.');
        ProductService.getProducts().then(function(products) {
          $scope.products = products;
        });
      }

      if($routeParams.productId) {
        console.log('Got single product.');
        ProductService.getProduct($routeParams.productId).then(function(product) {
          $scope.product = product;
        });
      }

    });
})();
