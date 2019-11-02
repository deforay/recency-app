app = angular.module('starter.viewQcAssuranceCtrl', ['starter.services'])

  .controller('viewQcAssuranceCtrl', function ($scope, $rootScope, $http, $q, $preLoader, $ionicPopup, $cordovaToast, $location, $window, $stateParams, $ionicPlatform, $cordovaLocalNotification, $cordovaBadge, $syncDataLimit) {

    $scope.syncDataLimit = $syncDataLimit.setSyncDataLimit();




    $scope.onLoadQc = function () {

      $rootScope.apiUrl = localStorage.getItem('apiUrl');
      var QCDataList = localStorage.getItem('QCData');
      $scope.NewQcDataList = [];
      $scope.NewQcObj = [];
      $scope.limitTo = 2;
      if (QCDataList != null) {
        QCDataList = JSON.parse(QCDataList);
        var unSyncQcCount = Object.keys(QCDataList).length;
        if ($rootScope.qcUnsynCount != undefined) {} else {
          $rootScope.qcUnsynCount = '(' + unSyncQcCount + ')';
        }
        var result = Object.keys(QCDataList).map(function (key, value) {
          return [(key), QCDataList[value]];
        });
        $scope.QCDataList = [];
        for (i = 0; i < result.length; i++) {
          $scope.QCDataList.push(result[i][1])
        }
        $scope.displaymessage = false;
        var qclen = $scope.QCDataList.length
      } else {
        $rootScope.qcUnsynCount = "";
        $scope.syncQcCount = localStorage.getItem('syncQcCount');
        if ($scope.syncQcCount == undefined || $scope.syncQcCount == "") {
          $scope.syncQcCount = 0;
        }
        $scope.displaymessage = true;
      }
    }

    $scope.$on("$ionicView.beforeEnter", function (event, data) {
      $rootScope.apiUrl = localStorage.getItem('apiUrl');
      var QCDataList = localStorage.getItem('QCData');
      $scope.NewQcDataList = [];
      $scope.NewQcObj = [];
      $scope.limitTo = 2;
      if (QCDataList != null) {
        QCDataList = JSON.parse(QCDataList);

        var unSyncQcCount = Object.keys(QCDataList).length;
        if ($rootScope.qcUnsynCount != undefined) {

        } else {
          $rootScope.qcUnsynCount = '(' + unSyncQcCount + ')';
        }
        var result = Object.keys(QCDataList).map(function (key, value) {
          return [(key), QCDataList[value]];
        });
        $scope.QCDataList = [];
        for (i = 0; i < result.length; i++) {
          $scope.QCDataList.push(result[i][1])
        }
        $scope.displaymessage = false;
        var qclen = $scope.QCDataList.length

      } else {
        $rootScope.qcUnsynCount = "";
        $scope.syncQcCount = localStorage.getItem('syncQcCount');
        if ($scope.syncQcCount == undefined || $scope.syncQcCount == "") {
          $scope.syncQcCount = 0;

        }
        $scope.displaymessage = true;
      }
    });
    var qcdatas = $scope.QCDataList;



    $scope.$on("$ionicView.Enter", function (event, data) {});

    $scope.doRefresh = function () {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
    }

    $scope.syncnow = function () {
      if ($scope.displaymessage == true) {
        $ionicPopup.alert({
          title: 'Alert!',
          template: '<center>There are no records to sync.</center>'
        });
      } else {
    
      
        $scope.QCDataList.forEach(function (element) {
          element.syncedBy = localStorage.getItem('userId');
          var currentdatetime = new Date();
          element.formTransferDateTime = currentdatetime.getFullYear() + "-" +
            (currentdatetime.getMonth() + 1) + "-" +
            currentdatetime.getDate() + " " +
            currentdatetime.getHours() + ":" +
            currentdatetime.getMinutes() + ":" +
            currentdatetime.getSeconds();
        });
        console.log($scope.QCDataList);
        $scope.copyQCDataList = Array.from($scope.QCDataList);


        let x = $scope.syncDataLimit;
        let y = $scope.copyQCDataList.length;
        let quotient = Math.floor(y / x);
        let remainder = (y % x);
        if (remainder < x && remainder != 0) {
          $scope.addOne = 1;
        } else {
          $scope.addOne = 0;
        }
        let iterationLength = quotient + $scope.addOne;
        console.log(iterationLength);


        for (let m = 0, p = Promise.resolve(); m < iterationLength; m++) {
          p = p.then(_ => new Promise(resolve =>
            setTimeout(function () {
              $scope.slicedQCDataList = $scope.copyQCDataList.splice(0, $scope.syncDataLimit);
              $preLoader.show();

              $http.post($rootScope.apiUrl + "/api/quality-check", {
                  "qc": $scope.slicedQCDataList
                })
                .success(function (data) {
                  if (data.status == 'failed') {
                    $preLoader.hide();
                    $ionicPopup.alert({
                      title: 'Failed',
                      template: data.message
                    });
                  } else {
                    $scope.response = data.syncData.response;
                    $scope.syncQcCount = data.syncCount.response[0].Total;
                    $scope.tenRecord = data.syncCount.tenRecord;
                    localStorage.setItem('lastTenQcData', JSON.stringify($scope.tenRecord))
                    localStorage.setItem('syncQcCount', $scope.syncQcCount)
                    var responselen = $scope.response.length;
                    var currentdate = new Date();

                    for (i = 0; i < $scope.response.length; i++) {
                      if ($scope.response[i] == 'fail') {
                        $scope.copyQCDataList.push($scope.slicedQCDataList[i]);
                      }
                    }

                    if ($scope.copyQCDataList.length == 0) {
                      localStorage.setItem('QCData', ($scope.copyQCDataList));
                    } else {
                      localStorage.setItem('QCData', JSON.stringify($scope.copyQCDataList));
                    }
                    if (localStorage.getItem('QCData') == "") {
                      localStorage.removeItem('QCData');
                      localStorage.removeItem('QcStartDate');
                      localStorage.removeItem('QcAlertDate');
                    }
                    localStorage.setItem('qccounter', $scope.copyQCDataList.length);
                    $scope.QCDataList = $scope.copyQCDataList;
                    $preLoader.hide();
                    if (m == (iterationLength-1)) {
                      localStorage.setItem('LastTesterName', $scope.slicedQCDataList[responselen - 1].testerName)
                      localStorage.setItem('LastTestDate', currentdate);
                    // Hide Toast during Debugging
                    // $cordovaToast.show('Data has been Successfully Synced', 'long', 'bottom')
                    //   .then(function (success) {
                    //     // success
                    //   }, function (error) {
                    //     // error
                    //   });
                      $scope.onLoadQc();
                    }
                  }
                })
                .error(function (data) {
                  $preLoader.hide();
                  $ionicPopup.alert({
                    title: data.response
                  });
                });
              resolve();
            }, Math.random() * 1000)
          ));
        }
      }
    }

    $scope.viewqc = function (viewqc, index) {

      $rootScope.viewqcDetail = viewqc;
      viewqc.index = index;
      localStorage.setItem('viewQcAssurance', JSON.stringify(viewqc));
      $window.location.href = '#/app/viewQcAssuranceDetail/' + viewqc.qcsampleId;

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
