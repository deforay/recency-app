app=angular.module('starter.addRecencyCtrl', ['starter.services'])
.controller('addRecencyCtrl', function($scope,$rootScope, $http, $timeout, $stateParams,$cordovaToast, ionicDatePicker,  $ionicPopup,$preLoader,$localStorage, $cordovaGeolocation, $window,$filter,$cordovaNetwork) {
 
  $scope.recency = {};
    $scope.recencyData ={};
    $scope.showLongTermLine = true;
    $scope.displaybadge = false;


       $(document).ready(function(){
     
       $scope.recencydisplay=true; 
      
        $("#main-recency").addClass("active");
        if(!localStorage.getItem('counter')){
          $scope.counter =0;
          localStorage.setItem('counter', $scope.counter);
        }
       // console.log(getDevice());
     //   console.log(device)
      });
      $scope.provinceData = JSON.parse(localStorage.getItem('ProvinceData'));
      $scope.recencyDetails = JSON.parse(localStorage.getItem('viewRecency'));
      $scope.configdata = JSON.parse(localStorage.getItem('GlobalConfig'));
      
      $scope.optionalFieldsFlag = JSON.parse(localStorage.getItem('OptionalData'));
      $scope.mandatoryData = JSON.parse(localStorage.getItem('MandatoryData'));
      $scope.facilityData= JSON.parse(localStorage.getItem('FacilityData'));
      $scope.riskpopulations= JSON.parse(localStorage.getItem('RiskPopulations'))    
      $scope.$on("$ionicView.beforeEnter", function(event, data){
        $scope.recencydisplay=true; 
        $("#main-recency").addClass("active");
      });

// $scope.$on("$ionicView.beforeEnter", function(event, data){
//       $scope.testkitlotObj1 =[];
//       $scope.testkitlotObj2 =[];
//       $scope.TestKitLotList = JSON.parse(localStorage.getItem('LotInfo'));
//       if( $scope.TestKitLotList!=null){
//         var TestKitLotListLen = Object.keys($scope.TestKitLotList).length;
//         for(i=0;i<TestKitLotListLen;i++){
//           if($scope.TestKitLotList[i].available!='yes'){
//             $scope.testkitlotObj1.push({
//               "testKitManufacturer":$scope.TestKitLotList[i].testKitManufacturer,
//               "testKitManufacturerName":$scope.TestKitLotList[i].testKitManufacturerName,
//               "LotNumber":$scope.TestKitLotList[i].LotNumber,
//               "testKitLotNo":$scope.TestKitLotList[i].testKitLotNo,
//               "testKitExpDate":$scope.TestKitLotList[i].testKitExpDate,
//               "label":$scope.TestKitLotList[i].label,
//               "available":$scope.TestKitLotList[i].available,
//             })
//           }else{
//             $scope.testkitlotObj2.push({
//               "testKitManufacturer":$scope.TestKitLotList[i].testKitManufacturer,
//               "testKitManufacturerName":$scope.TestKitLotList[i].testKitManufacturerName,
//               "LotNumber":$scope.TestKitLotList[i].LotNumber,
//               "testKitLotNo":$scope.TestKitLotList[i].testKitLotNo,
//               "testKitExpDate":$scope.TestKitLotList[i].testKitExpDate,
//               "label":$scope.TestKitLotList[i].label,
//               "available":$scope.TestKitLotList[i].available,
//             })
//           }
//         }
//         for(i=0;i<$scope.testkitlotObj2.length;i++){
//           $scope.testkitlotObj1.unshift($scope.testkitlotObj2[i])
//         }
//        // console.log($scope.testkitlotObj1)
//         $scope.TestKitLotList = $scope.testkitlotObj1;
//       }

//         $scope.testerNameObj1 =[];
//         $scope.testerNameObj2 =[];
//        $scope.TesterNameList = JSON.parse(localStorage.getItem('TesterInfo'));
//        if( $scope.TesterNameList!=null){
//          var TesterNameListLen = Object.keys($scope.TesterNameList).length;
//          for(i=0;i<TesterNameListLen;i++){
//            if($scope.TesterNameList[i].available!='yes'){
//              $scope.testerNameObj1.push({
//                "testerName":$scope.TesterNameList[i].testerName,
//                "label":$scope.TesterNameList[i].label,
//                "available":$scope.TesterNameList[i].available,
//              })
//            }else{
//              $scope.testerNameObj2.push({
//                "testerName":$scope.TesterNameList[i].testerName,
//                "label":$scope.TesterNameList[i].label,
//                "available":$scope.TesterNameList[i].available,
//              })
//            }
//          }
//          for(i=0;i<$scope.testerNameObj2.length;i++){
//            $scope.testerNameObj1.unshift($scope.testerNameObj2[i])
//          }
//          //console.log($scope.testerNameObj1)
//          $scope.TesterNameList = $scope.testerNameObj1;
//        }
//        if(JSON.parse(localStorage.getItem('PartialRecencyData'))==null){
//       $scope.recency.appVersion = localStorage.getItem('AppVersion');      
//       $scope.recency.addedBy = localStorage.getItem('userId');
//       $scope.recency.sampleId ="";
//       $scope.recency.patientId="";
//       $scope.recency.facilityId="";
//       $scope.recency.facility_name="";
//       $scope.recency.otherfacility="";
//       $scope.recency.hivDiagnosisDate="";
//       $scope.recency.hivRecencyDate="";
//       $scope.recency.ctrlLine="";
//       $scope.recency.ctrlLineName="";
//       $scope.recency.positiveLine="";
//       $scope.recency.positiveLineName=""
//       $scope.recency.longTermLine="";
//       $scope.recency.longTermLineName="";
//       $scope.recency.recencyOutcome="";
//       $scope.recency.recencyreason="";
//       $scope.recency.recencyreasonName="";
//       $scope.recency.otherreason="";
//       $scope.recency.testKitLotNo = "";
//       $scope.recency.ManufacturerName="";
//       $scope.recency.testKitExpDate = "";
//       $scope.recency.testerName = "";
//       $scope.recency.dob="";
//       $scope.recency.age="";
//       $scope.recency.gender="";
//       $scope.recency.location=[];
//       for(i=0;i<$scope.configdata.length;i++){
//         $scope.recency.location[i]="";
//        }
//       $scope.recency.maritalStatus="";
//       $scope.recency.residence="";
//       $scope.recency.educationLevel="";
//       $scope.recency.riskPopulation="";
//       $scope.recency.riskPopulationName="";
//       $scope.recency.otherriskPopulation="";
//       $scope.recency.pregnancyStatus="";
//       $scope.recency.currentSexualPartner="";
//       $scope.recency.pastHivTesting="";
//       $scope.recency.lastHivStatus="";
//       $scope.recency.patientOnArt="";
//       $scope.recency.testLast12Month="";
//       $scope.recency.violenceLast12Month="";
//       $scope.recency.latitude="";
//       $scope.recency.longitude="";
//       $scope.recency.phoneNumber="";
//       $scope.recency.notes="";
   
//       var options = {maximumAge: 20000,timeout: 30000, enableHighAccuracy: true};
//         $cordovaGeolocation.getCurrentPosition(options).then(function(position)
//         {
//         $scope.recency.latitude=parseFloat(position.coords.latitude).toFixed(3);
//         $scope.recency.longitude= parseFloat(position.coords.longitude).toFixed(3);
//         var currentdate = new Date(); 
//         $scope.gis = true;
//         $scope.giserror = false;
//         // $scope.gis = "GIS Information Captured."+
//         //  "Latitute :"+$scope.recency.latitude+ " Longitute :"+$scope.recency.longitude;
//         },
//         function(error){
//         console.log(error); 
//         $scope.gis = false;
//         $scope.giserror = true;
//         $preLoader.hide();
//       })
//     }else{
//       $scope.recency = JSON.parse(localStorage.getItem('PartialRecencyData'));
//       // $scope.recency.location[0] = ($scope.recency.location_one);
//       // $scope.recency.location[1] = $scope.recency.location_two;
//       // $scope.recency.location[2] = $scope.recency.location_three;
//       if( $scope.recency.facility_name =="Other" && ($scope.recency.otherfacility != undefined ||$scope.recency.otherfacility!="")){
//         $scope.showotherfacility = true;
//         $scope.recency.facility_name="Other"
//        }
//        if( $scope.recency.riskPopulationName =="Other" && ($scope.recency.otherriskPopulation != undefined ||$scope.recency.otherriskPopulation!="")){
//         $scope.otherpopulation = true;
//         $scope.recency.riskPopulationName="Other"
//        }
//        if($scope.recency.recencyOutcome=='Invalid-Please Verify' || $scope.recency.recencyOutcome =='Assay HIV Negative'){
//         $scope.outcomered = true;
//         $scope.outcomeblack = false;
//       }else if($scope.recency.recencyOutcome=='Assay Recent' || $scope.recency.recencyOutcome=='Long Term'){
//         $scope.outcomeblack = true;
//         $scope.outcomered = false;
//       }else{
//         $scope.outcomeblack = false;
//         $scope.outcomered = false;
//       }
//      console.log($scope.recency)
    
//      if($scope.recency.location[1]){
//       var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
//       var result = localDistrict.filter(obj => {
//         return obj.province_id === $scope.recency.location[0]
//       })
//       $scope.districtData = result;
//       $scope.recency.location[1] = $scope.recency.location[1];
//       console.log( $scope.districtData)
//     }
//     if($scope.recency.location[2]){
//       var localCity = JSON.parse(localStorage.getItem('CityData'));
//       var cityresult = localCity.filter(obj => {
//         return obj.district_id === $scope.recency.location[1]
//       })
//       $scope.cityData = cityresult;
//     }

//     }
//     var recencyList =   localStorage.getItem('RecencyData');
//     if(recencyList != null){
//       recencyList    = JSON.parse(recencyList);
//       $scope.unSyncCount = "("+Object.keys(recencyList).length+"  Not Synced)"; 
//     }  else{
//       $scope.unSyncCount="";
//     }

       
//     if( $localStorage.get('offline')==true){

//     }
//     });
    // $scope.recencyinit();
    $scope.getLatLong = function(){
      $scope.optionalFieldsFlag = JSON.parse(localStorage.getItem('OptionalData'));

     
      $scope.testkitlotObj1 =[]; 
      $scope.testkitlotObj2 =[];
      $scope.TestKitLotList = JSON.parse(localStorage.getItem('LotInfo'));
      if( $scope.TestKitLotList!=null){
        var TestKitLotListLen = Object.keys($scope.TestKitLotList).length;
        for(i=0;i<TestKitLotListLen;i++){
          if($scope.TestKitLotList[i].available!='yes'){
            $scope.testkitlotObj1.push({
              "testKitManufacturer":$scope.TestKitLotList[i].testKitManufacturer,
              "testKitManufacturerName":$scope.TestKitLotList[i].testKitManufacturerName,
              "LotNumber":$scope.TestKitLotList[i].LotNumber,
              "testKitLotNo":$scope.TestKitLotList[i].testKitLotNo,
              "testKitExpDate":$scope.TestKitLotList[i].testKitExpDate,
              "label":$scope.TestKitLotList[i].label,
              "available":$scope.TestKitLotList[i].available,
            })
          }else{
            $scope.testkitlotObj2.push({
              "testKitManufacturer":$scope.TestKitLotList[i].testKitManufacturer,
              "testKitManufacturerName":$scope.TestKitLotList[i].testKitManufacturerName,
              "LotNumber":$scope.TestKitLotList[i].LotNumber,
              "testKitLotNo":$scope.TestKitLotList[i].testKitLotNo,
              "testKitExpDate":$scope.TestKitLotList[i].testKitExpDate,
              "label":$scope.TestKitLotList[i].label,
              "available":$scope.TestKitLotList[i].available,
            })
          }
        }
        for(i=0;i<$scope.testkitlotObj2.length;i++){
          $scope.testkitlotObj1.unshift($scope.testkitlotObj2[i])
        }
        //console.log($scope.testkitlotObj1)
        $scope.TestKitLotList = $scope.testkitlotObj1;
      }

        $scope.testerNameObj1 =[];
        $scope.testerNameObj2 =[];
       $scope.TesterNameList = JSON.parse(localStorage.getItem('TesterInfo'));
       if( $scope.TesterNameList!=null){
         var TesterNameListLen = Object.keys($scope.TesterNameList).length;
         for(i=0;i<TesterNameListLen;i++){
           if($scope.TesterNameList[i].available!='yes'){
             $scope.testerNameObj1.push({
               "testerName":$scope.TesterNameList[i].testerName,
               "label":$scope.TesterNameList[i].label,
               "available":$scope.TesterNameList[i].available,
             })
           }else{
             $scope.testerNameObj2.push({
               "testerName":$scope.TesterNameList[i].testerName,
               "label":$scope.TesterNameList[i].label,
               "available":$scope.TesterNameList[i].available,
             })
           }
         }
         for(i=0;i<$scope.testerNameObj2.length;i++){
           $scope.testerNameObj1.unshift($scope.testerNameObj2[i])
         }
         //console.log($scope.testerNameObj1)
         $scope.TesterNameList = $scope.testerNameObj1;
       }

       if(JSON.parse(localStorage.getItem('PartialRecencyData'))==null){
      $scope.recency.appVersion = localStorage.getItem('AppVersion');      
      $scope.recency.addedBy = localStorage.getItem('userId');
      $scope.recency.formInitDateTime="";
      $scope.recency.formSavedDateTime="";
      $scope.recency.sampleId ="";
      $scope.recency.patientId="";
      $scope.recency.facilityId="";
      $scope.recency.facility_name="";
      $scope.recency.otherfacility="";
      $scope.recency.hivDiagnosisDate="";
      $scope.recency.hivRecencyDate="";
      $scope.recency.ctrlLine="";
      $scope.recency.ctrlLineName="";
      $scope.recency.positiveLine="";
      $scope.recency.positiveLineName=""
      $scope.recency.longTermLine="";
      $scope.recency.longTermLineName="";
      $scope.recency.recencyOutcome="";
      $scope.recency.recencyreason="";
      $scope.recency.recencyreasonName="";
      $scope.recency.otherreason="";
      $scope.recency.testKitLotNo = "";
      $scope.recency.ManufacturerName="";
      $scope.recency.testKitExpDate = "";
      $scope.recency.testerName = "";
      $scope.recency.dob="";
      $scope.recency.age="";
      $scope.recency.gender="";
      $scope.recency.location=[];
      for(i=0;i<$scope.configdata.length;i++){
        $scope.recency.location[i]="";
       }
      $scope.recency.maritalStatus="";
      $scope.recency.residence="";
      $scope.recency.educationLevel="";
      $scope.recency.riskPopulation="";
      $scope.recency.riskPopulationName="";
      $scope.recency.otherriskPopulation="";
      $scope.recency.pregnancyStatus="";
      $scope.recency.currentSexualPartner="";
      $scope.recency.pastHivTesting="";
      $scope.recency.lastHivStatus="";
      $scope.recency.patientOnArt="";
      $scope.recency.testLast12Month="";
      $scope.recency.violenceLast12Month="";
      $scope.recency.latitude="";
      $scope.recency.longitude="";
      $scope.recency.phoneNumber="";
      $scope.recency.notes="";
     
      //console.log(recencyList)      
      var options = {maximumAge: 20000,timeout: 30000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        $scope.recency.latitude=parseFloat(position.coords.latitude).toFixed(3);
        $scope.recency.longitude= parseFloat(position.coords.longitude).toFixed(3);       
        var currentdate = new Date(); 
        $scope.gis = true;
        $scope.giserror = false;
        // $scope.gis = "GIS Information Captured."+
        //  "Latitute :"+$scope.recency.latitude+ " Longitute :"+$scope.recency.longitude;
        },
        function(error){
        console.log(error); 
        $scope.gis = false;
        $scope.giserror = true;
        $preLoader.hide();
      })
    }else{
      $scope.recency = JSON.parse(localStorage.getItem('PartialRecencyData'));
      // $scope.recency.location[0] = ($scope.recency.location_one);
      // $scope.recency.location[1] = $scope.recency.location_two;
      // $scope.recency.location[2] = $scope.recency.location_three;
      if( $scope.recency.facility_name =="Other" && ($scope.recency.otherfacility != undefined ||$scope.recency.otherfacility!="")){
        $scope.showotherfacility = true;
        $scope.recency.facility_name="Other"
       }
       if( $scope.recency.riskPopulationName =="Other" && ($scope.recency.otherriskPopulation != undefined ||$scope.recency.otherriskPopulation!="")){
        $scope.otherpopulation = true;
        $scope.recency.riskPopulationName="Other"
       }
       if($scope.recency.recencyOutcome=='Invalid-Please Verify' || $scope.recency.recencyOutcome =='Assay HIV Negative'){
        $scope.outcomered = true;
        $scope.outcomeblack = false;
      }else if($scope.recency.recencyOutcome=='Assay Recent' || $scope.recency.recencyOutcome=='Long Term'){
        $scope.outcomeblack = true;
        $scope.outcomered = false;
      }else{
        $scope.outcomeblack = false;
        $scope.outcomered = false;
      }
    
       if($scope.recency.location[1]){
        var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
        var result = localDistrict.filter(obj => 
          {
          return obj.province_id === $scope.recency.location[0]
        })
        $scope.districtData = result;
        $scope.recency.location[1] = $scope.recency.location[1];
        console.log( $scope.districtData)
      }
      if($scope.recency.location[2]){
        var localCity = JSON.parse(localStorage.getItem('CityData'));
        var cityresult = localCity.filter(obj => {
          return obj.district_id === $scope.recency.location[1]
        })
        $scope.cityData = cityresult;
      }
    }
    
    var recencyList =   localStorage.getItem('RecencyData');
    if(recencyList != null){
      recencyList    = JSON.parse(recencyList);
      $scope.unSyncCount = "("+Object.keys(recencyList).length+"  Not Synced)"; 
    }  else{
      $scope.unSyncCount="";
    }
    }
    $scope.getLatLong();

    $scope.getoptionField = function(){

        $timeout(function () {
          $scope.optionalFieldsFlag = JSON.parse(localStorage.getItem('OptionalData'));
    console.log( $scope.optionalFieldsFlag);
    }, 100);
    }
    $scope.getoptionField();

    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
       $scope.recency.macAddress = device.uuid;
      localStorage.setItem('MacAddress', $scope.recency.macAddress);
      // Comment during Development mode
      window.plugins.sim.getSimInfo(
        function(r) { $scope.out = r; $scope.$apply(); console.log(r);
       $scope.recency.phoneNumber =   $scope.out.phoneNumber;
      localStorage.setItem('PhoneNumber',$scope.recency.phoneNumber)

       },
        function(r) { $scope.out = r; $scope.$apply(); console.log(r); }
        
      );
      window.plugins.sim.hasReadPermission(
        function(r) { $scope.out2 = r; $scope.$apply(); console.log(r); },
        function(r) { $scope.out2 = r; $scope.$apply(); console.log(r); }
      );
      $timeout(function() {
        window.plugins.sim.requestReadPermission();
      }, 5000);
      $timeout(function() {
        window.plugins.sim.getSimInfo(
          function(r) { $scope.out3 = r; $scope.$apply(); console.log(r); 
       $scope.recency.phoneNumber =   $scope.out.phoneNumber;
      localStorage.setItem('PhoneNumber',$scope.recency.phoneNumber)

          },
          function(r) { $scope.out3 = r; $scope.$apply(); console.log(r); }
        );
        window.plugins.sim.hasReadPermission(
          function(r) { $scope.out4 = r; $scope.$apply(); console.log(r); },
          function(r) { $scope.out4 = r; $scope.$apply(); console.log(r); }
        );
      }, 1000);

    }
    $scope.partialRecencyData = function(){
      console.log($scope.recency)
      var partialData = $scope.recency;
    //  console.log($scope.recency.location)
    if($scope.recency.formInitDateTime=='' || $scope.recency.formInitDateTime==null || $scope.recency.formInitDateTime==undefined){
      var currentdatetime = new Date();
      $scope.recency.formInitDateTime = currentdatetime.getFullYear() + "-"
      + (currentdatetime.getMonth()+1)  + "-" 
      + currentdatetime.getDate() + " "
      + currentdatetime.getHours() + ":"  
      + currentdatetime.getMinutes() + ":" 
      + currentdatetime.getSeconds();
  
       console.log($scope.recency.formInitDateTime);
    }
    else{
      console.log($scope.recency.formInitDateTime);

    }
      for(i=0;i<$scope.configdata.length;i++){
        var key=$scope.configdata[i].global_name;
        var  keyname = key +"_name";
        var  keyId = "#" +$scope.configdata[i].global_name;
        if( $scope.recency.location[i]==undefined || $scope.recency.location[i]==""){
            $scope.recency[key] =""
            $scope.recency[keyname] = "";
        }else{
            $scope.recency[key] =$scope.recency.location[i];
            $scope.recency[keyname] =   $(keyId).find("option:selected").text();
            console.log( $scope.recency[keyname])     
        }
      }   

       localStorage.setItem('PartialRecencyData',JSON.stringify(partialData)) ;
       }
    $scope.setmainactive = function(){
     $scope.recencydisplay=true;
      // $("#section2").css("display","none");
      // $("#section1").css("display","block")
      if($("#main-recency").hasClass('active')){
    } else {
     
        $("#main-recency").addClass('active')
        $("#other-recency").removeClass('active')
    }

    }
    $scope.setothersactive = function(){
       $scope.recencydisplay=false;
      // $("#section2").css("display","block");
      // $("#section1").css("display","none");
      if($("#other-recency").hasClass('active')){
    } else {
        $("#other-recency").addClass('active');
      

        $("#main-recency").removeClass('active')
    }
    }
    $scope.doRefresh = function() {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
      
    }
    $scope.getTestKitExpDate = function(lotNo){
      console.log(lotNo)
      if(lotNo!=""){
        for(i=0;i<$scope.TestKitLotList.length;i++){
          if(lotNo==$scope.TestKitLotList[i].testKitLotNo){
            $scope.ExpDate = $scope.TestKitLotList[i].testKitExpDate;
            $scope.ManufacturerName = $scope.TestKitLotList[i].testKitManufacturerName;
          }
        }
        $scope.recency.testKitExpDate = $scope.ExpDate;
        $scope.recency.ManufacturerName = $scope.ManufacturerName;

        console.log($scope.recency.testKitExpDate)
      }else{
        $scope.recency.testKitExpDate=""; 
        $scope.recency.ManufacturerName="";
      }
    }


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
        console.log("isOnline",isOnline);
        $localStorage.set('online',isOnline);
        $localStorage.set('offline','true');
        $scope.riskpopulations = JSON.parse(localStorage.getItem('RiskPopulations'));
        $scope.mandatoryData = JSON.parse(localStorage.getItem('MandatoryData'));
        $scope.optionalFieldsFlag = JSON.parse(localStorage.getItem('OptionalData'));
        $scope.testerNameObj = JSON.parse(localStorage.getItem('testerName'));
        $scope.configdata = JSON.parse(localStorage.getItem('GlobalConfig'));
        // $scope.provinceData =  JSON.parse(localStorage.getItem('ProvinceData'))      
       // $scope.districtData =  JSON.parse(localStorage.getItem('DistrictData'))      
      //  $scope.cityData =  JSON.parse(localStorage.getItem('CityData'))      
        $scope.recency.location =[];
        console.log($scope.configdata.length)
        for(i=0;i<$scope.configdata.length;i++){
          $scope.recency.location[i]="";       
       } 
        var localarr = [];
        var localfacility =[];
        $scope.freq_facilities = [];
        $scope.freq_provinces=[];
        $scope.allfacilities = new Array();
        $scope.facilityData = new Array();
        localarr = JSON.parse(localStorage.getItem('RecencyData'));
        localfacility =JSON.parse(localStorage.getItem('FacilityData'));
        localprovince = JSON.parse(localStorage.getItem('ProvinceData'));
       // console.log(localfacility)
        if(localarr !=null){
            var localarrsize = Object.keys(localarr).length;
            var obj = {};
            $scope.allfacilities =localfacility;
            for(i=0;i<localarrsize;i++){
              $scope.freq_facilities.unshift({
                "facility_id":localarr[i]['facilityId'],
                "facility_name":localarr[i]['facility_name']
              })
            } 
            //console.log($scope.freq_facilities)
            for(i =0;i<Object.keys($scope.freq_facilities).length;i++){  
              $scope.allfacilities.unshift($scope.freq_facilities[i]);
            }
            //console.log($scope.allfacilities)
            var trimmedArray = [];
            var values = [];
            var value;
            for(var i = 0; i < $scope.allfacilities.length; i++) {
              value = $scope.allfacilities[i]['facility_id'];
              if(values.indexOf(value) === -1) {
                trimmedArray.push($scope.allfacilities[i]);
                values.push(value);
              }
            }
           // console.log(trimmedArray) ;
            $scope.facilityData = trimmedArray;
            console.log( $scope.facilityData);

             //Display recent province on top of dropdown

             $scope.allprovinces =localprovince;
             for(i=0;i<localarrsize;i++){
               $scope.freq_provinces.unshift({
                 "province_id":localarr[i]['location_one'],
                 "province_name":localarr[i]['location_one_name']
               })
             //  console.log($scope.freq_provinces)
             } 
             for(i =0;i<Object.keys($scope.freq_provinces).length;i++){  
               $scope.allprovinces.unshift($scope.freq_provinces[i]);
               //console.log($scope.allprovinces)
 
             }
             var trimmedArray1 = [];
             var values1 = [];
             var value1;
             for(var i = 0; i < $scope.allprovinces.length; i++) {
               value1 = $scope.allprovinces[i]['province_id'];
               if(values1.indexOf(value1) === -1) {
                 trimmedArray1.push($scope.allprovinces[i]);
                 values1.push(value1);
               }
             }
             $scope.provinceData = trimmedArray1;  
            // console.log($scope.provinceData)
        }else{
          $scope.facilityData =localfacility;
          $scope.provinceData = localprovince;  
        }
      }
      // $scope.facilityData=[];  

      $scope.getApiCalls = function(){

      $http.get($localStorage.get('apiUrl')+'/api/facility')
      .success(function(data) {
       $scope.facilityData = data;
       var facilitylen = ($scope.facilityData.length+1).toString();
       $scope.facilityData.push({
          "facility_id": facilitylen,
          "facility_name":"Other"
        })
        localStorage.setItem('FacilityData',JSON.stringify($scope.facilityData))    
    //   console.log($scope.facilityData)           
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
        for(i=0;i<$scope.configdata.length;i++){
              $scope.recency.location[i]="";
             }
       localStorage.setItem('GlobalConfig',JSON.stringify($scope.configdata)) 
        console.log($scope.configdata)
        });
        $http.get($localStorage.get('apiUrl')+'/api/recency-mandatory')
        .success(function(data) {
         $scope.mandatoryData =data.fields;
         //console.log(data)
         localStorage.setItem('MandatoryData',JSON.stringify($scope.mandatoryData)) 
        // console.log( $scope.mandatoryData);           
        });
      //   $http.get($localStorage.get('apiUrl')+'/api/recency-mandatory')
      // .success(function(data) {
      //  $scope.optionalData =data.fields;
      //  //console.log(data)
      //  localStorage.setItem('OptionalData',JSON.stringify($scope.optionalData)) 
      //  console.log( $scope.optionalData);           
      // });
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
      console.log($scope.recency.location)
    }
    // $scope.getApiCalls();
      // If Internet Connection Disconnected
   
      $scope.optionalFieldsFlag = JSON.parse(localStorage.getItem('OptionalData'));
   
   

      $scope.getOutcome = function(controlLine,positiveLine,longTermLine){
        if((controlLine=='absent'&& positiveLine=='absent'&& longTermLine=='absent')||
        (controlLine=='absent'&& positiveLine=='absent'&& longTermLine=='present')||
        (controlLine=='absent'&& positiveLine=='present'&& longTermLine=='absent')||
        (controlLine=='absent'&& positiveLine=='present'&& longTermLine=='present')||
        (controlLine=='present'&& positiveLine=='absent'&& longTermLine=='present'))
        {
         // $(".outcome").css("color","red");
         $scope.outcomered = true;
         $scope.outcomeblack = false;
          $scope.recency.recencyOutcome="Invalid-Please Verify";
        }
        if(controlLine=='present'&& positiveLine=='absent'&& longTermLine=='absent'){
          $scope.recency.recencyOutcome="Assay HIV Negative";
          //$(".outcome").css("color","red");
          $scope.outcomered = true;
          $scope.outcomeblack = false;
        }
        if(controlLine=='present'&& positiveLine=='present'&& longTermLine=='absent'){
          $scope.recency.recencyOutcome="Assay Recent";
          $scope.outcomered = false;
          $scope.outcomeblack = true;
        }
        if(controlLine=='present'&& positiveLine=='present'&& longTermLine=='present'){
          $scope.recency.recencyOutcome="Long Term";
          $scope.outcomered = false;
          $scope.outcomeblack = true;
        }
        if(controlLine==""|| positiveLine==""||longTermLine==""){
          $scope.recency.recencyOutcome="";
          $scope.outcomeblack = false;
          $scope.outcomered = false;
        }
      }
      $scope.getReasonName = function(reason){
        if(reason=='no_consent_from_the_client'){
          $scope.recency.recencyreasonName ="No consent from the Client";
        }else 
        if(reason=='sample_was_not_collected'){
          $scope.recency.recencyreasonName ="Sample was not collected (Phlebotomy failure)";
        }else
        if(reason=='not_newly_diagnosed'){
          $scope.recency.recencyreasonName ="Not newly diagnosed";
        }
        else
        if(reason=='other'){
          $scope.recency.recencyreasonName ="Other, please specify";
        }
        else{
          $scope.recency.recencyreasonName="";
        }
        console.log($scope.recency.recencyreasonName)
      }
      // $scope.getTestKitName = function(kitname){
      //   if(kitname=='sedia_bioscience'){
      //     $scope.recency.testKitValueName ="SEDIA Bioscience (SED)";
      //   }else
      //   if(kitname=='maxim_biomedical'){
      //     $scope.recency.testKitValueName ="Maxim Biomedical (MAX)";
      //   }else{
      //     $scope.recency.testKitValueName="";
      //   }
      // }
      $scope.getControlLine=function(controlline){
        if(controlline=='present'){
              $scope.recency.ctrlLineName = 'Present';  
            }
            if(controlline=='absent'){
              $scope.recency.ctrlLineName = 'Absent';
            }
      }
      $scope.OnPositiveLineChange = function(positiveline){
        if(positiveline=='present'){
          $scope.recency.positiveLineName = 'Present(Positive/P)';
        }
        if(positiveline=='absent'){
          $scope.recency.positiveLineName = 'Absent(Negative/N)';
        }  
      }
      $scope.OnLongtermChange = function(longterm){
        if(longterm!='present'){
          $scope.recency.longTermLineName = 'Present(Long Term/LT)';
        }
        if(longterm!='absent'){
          $scope.recency.longTermLineName = 'Absent(Recent/R)';
        }
      }
     $scope.setDiagDate = function(val){
         var ipObj1 = {
          callback: function (val) {  
          var hivDiagnosisDate = new Date(val);
            console.log(hivDiagnosisDate);
            $scope.recency.hivDiagnosisDate =  $filter('date')(hivDiagnosisDate , "dd-MMM-yyyy");
            $scope.partialRecencyData();
           },
    to: new Date(),

          }; 
      ionicDatePicker.openDatePicker(ipObj1);
    }

  $scope.setRecencyDate = function(val){
    var ipObj2 = {
      callback: function (val) { 
     
      var hivRecencyDate = new Date(val);
      console.log(hivRecencyDate);
      $scope.recency.hivRecencyDate =  $filter('date')(hivRecencyDate , "dd-MMM-yyyy");
       $scope.partialRecencyData();
      },
      to: new Date(),
    //   weeksList: [],
    // dateFormat: 'MMMM yyyy',


    }; 
    ionicDatePicker.openDatePicker(ipObj2);
  }
  $scope.setTestKitExpDate = function(val){
    var ipObj3 = {
      callback: function (val) { 
     
      var testKitExpDate = new Date(val);
      console.log(testKitExpDate);
      $scope.recency.testKitExpDate =  $filter('date')(testKitExpDate , "dd-MMM-yyyy");
      },
      
     
    }; 
    ionicDatePicker.openDatePicker(ipObj3);
  }
  $scope.setDob = function(val){
   var ipObj4 = {
     callback: function (val) {  //Mandatory
      var dob = new Date(val);
      //console.log(dob);
      var ageDifMs = Date.now() - dob.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
     // console.log( Math.abs(ageDate.getUTCFullYear() - 1970));
      $scope.recency.dob =  $filter('date')(dob , "dd-MMM-yyyy");
      $scope.recency.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      $scope.partialRecencyData();
    },
    to: new Date(),
  }; 
    ionicDatePicker.openDatePicker(ipObj4);
  }
  
  $scope.cleardob = function(age){
    if(age!= null ){
    $scope.recency.dob ="";
    }
  }

$scope.GetDistrictValue = function(province){
  console.log(province)
  if($localStorage.get('offline') == true){
    var localarr = [];
    var localDistrict = [];
    $scope.freq_district = [];
    $scope.alldistrict = new Array();

    localarr = JSON.parse(localStorage.getItem('RecencyData'));  
    localDistrict =  JSON.parse(localStorage.getItem('DistrictData'))      
    var result = localDistrict.filter(obj => {
      return obj.province_id === province
    })
    //$scope.districtData = result;
    localDistrict = result;
    console.log(localDistrict);
   //Display recent district on top of dropdown
     $scope.alldistrict =localDistrict;
     for(i=0;i<localarrsize;i++){
       $scope.freq_district.unshift({
         "district_id":localarr[i]['location_two'],
         "district_name":localarr[i]['location_two_name']
       })
       console.log($scope.freq_district)
     } 
     for(i =0;i<Object.keys($scope.freq_district).length;i++){  
       $scope.alldistrict.unshift($scope.freq_district[i]);
       console.log($scope.alldistrict)

     }
     var trimmedArray2 = [];
     var values2 = [];
     var value2;
     for(var i = 0; i < $scope.alldistrict.length; i++) {
       value2 = $scope.alldistrict[i]['district_id'];
       if(values2.indexOf(value2) === -1) {
         trimmedArray2.push($scope.alldistrict[i]);
         values2.push(value2);
       }
     }
     $scope.districtData = trimmedArray2;  
     console.log($scope.districtData);
   
  }else{
    var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
    var result = localDistrict.filter(obj => {
    return obj.province_id === province
  })
  $scope.districtData = result;
  console.log($scope.recency.location)
  }

}
$scope.GetCityValue = function(district){
  if($localStorage.get('offline') == true){
    var localarr = [];
    var localCity = [];
    $scope.freq_city = [];
    $scope.allcity = new Array();

    localarr = JSON.parse(localStorage.getItem('RecencyData'));  
    localCity =  JSON.parse(localStorage.getItem('DistrictData'))      
    var result = localCity.filter(obj => {
      return obj.district_id === district
    })
    //$scope.districtData = result;
    localCity = result;
     //Display recent district on top of dropdown

     $scope.allcity =localCity;
     for(i=0;i<localarrsize;i++){
       $scope.freq_city.unshift({
         "city_id":localarr[i]['location_three'],
         "city_name":localarr[i]['location_three_name']
       })
       console.log($scope.freq_city)
     } 
     for(i =0;i<Object.keys($scope.freq_city).length;i++){  
       $scope.allcity.unshift($scope.freq_city[i]);
       console.log($scope.allcity)

     }
     var trimmedArray2 = [];
     var values2 = [];
     var value2;
     for(var i = 0; i < $scope.allcity.length; i++) {
       value2 = $scope.allcity[i]['city_id'];
       if(values2.indexOf(value2) === -1) {
         trimmedArray2.push($scope.allcity[i]);
         values2.push(value2);
       }
     }
     $scope.cityData = trimmedArray2;  
     console.log($scope.cityData);
  }else{
    var localCity = JSON.parse(localStorage.getItem('CityData'));
    var cityresult = localCity.filter(obj => {
      return obj.district_id === district
    })
    $scope.cityData = cityresult;
  console.log($scope.recency.location)

  }
  
}
    $scope.checkriskpopulation = function(){
     $scope.recency.riskPopulationName = $("#riskPopulation").find("option:selected").text();
      console.log( $scope.recency.riskPopulationName);
      if($scope.recency.riskPopulationName=='Other'){
       $scope.otherpopulation = true;
        }
      else{
       $scope.otherpopulation = false;
        }
    }
    $scope.checkotherfacility = function(){
      $scope.recency.facility_name = $("#facilityId").find("option:selected").text();
      console.log( $scope.recency.facility_name);
      if($scope.recency.facility_name=='Other'){
       $scope.showotherfacility = true;
        }
      else{
       $scope.showotherfacility = false;
        }
    }
    // if($scope.facilityData== undefined ||  $scope.riskpopulations == undefined ||  $scope.configdata ==undefined ){
    //   onoffline();
    // }
    $scope.showToastAlert = function(mandatorytitle){
 // $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
    $cordovaToast.show(mandatorytitle, 'long', 'center')
              .then(function(success) {
                // success
              }, function (error) {
                // error
              });
    }
    $scope.patientvalidation = function(){
      console.log($scope.recency)

      for(i=0;i<$scope.configdata.length;i++){
        var key=$scope.configdata[i].global_name;
        var  keyname = key +"_name";
        var  keyId = "#" +$scope.configdata[i].global_name;
        if( $scope.recency.location[i]==undefined || $scope.recency.location[i]==""){
            $scope.recency[key] =""
            $scope.recency[keyname] = "";
        }else{
            $scope.recency[key] =$scope.recency.location[i];
            $scope.recency[keyname] =   $(keyId).find("option:selected").text();
            console.log( $scope.recency[keyname])     
        }
    } 
    if($scope.mandatoryData.length>0){
      for(i=0;i<$scope.mandatoryData.length;i++){
        var id ="#"+$scope.mandatoryData[i];
        var mandatoryname = $(id).attr("name");
        var mandatorytitle = $(id).attr("title");
        var mandatoryField=$scope.mandatoryData[i];
      console.log(mandatoryField);
         
          if($scope.mandatoryData[i]=='sampleId' && $scope.recency.sampleId==""){
            $scope.showRecencyTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
           if($scope.mandatoryData[i]=='patientId' && $scope.recency.patientId==""){
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle); 
            return false;
          }
          if( $scope.recency.patientId=="" && $scope.recency.sampleId==""){
              $scope.showRecencyTick = false;
              var mandatorytitle = 'Please Choose Either Sample ID or Patient ID';
              $scope.showToastAlert(mandatorytitle); 
            return false;
          }
           if($scope.mandatoryData[i]=='facilityId' && $scope.recency.facilityId==""){
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle); 
            return false;
          }
          if($scope.mandatoryData[i]=='facilityId' && $scope.recency.facility_name == 'Other' && $scope.recency.otherfacility==""){
             $scope.showRecencyTick = false;
             var mandatorytitle = 'Please Enter Other Facility';
             $scope.showToastAlert(mandatorytitle); 
           return false;
         }
          if($scope.mandatoryData[i]=='location_one' && $scope.recency.location_one==""){
              $scope.showRecencyTick = false;
             $scope.showToastAlert(mandatorytitle); 
            return false;
          }
          if($scope.mandatoryData[i]=='location_two' && $scope.recency.location_two==""){
              $scope.showRecencyTick = false;
             $scope.showToastAlert(mandatorytitle); 
            return false;
          }
          if($scope.mandatoryData[i]=='location_three' && $scope.recency.location_three==""){
              $scope.showRecencyTick = false;
             $scope.showToastAlert(mandatorytitle); 
            return false;
          }
           if($scope.mandatoryData[i]=='hivDiagnosisDate' && $scope.recency.hivDiagnosisDate==""){
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);  
            return false;
          }
    
          if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.pastHivTesting==""){
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);  
            return false;
          }
          if($scope.recency.pastHivTesting=='yes' || $scope.recency.pastHivTesting==''){
            if($scope.mandatoryData[i]=='testLast12Month' && $scope.recency.testLast12Month==""){
                $scope.showRecencyTick = false;
                $scope.showToastAlert(mandatorytitle);  
              return false;
            }
          }
         
          if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.pastHivTesting == 'yes' && $scope.recency.lastHivStatus==""){
            var mandatorytitle = 'Please Choose Last HIV Status';
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);  
            return false;
          }
          if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.lastHivStatus == 'positive' && $scope.recency.patientOnArt==""){
            var mandatorytitle = 'Please Choose whether the Patient on ART';             
            $scope.showRecencyTick = false;
            $scope.showToastAlert(mandatorytitle);  
            return false;
          }
          if($scope.recency.testNotPerformed==true){
            //console.log($scope.recency.testNotPerformed);
            if( $scope.recency.recencyreason==""){
            var mandatorytitle = 'Please Choose Reason of Recency Test Not Performed';
            $scope.showRecencyTick = false;
            $scope.showToastAlert(mandatorytitle);  
              return false;
            }
            if( $scope.recency.recencyreason=="other" &&  $scope.recency.otherreason==""){
              var mandatorytitle = 'Please Enter Other Reason';
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle); 
              return false;
            }
          }
       if($scope.recency.testNotPerformed!=true || $scope.recency.testNotPerformed=='' ){
         console.log($scope.recency.testNotPerformed)
        if($scope.mandatoryData[i]=='hivRecencyDate' && $scope.recency.hivRecencyDate==""){
          $scope.showRecencyTick = false;
          $scope.showToastAlert(mandatorytitle); 
          return false;
        }
         if($scope.mandatoryData[i]=='ctrlLine' && $scope.recency.ctrlLine==""){
          $scope.showRecencyTick = false;
          $scope.showToastAlert(mandatorytitle); 
          return false;
        }
          if($scope.mandatoryData[i]=='positiveLine' && $scope.recency.positiveLine==""){
            $scope.showRecencyTick = false;
            $scope.showToastAlert(mandatorytitle); 
          return false;
        }  if($scope.mandatoryData[i]=='longTermLine' && $scope.recency.longTermLine==""){
          $scope.showRecencyTick = false;
          $scope.showToastAlert(mandatorytitle); 
          return false;
        }
       }
       if($scope.mandatoryData[i]=='testKitName' && $scope.recency.testKitName==""){
        $scope.showRecencyTick = false;
        $scope.showToastAlert(mandatorytitle); 
        return false;
        }
       if($scope.mandatoryData[i]=='testKitLotNo' && $scope.recency.testKitLotNo==""){
        $scope.showRecencyTick = false;
        $scope.showToastAlert(mandatorytitle); 
        return false;
        }
        if($scope.mandatoryData[i]=='testKitExpDate' && $scope.recency.testKitExpDate==""){
          $scope.showRecencyTick = false;
          $scope.showToastAlert(mandatorytitle); 
        return false;
        }
        if($scope.mandatoryData[i]=='testerName' && $scope.recency.testerName==""){
          $scope.showRecencyTick = false;
          $scope.showToastAlert(mandatorytitle); 
        return false;
        }
      if($scope.recency.sampleId!="" || $scope.recency.patientId!="" || $scope.recency.facilityId!="" ||$scope.recency.hivDiagnosisDate!="" ||
          $scope.recency.hivRecencyDate!=""||$scope.recency.ctrlLine!="" ||$scope.recency.positiveLine!="" || $scope.recency.longTermLine!="" ||
          $scope.recency.pastHivTesting!="" || $scope.recency.lastHivStatus!=""|| $scope.recency.patientOnArt!=""||$scope.recency.location_one!=""||
          $scope.recency.location_two!="" ||$scope.recency.location_three!="" || $scope.recency.testKitLotNo !=""|| $scope.recency.testKitExpDate !=""|| $scope.recency.testerName !="" )
          {
            $scope.showRecencyTick = true;
                // $("#other-recency").addClass('active')
                // $("#main-recency").removeClass('active')
          }
      }  
    }

      // if($scope.recencydisplay == false ){
      //   $("#other-recency").addClass('active')
      //  $("#main-recency").removeClass('active')
      // }else if($scope.recencydisplay == true){
      //   $("#main-recency").addClass('active')
      //   $("#other-recency").removeClass('active')
      // }else{
      //   $scope.showRecencyTick = false;
      //   $("#main-recency").addClass('active')
      //   $("#other-recency").removeClass('active')
      // }
    }

    $scope.behaviourValidation = function(){
    if($scope.mandatoryData.length>0){
      for(i=0;i<$scope.mandatoryData.length;i++){
        var id ="#"+$scope.mandatoryData[i];
        var mandatoryname = $(id).attr("name");
        var mandatorytitle = $(id).attr("title");
        var mandatoryField=$scope.mandatoryData[i];
        
        console.log(mandatoryField)
        if(($scope.mandatoryData[i]=='dob' && $scope.recency.dob=="" &&  $scope.recency.age=="")){
          var mandatorytitle = 'Please Enter Date Of Birth or Age';
           $scope.showBehaviourTick = false;
           $scope.showToastAlert(mandatorytitle); 
           return false;
         }

         if(($scope.mandatoryData[i]=='age' && $scope.recency.dob=="" &&  $scope.recency.age=="")){
          var mandatorytitle = 'Please Enter Date Of Birth or Age';
           $scope.showBehaviourTick = false;
           $scope.showToastAlert(mandatorytitle); 
           return false;
         }
        if($scope.mandatoryData[i]=='gender' && $scope.recency.gender==""){
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle); 
           return false;
        }
        if($scope.mandatoryData[i]=='maritalStatus' && $scope.recency.maritalStatus==""){
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle); 
          return false;
        }
        if($scope.mandatoryData[i]=='residence' && $scope.recency.residence==""){
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle); 
          return false;
        }
        if($scope.mandatoryData[i]=='riskPopulation' && $scope.recency.riskPopulation==""){
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle); 
          return false;
        }
        if($scope.mandatoryData[i]=='riskPopulation' && $scope.recency.riskPopulationName == 'Other' && $scope.recency.otherriskPopulation==""){
          var mandatorytitle = 'Please Choose Other Risk Population';
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle); 
          return false;
        }
        if($scope.mandatoryData[i]=='pregnancyStatus' && $scope.recency.gender!='male'&& $scope.recency.pregnancyStatus==""){
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle); 
          return false;
        }
        if($scope.mandatoryData[i]=='currentSexualPartner' && $scope.recency.currentSexualPartner==""){
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle); 
          return false;
        }
        if($scope.mandatoryData[i]=='violenceLast12Month' && $scope.recency.violenceLast12Month==""){
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle); 
          return false;
        }
        if($scope.mandatoryData[i]=='notes' && $scope.recency.notes==""){
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle); 
          return false;
        }
       
        if($scope.recency.dob!="" || $scope.recency.gender!="" || $scope.recency.maritalStatus!="" ||$scope.recency.residence!="" ||
          $scope.recency.riskPopulation!=""||$scope.recency.otherriskPopulation!="" ||$scope.recency.pregnancyStatus!="" || 
          $scope.recency.currentSexualPartner!="" || $scope.recency.violenceLast12Month!="" || $scope.recency.notes!="" )
          {
            $scope.showBehaviourTick = true;
                // $("#other-recency").addClass('active')
                // $("#main-recency").removeClass('active')
          }
      }
    }
    
    }
      $scope.addRecency = function()
      {
        console.log($scope.recency);
        $scope.recency.appVersion = localStorage.getItem('AppVersion');      
        $scope.recency.addedBy = localStorage.getItem('userId');
        for(i=0;i<$scope.configdata.length;i++){
          var key=$scope.configdata[i].global_name;
          var  keyname = key +"_name";
          var  keyId = "#" +$scope.configdata[i].global_name;
          if( $scope.recency.location[i]==undefined || $scope.recency.location[i]==""){
              $scope.recency[key] =""
              $scope.recency[keyname] = "";
          }else{
              $scope.recency[key] =$scope.recency.location[i];
              $scope.recency[keyname] =   $(keyId).find("option:selected").text();
              console.log( $scope.recency[keyname])     
          }
      }
        for(i=0;i<$scope.mandatoryData.length;i++){
          var id ="#"+$scope.mandatoryData[i];
          var mandatoryname = $(id).attr("name");
          var mandatorytitle = $(id).attr("title");
          var mandatoryField=$scope.mandatoryData[i];
          
         // console.log(mandatoryField)
          if(($scope.mandatoryData[i]=='dob' && $scope.recency.dob=="" &&  $scope.recency.age=="")){
            var mandatorytitle = 'Please Enter Date Of Birth or Age';
             $scope.showBehaviourTick = false;
             $scope.showToastAlert(mandatorytitle); 
             return false;
           }
  
           if(($scope.mandatoryData[i]=='age' && $scope.recency.dob=="" &&  $scope.recency.age=="")){
            var mandatorytitle = 'Please Enter Date Of Birth or Age';
             $scope.showBehaviourTick = false;
             $scope.showToastAlert(mandatorytitle); 
             return false;
           }
          if($scope.mandatoryData[i]==mandatoryname && $scope.recency[mandatoryField]==""){
            $scope.showBehaviourTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if( $scope.recency.patientId=="" && $scope.recency.sampleId==""){
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Choose Either Sample ID or Patient ID';
            $scope.showToastAlert(mandatorytitle);
           return false;
         }
          if($scope.mandatoryData[i]=='facilityId' && $scope.recency.facility_name == 'Other' && $scope.recency.otherfacility==""){
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Enter Other Facility';
            $scope.showToastAlert(mandatorytitle); 
            return false;
         }
          if($scope.recency.pastHivTesting=='yes' || $scope.recency.pastHivTesting==''){
            if($scope.mandatoryData[i]=='testLast12Month' && $scope.recency.testLast12Month==""){
                $scope.showRecencyTick = false;
                $scope.showToastAlert(mandatorytitle); 
              return false;
            }
          }
         
          if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.pastHivTesting == 'yes' && $scope.recency.lastHivStatus==""){
            var mandatorytitle = 'Please Choose Last HIV Status';
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.lastHivStatus == 'positive' && $scope.recency.patientOnArt==""){
            var mandatorytitle = 'Please Choose whether the Patient on ART';             
            $scope.showRecencyTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if($scope.recency.testNotPerformed==true){
            //console.log($scope.recency.testNotPerformed);
            if( $scope.recency.recencyreason==""){
              var mandatorytitle = 'Please Choose Reason of Recency Test Not Performed';
            $scope.showRecencyTick = false;
            $scope.showToastAlert(mandatorytitle); 
              return false;
            }
            if( $scope.recency.recencyreason=="other" &&  $scope.recency.otherreason==""){
              var mandatorytitle = 'Please Enter Other Reason';
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
          }
          if($scope.recency.testNotPerformed!=true || $scope.recency.testNotPerformed=='' ){
           // console.log($scope.recency.testNotPerformed)
           if($scope.mandatoryData[i]=='hivRecencyDate' && $scope.recency.hivRecencyDate==""){
               $scope.showRecencyTick = false;
               $scope.showToastAlert(mandatorytitle);     
             return false;
           }
            if($scope.mandatoryData[i]=='ctrlLine' && $scope.recency.ctrlLine==""){
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);     
             return false;
           }
             if($scope.mandatoryData[i]=='positiveLine' && $scope.recency.positiveLine==""){
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);     
             return false;
           }  if($scope.mandatoryData[i]=='longTermLine' && $scope.recency.longTermLine==""){
            $scope.showRecencyTick = false;
            $scope.showToastAlert(mandatorytitle);     
             return false;
           }
          }
    
          if($scope.mandatoryData[i]=='riskPopulation' && $scope.recency.riskPopulationName == 'Other' && $scope.recency.otherriskPopulation==""){
            var mandatorytitle = 'Please Choose Other Risk Population';
            $scope.showBehaviourTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
      
        }

        var count = localStorage.getItem('counter');
        $scope.counter  = parseInt(count) + 1;
     
        // if($scope.recency.facilityId!=""){
        //       $scope.recency.facility_name = $("#facilityId").find("option:selected").text();
        //       console.log($scope.recency.facility_name)
        // }
        // if($scope.recency.ctrlLine!=""){
        //   $scope.recency.ctrlLineName =   $("#ctrlLine").find("option:selected").text();
        // }
        // if($scope.recency.positiveLine!=""){
        //   $scope.recency.positiveLineName =   $("#positiveLine").find("option:selected").text();
        // }
        // if($scope.recency.longTermLine!=""){
        //   $scope.recency.longTermLineName =   $("#longTermLine").find("option:selected").text();
        // }

        var currentdate = new Date();
        $scope.recency.formSavedDateTime = currentdate.getFullYear() + "-"
        + (currentdate.getMonth()+1)  + "-" 
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();

         console.log($scope.recency.formSavedDateTime);

        
          var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
          var string_length = 12;
          var randomstring = '';
          for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
          }
          console.log(randomstring)
          $scope.recency.unique_id = randomstring;
          //document.randform.randomfield.value = randomstring;
     
         $scope.recency.macAddress = localStorage.getItem('MacAddress');
         $scope.recency.phoneNumber =  localStorage.getItem('PhoneNumber');

         console.log($scope.recency);
        $preLoader.show();
        var recency = $scope.recency;
           if(JSON.parse(localStorage.getItem('RecencyData'))!=null){
            $scope.recencyData =JSON.parse(localStorage.getItem('RecencyData'));
            }       
            $scope.recencyData[$scope.counter-1] =recency;        
            localStorage.setItem('RecencyData',JSON.stringify($scope.recencyData)) 
            localStorage.removeItem('PartialRecencyData');
            localStorage.setItem('counter', $scope.counter);
        
             $scope.recency ={};
              $scope.recencydisplay=true;
       
              $cordovaToast.show('Data Has Been Saved Successfully', 'long', 'center')
              .then(function(success) {
                // success
              }, function (error) {
                // error
              });
      
              $scope.getLatLong();
               $scope.showRecencyTick = false;
               $scope.showBehaviourTick = false;
    

              $("#main-recency").addClass("active");
              $("#other-recency").removeClass('active')
              // $window.location.reload(true);
            $preLoader.hide();
      }
     // console.log($scope.recency.location)
})


.filter('underscorefilter', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
});