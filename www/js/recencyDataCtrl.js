
app=angular.module('starter.recencyDataCtrl', ['starter.services'])

.controller('recencyDataCtrl', function($scope,$rootScope,$localStorage,$http,$preLoader, $ionicPopup, $location,$window, $stateParams) {
   
    $(document).ready(function(){
        $rootScope.apiUrl = localStorage.getItem('apiUrl');
        $scope.showauth = true;
        console.log( $scope.showauth)
    });

    $scope.doLogin = function(credentials) {
       if(!credentials.email){
          $ionicPopup.alert({title: 'Login Failed',template: 'Please Enter Valid Email ID'});
        }
        else if(!credentials.serverpassword){
          $ionicPopup.alert({title: 'Login Failed',template: 'Please Enter the Server Password'});
    
          }
          
          else{
            // console.log(credentials);
             credentials.serverHost= $localStorage.get('apiUrl');    
             console.log(credentials);
              $preLoader.show();
            $http({
              url: credentials.serverHost+"/api/login",
              method: "POST",
              data: { "email": credentials.email, "password" : credentials.serverpassword }
          }).then(function successCallback(response) {
                 console.log(response.data);
                 if(response.data.status =="success"){
                  console.log(response.data.userDetails)
                    $localStorage.set('authToken',response.data.userDetails['authToken']);
                    $preLoader.hide();
                       console.log($localStorage.get('apiUrl')+'/api/recency?authToken='+$localStorage.get('authToken'))
                   $http.get($localStorage.get('apiUrl')+'/api/recency?authToken='+$localStorage.get('authToken'))
                   .then(function(response) {
                     if(response.data.status =="success"){
                      $scope.showauth = false;   
                      console.log( response.data) 
                     }else{
                      $scope.showauth = true;
                      $ionicPopup.alert({title:"Authentication Failed !",template:'<center>'+response.data.message+'</center>'});
                     }
                        
                  
                   })
                   

                 }
              }, function errorCallback(response) {
                console.log(response.data);
                $preLoader.hide();
                $ionicPopup.alert({title:"Authentication Failed !",template:'<center>'+response.data.message+'</center>'});
          });
    
    
    
        }
      }  
});