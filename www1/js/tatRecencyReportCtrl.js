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
          $rootScope.fromVlDate =  $filter('date')(fromdate , "dd-MMM-yyyy");
          $rootScope.toVlDate =  $filter('date')(todate , "dd-MMM-yyyy");
          console.log($rootScope.fromVlDate,$rootScope.toVlDate)
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
                  $http.get($localStorage.get('apiUrl')+'/api/recency-result-with-vl?authToken='+$localStorage.get('authToken')+'&start='+$rootScope.fromVlDate+'&end='+$rootScope.toVlDate)
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
                      for(i=0;i<$scope.recencyDatas.length;i++)
                      {
                        $scope.recencyDatas[i].patient_id = "Xx" + $scope.recencyDatas[i].patient_id.slice(2);
                      }
                      $preLoader.hide()
                    }else{
                      $scope.displaymessage = true;
                    }
                   }
                   else{
                    $preLoader.hide();
                    $scope.recencyDatas = [];
                    $scope.displaymessage = true;
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

        $scope.$on("$ionicView.beforeEnter", function(event, data){
 
          var fromdate = new Date();
          var todate = new Date();
          var intYear = fromdate.getFullYear() - 1; 
          fromdate = fromdate.setFullYear(intYear);
          $rootScope.fromVlDate =  $filter('date')(fromdate , "dd-MMM-yyyy");
          $rootScope.toVlDate =  $filter('date')(todate , "dd-MMM-yyyy");
          console.log($rootScope.fromVlDate,$rootScope.toVlDate)
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
                  $http.get($localStorage.get('apiUrl')+'/api/recency-result-with-vl?authToken='+$localStorage.get('authToken')+'&start='+$rootScope.fromVlDate+'&end='+$rootScope.toVlDate)
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
                      for(i=0;i<$scope.recencyDatas.length;i++)
                      {
                        $scope.recencyDatas[i].patient_id = "Xx" + $scope.recencyDatas[i].patient_id.slice(2);
                      }
                      $preLoader.hide()
                    }else{
                      $scope.displaymessage = true;
                    }
                   }
                   else{
                    $preLoader.hide();
                    $scope.recencyDatas = [];
                    $scope.displaymessage = true;
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
        });
        
        $scope.getRecencyData = function(){
          
          console.log($rootScope.fromVlDate,$rootScope.toVlDate)
          $scope.fromDate = $rootScope.fromVlDate;
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
                  $http.get($localStorage.get('apiUrl')+'/api/recency-result-with-vl?authToken='+$localStorage.get('authToken')+'&start='+$rootScope.fromVlDate+'&end='+$rootScope.toVlDate)
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
                      for(i=0;i<$scope.recencyDatas.length;i++)
                      {
                        $scope.recencyDatas[i].patient_id = "Xx" + $scope.recencyDatas[i].patient_id.slice(2);
                      }
                      $preLoader.hide()
                    }else{
                      $scope.displaymessage = true;
                    }
                   }
                   else{
                    $preLoader.hide();
                    // $scope.showauth = true;
                    $scope.recencyDatas = [];
                    $scope.displaymessage = true;

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

    $scope.doLogin = function(credentials) {

      var fromdate = new Date();
      var todate = new Date();
      var intYear = fromdate.getFullYear() - 1; 
      fromdate = fromdate.setFullYear(intYear);
      $rootScope.fromVlDate =  $filter('date')(fromdate , "dd-MMM-yyyy");
      $rootScope.toVlDate =  $filter('date')(todate , "dd-MMM-yyyy");
      console.log($rootScope.fromVlDate,$rootScope.toVlDate)
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
                    
                   $http.get($localStorage.get('apiUrl')+'/api/recency-result-with-vl?authToken='+$localStorage.get('authToken')+'&start='+$rootScope.fromVlDate+'&end='+$rootScope.toDate)
                   .then(function(response) {
                     console.log(response);
                     if(response.data.status =="success"){
                      $localStorage.set('ServerRecencyData','login');
                      $preLoader.hide();
                      // $cordovaToast.show('Authentication is Sucess', 'long', 'bottom')
                      //       .then(function(success) {
                      //            // success
                      //        }, function (error) {
                      //            // error
                      //        });
                        $scope.showauth = false;  
                        console.log( response.data.recency)  
                        console.log($rootScope.fromVlDate)
                        if(response.data.recency.length>0){
                          $scope.displaymessage = false;
                          $preLoader.show();
                          $scope.recencyDatas =response.data.recency;
                          for(i=0;i<$scope.recencyDatas.length;i++)
                          {
                            $scope.recencyDatas[i].patient_id = "Xx" + $scope.recencyDatas[i].patient_id.slice(2);
                            // console.log($scope.recencyDatas[i].patient_id);
                          }
                          $preLoader.hide()
                        }else{
                          $scope.displaymessage = true;
                        }
                        
                     }
                     else{
                      $preLoader.hide();
                      $scope.recencyDatas = [];
                      $scope.displaymessage = true;

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


      $scope.setFromVlDate = function(val){
        var ipObj1 = {
         callback: function (val) {  
         var fromDate = new Date(val);
           console.log(fromDate);
           $rootScope.fromVlDate =  $filter('date')(fromDate , "dd-MMM-yyyy");
           $scope.getRecencyData();
          },
   to: new Date(),

         }; 
     ionicDatePicker.openDatePicker(ipObj1);
     console.log()
   
   }
   $scope.settoVlDate = function(val){
    var ipObj1 = {
     callback: function (val) {  
     var toDate = new Date(val);
       console.log(toDate);
       $rootScope.toDate =  $filter('date')(toDate , "dd-MMM-yyyy");
      },
      to: new Date(),

     }; 
 ionicDatePicker.openDatePicker(ipObj1);
 $scope.getRecencyData();

}
$scope.clearfromVlDate = function(){
  $rootScope.fromVlDate ="";
}
$scope.cleartoVlDate = function(){
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


