app = angular.module('starter.viewRecencyCtrl', ['starter.services'])

  .controller('viewRecencyCtrl', function ($scope, $rootScope,$secretKey,$syncDataLimit, $http, $preLoader, $state, $ionicPopup, $cordovaToast, $location, $window, $stateParams, $ionicPlatform, $cordovaLocalNotification, $cordovaBadge) {
    $scope.onLoadRecency = function () {
      $scope.recencyList = [];
      $scope.unSyncCount = '';

      $scope.recencyDecrypt = [];
      $scope.recencyEncrypt=[];

      $scope.secretKey = $secretKey.getSecretKey();
      $scope.DataLimit = $syncDataLimit.setSyncDataLimit();

      $rootScope.apiUrl = localStorage.getItem('apiUrl');
      var recencyList = localStorage.getItem('RecencyData');

      if (recencyList != null) {
        recencyList = JSON.parse(recencyList);
        
        for(i=0;i<Object.keys(recencyList).length;i++){
           $scope.decryptedData ={};
           $scope.decryptedData = JSON.parse(CryptoJS.AES.decrypt(recencyList[i], $scope.secretKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
           $scope.recencyDecrypt.push($scope.decryptedData);
        }

        $scope.recencyList = $scope.recencyDecrypt;
        var unsyncount = $scope.recencyList.length;

        if ($rootScope.recencyUnsyncCount != undefined) {} else {
          $rootScope.recencyUnsyncCount = '(' + unsyncount + ')';
        }
        $scope.displaymessage = false;
      } 
      else {
        $rootScope.recencyUnsyncCount = "";
        $scope.syncCount = localStorage.getItem('syncCount');
        if ($scope.syncCount == undefined || $scope.syncCount == "") {
          $scope.syncCount = 0;

        }
        $scope.displaymessage = true;
      }

    }
    $rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams)
     {
        $rootScope.previousState = from.name;
         $rootScope.currentState = to.name;
         if($rootScope.previousState == 'app.editRecency'){
          $window.location.reload(true);
         }      
      });
    $scope.$on("$ionicView.beforeEnter", function (event, data) {
      $scope.recencyList = [];
      $scope.recencySubList = [];
      $scope.unSyncCount = '';
      $scope.recencyDecrypt = [];
      $scope.recencyEncrypt=[];
      $scope.secretKey = $secretKey.getSecretKey();
      $scope.DataLimit = $syncDataLimit.setSyncDataLimit();

      $rootScope.apiUrl = localStorage.getItem('apiUrl');
      var recencyList = localStorage.getItem('RecencyData');
  
      if (recencyList != null) {
        recencyList = JSON.parse(recencyList);


        for(i=0;i<Object.keys(recencyList).length;i++){
          $scope.decryptedData ={};
          $scope.decryptedData = JSON.parse(CryptoJS.AES.decrypt(recencyList[i], $scope.secretKey, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
        
         $scope.recencyDecrypt.push($scope.decryptedData);
        }

        $scope.recencyList = $scope.recencyDecrypt;
        var unsyncount = $scope.recencyList.length;

      //  var unsyncount = Object.keys(recencyList).length;
        if ($rootScope.recencyUnsyncCount != undefined) {} else {
          $rootScope.recencyUnsyncCount = '(' + unsyncount + ')';
        }
        // var result = Object.keys(recencyList).map(function (key, value) {
        //   return [(key), recencyList[value]];
        // });
        // for (i = 0; i < result.length; i++) {
        //   $scope.recencyList.push(result[i][1])
        // }
        $scope.displaymessage = false;
      } 
      else {
        $rootScope.recencyUnsyncCount = "";
        $scope.syncCount = localStorage.getItem('syncCount');
        if ($scope.syncCount == undefined || $scope.syncCount == "") {
          $scope.syncCount = 0;

        }
        $scope.displaymessage = true;
      }


      $scope.checkLoopCount();

    });


    var recencydatas = $scope.recencyList;

    $scope.doRefresh = function () {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
    }

    $scope.checkLoopCount = function(){
      var totLength = $scope.recencyList.length;
      if(totLength>$scope.DataLimit){
        $scope.syncDataCount =  Math.floor(totLength/$scope.DataLimit) + (totLength%$scope.DataLimit) ;
      }
      else if(totLength<=$scope.DataLimit){
        $scope.syncDataCount = 1 ;
      }else {  }
    }
    $scope.syncnow = function () {
    
      if ($scope.displaymessage == true) {
        $preLoader.hide();

        $ionicPopup.alert({
          title: 'Alert!',
          template: '<center>There are no records to sync.</center>'
        });
      } else {
      for (i = 0; i < $scope.recencyList.length; i++) {
        $scope.recencyList[i].syncedBy = localStorage.getItem('userId');
        var currentdatetime = new Date();
        if($scope.recencyList[i].recencyOutcome=='Invalid'){
            $scope.recencyList[i].invalidControlLine = $scope.recencyList[i].ctrlLine;
            $scope.recencyList[i].invalidControlLineName = $scope.recencyList[i].ctrlLineName;
            $scope.recencyList[i].invalidPositiveLine = $scope.recencyList[i].positiveLine;
            $scope.recencyList[i].invalidPositiveLineName = $scope.recencyList[i].positiveLineName;
            $scope.recencyList[i].invalidLongTermLine = $scope.recencyList[i].longTermLine;
            $scope.recencyList[i].invalidLongTermLineName = $scope.recencyList[i].longTermLineName;
            $scope.recencyList[i].invalidRecencyOutcome = $scope.recencyList[i].recencyOutcome;
            $scope.recencyList[i].invalidRecencyOutcomeDisplay = $scope.recencyList[i].recencyOutcomeDisplay;                
            $scope.recencyList[i].ctrlLine = $scope.recencyList[i].newControlLine;
            $scope.recencyList[i].ctrlLineName = $scope.recencyList[i].newControlLineName;
            $scope.recencyList[i].positiveLine = $scope.recencyList[i].newPositiveLine;
            $scope.recencyList[i].positiveLineName = $scope.recencyList[i].newPositiveLineName;
            $scope.recencyList[i].longTermLine = $scope.recencyList[i].newLongTermLine;
            $scope.recencyList[i].longTermLineName = $scope.recencyList[i].newLongTermLineName;
            $scope.recencyList[i].recencyOutcome = $scope.recencyList[i].newRecencyOutcome;
            $scope.recencyList[i].recencyOutcomeDisplay = $scope.recencyList[i].newRecencyOutcomeName;

            $scope.recencyList[i].newControlLine = "";
            $scope.recencyList[i].newControlLineName = "";
            $scope.recencyList[i].newPositiveLine = "";
            $scope.recencyList[i].newPositiveLineName = ""
            $scope.recencyList[i].newLongTermLine = "";
            $scope.recencyList[i].newLongTermLineName = "";
            $scope.recencyList[i].newRecencyOutcome = "";
            $scope.recencyList[i].newRecencyOutcomeDisplay = "";
            
     
        }
      //  console.log($scope.recencyList[i])
        $scope.recencyList[i].formTransferDateTime = currentdatetime.getFullYear() + "-" +
          (currentdatetime.getMonth() + 1) + "-" +
          currentdatetime.getDate() + " " +
          currentdatetime.getHours() + ":" +
          currentdatetime.getMinutes() + ":" +
          currentdatetime.getSeconds();
          $scope.encryptedData ={};

          $scope.encryptedData= CryptoJS.AES.encrypt(JSON.stringify( $scope.recencyList[i]),$scope.secretKey, {format: CryptoJSAesJson}).toString();
          $scope.recencyEncrypt.push(
            $scope.encryptedData);
      }
         var totLength = $scope.recencyEncrypt.length;

        if(totLength<=$scope.DataLimit){
          $scope.syncedCount = 0;

          $http.post($rootScope.apiUrl + "/api/recency", {
            "form": $scope.recencyEncrypt,
            "userId":localStorage.getItem('userId')
          })
          .success(function (data) {
           // console.log(data);
            if (data.status == 'failed') {

              $ionicPopup.alert({
                title: 'Failed!',
                template: data.message
              });
            } else {

              $scope.response = data.syncData.response;
              $scope.syncCount = data.syncCount.response[0].Total;
              localStorage.setItem('syncCount', $scope.syncCount)
              for (i = 0; i < $scope.response.length; i++) {
                if($scope.response[i]=='success'){
                  $scope.recencyEncrypt.splice(i);
                  $scope.syncedCount = $scope.syncedCount + 1;
                }
                else{  }
              }

              if ($scope.recencyEncrypt.length == 0) {
                localStorage.setItem('RecencyData', ($scope.recencyEncrypt));
              } else {
                localStorage.setItem('RecencyData', JSON.stringify($scope.recencyEncrypt));
              }
              if (localStorage.getItem('RecencyData') == "") {
                localStorage.removeItem('RecencyData');
              }
              localStorage.setItem('counter', $scope.recencyEncrypt.length);   

              // $ionicPopup.alert({
              //   title: 'Success',
              //   template: $scope.syncedCount +' Data Has been Synced'
              // });

              $cordovaToast.show($scope.syncedCount + ' Data has been Successfully Synced', 'long', 'bottom')
                        .then(function (success) {
                          // success
                        }, function (error) {
                          // error
                        });
              $scope.onLoadRecency();
            }
          })
          .error(function () {

            $ionicPopup.alert({
              title: data.response
            });
          });

        }else{
            $scope.responseRecCount = 0;
            $scope.syncedCount = 0;
            
            for(i=0;i<$scope.syncDataCount;i++){
              $scope.recencySubList = $scope.recencyEncrypt.splice(0,$scope.DataLimit);
              $http.post($rootScope.apiUrl + "/api/recency", {
                "form": $scope.recencySubList,
                "userId":localStorage.getItem('userId')
              })
              .success(function (data) {
             
                if (data.status == 'failed') {
    
                  $ionicPopup.alert({
                    title: 'Failed!',
                    template: data.message
                  });
                } else {
                  $scope.responseRecCount =  $scope.responseRecCount +1;
                  $scope.response = data.syncData.response;
                  $scope.syncCount = data.syncCount.response[0].Total;
                  localStorage.setItem('syncCount', $scope.syncCount)
                  for (i = 0; i < $scope.response.length; i++) {
                    if($scope.response[i]=='success'){
                      $scope.recencySubList.splice(i);
                      $scope.syncedCount = $scope.syncedCount + 1;
                    }else{
                      $scope.recencyEncrypt.push($scope.recencySubList[i]);
                    }
                  }
    
                  if ($scope.recencyEncrypt.length == 0) {
                    localStorage.setItem('RecencyData', ($scope.recencyEncrypt));
                  } else {
                    localStorage.setItem('RecencyData', JSON.stringify($scope.recencyEncrypt));
                  }
                  if (localStorage.getItem('RecencyData') == "") {
                    localStorage.removeItem('RecencyData');
                  }
                  localStorage.setItem('counter', $scope.recencyEncrypt.length);  
                  if($scope.syncDataCount==$scope.responseRecCount && $scope.syncedCount!=0){
                    // $ionicPopup.alert({
                    //   title: 'Success',
                    //   template: $scope.syncedCount +' Data Has been Synced'
                    // });
                    $cordovaToast.show($scope.syncedCount + ' Data has been Successfully Synced', 'long', 'bottom')
                        .then(function (success) {
                          // success
                        }, function (error) {
                          // error
                        });
                    $scope.onLoadRecency();
                  } 
                }
              })
              .error(function () {
    
                $ionicPopup.alert({
                  title: data.message
                });
              });         
          }

    
        }
      }
    }


   

    
    $scope.viewRecency = function (recency, index) {
      $rootScope.recencyDetail = recency;
      recency.index = index;
      localStorage.setItem('viewRecency', JSON.stringify(recency));
      $window.location.href = '#/app/viewRecencyDetail/' + recency.unique_id;

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
