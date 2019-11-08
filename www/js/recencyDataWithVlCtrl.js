app = angular.module('starter.recencyDataWithVlCtrl', ['starter.services'])

  .controller('recencyDataWithVlCtrl', function ($scope, $rootScope, $secretKey,$filter, $cordovaToast, ionicDatePicker, $localStorage, $http, $preLoader, $ionicPopup, $location, $window, $stateParams) {


    $scope.propertyName = 'hiv_recency_date';
    $rootScope.apiUrl = localStorage.getItem('apiUrl');

    $scope.init = function () {

      var fromdate = new Date();
      var todate = new Date();
      var intYear = fromdate.getFullYear() - 1;
      fromdate = fromdate.setFullYear(intYear);
      $rootScope.fromVlDate = $filter('date')(fromdate, "dd-MMM-yyyy");
      $rootScope.toVlDate = $filter('date')(todate, "dd-MMM-yyyy");
      $scope.recencyVlCount = "";
      $scope.secretKey = $secretKey.getSecretKey();
      $scope.userId = localStorage.getItem('userId');

      if (localStorage.getItem('ServerRecencyData') == 'logout' || localStorage.getItem('ServerRecencyData') == 'success') {
        $scope.showauth = true;
      } else {
        $preLoader.show();
        $http({
          url: $rootScope.apiUrl + "/api/login",
          method: "POST",
          data: {
            "email": $localStorage.get('email'),
            "password": $localStorage.get('serverpassword')
          }
        }).then(function successCallback(response) {
          if (response.data.status == "success") {
            $localStorage.set('authToken', response.data.userDetails['authToken']);
            $localStorage.set('secretKey', response.data.userDetails['secretKey']);
            $localStorage.set('userId', response.data.userDetails['userId']);

            $http.get($localStorage.get('apiUrl') + '/api/recency-result-with-vl?authToken=' + response.data.userDetails['authToken'] + '&userId='+response.data.userDetails['userId'] + '&start=' + $rootScope.fromVlDate + '&end=' + $rootScope.toVlDate)
              .then(function (response) {
        
                if (response.data.status == "success") {
                  var decryptedData = JSON.parse(CryptoJS.AES.decrypt(response.data.recency, $scope.secretKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
                  $localStorage.set('ServerRecencyData', 'login');
                  $preLoader.hide();
                  $scope.showauth = false;

                  if (decryptedData.length > 0) {
                    $scope.displaymessage = false;
                    $preLoader.show();
                    $scope.recencyVlDatas =decryptedData;

                    $scope.recencyVlCount = $scope.recencyVlDatas.length;
                    for (i = 0; i < $scope.recencyVlDatas.length; i++) {
                      var str = $scope.recencyVlDatas[i].vl_result;
                      $scope.recencyVlDatas[i].vl_result = String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(null, '');
                    }
                    $scope.displayVlCount = true;
                    $preLoader.hide()
                  } else {
                    $scope.displaymessage = true;
                    $scope.displayVlCount = false;
                    $scope.recencyVlCount = "";
                    $scope.recencyVlDatas = [];
                  }
                } else {
                  $preLoader.hide();
                  $localStorage.set('ServerRecencyData', 'login');
                  $scope.showauth = false;
                  $scope.recencyVlDatas = [];
                  $scope.displaymessage = true;
                  $scope.displayVlCount = false;
                  $scope.recencyVlCount = "";

                }
              })
          } else {

            $preLoader.hide();
            $ionicPopup.alert({
              title: 'Authentication Failed!',
              template: response.data.message
            });
          }
        });
        $scope.showauth = false;
      }

    }
    $scope.init();

    $scope.getRecencyData = function () {

      $scope.fromDate = $rootScope.fromVlDate;
      $scope.recencyVlCount = "";
      $scope.secretKey = $secretKey.getSecretKey();
      $scope.userId = localStorage.getItem('userId');

      if (localStorage.getItem('ServerRecencyData') == 'logout' || localStorage.getItem('ServerRecencyData') == 'success') {
        $scope.showauth = true;
      } else {
        $preLoader.show();
        $http({
          url: $rootScope.apiUrl + "/api/login",
          method: "POST",
          data: {
            "email": $localStorage.get('email'),
            "password": $localStorage.get('serverpassword')
          }
        }).then(function successCallback(response) {

          if (response.data.status == "success") {
            $localStorage.set('authToken', response.data.userDetails['authToken']);
            $localStorage.set('secretKey', response.data.userDetails['secretKey']);
            $localStorage.set('userId', response.data.userDetails['userId']);

            $http.get($localStorage.get('apiUrl') + '/api/recency-result-with-vl?authToken='+ response.data.userDetails['authToken'] + '&userId='+response.data.userDetails['userId'] +  '&start=' + $rootScope.fromVlDate + '&end=' + $rootScope.toVlDate)
              .then(function (response) {

                if (response.data.status == "success") {
                  var decryptedData = JSON.parse(CryptoJS.AES.decrypt(response.data.recency, $scope.secretKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
                  $localStorage.set('ServerRecencyData', 'login');
                  $preLoader.hide();
                  $scope.showauth = false;

                  if (decryptedData.length > 0) {
                    $scope.displaymessage = false;
                    $preLoader.show();
                    $scope.recencyVlDatas =decryptedData;

                    $scope.recencyVlCount = $scope.recencyVlDatas.length;
                    for (i = 0; i < $scope.recencyVlDatas.length; i++) {
                      var str = $scope.recencyVlDatas[i].vl_result;
                      $scope.recencyVlDatas[i].vl_result = String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(null, '');
                    }
                    $scope.displayVlCount = true;
                    $preLoader.hide()
                  } else {
                    $scope.displaymessage = true;
                    $scope.displayVlCount = false;
                    $scope.recencyVlCount = "";
                    $scope.recencyVlDatas = [];
                  }
                } else {
                  $preLoader.hide();
                  $localStorage.set('ServerRecencyData', 'login');
                  $scope.showauth = false;
                  $scope.recencyVlDatas = [];
                  $scope.displaymessage = true;
                  $scope.displayVlCount = false;
                  $scope.recencyVlCount = "";

                }
              })
          } else {

            $preLoader.hide();
            $ionicPopup.alert({
              title: 'Authentication Failed!',
              template: response.data.message
            });

          }
        });
        $scope.showauth = false;
      }
    }

    $scope.doLogin = function (credentials) {

      var fromdate = new Date();
      var todate = new Date();
      var intYear = fromdate.getFullYear() - 1;
      fromdate = fromdate.setFullYear(intYear);
      $rootScope.fromVlDate = $filter('date')(fromdate, "dd-MMM-yyyy");
      $rootScope.toVlDate = $filter('date')(todate, "dd-MMM-yyyy");

      $scope.recencyVlCount = "";
      $scope.secretKey = $secretKey.getSecretKey();
      $scope.userId = localStorage.getItem('userId');

      if (!credentials.email) {
        $ionicPopup.alert({
          title: 'Login Failed',
          template: 'Please Enter Valid Email ID'
        });
      } else if (!credentials.serverpassword) {
        $ionicPopup.alert({
          title: 'Login Failed',
          template: 'Please Enter the Server Password'
        });
      } else {

        credentials.serverHost = $localStorage.get('apiUrl');
        $preLoader.show();
        $http({
          url: credentials.serverHost + "/api/login",
          method: "POST",
          data: {
            "email": credentials.email,
            "password": credentials.serverpassword
          }
        }).then(function successCallback(response) {
          if (response.data.status == "success") {
            $localStorage.set('authToken', response.data.userDetails['authToken']);
            $localStorage.set('secretKey', response.data.userDetails['secretKey']);
            $localStorage.set('userId', response.data.userDetails['userId']);

            $http.get($localStorage.get('apiUrl') + '/api/recency-result-with-vl?authToken=' + response.data.userDetails['authToken'] + '&userId='+response.data.userDetails['userId'] + '&start=' + $rootScope.fromVlDate + '&end=' + $rootScope.toVlDate)
              .then(function (response) {
                if (response.data.status == "success") {
                  var decryptedData = JSON.parse(CryptoJS.AES.decrypt(response.data.recency, $scope.secretKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
                  $localStorage.set('ServerRecencyData', 'login');
                  $preLoader.hide();
                  // Hide Toast During Debugging
                  $cordovaToast.show('Authentication is Sucess', 'long', 'bottom')
                    .then(function (success) {
                      // success
                    }, function (error) {
                      // error
                    });

                  $scope.showauth = false;
                  if (decryptedData.length > 0) {
                    $scope.displaymessage = false;
                    $preLoader.show();
                    $scope.recencyVlDatas = decryptedData;

                    $scope.recencyVlCount = $scope.recencyVlDatas.length;
                    for (i = 0; i < $scope.recencyVlDatas.length; i++) {
                      var str = $scope.recencyVlDatas[i].vl_result;
                      $scope.recencyVlDatas[i].vl_result = String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(null, '');
                    }
                    $scope.displayVlCount = true;
                    $preLoader.hide()
                  } else {
                    $scope.displaymessage = true;
                    $scope.displayVlCount = false;
                    $scope.recencyVlCount = "";
                    $scope.recencyVlDatas = [];
                  }
                } else {
                  $preLoader.hide();
                  $localStorage.set('ServerRecencyData', 'login');
                  $scope.showauth = false;
                  $scope.recencyVlDatas = [];
                  $scope.displaymessage = true;
                  $scope.displayVlCount = false;
                  $scope.recencyVlCount = "";

                }
              })
          } else {
            $preLoader.hide();
            $ionicPopup.alert({
              title: 'Authentication Failed!',
              template: response.data.message
            });

          }
        });

      }
    }
    $scope.doRefresh = function () {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
    }


    $scope.setFromVlDate = function (val) {
      var ipObj1 = {
        callback: function (val) {
          var fromDate = new Date(val);
          //console.log(fromDate);
          $rootScope.fromVlDate = $filter('date')(fromDate, "dd-MMM-yyyy");
          $scope.getRecencyData();
        },
        to: new Date(),

      };
      ionicDatePicker.openDatePicker(ipObj1);

    }
    $scope.settoVlDate = function (val) {
      var ipObj1 = {
        callback: function (val) {
          var toDate = new Date(val);
          //console.log(toDate);
          $rootScope.toVlDate = $filter('date')(toDate, "dd-MMM-yyyy");
          $scope.getRecencyData();
        },
        to: new Date(),

      };
      ionicDatePicker.openDatePicker(ipObj1);

    }
    $scope.clearfromVlDate = function () {
      $rootScope.fromVlDate = "";
    }
    $scope.cleartoVlDate = function () {
      $rootScope.toVlDate = "";

    }
    $scope.sortByDate = function (propertyName) {
      $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      //  console.log($scope.reverse)

      $scope.propertyName = propertyName;
    };
    $scope.sortBy = function (propertyName, propertyName1) {
      // console.log($scope.propertyName)
      $scope.reverse = ($scope.propertyName === propertyName && $scope.propertyName1 === propertyName1) ? !$scope.reverse : false;
      //  console.log($scope.reverse)
      $scope.propertyName = propertyName;
      $scope.propertyName1 = propertyName1;

    }
  })


  .filter('trusted', ['$sce', function ($sce) {
    var div = document.createElement('div');
    return function (text) {
      div.innerHTML = text;
      return $sce.trustAsHtml(div.textContent);
    };
  }])
