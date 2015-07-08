(function () {
  'use strict';
  angular
    .module('likes', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/likes', {
          templateUrl: 'likes/views/list.html',
          controller: 'LikesController'
        });
    });

})();
