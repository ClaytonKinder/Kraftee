(function () {
  'use strict';
  angular
    .module('cart')
    .factory('CartService', function ($http, $q, $rootScope) {
      var url = 'https://samtinyserver.herokuapp.com/collections/krafteekart';

      var addToCart = function(product){
        $(event.target).children().children().fadeIn(350).fadeOut(350);
        $http.post(url, product).success(function(response){
         $rootScope.$broadcast('item:created');
        }).error(function(error){
         console.log("error " + error);
        })
      };

      var deleteFromCart = function(productId) {
        var deleteUrl = url + '/' + productId;
        $http.delete(deleteUrl).success(function(response){
         $rootScope.$broadcast('item:deleted');
        }).error(function(error){
         console.log("error " + error);
        })
      };

      var getCart = function(){
        return $http.get(url).then(function(cart){
         var cartArray = cart.data;
         return cartArray;
        });
      };

      var getCartLength = function() {
        $http.get(url).success(function(cart) {
          return cart.length;
        })
      };

      return {
        addToCart: addToCart,
        deleteFromCart: deleteFromCart,
        getCart: getCart,
        getCartLength: getCartLength
      };
    });
})();
