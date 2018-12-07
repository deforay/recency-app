angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$rootScope,$http,$ionicModal,$ionicHistory, $location,$refresh,  $window, $ionicModal, $timeout,$ionicPopup,$localStorage,$preLoader, $state) {

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
  
  $scope.appVersion = 0.6;
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

$scope.appVersion = 0.6;
localStorage.setItem('AppVersion',$scope.appVersion);

// $scope.refresh = function()
// 	{
//     console.log($state.current)
// 		$ionicHistory.clearCache([$state.current.name]).then(function()
// 		{
// 			$state.reload($state.current);
// 		});
// 	};
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
        "iconURL":"img/database.png",
         "menuhref":"#/app/recencyData",
      },
      {
        "id":122,
        "name":"Recency Result With VL",
        "iconURL":"img/database.png",
         "menuhref":"#/app/recencyDataWithVl",
      },
      {
        "id":123,
        "name":"Pending Results",
        "iconURL":"img/database.png",
         "menuhref":"#/app/pendingRecencyResult",
      },
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
$scope.$on("$ionicView.beforeEnter", function(event, data){

  $http.get($localStorage.get('apiUrl')+'/api/facility')
  .success(function(data) {
   $scope.facilityData = data;
   var facilitylen = ($scope.facilityData.length+1).toString();
   $scope.facilityData.push({
      "facility_id": facilitylen,
      "facility_name":"Other"
    })
    localStorage.setItem('FacilityData',JSON.stringify($scope.facilityData))    
   console.log($scope.facilityData)           
  });
  if(JSON.parse(localStorage.getItem('PartialRecencyData'))==null){
  $http.get($localStorage.get('apiUrl')+'/api/global-config')
  .success(function(data) {
    console.log(data);
  $scope.configdata =data.config;
     for(i=0;i<$scope.configdata.length;i++){        
        if($scope.configdata[i].global_name =="mandatory_fields" || $scope.configdata[i].global_name =="admin_email" || $scope.configdata[i].global_name =="admin_phone" )   {
          $scope.configdata.splice(i);
        }    
     } 
    // for(i=0;i<$scope.configdata.length;i++){
    //       $scope.recency.location[i]="";
    //      }
   localStorage.setItem('GlobalConfig',JSON.stringify($scope.configdata)) 
    console.log($scope.configdata)
    });
    $http.get($localStorage.get('apiUrl')+'/api/recency-mandatory')
    .success(function(data) {
     $scope.mandatoryData =data.fields;
    console.log(data)
     localStorage.setItem('MandatoryData',JSON.stringify($scope.mandatoryData)) 
     console.log( $scope.mandatoryData);           
    });
    $http.get($localStorage.get('apiUrl')+'/api/recency-mandatory')
    .success(function(data) {
      $scope.optionalData ={};
     $scope.optionalData =data.fields;
     //console.log(data)

     localStorage.setItem('OptionalData',JSON.stringify($scope.optionalData)) 
     
     $scope.optionalArr =[];

     if($scope.optionalData.length>0){

     // console.log( $scope.optionalData)
     $scope.optionalArr.location =[];
     $scope.optionalArr.location[0] =true;
     $scope.optionalArr.location[1] =true;
     $scope.optionalArr.location[2] =true;

       for(i=0;i<$scope.optionalData.length;i++){
         var optionalField=$scope.optionalData[i];
       //  console.log(optionalField)
       //  console.log($scope.optionalData)
       if($scope.optionalData[i]== optionalField){
         $scope.optionalArr[optionalField]= false; 
       }else{
         $scope.optionalArr[optionalField]= true;
       }
       if($scope.optionalData[i]=='location_one'){
        $scope.optionalArr.location[0]=false;
      }
      if($scope.optionalData[i]=='location_two'){
        $scope.optionalArr.location[1]=false;
      }
      if($scope.optionalData[i]=='location_three'){
        $scope.optionalArr.location[2]=false;
      }
      $scope.optionalArr.facilityId=true;
      $scope.optionalArr.sampleId=true;
      $scope.optionalArr.dob=true;
     }
    // console.log($scope.optionalArr)
    // console.log($scope.optionalArr.location)


     $scope.ss = Object.assign({}, $scope.optionalArr);
     console.log($scope.ss)
     localStorage.setItem('OptionalFieldsFlag',JSON.stringify($scope.ss));
     }          
    });
    $http.get($localStorage.get('apiUrl')+'/api/province')
    .success(function(data) {
     $scope.provinceData =data.province;
     localStorage.setItem('ProvinceData',JSON.stringify(data.province))      
    });
    $http.get($localStorage.get('apiUrl')+'/api/district')
    .success(function(data) {
     localStorage.setItem('DistrictData',JSON.stringify(data.district))           
    });
    $http.get($localStorage.get('apiUrl')+'/api/city')
    .success(function(data) {     
     localStorage.setItem('CityData',JSON.stringify(data.city))           
    });
  }else{
    $scope.mandatoryData = JSON.parse(localStorage.getItem('MandatoryData'));
    $scope.configdata = JSON.parse(localStorage.getItem('GlobalConfig'));
    $scope.provinceData = JSON.parse(localStorage.getItem('ProvinceData'));

  }
  $http.get($localStorage.get('apiUrl')+'/api/risk-populations')
  .success(function(data) {
   $scope.riskpopulations =data;
   $scope.riskpopulations.push({
    "rp_id": $scope.riskpopulations.length+1,
    "name":"Other"
  })
  localStorage.setItem('RiskPopulations',JSON.stringify($scope.riskpopulations))       

//  console.log($scope.riskpopulations)  
  });
});



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
  if($state.current.name=='app.recencyData' || $state.current.name=='app.recencyDataWithVl'|| $state.current.name=='app.pendingRecencyResult' ){
    if($localStorage.get('ServerRecencyData')=='login'){
      var confirmPopup1 = $ionicPopup.confirm({
        title: 'Server Logout',
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
                  $localStorage.set('ServerRecencyData','logout');
                
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

