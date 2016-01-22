'use strict';

/**
 * @ngdoc function
 * @name statsGhApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the statsGhApp
 */
angular.module('statsGhApp')
  .controller('UserCtrl', ['$location','$scope','$http', 'PathConstant', function ($location, $scope, $http, PathConstant) {
    var username = $location.search()['username'];
    $scope.found = 0;
    $scope.nbRepos = 0;
    $scope.errorMsg = '';

    // on récupère les données de GitHub seulement si un utilisateur est renseigné
    if (username){

      $http.get(PathConstant.API_URL + 'users/' + username + '?client_id=da2681a10e6107256614&client_secret=35c0f3e7dbe13c02c136be5f8a5d84482a7591de')
        .then(function successCallback(res){
          $scope.found = 1;
          $scope.userData = res.data;
          if ($scope.userData.email === null){
            $scope.userData.email = 'none';
          }
          // verification s'il y a des repos a recupérer
          if ($scope.userData.public_repos > 0){
            $http.get(PathConstant.API_URL + 'users/' + username + '/subscriptions?client_id=da2681a10e6107256614&client_secret=35c0f3e7dbe13c02c136be5f8a5d84482a7591de')
              .then(function successCallback(res){
                $scope.reposData = res.data;
                $scope.nbRepos = res.data.length;
              }, function errorCallback(res){
                console.dir(res);
            });
          }
        }, function errorCallback(res){
          console.dir(res);
          $scope.errorMsg = res.status + ' - ' + res.statusText + '\n';
          $scope.errorMsg = $scope.errorMsg + res.message;
      });
    }
  }]);
