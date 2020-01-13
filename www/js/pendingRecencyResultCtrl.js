app = angular.module('starter.pendingRecencyResultCtrl', ['starter.services'])

  .controller('pendingRecencyResultCtrl', function ($scope, $rootScope,$secretKey, $filter, $cordovaToast, ionicDatePicker, $localStorage, $http, $preLoader, $ionicPopup, $location, $window, $stateParams) {


    $scope.propertyName = 'hiv_recency_date';
    $rootScope.apiUrl = localStorage.getItem('apiUrl');

    $scope.init = function () {

      $scope.recencyVlCount = "";
      $scope.secretKey = $secretKey.getSecretKey();
      $scope.userId = localStorage.getItem('userId');
      $scope.appVersion = localStorage.getItem('AppVersion');

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
            if(response.data.userDetails['secretKey']){
              $localStorage.set('secretKey', response.data.userDetails['secretKey']);
            }
            $localStorage.set('userId', response.data.userDetails['userId']);

            $http.get($localStorage.get('apiUrl') + '/api/pending-vl-result?authToken=' + response.data.userDetails['authToken']+ '&userId='+response.data.userDetails['userId']+'&version='+$scope.appVersion)
              .then(function (response) {
                if (response.data.status == "success") {

                  if(response.data.recency.length>0){                 
                    if(response.data.recency[0].sample_id==null || response.data.recency[0].sample_id){
                      var decryptedData = response.data.recency;
                    }else{
                      var decryptedData = JSON.parse(CryptoJS.AES.decrypt(response.data.recency, $scope.secretKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
                    }
                  }
                  else {
                    $scope.displaymessage = true;
                    $scope.displayVlCount = false;
                    $scope.recencyVlCount = "";
                    $scope.recencyVlDatas = [];
                  }
                //  var decryptedData = JSON.parse(CryptoJS.AES.decrypt(response.data.recency, $scope.secretKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
                  $localStorage.set('ServerRecencyData', 'login');
                  $preLoader.hide();
                  $scope.showauth = false;
                  if (decryptedData.length > 0) {
                    $scope.displaymessage = false;
                    $preLoader.show();
                    $scope.recencyVlDatas =decryptedData;

                    $scope.recencyVlCount = $scope.recencyVlDatas.length;

                    $scope.displayVlCount = true;
                    $preLoader.hide()
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

    $scope.doLogin = function (credentials) {

      $scope.recencyVlCount = "";
      $scope.secretKey = $secretKey.getSecretKey();
      $scope.userId = localStorage.getItem('userId');
      $scope.appVersion = localStorage.getItem('AppVersion');

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
            if(response.data.userDetails['secretKey']){
              $localStorage.set('secretKey', response.data.userDetails['secretKey']);
            }
            $localStorage.set('userId', response.data.userDetails['userId']);

            $http.get($localStorage.get('apiUrl') + '/api/pending-vl-result?authToken=' + response.data.userDetails['authToken']+ '&userId='+response.data.userDetails['userId'] +'&version='+$scope.appVersion)
              .then(function (response) {

                if (response.data.status == "success") {
                  $localStorage.set('ServerRecencyData', 'login');
                  $preLoader.hide();
                  // Hide Toast During Debugging
                  $cordovaToast.show('Authentication is Sucess', 'long', 'bottom')
                    .then(function (success) {
                      // success
                    }, function (error) {
                      // error
                    });

                    if(response.data.recency.length>0){                 
                      if(response.data.recency[0].sample_id==null || response.data.recency[0].sample_id){
                        var decryptedData = response.data.recency;
                      }else{
                        var decryptedData = JSON.parse(CryptoJS.AES.decrypt(response.data.recency, $scope.secretKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
                      }
                    }
                    else {
                      $scope.displaymessage = true;
                      $scope.displayVlCount = false;
                      $scope.recencyVlCount = "";
                      $scope.recencyVlDatas = [];
                    }
                  //  var decryptedData = JSON.parse(CryptoJS.AES.decrypt(response.data.recency, $scope.secretKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
                    $scope.showauth = false;
                  if (decryptedData.length > 0) {
                    $scope.displaymessage = false;
                    $preLoader.show();
                    $scope.recencyVlDatas = decryptedData;

                    $scope.recencyVlCount = $scope.recencyVlDatas.length;
                    $scope.displayVlCount = true;
                    $preLoader.hide()
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
