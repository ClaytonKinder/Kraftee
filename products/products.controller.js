(function () {
  'use strict';
  angular
    .module('photos')
    .controller('PhotoController', function ($scope, PhotoService, $routeParams) {
      PhotoService.getPhotos().then(function (photos) {

        $scope.photos = photos;
      });
      if($routeParams.photoId) {
      PhotoService.getPhoto($routeParams.photoId).then(function (photo) {
        $scope.photo = photo;
      });
      }

    });
})();
