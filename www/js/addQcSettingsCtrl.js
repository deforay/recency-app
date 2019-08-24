app = angular.module('starter.addQcSettingsCtrl', ['starter.services'])
  .controller('addQcSettingsCtrl', function ($scope, $http, $timeout, $stateParams, $cordovaToast, ionicDatePicker, $ionicPopup, $preLoader, $localStorage, $cordovaGeolocation, $window, $filter, $cordovaNetwork) {
    $scope.qcTester = {};
    $scope.qcSample = {};
    $scope.qcLotObj = {};
    $scope.TesterListData = {};
    $scope.LotListData = {};
    $scope.qcTesterInfo = {};
    $scope.qcLotInfo = {};
    $scope.qcSampleInfo = {};

    $scope.qcsettingsdisplay = 0;

    $("#main-addqcsetting").addClass("active");


    //This event will trigger when the view is about to enter and become the active view.

    $scope.$on("$ionicView.beforeEnter", function (event, data) {

      $scope.qcsettingsdisplay = 0;
      $("#main-addqcsetting").addClass("active");
      $("#other-addqcsetting").removeClass("active");
      if (!localStorage.getItem('Testercounter')) {
        $scope.Testercounter = 0;
        localStorage.setItem('Testercounter', $scope.Testercounter);
      }
      if (!localStorage.getItem('Lotcounter')) {
        $scope.Lotcounter = 0;
        localStorage.setItem('Lotcounter', $scope.Lotcounter);
      }
      if (!localStorage.getItem('Samplecounter')) {
        $scope.Samplecounter = 0;
        localStorage.setItem('Samplecounter', $scope.Samplecounter);
      }
      var TesterInfoList = localStorage.getItem('TesterInfo');

      if (TesterInfoList == null || TesterInfoList.length == 0) {
        $scope.isVisibleTester = true;
      } else {
        TesterInfoList = JSON.parse(TesterInfoList);
        $scope.isVisibleTester = false;
        $scope.TesterInfoList = TesterInfoList;
      }
      var LotInfoList = localStorage.getItem('LotInfo');
      if (LotInfoList == null || LotInfoList == "") {
        $scope.isVisibleLot = true;
      } else {
        LotInfoList = JSON.parse(LotInfoList);
        $scope.LotInfoList = LotInfoList;

        $scope.isVisibleLot = false;
      }
      var SampleInfoList = localStorage.getItem('SampleIdInfo');
      if (SampleInfoList == null || SampleInfoList == "") {
        $scope.isVisibleSample = true;
      } else {
        SampleInfoList = JSON.parse(SampleInfoList);
        $scope.SampleInfoList = SampleInfoList;

        $scope.isVisibleSample = false;
      }
    });


    $scope.displayQcSettings = function () {

      
      var TesterInfoList = localStorage.getItem('TesterInfo');

      if (TesterInfoList == null || TesterInfoList.length == 0) {
        $scope.isVisibleTester = true;
      } else {
        TesterInfoList = JSON.parse(TesterInfoList);
        $scope.isVisibleTester = false;
        $scope.TesterInfoList = TesterInfoList;
      }
      var LotInfoList = localStorage.getItem('LotInfo');
      if (LotInfoList == null || LotInfoList == "") {
        $scope.isVisibleLot = true;
      } else {
        LotInfoList = JSON.parse(LotInfoList);
        $scope.LotInfoList = LotInfoList;

        $scope.isVisibleLot = false;
      }
      var SampleInfoList = localStorage.getItem('SampleIdInfo');
      if (SampleInfoList == null || SampleInfoList == "") {
        $scope.isVisibleSample = true;
      } else {
        SampleInfoList = JSON.parse(SampleInfoList);
        $scope.SampleInfoList = SampleInfoList;

        $scope.isVisibleSample = false;
      }
    };
    $scope.displayQcSettings();

    $scope.testerinit = function () {
      $("#main-addqcsetting").addClass("active");
      $scope.qcTester.testerName = "";
      $scope.qcTester.available = true;
      $scope.qcLotObj.testKitManufacturer = "";
      $scope.qcLotObj.testKitManufacturerName = "";
      $scope.qcLotObj.testKitLotNo = "";
      $scope.qcLotObj.LotNumber = "";
      $scope.qcLotObj.testKitExpDate = "";
      $scope.qcLotObj.available = true;
      $scope.qcLotObj.isLocal = true;
      $scope.qcSample.qcSampleId = "";
      $scope.qcSample.qcSampleNo = "";
      $scope.qcSample.qcSampleStatus = "active";
      $scope.qcSample.available = true;
      $scope.qcSample.isLocal = true;
    }
    $scope.testerinit();

    $scope.setmainactive = function () {
      $scope.qcsettingsdisplay = 0;
      if ($("#main-addqcsetting").hasClass('active')) {} else {
        $("#main-addqcsetting").addClass('active')
        $("#other-addqcsetting").removeClass('active')
        $("#sample-addqcsetting").removeClass('active')
      }
    }

    $scope.setothersactive = function () {
      $scope.qcsettingsdisplay = 1;
      if ($("#other-addqcsetting").hasClass('active')) {} else {
        $("#other-addqcsetting").addClass('active')
        $("#main-addqcsetting").removeClass('active')
        $("#sample-addqcsetting").removeClass('active')
      }
    }
  $scope.setsampleactive = function(){
    $scope.qcsettingsdisplay = 2;
    if ($("#sample-addqcsetting").hasClass('active')) {} else {
      $("#sample-addqcsetting").addClass('active')
      $("#main-addqcsetting").removeClass('active')
      $("#other-addqcsetting").removeClass('active')
    }
  }
    $scope.doRefresh = function () {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();

    }
// Tester Information
    $scope.addTesterName = function () {
      if ($scope.qcTester.available == true) {
        $scope.qcTester.available = 'yes';
      } else {
        $scope.qcTester.available = 'no';
      }
      $scope.qcTester.label = $scope.qcTester.testerName;
      var count = localStorage.getItem('Testercounter');
      $scope.Testercounter = parseInt(count) + 1;

      var qcTester = $scope.qcTester;
      $preLoader.show();
      if (localStorage.getItem('TesterInfo') == null || (localStorage.getItem('TesterInfo')) == "") {} else {
        $scope.TesterListData = JSON.parse(localStorage.getItem('TesterInfo'));
      }

      $scope.TesterListData[$scope.Testercounter - 1] = qcTester;
      localStorage.setItem('TesterInfo', JSON.stringify($scope.TesterListData))
      localStorage.setItem('Testercounter', $scope.Testercounter);
      $scope.qcTester.testerName = "";
      $scope.qcTester.available = true;
      $scope.qcsettingsdisplay = 0;

      //Hide Toast During Debug mode
      $cordovaToast.show('Data Has Been Saved Successfully', 'long', 'center')
        .then(function (success) {
          // success
        }, function (error) {
          // error
        });
      $("#main-addqcsetting").addClass("active");
      $("#other-addqcsetting").removeClass('active')
      $("#sample-addqcsetting").removeClass('active')
      $scope.displayQcSettings();
      $preLoader.hide();
    }

    $scope.editTesterInfo = function (qc, index) {
      qc.index = index;
      $scope.qcTesterInfo = qc;
      localStorage.setItem('viewTesterInfo', JSON.stringify(qc));
      $window.location.href = '#/app/editTesterInfo/' + qc.testerName;

    }
 

    $scope.deleteTesterInfo = function (qc, index) {
      $preLoader.show();
      $scope.testinfo = [];
      qc.index = index;
      $scope.qcTesterObj = JSON.parse(localStorage.getItem('TesterInfo'));
      for (i = 0; i < Object.keys($scope.qcTesterObj).length; i++) {
        $scope.testinfo.push({
          "testerName": $scope.qcTesterObj[i].testerName,
          "available": $scope.qcTesterObj[i].available,
          "label": $scope.qcTesterObj[i].label
        });
      }
      $scope.testinfo.splice(index, 1);
      if ($scope.testinfo.length == 0) {
        localStorage.setItem('TesterInfo', '');

        localStorage.setItem('Testercounter', JSON.stringify($scope.testinfo.length));
        $scope.testinfo = "";
      } else {
        localStorage.setItem('TesterInfo', JSON.stringify($scope.testinfo));
        localStorage.setItem('Testercounter', JSON.stringify($scope.testinfo.length));
      }

      $scope.TesterInfoList = [];
      $scope.displayQcSettings();
      //Hide Toast During Debug mode
      $cordovaToast.show('Deleted Successfully', 'long', 'center')
        .then(function (success) {
          // success
        }, function (error) {
          // error
        });
      $preLoader.hide();
    }

// Lot Information

$scope.setTestKitExpDate = function (val) {
  var ipObj3 = {
    callback: function (val) {
      var testKitExpDate = new Date(val);
      $scope.qcLotObj.testKitExpDate = $filter('date')(testKitExpDate, "dd-MMM-yyyy");
    }
  };
  ionicDatePicker.openDatePicker(ipObj3);
}
$scope.gettestKitManufacturer = function (manufacturer) {
  if (manufacturer == 'SED') {
    $scope.qcLotObj.testKitManufacturerName = "SEDIA Bioscience (SED)";
  } else
  if (manufacturer == 'MAX') {
    $scope.qcLotObj.testKitManufacturerName = "Maxim Biomedical (MAX)";
  } else {
    $scope.qcLotObj.testKitManufacturerName = "";
  }
}
    $scope.addLotInfo = function () {
      if ($scope.qcLotObj.available == true) {
        $scope.qcLotObj.available = 'yes';
      } else {
        $scope.qcLotObj.available = 'no';
      }
      $scope.qcLotObj.label = $scope.qcLotObj.LotNumber;
      if ($scope.qcLotObj.LotNumber != "" && $scope.qcLotObj.testKitManufacturer != "") {
        $scope.qcLotObj.testKitLotNo = $scope.qcLotObj.testKitManufacturer + " - " + $scope.qcLotObj.LotNumber;
      } else {
        $scope.qcLotObj.testKitLotNo = "";
      }
      var lotcount = localStorage.getItem('Lotcounter');
      $scope.Lotcounter = parseInt(lotcount) + 1;
      var qcLotObj = $scope.qcLotObj;
      $preLoader.show();
      if (localStorage.getItem('LotInfo') == null || (localStorage.getItem('LotInfo')) == "") {} else {
        $scope.LotListData = JSON.parse(localStorage.getItem('LotInfo'));
      }

      $scope.LotListData[$scope.Lotcounter - 1] = qcLotObj;
      localStorage.setItem('LotInfo', JSON.stringify($scope.LotListData))
      localStorage.setItem('Lotcounter', $scope.Lotcounter);
      $scope.qcLotObj.testKitLotNo = "";
      $scope.qcLotObj.testKitManufacturer = "";
      $scope.qcLotObj.testKitManufacturerName = "";
      $scope.qcLotObj.LotNumber = "";
      $scope.qcLotObj.testKitExpDate = "";
      $scope.qcLotObj.available = true;
      $scope.qcLotObj.isLocal = true;
      $scope.qcsettingsdisplay = 1;
      $scope.displayQcSettings();
      //Hide Toast During Debug mode
      $cordovaToast.show('Data Has Been Saved Successfully', 'long', 'center')
        .then(function (success) {
          // success/;
        }, function (error) {
          // error
        });
      $("#other-addqcsetting").addClass('active')
      $("#main-addqcsetting").removeClass("active");
      $("#sample-addqcsetting").removeClass('active')
      $preLoader.hide();
    }

    $scope.editLotInfo = function (lotInfo, index) {
      lotInfo.index = index;
      $scope.qcLotInfo = lotInfo;
      localStorage.setItem('viewLotInfo', JSON.stringify(lotInfo));
      $window.location.href = '#/app/editLotInfo/' + lotInfo.testKitLotNo;
    }

    $scope.deleteLotInfo = function (lotInfo, index) {
      $scope.lotinfo = [];
      lotInfo.index = index;
      $scope.lotInfoObj = JSON.parse(localStorage.getItem('LotInfo'));
      for (i = 0; i < Object.keys($scope.lotInfoObj).length; i++) {
        $scope.lotinfo.push({
          "testKitManufacturer": $scope.lotInfoObj[i].testKitManufacturer,
          "testKitManufacturerName": $scope.lotInfoObj[i].testKitManufacturerName,
          "LotNumber": $scope.lotInfoObj[i].LotNumber,
          "testKitLotNo": $scope.lotInfoObj[i].testKitLotNo,
          "testKitExpDate": $scope.lotInfoObj[i].testKitExpDate,
          "available": $scope.lotInfoObj[i].available,
          "label": $scope.lotInfoObj[i].label
        });
      }
      $scope.lotinfo.splice(index, 1);

      if ($scope.lotinfo.length == 0) {
        localStorage.setItem('LotInfo', '');

        localStorage.setItem('Lotcounter', JSON.stringify($scope.lotinfo.length));
        $scope.lotinfo = "";
      } else {
        localStorage.setItem('LotInfo', JSON.stringify($scope.lotinfo));
        localStorage.setItem('Lotcounter', JSON.stringify($scope.lotinfo.length));
      }
      $scope.LotInfoList = [];
      $scope.displayQcSettings();

      //Hide Toast During Debug mode
      $cordovaToast.show('Deleted Successfully', 'long', 'center')
        .then(function (success) {
          // success
        }, function (error) {
          // error
        });

      $preLoader.hide();
      $("#other-addqcsetting").addClass('active')
      $("#main-addqcsetting").removeClass("active");
      $("#sample-addqcsetting").removeClass('active')
    }

// Sample Information
    $scope.addSampleInfo = function(){
      if ($scope.qcSample.available == true) {
        $scope.qcSample.available = 'yes';
      } else {
        $scope.qcSample.available = 'no';
      }
      $scope.qcSample.qcSampleId = $scope.qcSample.qcSampleNo;

      var samplecount = localStorage.getItem('Samplecounter');
      $scope.Samplecounter = parseInt(samplecount) + 1;
      var qcSample  = $scope.qcSample;
      $preLoader.show();
      if (localStorage.getItem('SampleIdInfo') == null || (localStorage.getItem('SampleIdInfo')) == "") {} else {
        $scope.SampleInfoList = JSON.parse(localStorage.getItem('SampleIdInfo'));
      }

      $scope.SampleInfoList[$scope.Samplecounter - 1] = qcSample;
      localStorage.setItem('SampleIdInfo', JSON.stringify($scope.SampleInfoList))
      localStorage.setItem('Samplecounter', $scope.Samplecounter);
      $scope.qcSample.qcSampleId = "";
      $scope.qcSample.qcSampleNo = "";
      $scope.qcSample.available = true;
      $scope.qcSample.isLocal = true;
      $scope.qcsettingsdisplay = 2;
       //Hide Toast During Debug mode
       $cordovaToast.show('Data Has Been Saved Successfully', 'long', 'center')
       .then(function (success) {
         // success
       }, function (error) {
         // error
       });
     $("#sample-addqcsetting").addClass("active");
     $("#main-addqcsetting").removeClass("active");
     $("#other-addqcsetting").removeClass('active')
     $scope.displayQcSettings();
     $preLoader.hide();
    }
    $scope.editSampleInfo = function (SampleInfo, index) {
      SampleInfo.index = index;
      $scope.qcSampleInfo = SampleInfo;
      localStorage.setItem('viewSampleInfo', JSON.stringify(SampleInfo));
      $window.location.href = '#/app/editSampleInfo/' + SampleInfo.qcSampleId;
    }

    $scope.deleteSampleInfo = function (sampleInfo, index) {
      $scope.sampleinfo = [];
      sampleInfo.index = index;
      $scope.sampleInfoObj = JSON.parse(localStorage.getItem('LotInfo'));
      for (i = 0; i < Object.keys($scope.sampleInfoObj).length; i++) {
        $scope.sampleinfo.push({
          "qcSampleId":sampleInfoObj[i].qcSampleId,
          "qcSampleNo": sampleInfoObj[i].qcSampleNo,
          "qcSampleStatus":sampleInfoObj[i].qcSampleStatus,
          "available": 'yes',                  
          "isLocal":false
        });
      }
      $scope.sampleinfo.splice(index, 1);

      if ($scope.sampleinfo.length == 0) {
        localStorage.setItem('SampleIdInfo', '');

        localStorage.setItem('Samplecounter', JSON.stringify($scope.sampleinfo.length));
        $scope.sampleinfo = "";
      } else {
        localStorage.setItem('SampleIdInfo', JSON.stringify($scope.sampleinfo));
        localStorage.setItem('Samplecounter', JSON.stringify($scope.sampleinfo.length));
      }
      $scope.SampleInfoList = [];
      $scope.displayQcSettings();

      //Hide Toast During Debug mode
      $cordovaToast.show('Deleted Successfully', 'long', 'center')
        .then(function (success) {
          // success
        }, function (error) {
          // error
        });

      $preLoader.hide();
      $("#sample-addqcsetting").addClass('active')
      $("#other-addqcsetting").removeClass('active')
      $("#main-addqcsetting").removeClass("active");
    }

  })


  .filter('underscorefilter', function () {
    return function (input) {
      return input.replace(/_/g, ' ');
    };
  });
