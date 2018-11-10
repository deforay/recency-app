angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$rootScope,$ionicModal,  $window, $ionicModal, $timeout,$ionicPopup,$localStorage,$preLoader, $state) {

 //$rootScope.apiUrl = 'http://recency.deforay.in/';
 // $rootScope.apiUrl='http://recency-web/';
  $scope.loginData = {};
  $scope.displaybadge=false;
  $scope.displayqcbadge= false;

  $scope.doRefresh = function() {
    $preLoader.show();
    $window.location.reload(true);
    $preLoader.hide();
};
var recencyList =   localStorage.getItem('RecencyData');
var QCDataList =   localStorage.getItem('QCData');
//console.log(recencyList)
if(recencyList != null){
  recencyList    = JSON.parse(recencyList);
  $scope.unSyncCount = Object.keys(recencyList).length;
  $scope.displaybadge=true;
}  else{
  $scope.displaybadge=false;
}
if(QCDataList != null){
  QCDataList    = JSON.parse(QCDataList);
  $scope.unSyncQcCount = Object.keys(QCDataList).length;
  $scope.displayqcbadge=true;
}  else{
  $scope.displayqcbadge=false;
}

$scope.appVersion = 0.1;
localStorage.setItem('AppVersion',$scope.appVersion);
// if($scope.syncCount== undefined || $scope.syncCount == ""){
//      $scope.syncCount = 0;
//      localStorage.setItem('syncCount', $scope.syncCount);
//     console.log($scope.syncCount);
//     $scope.displaybadge=false;
// }else{
//   $scope.displaybadge=true;
  
// }
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

