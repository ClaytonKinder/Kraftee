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
      CartService.getCart().success(function (cart) {
        $scope.cart = cart;
      });

      $scope.getTotalPrice = function() {
        var total = 0;
        _.each($scope.cart, function(el, idx) {
          total += Number($scope.cart[idx].price);
        });
        return total;
      };

      $scope.addToCart = function (product) {
        console.log('Item added.');
        CartService.addToCart(product);
        $rootScope.$broadcast('cart-scanned');
      };

      $scope.deleteFromCart = function (productId) {
        console.log('Item deleted.');
        CartService.deleteFromCart(productId);
        $rootScope.$broadcast('cart-scanned');
      };

      // $scope.$on('cart-scanned', CartService.getCartLength())
    });

})();
