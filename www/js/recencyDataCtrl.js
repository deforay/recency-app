
app=angular.module('starter.recencyDataCtrl', ['starter.services'])

.controller('recencyDataCtrl', function($scope,$rootScope,$filter,$cordovaToast,ionicDatePicker,$localStorage,$http,$preLoader, $ionicPopup, $location,$window, $stateParams) {
   
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
          console.log($rootScope.fromDate,$rootScope.toDate)
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
                  $http.get($localStorage.get('apiUrl')+'/api/recency?authToken='+$localStorage.get('authToken')+'&start='+$rootScope.fromDate+'&end='+$rootScope.toDate)
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
                      console.log($scope.recencyDatas);
                      $scope.recencyDatas =response.data.recency;
                      $scope.recencyCount = $scope.recencyDatas.length;
                      for(i=0;i<$scope.recencyDatas.length;i++)
                      {
                        $scope.recencyDatas[i].patient_id = "Xx" + $scope.recencyDatas[i].patient_id.slice(2);
                     
                      }
                      $scope.displayCount = true;
                      $preLoader.hide()
                    }else{
                      $scope.recencyDatas = [];
                      $scope.displaymessage = true;
                      $scope.recencyCount ="";
                      $scope.displayCount = false;
  
                    }
                   }
                   else{
                    $preLoader.hide();
                    $localStorage.set('ServerRecencyData','login');
                    $scope.showauth = false;  
                    $scope.recencyDatas = [];
                    $scope.displaymessage = true;
                    $scope.recencyCount ="";
                    $scope.displayCount = false;

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
        $scope.getRecencyData = function(){
          console.log($rootScope.fromDate,$rootScope.toDate)
          
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
                  $http.get($localStorage.get('apiUrl')+'/api/recency?authToken='+$localStorage.get('authToken')+'&start='+$rootScope.fromDate+'&end='+$rootScope.toDate)
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
                      console.log($scope.recencyDatas);

                      $scope.recencyDatas =response.data.recency;
                      $scope.recencyCount = $scope.recencyDatas.length;

                      for(i=0;i<$scope.recencyDatas.length;i++)
                      {
                        $scope.recencyDatas[i].patient_id = "Xx" + $scope.recencyDatas[i].patient_id.slice(2);
                      }
                      $scope.displayCount = true;
                      $preLoader.hide()
                    }else{
                      $scope.recencyDatas = [];
                      $scope.displaymessage = true;
                      $scope.recencyCount ="";
                      $scope.displayCount = false;
                    }
                   }
                   else{
                    $preLoader.hide();
                    $localStorage.set('ServerRecencyData','login');
                    $scope.showauth = false;  
                    $scope.recencyDatas = [];
                    $scope.displaymessage = true;
                    $scope.recencyCount ="";
                    $scope.displayCount = false;

                    // $ionicPopup.alert({title:"Authentication Failed 1 !",template:'<center>'+response.data.message+'</center>'});
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
        $scope.doRefresh = function() {
          $preLoader.show();
          $window.location.reload(true);
          $preLoader.hide(); 
        }

    $scope.doLogin = function(credentials) {
      var fromdate = new Date();
      var todate = new Date();
      var intYear = fromdate.getFullYear() - 1; 
      fromdate = fromdate.setFullYear(intYear);
      $rootScope.fromDate =  $filter('date')(fromdate , "dd-MMM-yyyy");
      $rootScope.toDate =  $filter('date')(todate , "dd-MMM-yyyy");
      console.log($rootScope.fromDate,$rootScope.toDate)
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
                    
                   $http.get($localStorage.get('apiUrl')+'/api/recency?authToken='+$localStorage.get('authToken')+'&start='+$rootScope.fromDate+'&end='+$rootScope.toDate)
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
                        console.log($rootScope.fromDate)
                        if(response.data.recency.length>0){
                          $scope.displaymessage = false;
                          $preLoader.show();
                          $scope.recencyDatas =response.data.recency;
                          $scope.recencyCount = $scope.recencyDatas.length;

                          for(i=0;i<$scope.recencyDatas.length;i++)
                          {
                            $scope.recencyDatas[i].patient_id = "Xx" + $scope.recencyDatas[i].patient_id.slice(2);
                            // console.log($scope.recencyDatas[i].patient_id);
                          }
                          $scope.displayCount = true;
                          $preLoader.hide();
                        }else{
                          $scope.recencyDatas = [];
                          $scope.displaymessage = true;
                          $scope.recencyCount ="";
                          $scope.displayCount = false;                        }
                        
                     }
                     else{
                      $preLoader.hide();
                      $localStorage.set('ServerRecencyData','login');
                      $scope.showauth = false;  
                      $scope.recencyDatas = [];
                      $scope.displaymessage = true;
                      $scope.recencyCount ="";
                      $scope.displayCount = false;

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
              // }, function errorCallback(response) {
              //   console.log(response.data);
              //   $preLoader.hide();
              //   $ionicPopup.alert({title:"Authentication Failed !",template:'<center>'+response.data.message+'</center>'});
          });
    
        }
      }  

      $scope.setFromDate = function(val){
        var ipObj1 = {
         callback: function (val) {  
         var fromDate = new Date(val);
           console.log(fromDate);
           $rootScope.fromDate =  $filter('date')(fromDate , "dd-MMM-yyyy");
           $scope.getRecencyData();
          },
   to: new Date(),

         }; 
     ionicDatePicker.openDatePicker(ipObj1);
     console.log()
   
   }
   $scope.settoDate = function(val){
    var ipObj1 = {
     callback: function (val) {  
     var toDate = new Date(val);
       console.log(toDate);
       $rootScope.toDate =  $filter('date')(toDate , "dd-MMM-yyyy");
 $scope.getRecencyData();
      },
      to: new Date(),

     }; 
 ionicDatePicker.openDatePicker(ipObj1);

}
$scope.clearFromDate = function(){
  $rootScope.fromDate ="";
  console.log($rootScope.fromDate)
}
$scope.cleartoDate = function(){
  $rootScope.toDate ="";

}
      $scope.sortByDate = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        console.log($scope.reverse)

        $scope.propertyName = propertyName;
      };   
      $scope.sortBy = function(propertyName,propertyName1){
          console.log($scope.propertyName)
        $scope.reverse = ($scope.propertyName === propertyName && $scope.propertyName1 === propertyName1) ? !$scope.reverse : false;
        console.log($scope.reverse)
        $scope.propertyName = propertyName;
        $scope.propertyName1 = propertyName1;

      }
})


