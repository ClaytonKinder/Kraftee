(function () {
  'use strict';
  angular
    .module('likes')
    .factory('LikesService', function ($http, $q, $cacheFactory) {
      var url = 'http://tiy-fee-rest.herokuapp.com/collections/instaflickr';
      var addLike = function (photo) {
        $http.post(url, photo).success(function (resp) {

        }).error(function (err) {
          console.log(err);
        });
      };
      var getLikes = function () {
        return $http.get(url);
      };

      return {
        addLike: addLike,
        getLikes: getLikes
      };
    });

})();
