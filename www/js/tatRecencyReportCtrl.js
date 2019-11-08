app = angular.module('starter.tatRecencyReportCtrl', ['starter.services'])

  .controller('tatRecencyReportCtrl', function ($scope, $rootScope,$secretKey, $filter, $cordovaToast, ionicDatePicker, $localStorage, $http, $preLoader, $ionicPopup, $location, $window, $stateParams) {

    $scope.propertyName = 'hiv_recency_date';
    $rootScope.apiUrl = localStorage.getItem('apiUrl');

    $scope.init = function () {

      var fromdate = new Date();
      var todate = new Date();
      var intYear = fromdate.getFullYear() - 1;
      fromdate = fromdate.setFullYear(intYear);
      $rootScope.fromDate = $filter('date')(fromdate, "dd-MMM-yyyy");
      $rootScope.toDate = $filter('date')(todate, "dd-MMM-yyyy");
      $scope.tatDataCount = "";
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

            $http.get($localStorage.get('apiUrl') + '/api/tat-report?authToken=' + response.data.userDetails['authToken'] + '&userId='+response.data.userDetails['userId']+'&start=' + $rootScope.fromDate + '&end=' + $rootScope.toDate)
              .then(function (response) {
                if (response.data.status == "success") {

                  var decryptedData = JSON.parse(CryptoJS.AES.decrypt(response.data.tat, $scope.secretKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
                  $localStorage.set('ServerRecencyData', 'login');
                  $preLoader.hide();
                  $scope.showauth = false;

                  if (decryptedData.length > 0) {
                    $scope.displaymessage = false;
                    $preLoader.show();
                    $scope.tatDatas = decryptedData;
                    $scope.tatDataCount = $scope.tatDatas.length;
                    $preLoader.hide()
                  } else {
                    $scope.displaymessage = true;
                    $scope.tatDataCount = "";
                    $scope.tatDatas = [];
                  }
                } else {
                  $preLoader.hide();
                  $localStorage.set('ServerRecencyData', 'login');
                  $scope.showauth = false;
                  $scope.tatDatas = [];
                  $scope.displaymessage = true;
                  $scope.tatDataCount = "";

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

      $scope.tatDataCount = "";
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

            $http.get($localStorage.get('apiUrl') + '/api/tat-report?authToken=' +response.data.userDetails['authToken']+ '&userId='+response.data.userDetails['userId'] + '&start=' + $rootScope.fromDate + '&end=' + $rootScope.toDate)
              .then(function (response) {

                if (response.data.status == "success") {
                  var decryptedData = JSON.parse(CryptoJS.AES.decrypt(response.data.tat, $scope.secretKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
                  $localStorage.set('ServerRecencyData', 'login');
                  $preLoader.hide();
                  $scope.showauth = false;

                  if (decryptedData.length > 0) {
                    $scope.displaymessage = false;
                    $preLoader.show();
                    $scope.tatDatas = decryptedData;

                    $scope.tatDataCount = $scope.tatDatas.length;

                    $preLoader.hide()
                  } else {
                    $scope.displaymessage = true;

                    $scope.tatDataCount = "";
                    $scope.tatDatas = [];
                  }
                } else {
                  $preLoader.hide();
                  $localStorage.set('ServerRecencyData', 'login');
                  $scope.showauth = false;
                  $scope.tatDatas = [];
                  $scope.displaymessage = true;
                  $scope.tatDataCount = "";

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
      $rootScope.fromDate = $filter('date')(fromdate, "dd-MMM-yyyy");
      $rootScope.toDate = $filter('date')(todate, "dd-MMM-yyyy");

      $scope.tatDataCount = "";
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

            $http.get($localStorage.get('apiUrl') + '/api/tat-report?authToken=' + response.data.userDetails['authToken'] + '&userId='+response.data.userDetails['userId'] + '&start=' + $rootScope.fromDate + '&end=' + $rootScope.toDate)
              .then(function (response) {
             
                if (response.data.status == "success") {
                  var decryptedData = JSON.parse(CryptoJS.AES.decrypt(response.data.tat, $scope.secretKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));

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
                    $scope.tatDatas =decryptedData;

                    $scope.tatDataCount = $scope.tatDatas.length;


                    $preLoader.hide()
                  } else {
                    $scope.displaymessage = true;

                    $scope.tatDataCount = "";
                    $scope.tatDatas = [];
                  }
                } else {
                  $preLoader.hide();
                  $localStorage.set('ServerRecencyData', 'login');
                  $scope.showauth = false;
                  $scope.tatDatas = [];
                  $scope.displaymessage = true;

                  $scope.tatDataCount = "";

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
    $scope.setfromDate = function (val) {
      var ipObj1 = {
        callback: function (val) {
          var fromdate = new Date(val);

          $rootScope.fromDate = $filter('date')(fromdate, "dd-MMM-yyyy");
          $scope.getRecencyData();
        },
        to: new Date(),
      };
      ionicDatePicker.openDatePicker(ipObj1);
    }
    $scope.settoDate = function (val) {
      var ipObj1 = {
        callback: function (val) {
          var toDate = new Date(val);

          $rootScope.toDate = $filter('date')(toDate, "dd-MMM-yyyy");
          $scope.getRecencyData();
        },
        to: new Date(),

      };
      ionicDatePicker.openDatePicker(ipObj1);
    }
    $scope.clearfromDate = function () {
      $rootScope.fromDate = "";
    }
    $scope.cleartoDate = function () {
      $rootScope.toDate = "";
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
