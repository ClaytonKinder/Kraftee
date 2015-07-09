(function () {
  'use strict';
  angular
    .module('products')
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
           img: getImage(obj),
           title: cleanCharacters(obj.title),
           id: obj.listing_id,
           description: cleanCharacters(obj.description),
           url: obj.url,
           materials: obj.materials,
           price: obj.price
         }
       });
      }

      var getImage = function(obj) {
        if (obj.MainImage) {
          return obj.MainImage.url_fullxfull;
        } else {
          return "http://www.placehold.it/200x200/96B49C?text=Image+Unavailable";
        }
      }

      // build image url in object with title, id, date
      var getProducts = function () {
        var deferred = $q.defer();
        var cache = cacheEngine.get('products');
        if(cache) {
          deferred.resolve(cache);
        } else {
          $http.jsonp(urlOpts.buildUrl()).then(function (products) {
            var productsArray = products.data.results;
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

    });
})();
