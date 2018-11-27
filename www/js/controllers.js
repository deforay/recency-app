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
    $rootScope.recencyUnsyncCount = '('+$scope.unSyncCount+')';
    $rootScope.recencyUnsyncCount = '('+$scope.unSyncCount+')';
    $scope.displaybadge=true;
  }  else{
    $scope.displaybadge=false;
  }
  if(QCDataList != null){
    QCDataList    = JSON.parse(QCDataList);
    $scope.unSyncQcCount = Object.keys(QCDataList).length;
    $rootScope.qcUnsynCount = '('+$scope.unSyncQcCount+')';
    $rootScope.unSyncAddQcCount = "("+$scope.unSyncQcCount +"  Not Synced)";
    
    $scope.displayqcbadge=true;
  }  else{
    $rootScope.unSyncAddQcCount = '';
    $rootScope.qcUnsynCount = '';
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

$scope.groups = [
  {
    "id": 1,
    "name": "Local Data",
    "iconURL": "img/lab.png",
    "items":[
      {
        "id": 11,
    "name": "Local QC Data",
    "iconURL": "img/qcassurance.png",
    "menuhref":"#/app/viewQcAssurance",
      },
      {
        "id": 12,
    "name": "Local Recency Data",
    "iconURL": "img/localrecency.png",
    "menuhref":"#/app/viewRecency",
      }
    ]
  },
  {
    "id": 2,
    "name": "Server Data",
    "iconURL": "img/serverdata.png",
    "items":[
      {
        "id": 11,
    "name": "Server QC Data",
    "iconURL": "img/serverqc.png",
    "menuhref":"#/app/serverQcData",
      },
      {
        "id": 12,
    "name": "Server Recency Data",
    "iconURL": "img/serverrecency.png",
    "menuhref":"",
    "subMenuItems":[
      {
        "id":121,
        "name":"All Server Data",
        "iconURL":"img/serverrecency.png",
         "menuhref":"#/app/recencyData",
      },
      // {
      //   "id":122,
      //   "name":"Recency Result With VL",
      //   "iconURL":"img/serverrecency.png",
      //    "menuhref":"#/app/recencyDataWithVl",
      // },
      // {
      //   "id":123,
      //   "name":"Pending Results",
      //   "iconURL":"img/serverrecency.png",
      //    "menuhref":"#/app/pendingRecencyResult",
      // },
      // {
      //   "id":124,
      //   "name":"TAT Report",
      //   "iconURL":"img/serverrecency.png",
      //    "menuhref":"#/app/tatRecencyReport",
      // },

    ]
      }
    ]
    
  }
];
$scope.toggleGroup = function(group) {
  group.show = !group.show;
};
$scope.toggleSubGroup = function(item) {
  if ($scope.isSubGroupShown(item)) {
    $scope.shownChild = null;
  } else {
    $scope.shownChild = item;
  }
  // $ionicScrollDelegate.resize();
}
$scope.isGroupShown = function(group) {
  return group.show;
};
$scope.isSubGroupShown = function(item) {
  return $scope.shownChild === item;
}
$scope.serverlogout = function(){
  var confirmPopup1 = $ionicPopup.confirm({
    title: 'Server Logout',
    template: '<center>Server logout will completely log you out of the app. You will need internet connection and server login credentials if you want to continue using the app.<center>',
    buttons: [
      {
            text: '<b style="font-size: 14px;">I Understand</b>',
            type: 'button-positive',
      onTap: function(e) {
             
        var confirmPopup2 = $ionicPopup.confirm({
          title: 'Server Logout',
          template: '<center>Are you sure you want to completely log out from the app?<center>',
          buttons: [
             {
               text: '<b >Yes</b>',
               type: 'button-positive',
               onTap: function(e) {
                $localStorage.set('login',false);
                $localStorage.set('logout',false);
                $localStorage.remove('apppassword');  
                $state.go('login');
                $preLoader.hide(); 
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
$scope.applogout1 = function(){
  var confirmPopup = $ionicPopup.confirm({
    title: 'App Logout',
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
$scope.applogout = function() {
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
               $preLoader.hide(); 
               $state.go('app.addRecency');
               $refresh.page();
        //      $localStorage.set('login',false);
        //      $localStorage.set('logout',false);
        //      $localStorage.remove('apppassword');
        //      $state.go('login');
        //  $preLoader.hide();                           
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
     title: 'App Logout',
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

