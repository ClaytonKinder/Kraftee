(function () {
  'use strict';
  angular
    .module('kraftee')
    .factory('ProductService', function ($http, _) {
      var urlOpts = {
        baseUrl: 'https://openapi.etsy.com/v2/listings/',
        apiKey: 'if03omqbsv80nvtqotastjk2',
        buildUrl: function () {
          var url = this.baseUrl + 'active.js?includes=MainImage&api_key=' + this.apiKey + '&callback=JSON_CALLBACK';
          return url;
        }
      };

      var mapData = function(collection) {
        console.log(collection);
       return _.map(collection, function(obj){
         return {
           img: obj.MainImage.url_fullxfull,
           title: obj.title,
           id: obj.listing_id,
           description: obj.description,
           url: obj.url,
           materials: obj.materials,
           price: obj.price
         }
       });
     }

      // build image url in object with title, id, date
      var getProducts = function () {
        return $http.jsonp(urlOpts.buildUrl()).then(function (products) {
           var productsArray = products.data.results;
           return mapData(productsArray);
        });
      };

      var getProduct = function(id) {
        return $http.jsonp(urlOpts.buildUrl()).then(function (products) {
          var narrowedDownArr = _.where(products.data.results, {listing_id: Number(id)});
          return mapData(narrowedDownArr)[0];
        });
      }

      return {
        getProducts: getProducts,
        getProduct: getProduct
      };
    })
    .factory('CartService', function ($http) {
      var url = 'http://tiy-fee-rest.herokuapp.com/collections/krafteekart';
      var addToCart = function (product) {
      $http.post(url, product).success(function (resp) {
          console.log(resp);
        }).error(function (err) {
          console.log(err);
        });
      };
      var deleteFromCart = function(productId) {
        var deleteUrl = url + '/' + productId;
        $http.delete(deleteUrl).success(function (resp) {
            console.log(resp);
          }).error(function (err) {
            console.log(err);
          });
      };
      var getCart = function () {
        return $http.get(url);
      };

      var getCartLength = function() {
        $http.get(url).success(function(cart) {
          return cart.length;
        })
      }

      return {
        addToCart: addToCart,
        deleteFromCart: deleteFromCart,
        getCart: getCart,
        getCartLength: getCartLength
      };
    });

})();
