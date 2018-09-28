
app=angular.module('starter.authCtrl', ['starter.services'])

.controller('authCtrl', function($scope,$ionicPopup,$state,$ionicModal,$localStorage,$rootScope,$todo,$window,$location,$preLoader,$http) {

 

  $scope.doRefresh = function() {
    $preLoader.show();
    $window.location.reload(true);
  }
  $scope.init = function() {
    $scope.passcode = "";
  }

  $scope.add = function(value) {
    if($scope.passcode.length < 4) {
      $scope.passcode = $scope.passcode + value;
      if($scope.passcode.length == 4) {
          $timeout(function() {
              console.log("The four digit code was entered");
          }, 500);
      }
  }
  }

  $scope.delete = function() {
    if($scope.passcode.length > 0) {
      $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
  }
  }
  
});
