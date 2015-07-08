(function () {
  'use strict';
  angular
    .module('kraftee')
    .controller('MainController', function ($scope, ProductService, $routeParams) {
      ProductService.getProducts().then(function(products) {
        $scope.products = products;
      });

      ProductService.getProduct($routeParams.productId).then(function(product) {
        $scope.product = product;
      });

      $scope.cleanCharacters = function(html) {
        ProductService.cleanCharacters(html);
      };
    })
    .controller('CartController', function ($scope, CartService, $location) {
      CartService.getCart().success(function (cart) {
        $scope.cart = cart;
      });

      $scope.getTotalPrice = function() {
        var total = 0;
        _.each($scope.cart, function(el, idx) {
          total += Number($scope.cart[idx].price);
        });
        console.log(total);
        return total;
      };

      $scope.addToCart = function (product) {
        CartService.addToCart(product);
      };

      $scope.deleteFromCart = function (productId) {
        CartService.deleteFromCart(productId);
      };
    });

})();
