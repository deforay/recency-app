angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope,$rootScope,$http,$ionicModal,$ionicHistory,$cordovaNetwork, $location,$refresh,  $window, $ionicModal, $timeout,$ionicPopup,$localStorage,$preLoader, $state) {

  $('.authWrapper  .loginFields  .input-field input')
  .focus(function() {
    
      $('.authWrapper .loginFields').addClass('focused');
  })
  .blur(function() {
      $('.authWrapper .loginFields').removeClass('focused');
  });

  $scope.loginData = {};
  $scope.displaybadge=false;
  $scope.displayqcbadge= false;

  $scope.doRefresh = function() {
    $preLoader.show();
    $window.location.reload(true);
    $preLoader.hide();
};

  document.addEventListener("online",ononline, false);
  document.addEventListener("offline", onoffline, false);
  function ononline() {

    var isOnline = $cordovaNetwork.isOnline();
    console.log("isOnline",isOnline);
    $localStorage.set('online',isOnline);
    $localStorage.set('offline','false');
  }
  function onoffline() {
    var isOnline = $cordovaNetwork.isOnline();

    $localStorage.set('online',isOnline);
    $localStorage.set('offline','true');
    console.log("isOnline",isOnline);

    var localarr = [];
    var localfacility =[];
    var localtestfacility =[];
    $scope.freq_facilities = [];
    $scope.freq_testfacilities = [];
    $scope.freq_provinces=[];
    $scope.allfacilities = new Array();
    $scope.alltestfacilities = new Array();
    $scope.facilityData = new Array();
    $scope.facilityTestData = new Array();
    localarr = JSON.parse(localStorage.getItem('RecencyData'));
    localfacility =JSON.parse(localStorage.getItem('FacilityData'));
    localtestfacility =JSON.parse(localStorage.getItem('TestingFacilityData'));
    //localprovince = JSON.parse(localStorage.getItem('ProvinceData'));
    if(localarr !=null){
      //Display recent Facilities  in Facility dropdown
   var localarrsize = Object.keys(localarr).length;
   var obj = {};
   $scope.allfacilities =localfacility;
   for(i=0;i<localarrsize;i++){
    //console.log(localarr[i]['location']['0'],localarr[i]['location']['1'],localarr[i]['location']['2'])

    if(localarr[i]['facility_name']=='Other'){
      $scope.freq_facilities.unshift({
        "facility_id":localarr[i]['facilityId'],
        "facility_name":localarr[i]['facility_name'],
      })
    }else{
      $scope.freq_facilities.unshift({
        "facility_id":localarr[i]['facilityId'],
        "facility_name":localarr[i]['facility_name'],
        "province":localarr[i]['location']['0'],
        "district":localarr[i]['location']['1'],
        "city":localarr[i]['location']['2']
      })
    }

   } 
   for(i =0;i<Object.keys($scope.freq_facilities).length;i++){  
     $scope.allfacilities.unshift($scope.freq_facilities[i]);
   }
  // console.log($scope.freq_facilities);

   var trimmedArray = [];
   var values = [];
   var value;
 //  console.log($scope.allfacilities);
   for(var i = 0; i < $scope.allfacilities.length; i++) {
     value = $scope.allfacilities[i]['facility_id'];
     if(values.indexOf(value) === -1) {
       trimmedArray.push($scope.allfacilities[i]);
       values.push(value);
     }
   }
   $scope.facilityData = trimmedArray;
  // console.log( $scope.facilityData);
   localStorage.setItem('FacilityData',JSON.stringify($scope.facilityData))    
  //  //Display Recent Testing Facilities dropdown
   
  //   $scope.alltestfacilities =localtestfacility;
  //   for(i=0;i<localarrsize;i++){
  //     $scope.freq_testfacilities.unshift({
  //       "facility_id":localarr[i]['facilityId'],
  //       "facility_name":localarr[i]['facility_name']
  //     })
  //   } 
  //   for(i =0;i<Object.keys($scope.freq_testfacilities).length;i++){  
  //     $scope.alltestfacilities.unshift($scope.freq_testfacilities[i]);
  //   }
  //   var trimmedArray = [];
  //   var values = [];
  //   var value;
  //   for(var i = 0; i < $scope.alltestfacilities.length; i++) {
  //     value = $scope.alltestfacilities[i]['facility_id'];
  //     if(values.indexOf(value) === -1) {
  //       trimmedArray.push($scope.alltestfacilities[i]);
  //       values.push(value);
  //     }
  //   }
  //   $scope.facilityTestData = trimmedArray;
    //console.log( $scope.facilityTestData);

    //Display recent province in Province dropdown

    // $scope.allprovinces =localprovince;
    // for(i=0;i<localarrsize;i++){
    //   $scope.freq_provinces.unshift({
    //     "province_id":localarr[i]['location_one'],
    //     "province_name":localarr[i]['location_one_name']
    //   })
    // //  console.log($scope.freq_provinces)
    // } 
    // for(i =0;i<Object.keys($scope.freq_provinces).length;i++){  
    //   $scope.allprovinces.unshift($scope.freq_provinces[i]);
    //   //console.log($scope.allprovinces)
    // }
    // var trimmedArray1 = [];
    // var values1 = [];
    // var value1;
    // for(var i = 0; i < $scope.allprovinces.length; i++) {
    //   value1 = $scope.allprovinces[i]['province_id'];
    //   if(values1.indexOf(value1) === -1) {
    //     trimmedArray1.push($scope.allprovinces[i]);
    //     values1.push(value1);
    //   }
    // }
    // $scope.provinceData = trimmedArray1;  
    console.log($scope.facilityData)
   
}else{
 $scope.facilityData =localfacility;
// $scope.facilityTestData =localtestfacility;
 //$scope.provinceData = localprovince;  
}

  }
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
  
  $scope.appVersion = 2.1;
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

$scope.appVersion = 2.1;
localStorage.setItem('AppVersion',$scope.appVersion);

$scope.addRecency = function(){
  console.log($state.current)	
  $location.path('/app/addRecency');

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
      {
        "id":124,
        "name":"TAT Report",
        "iconURL":"img/database.png",
         "menuhref":"#/app/tatRecencyReport",
      },

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
  $scope.userId = JSON.parse(localStorage.getItem('userId'));

  $http.get($localStorage.get('apiUrl')+'/api/facility?userId='+$scope.userId)
  .success(function(data) {
    console.log(data);
   $scope.facilityData = data.facility;

  //  var faciltiydataObj = data.facility;
  //  var maxid = Math.max.apply(Math,faciltiydataObj.map(function(o){return o.facility_id;}))
  //  var len = $scope.facilityData.length - 1;
  //  var facilityid = (maxid+1).toString();
  // console.log(facilityid)
  //  $scope.facilityData.push({
  //   "facility_id": facilityid,
  //   "facility_name":"Other"
  // })
  localStorage.setItem('FacilityData',JSON.stringify($scope.facilityData))    

   $scope.facilityTestData = data.facilityTest;

  //  var testlen = $scope.facilityTestData.length - 1;
  //  var facilitytestlen = $scope.facilityTestData[testlen];  
  //  var facilitytestid = (parseInt(facilitytestlen['facility_id'])+1).toString();
  //   $scope.facilityTestData.push({
  //     "facility_id": facilitytestid,
  //     "facility_name":"Other"
  //   })
    localStorage.setItem('TestingFacilityData',JSON.stringify($scope.facilityTestData));
    $scope.facilityTestTypeData = data.testingFacilityType;

    var testtypelen = $scope.facilityTestTypeData.length - 1;
    var facilitytesttypelen = $scope.facilityTestTypeData[testtypelen];  
    var facilitytesttypeid = (parseInt(facilitytesttypelen['testing_facility_type_id'])+1).toString();
    $scope.facilityTestTypeData.push({
      "testing_facility_type_id": facilitytesttypeid,
      "testing_facility_type_name":"Other"
    })
    
    localStorage.setItem('TestingFacilityTypeData',JSON.stringify($scope.facilityTestTypeData));

  });



  //if(JSON.parse(localStorage.getItem('PartialRecencyData'))==null){
  $http.get($localStorage.get('apiUrl')+'/api/global-config')
  .success(function(data) {
  // console.log(data.config);
  $scope.configdata =data.config;
  $scope.announcement ="";
     for(i=0;i<$scope.configdata.length;i++){  
      if($scope.configdata[i].global_name =="admin_message"){
        $scope.announcement = data.config[i].global_value;
      }  
    } 
     for(i=0;i<$scope.configdata.length;i++){  
        if($scope.configdata[i].global_name =="mandatory_fields" || $scope.configdata[i].global_name =="admin_email" || $scope.configdata[i].global_name =="admin_phone" || $scope.configdata[i].global_name =="display_fields"||$scope.configdata[i].global_name =="admin_message"  )   {
          $scope.configdata.splice(i);
        }    
     } 
   localStorage.setItem('GlobalConfig',JSON.stringify($scope.configdata)) 
   localStorage.setItem('Announcement',JSON.stringify($scope.announcement)) 
  
    });
    $http.get($localStorage.get('apiUrl')+'/api/recency-mandatory')
    .success(function(data) {
      console.log(data)
     $scope.mandatoryData =data.fields;
     localStorage.setItem('MandatoryData',JSON.stringify($scope.mandatoryData)) 
    //console.log( $scope.mandatoryData);           
    });
    $http.get($localStorage.get('apiUrl')+'/api/recency-hide')
    .success(function(data) {
     $scope.optionalData =data.fields[0];
    console.log($scope.optionalData);
     $scope.optionalArr =[];
     $scope.optionalArr.location=[];
     angular.forEach($scope.optionalData, function(value, key) {
       $scope.optionalArr[key]=value;
     });
     if($scope.optionalArr.location_one==false){
        $scope.optionalArr.location[0]=false;
      }else{
        $scope.optionalArr.location[0]=true;
      }
      if($scope.optionalArr.location_two==false){
        $scope.optionalArr.location[1]=false;
      }else{
        $scope.optionalArr.location[1]=true;
      }
      if($scope.optionalArr.location_three==false){
        $scope.optionalArr.location[2]=false;
      }else{
        $scope.optionalArr.location[2]=true;
      }
   //  console.log(  $scope.optionalArr);

    var hideFields =  Object.assign({}, $scope.optionalArr);
      //console.log(hideFields)
     localStorage.setItem('OptionalData',JSON.stringify(hideFields)) 
   
    });

    $http.get($localStorage.get('apiUrl')+'/api/technical-support')
    .success(function(data) {
      if(data.status=="success"){
     $scope.techSupportData =data.result;
     localStorage.setItem('TechSupportData',JSON.stringify(data.result))  
    }else{
      localStorage.setItem('TechSupportData','')
     }    
    });
    $http.get($localStorage.get('apiUrl')+'/api/province')
    .success(function(data) {
      if(data.status=="success"){
     $scope.provinceData =data.province;
     localStorage.setItem('ProvinceData',JSON.stringify(data.province))  
    }else{
      localStorage.setItem('ProvinceData','')
     }    
    });
    $http.get($localStorage.get('apiUrl')+'/api/district')
    .success(function(data) {
     if(data.status=="success"){
      $scope.districtData  = data.district;
      localStorage.setItem('DistrictData',JSON.stringify($scope.districtData))
     }else{
      localStorage.setItem('DistrictData','')
     }
  
    });
    $http.get($localStorage.get('apiUrl')+'/api/city')
    .success(function(data) {   
      if(data.status=="success"){
      $scope.cityData = data.city;
     localStorage.setItem('CityData',JSON.stringify($scope.cityData))     
      }else{
        localStorage.setItem('CityData','')
      }      
    });
  
    $scope.mandatoryData = JSON.parse(localStorage.getItem('MandatoryData'));
    $scope.configdata = JSON.parse(localStorage.getItem('GlobalConfig'));
    $scope.provinceData = JSON.parse(localStorage.getItem('ProvinceData'));

 
  $http.get($localStorage.get('apiUrl')+'/api/risk-populations')
  .success(function(data) {
   $scope.riskpopulations =data;
   var lastelement = $scope.riskpopulations.length-1;
   $scope.lastindex = (parseInt($scope.riskpopulations[lastelement]['rp_id'])+1).toString();
 //  console.log($scope.lastindex)
   $scope.riskpopulations.push({
    "rp_id": $scope.lastindex,
    "name":"Other"
  }) 
console.log($scope.riskpopulations)
  localStorage.setItem('RiskPopulations',JSON.stringify($scope.riskpopulations))       
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

