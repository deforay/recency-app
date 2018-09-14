
app=angular.module('starter.authCtrl', ['starter.services'])

.controller('authCtrl', function($scope,$ionicPopup,$state,$ionicModal,$localStorage,$rootScope,$todo,$window,$location,$preLoader,$http) {
  $scope.loginData = {};
  $ionicModal.fromTemplateUrl('templates/auth.html', {
    scope: $scope,
    animation: 'slide-in-up'
 }).then(function(modal) {
    $scope.modal = modal;
 });

  $scope.doRefresh = function() {
    $preLoader.show();
    $window.location.reload(true);
  }
    $scope.doAddPasswordLogin = function(data){
     // console.log(data)
        if(data.newapppswd !=data.confirmapppswd){
        $ionicPopup.alert({title: 'Password Failed',template: "Passwords don't match."});

        }else{
        $localStorage.set('apppassword',data.newapppswd);
        $localStorage.set('login','success');
        $scope.viewLoginPassword =true;
        $scope.viewAddPassword = false;
         // $location.path('/app/addRecency');
        } 
    }  
    $scope.doPasswordLogin = function(password){
      console.log(password);
      if(password!=$localStorage.get('apppassword')){
        $ionicPopup.alert({title: 'Password Failed',template: "Invalid App Password."});

      }else{
        $location.path('/app/addRecency');
      }
    }
  $scope.doLogin = function(credentials) {
    if(!credentials.serverHost){
      $ionicPopup.alert({title: 'Login Failed',
        template:'Please Enter the Server Host'
    });
    }else if(!credentials.email){
      $ionicPopup.alert({title: 'Login Failed',template: 'Please Enter Valid Email ID'});
    }
    else if(!credentials.serverpassword){
      $ionicPopup.alert({title: 'Login Failed',template: 'Please Enter the Server Password'});

      }
      
      else{
         console.log(credentials);
         
          $localStorage.set('apiUrl',credentials.serverHost);    
      
           $preLoader.show();
        $http({
          url: credentials.serverHost+"/api/login",
          method: "POST",
          data: { "email": credentials.email, "password" : credentials.serverpassword }
      }).then(function successCallback(response) {
       
             console.log(response.data);
             if(response.data.status =="success"){
              console.log(response.data.userDetails);
              $preLoader.hide();
                $localStorage.set('authToken',response.data.userDetails['authToken']);
                $localStorage.set('email',response.data.userDetails['userEmailAddress']);
                $localStorage.set('userId',response.data.userDetails['userId']);
                $localStorage.set('userName',response.data.userDetails['userName']);
                $ionicPopup.alert({title:response.data.message});
              $scope.viewLogin = false;
              $scope.viewAddPassword = true;
             $scope.viewLoginPassword =false;
             }
            
          }, function errorCallback(response) {
            console.log(response.data);
            $preLoader.hide();
            $ionicPopup.alert({title:response.data.message});
      });



    }
  }
  
  
});
