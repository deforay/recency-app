app=angular.module('starter.tatRecencyReportCtrl', ['starter.services'])

.controller('tatRecencyReportCtrl', function($scope,$rootScope,$filter,$cordovaToast,ionicDatePicker,$localStorage,$http,$preLoader, $ionicPopup, $location,$window, $stateParams) {
   
  // $scope.displaybadge = false;
 $scope.propertyName = 'hiv_recency_date';
 $rootScope.apiUrl = localStorage.getItem('apiUrl');

        $scope.init = function(){

          var fromdate = new Date();
          var todate = new Date();
          var intYear = fromdate.getFullYear() - 1; 
          fromdate = fromdate.setFullYear(intYear);
          $rootScope.fromDate =  $filter('date')(fromdate , "dd-MMM-yyyy");
          $rootScope.toDate =  $filter('date')(todate , "dd-MMM-yyyy");
          $scope.tatDataCount = "";

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
               if(response.data.status =="success"){
                  $localStorage.set('authToken',response.data.userDetails['authToken']);                  
                  $http.get($localStorage.get('apiUrl')+'/api/tat-report?authToken='+$localStorage.get('authToken')+'&start='+$rootScope.fromDate+'&end='+$rootScope.toDate)
                 .then(function(response) {
                   if(response.data.status =="success"){
                    $localStorage.set('ServerRecencyData','login');
                    $preLoader.hide();
                      $scope.showauth = false;   
                   //   console.log( response.data.tat) 
                      if(response.data.tat.length>0){
                        $scope.displaymessage = false;
                        $preLoader.show();
                        $scope.tatDatas =response.data.tat;
                        $scope.tatDataCount = $scope.tatDatas.length;                    
                      $preLoader.hide()
                    }else{
                      $scope.displaymessage = true;
                      $scope.tatDataCount="";
                      $scope.tatDatas = [];
                    }
                   }
                   else{
                    $preLoader.hide();
                    $localStorage.set('ServerRecencyData','login');
                    $scope.showauth = false;  
                    $scope.tatDatas = [];
                    $scope.displaymessage = true;
                    $scope.tatDataCount="";
                    
                       }
                 })
               }
               else{
               // console.log(response.data);
                $preLoader.hide();
                $ionicPopup.alert({title:'Authentication Failed!',template:response.data.message});
               }
            });
            $scope.showauth = false;
          }
         //console.log( $scope.showauth)
        }
        $scope.init();
       
        $scope.getRecencyData = function(){
          
          $scope.fromDate = $rootScope.fromDate;
          $scope.tatDataCount = "";

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
              // console.log(response.data);
               if(response.data.status =="success"){
                  $localStorage.set('authToken',response.data.userDetails['authToken']);                  
                  $http.get($localStorage.get('apiUrl')+'/api/tat-report?authToken='+$localStorage.get('authToken')+'&start='+$rootScope.fromDate+'&end='+$rootScope.toDate)
                 .then(function(response) {
                   //console.log(response)
                   if(response.data.status =="success"){
                    $localStorage.set('ServerRecencyData','login');
                    $preLoader.hide();
                      $scope.showauth = false;   
                  //  console.log( response.data.tat) 
                      if(response.data.tat.length>0){
                        $scope.displaymessage = false;
                      $preLoader.show();
                      $scope.tatDatas =response.data.tat;
                   
                        $scope.tatDataCount = $scope.tatDatas.length;
                      
                      $preLoader.hide()
                    }else{
                      $scope.displaymessage = true;

                      $scope.tatDataCount="";
                      $scope.tatDatas = [];
                    }
                   }
                   else{
                    $preLoader.hide();
                    $localStorage.set('ServerRecencyData','login');
                    $scope.showauth = false;  
                    $scope.tatDatas = [];
                    $scope.displaymessage = true;
                    $scope.tatDataCount="";
                    // $ionicPopup.alert({title:"Authentication Failed 1 !",template:'<center>'+response.data.message+'</center>'});
                       }
                 })
               }
               else{
               // console.log(response.data);       
                $preLoader.hide();
                $ionicPopup.alert({title:'Authentication Failed!',template:response.data.message});

               }
           });
            $scope.showauth = false;
          }
        }

    $scope.doLogin = function(credentials) {

      var fromdate = new Date();
      var todate = new Date();
      var intYear = fromdate.getFullYear() - 1; 
      fromdate = fromdate.setFullYear(intYear);
      $rootScope.fromDate =  $filter('date')(fromdate , "dd-MMM-yyyy");
      $rootScope.toDate =  $filter('date')(todate , "dd-MMM-yyyy");
     // console.log($rootScope.fromDate,$rootScope.toDate);
      $scope.tatDataCount = "";

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
                 if(response.data.status =="success"){
                    $localStorage.set('authToken',response.data.userDetails['authToken']);
                   $http.get($localStorage.get('apiUrl')+'/api/tat-report?authToken='+$localStorage.get('authToken')+'&start='+$rootScope.fromDate+'&end='+$rootScope.toDate)
                   .then(function(response) {
                     if(response.data.status =="success"){
                      $localStorage.set('ServerRecencyData','login');
                      $preLoader.hide();
                      //console.log(response.data);

                      $cordovaToast.show('Authentication is Sucess', 'long', 'bottom')
                            .then(function(success) {
                                 // success
                             }, function (error) {
                                 // error
                             });

                        $scope.showauth = false;  
                        if(response.data.tat.length>0){
                          $scope.displaymessage = false;
                        $preLoader.show();
                        $scope.tatDatas =response.data.tat;
                     
                          $scope.tatDataCount = $scope.tatDatas.length;
  
                        
                        $preLoader.hide()
                      }else{
                        $scope.displaymessage = true;
  
                        $scope.tatDataCount="";
                        $scope.tatDatas = [];
                      }
                     }
                     else{
                      $preLoader.hide();
                      $localStorage.set('ServerRecencyData','login');
                      $scope.showauth = false;  
                      $scope.tatDatas = [];
                      $scope.displaymessage = true;

                      $scope.tatDataCount="";
                      // $scope.showauth = true;
                      // $ionicPopup.alert({title:"Authentication Failed1 !",template:'<center>'+response.data.message+'</center>'});
                         }
                   })
                 }
                 else{
                 // console.log(response.data);
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
   $scope.setfromDate = function(val){
        var ipObj1 = {
         callback: function (val) {  
         var fromDate = new Date(val);
           //console.log(fromDate);
           $rootScope.fromDate =  $filter('date')(fromDate , "dd-MMM-yyyy");
           $scope.getRecencyData();
          },
        to: new Date(),
         }; 
     ionicDatePicker.openDatePicker(ipObj1);
   }
   $scope.settoDate = function(val){
    var ipObj1 = {
     callback: function (val) {  
     var toDate = new Date(val);
       //console.log(toDate);
       $rootScope.toDate =  $filter('date')(toDate , "dd-MMM-yyyy");
        $scope.getRecencyData();
      },
      to: new Date(),

     }; 
    ionicDatePicker.openDatePicker(ipObj1);
  }
  $scope.clearfromDate = function(){
      $rootScope.fromDate ="";
  }
  $scope.cleartoDate = function(){
      $rootScope.toDate ="";
  }
      $scope.sortByDate = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
      //  console.log($scope.reverse)

        $scope.propertyName = propertyName;
      };   
      $scope.sortBy = function(propertyName,propertyName1){
      // console.log($scope.propertyName)
        $scope.reverse = ($scope.propertyName === propertyName && $scope.propertyName1 === propertyName1) ? !$scope.reverse : false;
      //  console.log($scope.reverse)
        $scope.propertyName = propertyName;
        $scope.propertyName1 = propertyName1;

      }
})


