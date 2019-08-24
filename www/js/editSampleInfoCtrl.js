app = angular.module('starter.editSampleInfoCtrl', ['starter.services'])
  .controller('editSampleInfoCtrl', function ($scope, $http, $timeout, $stateParams, $cordovaToast, $location, $window, ionicDatePicker, $ionicPopup, $preLoader, $localStorage, $cordovaGeolocation, $window, $filter, $cordovaNetwork) {
    $scope.qcSampleInfo = {};  

    $scope.qcSampleInfo = JSON.parse(localStorage.getItem('viewSampleInfo'));
    if ($scope.qcSampleInfo.available == 'yes') {
      $scope.qcSampleInfo.available = true;
    } else {
      $scope.qcSampleInfo.available = false;
    }
    $(document).ready(function () {

      if (!localStorage.getItem('Samplecounter')) {
        $scope.Samplecounter = 0;
        localStorage.setItem('Samplecounter', $scope.Samplecounter);
      }
    });
    $scope.doRefresh = function () {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();

    }

    $scope.updateSampleInfo = function () {
      $preLoader.show();

      $scope.index = $scope.qcSampleInfo.index;
      $scope.qcSampleInfo.qcSampleId = $scope.qcSampleInfo.qcSampleNo
    
      if ($scope.qcSampleInfo.available == true) {
        $scope.qcSampleInfo.available = 'yes';
      } else {
        $scope.qcSampleInfo.available = 'no';
      }
      $scope.chkSampleInfo = JSON.parse(localStorage.getItem('SampleIdInfo'))
      $scope.chkSampleInfo[$scope.index] = $scope.qcSampleInfo;

      localStorage.setItem('SampleIdInfo', JSON.stringify($scope.chkSampleInfo));
      $scope.qcSampleInfo = {};

      // Hide toast during debugging
      $cordovaToast.show('Edited Successfully', 'long', 'center')
        .then(function (success) {
          // success
        }, function (error) {
          // error
        });

      $location.path('/app/addQcSettings');
      $preLoader.hide();

    }
  })

  .filter('underscorefilter', function () {
    return function (input) {
      return input.replace(/_/g, ' ');
    };
  });
