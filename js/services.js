(function () {
  'use strict';
  angular
    .module('kraftee')
    .factory('ProductService', function ($http, _, $q, $cacheFactory) {
      var cacheEngine = $cacheFactory('MyProducts');
      var urlOpts = {
        baseUrl: 'https://openapi.etsy.com/v2/listings/',
        apiKey: 'if03omqbsv80nvtqotastjk2',
        buildUrl: function () {
          var url = this.baseUrl + 'active.js?includes=MainImage&api_key=' + this.apiKey + '&callback=JSON_CALLBACK';
          return url;
        }
      };

      var mapData = function(collection) {
       return _.map(collection, function(obj){
         return {
           img: obj.MainImage.url_fullxfull,
           title: cleanCharacters(obj.title),
           id: obj.listing_id,
           description: cleanCharacters(obj.description),
           url: obj.url,
           materials: obj.materials,
           price: obj.price
         }
       });
      }

      // build image url in object with title, id, date
      var getProducts = function () {
        var deferred = $q.defer();
        var cache = cacheEngine.get('products');
        if(cache) {
          console.log('we are in our cache');
          deferred.resolve(cache);
        } else {
          $http.jsonp(urlOpts.buildUrl()).then(function (products) {
            var productsArray = products.data.results;
            console.log('we are in our http method');
            cacheEngine.put('products', mapData(productsArray));
            deferred.resolve(mapData(productsArray));
          });
        }
        return deferred.promise;
      };

      var getProduct = function(id) {
        var deferred = $q.defer();
        var cache = cacheEngine.get('product');
        if(cache) {
          console.log('single photo cache');
          deferred.resolve(_.where(cache, {id: id})[0]);
        } else {
          $http.jsonp(urlOpts.buildUrl()).then(function (products) {
             var narrowedDownArr = _.where(products.data.results, {listing_id: Number(id)});
             deferred.resolve(mapData(narrowedDownArr)[0]);
          });
        }
        return deferred.promise;
      };

      var cleanCharacters = function(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
      };

      return {
        getProducts: getProducts,
        getProduct: getProduct,
        cleanCharacters: cleanCharacters
      };
    })
    .factory('CartService', function ($http, $q, $rootScope) {
      var url = 'http://tiy-fee-rest.herokuapp.com/collections/kraftee-kart';

      var addToCart = function(product){
        $http.post(url, product).success(function(response){
         $rootScope.$broadcast('item:created');
        }).error(function(error){
         console.log("error " + error);
        })
      };

      var deleteFromCart = function(productId) {
        var deleteUrl = url + '/' + productId;
        // $http.delete(deleteUrl).success(function (resp) {
        //     console.log(resp);
        //   }).error(function (err) {
        //     console.log(err);
        //   });

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
