'use strict';

/**
 * @ngdoc overview
 * @name statsGhApp
 * @description
 * # statsGhApp
 *
 * Main module of the application.
 */
angular
  .module('statsGhApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'chart.js'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'UserCtrl',
        controllerAs: 'user'
      })
      .when('/repos', {
        templateUrl: 'views/repos.html',
        controller: 'ReposCtrl',
        controllerAs: 'repos'
      })
      .otherwise({
        redirectTo: '/'
      });
  }) // API accessible via https a l'adresse suivante
  .constant('PathConstant', {
    'API_URL':'https://api.github.com/'
  }) // on explicite le fait que l'on souhaite utiliser la version 3 de l'API
  .run(['$http', function ($http) {
    $http.defaults.headers.common['Accept'] = 'application/vnd.github.v3+json';
  }]);
