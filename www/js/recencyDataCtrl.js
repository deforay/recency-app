
app=angular.module('starter.recencyDataCtrl', ['starter.services'])

.controller('recencyDataCtrl', function($scope,$rootScope,$cordovaToast,$localStorage,$http,$preLoader, $ionicPopup, $location,$window, $stateParams) {
   
  $scope.displaybadge = false;

        $rootScope.apiUrl = localStorage.getItem('apiUrl');
        $scope.showauth = true;
      //  console.log( $scope.showauth)


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
              $preLoader.show();
            $http({
              url: credentials.serverHost+"/api/login",
              method: "POST",
              data: { "email": credentials.email, "password" : credentials.serverpassword }
          }).then(function successCallback(response) {
                 console.log(response.data);
                 if(response.data.status =="success"){
                    $localStorage.set('authToken',response.data.userDetails['authToken']);
                    
                   $http.get($localStorage.get('apiUrl')+'/api/recency?authToken='+$localStorage.get('authToken'))
                   .then(function(response) {
                     if(response.data.status =="success"){
                      $preLoader.hide();
                      $cordovaToast.show('Authentication is Sucess', 'long', 'bottom')
                            .then(function(success) {
                                 // success
                             }, function (error) {
                                 // error
                             });
                        $scope.showauth = false;   
                        console.log( response.data.recency) 
                        $preLoader.show()
                        $scope.recencyDatas =response.data.recency;
                        for(i=0;i<$scope.recencyDatas.length;i++)
                        {
                          $scope.recencyDatas[i].patient_id = "Xx" + $scope.recencyDatas[i].patient_id.slice(2);
                          // console.log($scope.recencyDatas[i].patient_id);
                        }
                        $preLoader.hide()
                     }
                     else{
                      $preLoader.hide();

                      $scope.showauth = true;
                      $ionicPopup.alert({title:"Authentication Failed !",template:'<center>'+response.data.message+'</center>'});
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
})


