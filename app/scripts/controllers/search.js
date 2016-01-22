'use strict';

/**
 * @ngdoc function
 * @name statsGhApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the statsGhApp
 */
angular.module('statsGhApp')
  .controller('SearchCtrl',['$scope', '$location', function ($scope, $location) {
    // Ajoute le paramètre 'username'=:username à l'url avec :username étant
    // le contenu du formulaire de la navbar après redirection vers la vue 'user'
    $scope.search = function(username){
      $location.path('/user/').search('username', username);
    };
  }]);
