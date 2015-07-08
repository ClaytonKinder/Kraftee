(function () {
  'use strict';
  angular
    .module('photos', [
      'ngRoute'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        .when('/photos', {
          templateUrl: 'photos/views/list.html',
          controller: 'PhotoController'
        })
        .when('/photos/:photoId', {
          templateUrl: 'photos/views/detail.html',
          controller: 'PhotoController'
        });
    });
})();
