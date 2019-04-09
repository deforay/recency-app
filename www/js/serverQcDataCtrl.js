app = angular.module('starter.serverQcDataCtrl', ['starter.services'])

  .controller('serverQcDataCtrl', function ($scope, $rootScope, $cordovaToast, $localStorage, $http, $preLoader, $ionicPopup, $location, $window, $stateParams) {




    $scope.$on("$ionicView.beforeEnter", function (event, data) {
      $rootScope.apiUrl = localStorage.getItem('apiUrl');
      var lastQCDatas = localStorage.getItem('lastTenQcData');
      $scope.propertyName = 'qc_test_date';

      if (lastQCDatas != null) {
        lastQCDatas = JSON.parse(lastQCDatas);
        var result = Object.keys(lastQCDatas).map(function (key, value) {
          return [(key), lastQCDatas[value]];
        });

        $scope.lastQCDatas = [];
        for (i = 0; i < result.length; i++) {
          $scope.lastQCDatas.push(result[i][1])
        }
        $scope.displaymessage = false;
      } else {
        $scope.displaymessage = true;

      }
    });

    $scope.init = function () {
      $rootScope.apiUrl = localStorage.getItem('apiUrl');
      var lastQCDatas = localStorage.getItem('lastTenQcData');
      $scope.propertyName = 'qc_test_date';

      if (lastQCDatas != null) {
        lastQCDatas = JSON.parse(lastQCDatas);
        var result = Object.keys(lastQCDatas).map(function (key, value) {
          return [(key), lastQCDatas[value]];
        });

        $scope.lastQCDatas = [];
        for (i = 0; i < result.length; i++) {
          $scope.lastQCDatas.push(result[i][1])
        }
        $scope.displaymessage = false;
      } else {
        $scope.displaymessage = true;

      }
    }
    $scope.init();
    $scope.doRefresh = function () {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
    }

    $scope.sortByDate = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;


      $scope.propertyName = propertyName;
    };
    $scope.sortBy = function (propertyName, propertyName1) {

      $scope.reverse = ($scope.propertyName === propertyName && $scope.propertyName1 === propertyName1) ? !$scope.reverse : false;

      $scope.propertyName = propertyName;
      $scope.propertyName1 = propertyName1;

    }
  })


  .filter('replace', [function () {

    return function (input, from, to) {

      if (input === undefined) {
        return;
      }

      var regex = new RegExp(from, 'g');
      input.replace(regex, to);
      return input.replace(regex, to);
    };
  }]);
