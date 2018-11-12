
app=angular.module('starter.loginCtrl', ['starter.services'])

.controller('loginCtrl', function($scope,$ionicPopup,$state, $cordovaToast,$timeout,$localStorage,$rootScope,$todo,$window,$location,$preLoader,$http) {
  $scope.loginData = {};

  if($localStorage.get('logout')=='true' || $localStorage.get('login')=='success'){
   $scope.viewLogin = false;
   $scope.viewAddPassword = false;
   $scope.viewConfirmPassword = false;
   $scope.viewLoginPassword =true;
  }else{
    $scope.viewLogin = true;
    $scope.viewAddPassword = false;
    $scope.viewConfirmPassword = false;
    $scope.viewLoginPassword =false;
  }
  
  $scope.doRefresh = function() {
    $preLoader.show();
    $window.location.reload(true);
  }
  
    $scope.doPasswordLogin = function(password){

      if(password!=$localStorage.get('apppassword')){
        $ionicPopup.alert({title: 'Password Failed',template: "Invalid App Password."});

      }else{
        $location.path('/app/addRecency');
      }
    }

    $scope.password ={};
    $scope.createpassword ={};
    $scope.confirmpassword ={};
    $scope.initAppLogin = function() {
      $scope.passcode = "";
      $scope.disablebtn = true;
    }
    $scope.initCreateApp= function() {
      $scope.createpasscode = "";
    }
    $scope.initConfirmApp= function() {
      $scope.confirmpasscode = "";
    }

    $scope.createApp = function(value){
      if($scope.createpasscode.length < 4) {
        
        $scope.createpasscode = $scope.createpasscode + value;
      console.log($scope.createpasscode)
        if($scope.createpasscode.length == 1){
          $scope.createpassword.one = value;
        } else if($scope.createpasscode.length == 2){
          $scope.createpassword.two = value;
        } else if($scope.createpasscode.length == 3){
          $scope.createpassword.three = value;
        }
      else {
          $scope.createpassword.four = value;
       console.log($scope.createpasscode)

          $timeout(function() {
            $scope.viewAddPassword = false;
           $scope.viewConfirmPassword = true;
            $preLoader.hide();
        }, 500);
         
      } 
    }
    }
    $scope.ConfirmApp = function(value){
      if($scope.confirmpasscode.length < 4) {
        
        $scope.confirmpasscode = $scope.confirmpasscode + value;
      console.log($scope.confirmpasscode)
        if($scope.confirmpasscode.length == 1){
          $scope.confirmpassword.one = value;
        } else if($scope.confirmpasscode.length == 2){
          $scope.confirmpassword.two = value;
        } else if($scope.confirmpasscode.length == 3){
          $scope.confirmpassword.three = value;
        }
      else {
          $scope.confirmpassword.four = value;
        if($scope.confirmpasscode!= $scope.createpasscode){
          $(".view-passcode-col").addClass('error')
          $(".view-passcode-col").removeClass('valid');
          $scope.confirmpassword.one="";
          $scope.confirmpassword.two = "";
          $scope.confirmpassword.three = "";
          $scope.confirmpassword.four = "";
          $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 4);
          $ionicPopup.alert({title:'Login Failed!',template:'Wrong App Password'});
        }else{
          $(".view-passcode-col").addClass('valid')
          $(".view-passcode-col").removeClass('error')
          $localStorage.set('apppassword',$scope.confirmpasscode);
          
          $preLoader.show();
          $cordovaToast
          .show('App Password Created Successfully', 'long', 'center')
          .then(function(success) {
            // success
          }, function (error) {
            // error
          });
          $timeout(function() {
            $location.path('/app/addRecency');
            $preLoader.hide();
        }, 500);
        }
         
      } 
    }
    }
    $scope.deleteCreate = function(){
      if($scope.createpasscode.length == 4){
        $scope.createpassword.four = "";
        $scope.createpasscode = $scope.createpasscode.substring(0, $scope.createpasscode.length - 1);
      } else if($scope.createpasscode.length == 3){
        $scope.createpassword.three = "";
        $scope.createpasscode = $scope.createpasscode.substring(0, $scope.createpasscode.length - 1);
      } else if($scope.createpasscode.length == 2){
        $scope.createpassword.two = "";
        $scope.createpasscode = $scope.createpasscode.substring(0, $scope.createpasscode.length - 1);
      } else {
        $scope.createpassword.one = "";
        $scope.createpasscode = $scope.createpasscode.substring(0, $scope.createpasscode.length - 1);
      }
      console.log($scope.createpasscode)

    }
    $scope.backToCreate = function(){
      $scope.viewAddPassword = true;
      $scope.viewConfirmPassword = false;
      $scope.confirmpassword.four = "";
      $scope.confirmpassword.three = "";
      $scope.confirmpassword.two = "";
      $scope.confirmpassword.one = "";
    }
    $scope.deleteConfirm = function(){
      if($scope.confirmpasscode.length == 4){
        $scope.confirmpassword.four = "";
        $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 1);
      } else if($scope.confirmpasscode.length == 3){
        $scope.confirmpassword.three = "";
        $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 1);
      } else if($scope.confirmpasscode.length == 2){
        $scope.confirmpassword.two = "";
        $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 1);
      } else {
        $scope.confirmpassword.one = "";
        $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 1);
      }
      console.log($scope.confirmpasscode)
    }
    

    $scope.add = function(value) {
      if($scope.passcode.length < 4) {      
        $scope.passcode = $scope.passcode + value;
        if($scope.passcode.length == 1){
          $scope.password.one = value;
        } else if($scope.passcode.length == 2){
          $scope.password.two = value;
        } else if($scope.passcode.length == 3){
          $scope.password.three = value;
        }
        else{
        }
        if($scope.passcode.length == 4) {
          $scope.password.four = value;
          $scope.disablebtn = false;
            if($scope.passcode != $localStorage.get('apppassword')){
            //  console.log("wrong app passcode");
              $scope.disablebtn = true;
              $(".passcode-col").addClass('error')
              $(".passcode-col").removeClass('valid');
              $scope.password.one="";
              $scope.password.two = "";
              $scope.password.three = "";
              $scope.password.four = "";
              $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 4);
              $ionicPopup.alert({title:'Login Failed!',template:'Wrong App Password'});

            }else{
              $(".passcode-col").addClass('valid')
              $(".passcode-col").removeClass('error')
              $preLoader.show();
              $timeout(function() {
               
                $location.path('/app/addRecency');
                $preLoader.hide();
            }, 500);
             
            }
        }else{
          $scope.disablebtn = true;
        }
    }
    }
  
    $scope.delete = function() {
      if($scope.passcode.length == 4){
        $scope.password.four = "";
        $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
      } else if($scope.passcode.length == 3){
        $scope.password.three = "";
        $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
      } else if($scope.passcode.length == 2){
        $scope.password.two = "";
        $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
      } else {
        $scope.password.one = "";
        $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
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
         if(credentials.serverHost.indexOf("https://") == 0){
          console.log(credentials.serverHost);
          credentials.serverHost =credentials.serverHost;
         }
         else if(credentials.serverHost.indexOf("http://") == 0){
          credentials.serverHost =credentials.serverHost;
         }else{
          credentials.serverHost ="http://"+credentials.serverHost;

         }
          $localStorage.set('apiUrl',credentials.serverHost);       
          $preLoader.show();      
       $http({
          url: credentials.serverHost+"/api/login",
          method: "POST",
          data: { "email": credentials.email, "password" : credentials.serverpassword }
      }).then(function successCallback(response) {
             console.log(response.data);
             if(response.data.status =="success"){
              $preLoader.hide();
              $localStorage.set('login','success');
                $localStorage.set('authToken',response.data.userDetails['authToken']);
                $localStorage.set('ServerRecencyData','success');
                $localStorage.set('email',response.data.userDetails['userEmailAddress']);
              $localStorage.set('serverpassword',credentials.serverpassword);
                $localStorage.set('userId',response.data.userDetails['userId']);
                $localStorage.set('userName',response.data.userDetails['userName']);  
            $cordovaToast.show('Successfully Logged in', 'long', 'bottom')
              .then(function(success) {
                // success
              }, function (error) {
                // error
              });
              $scope.viewLogin = false;
              $scope.viewAddPassword = true;
              $scope.viewConfirmPassword = false;
             $scope.viewLoginPassword =false;
             }
             else{
           //   console.log(response.data);
              $preLoader.hide();
              $ionicPopup.alert({title:'Login Failed!',template:response.data.message});
             }    
        
      }, function (error) {
        $preLoader.hide();
        $ionicPopup.alert({title:'Login Failed!',template:'Please Check Your Login Credentials'});
     }
    );
    }
  }
  
  
});
