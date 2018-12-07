app=angular.module('starter.pendingRecencyResultCtrl', ['starter.services'])

.controller('pendingRecencyResultCtrl', function($scope,$rootScope,$filter,$cordovaToast,ionicDatePicker,$localStorage,$http,$preLoader, $ionicPopup, $location,$window, $stateParams) {
   
  // $scope.displaybadge = false;
 $scope.propertyName = 'hiv_recency_date';
 $rootScope.apiUrl = localStorage.getItem('apiUrl');

        $scope.init = function(){

          $scope.recencyVlCount = "";

          if(localStorage.getItem('ServerRecencyData')=='logout' || localStorage.getItem('ServerRecencyData')=='success' ){
            $scope.showauth = true;
          }else
          {
            $preLoader.show();
          $http({
            url: $rootScope.apiUrl+"/api/login",
            method: "POST",
            data: { "email": $localStorage.get('email'), "password" : $localStorage.get('serverpassword') }
        }).then(function successCallback(response) {
               console.log(response.data);
               if(response.data.status =="success"){
                  $localStorage.set('authToken',response.data.userDetails['authToken']);                  
                  $http.get($localStorage.get('apiUrl')+'/api/pending-vl-result?authToken='+$localStorage.get('authToken'))
                 .then(function(response) {
                   console.log(response)
                   if(response.data.status =="success"){
                    $localStorage.set('ServerRecencyData','login');
                    $preLoader.hide();
                      $scope.showauth = false;   
                      console.log( response.data.recency) 
                      if(response.data.recency.length>0){
                        $scope.displaymessage = false;
                      $preLoader.show();
                      $scope.recencyVlDatas =response.data.recency;
                    
                        $scope.recencyVlCount = $scope.recencyVlDatas.length;  

                        $scope.displayVlCount = true;
                      $preLoader.hide()
                    }else{
                      $scope.displaymessage = true;
                      $scope.displayVlCount = false;
                      $scope.recencyVlCount="";
                      $scope.recencyVlDatas = [];
                    }
                   }
                   else{
                    $preLoader.hide();
                    $localStorage.set('ServerRecencyData','login');
                    $scope.showauth = false;  
                    $scope.recencyVlDatas = [];
                    $scope.displaymessage = true;
                    $scope.displayVlCount = false;
                    $scope.recencyVlCount="";
                    // $scope.showauth = true;
                    // $ionicPopup.alert({title:"Authentication Failed !",template:'<center>'+response.data.message+'</center>'});
                       }
                 })
               }
               else{
                console.log(response.data);
                $preLoader.hide();
                $ionicPopup.alert({title:'Authentication Failed!',template:response.data.message});
               }
            });
            $scope.showauth = false;
          }
         console.log( $scope.showauth)
        }
        $scope.init();
        
    $scope.doLogin = function(credentials) {

      $scope.recencyVlCount = "";

       if(!credentials.email){
          $ionicPopup.alert({title: 'Login Failed',template: 'Please Enter Valid Email ID'});
        }
        else if(!credentials.serverpassword){
          $ionicPopup.alert({title: 'Login Failed',template: 'Please Enter the Server Password'});
          }
          else{
            // console.log(credentials);
             credentials.serverHost= $localStorage.get('apiUrl');    
              $preLoader.show();
            $http({
              url: credentials.serverHost+"/api/login",
              method: "POST",
              data: { "email": credentials.email, "password" : credentials.serverpassword }
          }).then(function successCallback(response) {
                 console.log(response.data);
                 if(response.data.status =="success"){
                    $localStorage.set('authToken',response.data.userDetails['authToken']);
                    
                   $http.get($localStorage.get('apiUrl')+'/api/pending-vl-result?authToken='+$localStorage.get('authToken'))
                   .then(function(response) {
                     console.log(response);
                     if(response.data.status =="success"){
                      $localStorage.set('ServerRecencyData','login');
                      $preLoader.hide();
                      
                      $cordovaToast.show('Authentication is Sucess', 'long', 'bottom')
                            .then(function(success) {
                                 // success
                             }, function (error) {
                                 // error
                             });

                        $scope.showauth = false;  
                        console.log( response.data.recency)  
                        //console.log($rootScope.fromVlDate)
                        if(response.data.recency.length>0){
                          $scope.displaymessage = false;
                        $preLoader.show();
                        $scope.recencyVlDatas =response.data.recency;
                   
                          $scope.recencyVlCount = $scope.recencyVlDatas.length;  
                          $scope.displayVlCount = true;
                        $preLoader.hide()
                      }else{
                        $scope.displaymessage = true;
                        $scope.displayVlCount = false;
                        $scope.recencyVlCount="";
                        $scope.recencyVlDatas = [];
                      }
                     }
                     else{
                      $preLoader.hide();
                      $localStorage.set('ServerRecencyData','login');
                      $scope.showauth = false;  
                      $scope.recencyVlDatas = [];
                      $scope.displaymessage = true;
                      $scope.displayVlCount = false;
                      $scope.recencyVlCount="";
                      // $scope.showauth = true;
                      // $ionicPopup.alert({title:"Authentication Failed1 !",template:'<center>'+response.data.message+'</center>'});
                         }
                   })
                 }
                 else{
                  console.log(response.data);
                  $preLoader.hide();
                  $ionicPopup.alert({title:'Authentication Failed!',template:response.data.message});

                 }
          });
    
        }
      } 
        $scope.doRefresh = function() {
          $preLoader.show();
          $window.location.reload(true);
          $preLoader.hide(); 
        }

      $scope.sortByDate = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
     //   console.log($scope.reverse)

        $scope.propertyName = propertyName;
      };   
      $scope.sortBy = function(propertyName,propertyName1){
       //   console.log($scope.propertyName)
        $scope.reverse = ($scope.propertyName === propertyName && $scope.propertyName1 === propertyName1) ? !$scope.reverse : false;
      //  console.log($scope.reverse)
        $scope.propertyName = propertyName;
        $scope.propertyName1 = propertyName1;

      }
})


