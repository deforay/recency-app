app = angular.module('starter.viewQcAssuranceCtrl', ['starter.services'])

  .controller('viewQcAssuranceCtrl', function ($scope, $rootScope, $http, $q, $preLoader, $ionicPopup, $cordovaToast, $location, $window, $stateParams, $ionicPlatform, $cordovaLocalNotification, $cordovaBadge, $syncDataLimit, $secretKey) {


    $scope.onLoadQc = function () {
      $scope.secretKey = $secretKey.getSecretKey();
      $rootScope.apiUrl = localStorage.getItem('apiUrl');
      var QCDataList = localStorage.getItem('QCData');
      $scope.syncDataLimit = $syncDataLimit.setSyncDataLimit();

      $scope.NewQcDataList = [];
      $scope.NewQcObj = [];
      $scope.QCDataDecrypt = [];
      $scope.QCEncrypt = [];

      if (QCDataList != null) {
        QCDataList = JSON.parse(QCDataList);
        //  var unSyncQcCount = Object.keys(QCDataList).length;
        // if ($rootScope.qcUnsynCount != undefined) {

        // } else {
        //   $rootScope.qcUnsynCount = '(' + unSyncQcCount + ')';
        // }
        // var result = Object.keys(QCDataList).map(function (key, value) {
        //   return [(key), QCDataList[value]];
        // });
        // $scope.QCDataList = [];
        // for (i = 0; i < result.length; i++) {
        //   $scope.QCDataList.push(result[i][1])
        // }
        for (i = 0; i < Object.keys(QCDataList).length; i++) {
          $scope.decryptedData = {};
          if(QCDataList[i].unique_id || QCDataList[i].appVersion){
            console.log(QCDataList[i])
            $scope.QCDataDecrypt.push(QCDataList[i]);
          }else{
            $scope.decryptedData = JSON.parse(CryptoJS.AES.decrypt(QCDataList[i], $scope.secretKey, {
              format: CryptoJSAesJson
            }).toString(CryptoJS.enc.Utf8));
            $scope.QCDataDecrypt.push($scope.decryptedData);
          }
        }

        $scope.QCDataList = $scope.QCDataDecrypt;
        //  console.log($scope.QCDataList);
        //  console.log(JSON.stringify($scope.QCDataList));
        var unsyncount = $scope.QCDataList.length;
        if ($rootScope.qcUnsynCount != undefined) {} else {
          $rootScope.qcUnsynCount = '(' + unsyncount + ')';
        }
        $scope.displaymessage = false;

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
      $scope.secretKey = $secretKey.getSecretKey();
      $rootScope.apiUrl = localStorage.getItem('apiUrl');
      var QCDataList = localStorage.getItem('QCData');
      $scope.syncDataLimit = $syncDataLimit.setSyncDataLimit();

      $scope.NewQcDataList = [];
      $scope.NewQcObj = [];


      $scope.QCDataDecrypt = [];
      $scope.QCEncrypt = [];

      $scope.qcEncrypt = [];
      $scope.qcSubList = [];
      if (QCDataList != null) {

        QCDataList = JSON.parse(QCDataList);

        //  var unSyncQcCount = Object.keys(QCDataList).length;
        // if ($rootScope.qcUnsynCount != undefined) {

        // } else {
        //   $rootScope.qcUnsynCount = '(' + unSyncQcCount + ')';
        // }
        // var result = Object.keys(QCDataList).map(function (key, value) {
        //   return [(key), QCDataList[value]];
        // });
        // $scope.QCDataList = [];
        // for (i = 0; i < result.length; i++) {
        //   $scope.QCDataList.push(result[i][1])
        // }
    
        for (i = 0; i < Object.keys(QCDataList).length; i++) {
          $scope.decryptedData = {};
          if(QCDataList[i].unique_id || QCDataList[i].appVersion){
            console.log(QCDataList[i])
            $scope.QCDataDecrypt.push(QCDataList[i]);
          }else{
            $scope.decryptedData = JSON.parse(CryptoJS.AES.decrypt(QCDataList[i], $scope.secretKey, {
              format: CryptoJSAesJson
            }).toString(CryptoJS.enc.Utf8));
            $scope.QCDataDecrypt.push($scope.decryptedData);
          }
        }
        $scope.QCDataList = $scope.QCDataDecrypt;
        //  console.log($scope.QCDataList);
        //  console.log(JSON.stringify($scope.QCDataList));
        var unsyncount = $scope.QCDataList.length;
        if ($rootScope.qcUnsynCount != undefined) {} else {
          $rootScope.qcUnsynCount = '(' + unsyncount + ')';
        }
        $scope.displaymessage = false;

      } else {
        $rootScope.qcUnsynCount = "";
        $scope.syncQcCount = localStorage.getItem('syncQcCount');
        if ($scope.syncQcCount == undefined || $scope.syncQcCount == "") {
          $scope.syncQcCount = 0;

        }
        $scope.displaymessage = true;
      }

    });



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
        //   console.log($scope.QCDataList);
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
        //   console.log(iterationLength);
        $scope.syncedCount = 0;
        for (let m = 0, p = Promise.resolve(); m < iterationLength; m++) {
          p = p.then(_ => new Promise(resolve =>
            setTimeout(function () {
              $scope.slicedQCDataList = $scope.copyQCDataList.splice(0, $scope.syncDataLimit);
              $scope.QCEncrypt=[];
              for (let n = 0; n < $scope.slicedQCDataList.length; n++) {
             
                $scope.encryptedData = {};
                if($scope.secretKey!=null && $scope.secretKey!=''){
                  $scope.encryptedData = CryptoJS.AES.encrypt(JSON.stringify($scope.slicedQCDataList[n]), $scope.secretKey, {
                    format: CryptoJSAesJson
                  }).toString();
                  $scope.QCEncrypt.push($scope.encryptedData); 
                }else{
                 $scope.encryptedData = $scope.slicedQCDataList[n];
                 $scope.QCEncrypt.push($scope.encryptedData); 
                }
                          
              }
            //  console.log($scope.QCEncrypt);
              $preLoader.show();

              $http.post($rootScope.apiUrl + "/api/quality-check", {
                  "qc": $scope.QCEncrypt,
                  "userId": localStorage.getItem('userId'),
                  "version":localStorage.getItem('appVersion')
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
                    localStorage.setItem('syncQcCount', $scope.syncQcCount)
                    var responselen = $scope.response.length;
                    var currentdate = new Date();
                  
                    for (i = 0; i < $scope.response.length; i++) {
                      if ($scope.response[i] == 'fail') {
                        $scope.copyQCDataList.push($scope.slicedQCDataList[i]);
                      } else {
                        $scope.syncedCount = $scope.syncedCount + 1;
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
                    if (m == (iterationLength - 1)) {
                      var decryptedTenData = JSON.parse(CryptoJS.AES.decrypt($scope.tenRecord, $scope.secretKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
                      //console.log(decryptedTenData);
                    localStorage.setItem('lastTenQcData', JSON.stringify(decryptedTenData))

                      localStorage.setItem('LastTesterName', $scope.slicedQCDataList[responselen - 1].testerName)
                      localStorage.setItem('LastTestDate', currentdate);
                      // $ionicPopup.alert({
                      //   title: 'Success',
                      //   template: $scope.syncedCount + ' Data Has been Synced'
                      // });
                      // Hide Toast during Debugging
                      $cordovaToast.show($scope.syncedCount + ' Data has been Successfully Synced', 'long', 'bottom')
                        .then(function (success) {
                          // success
                        }, function (error) {
                          // error
                        });
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
