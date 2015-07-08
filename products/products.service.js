(function () {
  'use strict';
  angular
    .module('photos')
    .factory('PhotoService', function ($http, _, moment, $q, $cacheFactory) {
       var cacheEngine = $cacheFactory('AwesomePhotos');
        var urlOpts = {
          baseUrl: 'https://api.flickr.com/services/rest/?',
          apiKey: '79fb5d98470867ae3cd196873299538d',
          method: 'flickr.interestingness.getList',
          format: 'json',
          buildUrl: function () {
            return this.baseUrl + 'method=' + this.method + '&api_key=' + this.apiKey + '&format=' + this.format + '&extras=date_upload&nojsoncallback=1';
          }
        };
        var buildImgUrl = function (obj) {
          return 'https://farm' + obj.farm + '.staticflickr.com/' + obj.server + '/' + obj.id + '_' + obj.secret + '_z.jpg';
        };
        var mapDataToUrls = function (collection) {
          return _.map(collection, function (obj) {
            return {image: buildImgUrl(obj), title: obj.title, id: obj.id, dt: moment.unix(obj.dateupload).fromNow() };
          });
        };
// build image url in object with title, id, date
        var getPhotos = function () {
          var deferred = $q.defer();
          var cache = cacheEngine.get('photos');
          if(cache) {
            console.log('we are in our cache');
            deferred.resolve(cache);
          } else {
            $http.get(urlOpts.buildUrl()).then(function (photos) {
              var flickrArray = photos.data.photos.photo;
              console.log('we are in our http method');
              cacheEngine.put('photos', mapDataToUrls(flickrArray));
               deferred.resolve(mapDataToUrls(flickrArray));
            });
          }
          return deferred.promise;
        };

        var getPhoto = function (id) {
          var deferred = $q.defer();
          var cache = cacheEngine.get('photos');
          if(cache) {
            console.log('single photo cache');
            deferred.resolve(_.where(cache, {id: id})[0]);
          } else {
            $http.get(urlOpts.buildUrl()).then(function (photos) {
              var narrowedDownArr = _.where(photos.data.photos.photo, {id: id});
                deferred.resolve(mapDataToUrls(narrowedDownArr)[0]);
            });
          }
          return deferred.promise;
        };

        return {
          getPhotos: getPhotos,
          getPhoto: getPhoto
        };
    });

})();
