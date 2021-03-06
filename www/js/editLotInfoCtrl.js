app = angular.module('starter.editLotInfoCtrl', ['starter.services'])
  .controller('editLotInfoCtrl', function ($scope, $http, $timeout, $stateParams, $cordovaToast, $location, $window, ionicDatePicker, $ionicPopup, $preLoader, $localStorage, $cordovaGeolocation, $window, $filter, $cordovaNetwork) {
    $scope.qcLotKit = {};

    //$scope.TesterListData = {};

    $scope.qcLotKit = JSON.parse(localStorage.getItem('viewLotInfo'));
    if ($scope.qcLotKit.available == 'yes') {
      $scope.qcLotKit.available = true;
    } else {
      $scope.qcLotKit.available = false;
    }
    $(document).ready(function () {

      if (!localStorage.getItem('Lotcounter')) {
        $scope.Lotcounter = 0;
        localStorage.setItem('Lotcounter', $scope.Lotcounter);
      }
    });
    $scope.doRefresh = function () {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();

    }
    // $scope.editTesterInfo = function (qc) {
    //   $scope.qcTesterInfo = qc;

    //   if (qc.available == 'yes') {
    //     $scope.qcTesterInfo.isavailable = true;
    //   } else {
    //     $scope.qcTesterInfo.isavailable = false;
    //   }
    // }

    $scope.setTestKitExpDate = function (val) {
      var ipObj3 = {
        callback: function (val) {
          var testKitExpDate = new Date(val);

          $scope.qcLotKit.testKitExpDate = $filter('date')(testKitExpDate, "dd-MMM-yyyy");
        }

      };
      ionicDatePicker.openDatePicker(ipObj3);
    }
    $scope.gettestKitManufacturer = function (manufacturer) {
      if (manufacturer == 'SED') {
        $scope.qcLotKit.testKitManufacturerName = "SEDIA Bioscience (SED)";
      } else
      if (manufacturer == 'MAX') {
        $scope.qcLotKit.testKitManufacturerName = "Maxim Biomedical (MAX)";
      } else {
        $scope.qcLotKit.testKitManufacturerName = "";
      }
    }
    $scope.updateLotKit = function () {
      $preLoader.show();

      $scope.index = $scope.qcLotKit.index;
      $scope.qcLotKit.label = $scope.qcLotKit.LotNumber
      if ($scope.qcLotKit.LotNumber != "" && $scope.qcLotKit.testKitManufacturer != "") {
        $scope.qcLotKit.testKitLotNo = $scope.qcLotKit.testKitManufacturer + " - " + $scope.qcLotKit.LotNumber;
      } else {
        $scope.qcLotKit.testKitLotNo = "";
      }
      if ($scope.qcLotKit.available == true) {
        $scope.qcLotKit.available = 'yes';
      } else {
        $scope.qcLotKit.available = 'no';
      }
      $scope.chkLotInfo = JSON.parse(localStorage.getItem('LotInfo'))
      $scope.chkLotInfo[$scope.index] = $scope.qcLotKit;

      localStorage.setItem('LotInfo', JSON.stringify($scope.chkLotInfo));
      $scope.qcLotKit = {};

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
