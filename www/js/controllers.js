angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$rootScope,$ionicModal,$ionicHistory, $location,$refresh,  $window, $ionicModal, $timeout,$ionicPopup,$localStorage,$preLoader, $state) {

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
$scope.updateBadge = function(){
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
  
  $scope.appVersion = 0.2;
}

// $rootScope.displaybadge=true;

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

$scope.appVersion = 0.2;
localStorage.setItem('AppVersion',$scope.appVersion);
// if($scope.syncCount== undefined || $scope.syncCount == ""){
//      $scope.syncCount = 0;
//      localStorage.setItem('syncCount', $scope.syncCount);
//     console.log($scope.syncCount);
//     $scope.displaybadge=false;
// }else{
//   $scope.displaybadge=true;
  
// }
$scope.refresh = function()
	{
    console.log($state.current)
		$ionicHistory.clearCache([$state.current.name]).then(function()
		{
			$state.reload($state.current);
		});
	};
$scope.addRecency = function(){
  console.log($state.current)
		
  $location.path('/app/addRecency');
  // $ionicHistory.clearCache([$state.current.name]).then(function()
	// 	{
			// $state.reload($state.current);
		// });
  
  
}
  $scope.logout = function() {
  // console.log($state.current.name);
   if($state.current.name=='app.recencyData'){
     if($localStorage.get('ServerRecencyData')=='login'){
       var confirmPopup1 = $ionicPopup.confirm({
         title: 'Logout',
         template: '<center>Are you sure want to Logout?<center>',
         buttons: [
               {
                 text: '<b>Yes</b>',
                 type: 'button-positive',
                 onTap: function(e) {
                  $preLoader.show();
     
                 $localStorage.set('ServerRecencyData','logout');
                  // $window.localStorage.clear();
              //  $state.go('app.addRecency');

          $location.path('/app/addRecency');     
          $refresh.page();
          $preLoader.hide(); 
                              
                 }
               },
               { text: 'Cancel', type: 'button-assertive',onTap: function(e) { return true; } },
             ]
        });
        confirmPopup1.then(function(res) {
         if(res) {
          // console.log('Yes');
        } else {
          //console.log('No!');
         }
       });
     }  
     else
     {
      var confirmPopup2 = $ionicPopup.confirm({
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
            confirmPopup2.then(function(res) {
              if(res) {
              // console.log('Yes');
             } else {
              //console.log('No!');
              }
             });
     }
   }
   else{
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
  
  }
 
})

