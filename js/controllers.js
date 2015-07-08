(function () {
  'use strict';
  angular
    .module('kraftee')
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
    })
    .controller('CartController', function ($rootScope, $scope, CartService, $location) {
      CartService.getCart().then(function (cart) {
        $scope.cart = cart;
      });

      $scope.getTotalPrice = function() {
        var total = 0;
        _.each($scope.cart, function(el, idx) {
          total += Number($scope.cart[idx].price);
        });
        return total;
      };

      var watchCallback = function () {
        CartService.getCart().then(function (cart) {
         $scope.cart = cart;
        });
      };

      $scope.addToCart = function (product) {
        console.log('Item added - controller');
        CartService.addToCart(product);
      };

      $scope.deleteFromCart = function (productId) {
        console.log('Item deleted.');
        CartService.deleteFromCart(productId);
      };

      $scope.$on('item:created', watchCallback);
      $scope.$on('item:deleted', watchCallback);
    });

})();
