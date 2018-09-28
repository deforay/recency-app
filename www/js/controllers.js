angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$rootScope,$ionicModal,  $window, $ionicModal, $timeout,$ionicPopup,$localStorage,$preLoader, $state) {

 //$rootScope.apiUrl = 'http://recency.deforay.in/';
 // $rootScope.apiUrl='http://recency-web/';
  $scope.loginData = {};

  $scope.doRefresh = function() {
    $preLoader.show();
    $window.location.reload(true);
    $preLoader.hide();
};

  $scope.logout = function() {
    var confirmPopup = $ionicPopup.confirm({
           title: 'Logout',
           template: '<center>Are you sure want to Logout?<center>',
            buttons: [
                  {
                    text: '<b>Yes</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $preLoader.show();
        
                    $localStorage.set('logout',true);
                     // $window.localStorage.clear();
                     // $refresh.page();
                     $preLoader.hide(); 
                     $state.go('login');
                    }
                  },
                  { text: 'Cancel', type: 'button-assertive',onTap: function(e) { return true; } },
                ]
        });
        confirmPopup.then(function(res) {
           if(res) {
             // console.log('Yes');
           } else {
              //console.log('No!');
           }
        });
   }
 
})

