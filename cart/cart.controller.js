(function () {
  'use strict';
  angular
    .module('likes')
    .controller('LikesController', function ($scope, LikesService, $location) {

    if($location.url() === '/likes') {
      LikesService.getLikes().success(function (likes) {
        $scope.likes = likes;
      });
    }

      $scope.addLike = function (photo) {
        LikesService.addLike(photo);
      };


    });

})();
