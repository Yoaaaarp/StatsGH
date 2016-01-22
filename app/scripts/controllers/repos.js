'use strict';

/**
 * @ngdoc function
 * @name statsGhApp.controller:ReposCtrl
 * @description
 * # ReposCtrl
 * Controller of the statsGhApp
 */
angular.module('statsGhApp')
  .controller('ReposCtrl', ['$location', '$scope', '$http', 'PathConstant',
    function ($location, $scope, $http, PathConstant) {
    var urlData = $location.search();
    $scope.username = urlData['name'];
    $scope.reposName = urlData['id'];
    $scope.creator = urlData['creator'];
      $scope.commitChart = {};

    // verification de la présence des informations nécessaires pour la suite
    if ($scope.username && $scope.reposName && $scope.creator){
      $http.get(PathConstant.API_URL + 'repos/' + $scope.creator + '/' + $scope.reposName + '?client_id=da2681a10e6107256614&client_secret=35c0f3e7dbe13c02c136be5f8a5d84482a7591de')
        .then(function successCallback(res){
          $scope.repos = res.data;
          // recuperation des contributeurs
          $http.get(PathConstant.API_URL + 'repos/' + $scope.creator + '/' + $scope.reposName + '/contributors?client_id=da2681a10e6107256614&client_secret=35c0f3e7dbe13c02c136be5f8a5d84482a7591de')
            .then(function successCallback(res){
              var tempData = [];
              $scope.commitChart.chartContributorData = [tempData];
              $scope.commitChart.chartContributorLabels = [];
              for (var i = 0; i < res.data.length; i++){
                tempData[i] = res.data[i].contributions;
                $scope.commitChart.chartContributorLabels[i] = res.data[i].login;
              }

            }, function errorCallback(res){
              console.log('fail');
            });
        }, function errorCallback(res){
          console.dir(res);
        });
    }
  }]);
