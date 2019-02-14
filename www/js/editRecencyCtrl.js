app=angular.module('starter.editRecencyCtrl', ['starter.services'])
.controller('editRecencyCtrl', function($scope, $http,$rootScope, $stateParams,ionicDatePicker,$cordovaToast,$location,  $ionicPopup,$preLoader,$localStorage, $cordovaGeolocation, $window,$filter,$cordovaNetwork) {
  $scope.recency = {};
  $scope.recencyData ={};
  $scope.recencydisplay=true;  
  $scope.displaybadge = false;
  $scope.showotherdistrict = false;
  $scope.showothercity = false;

  $scope.provinceData = JSON.parse(localStorage.getItem('ProvinceData'));
  $scope.recencyDetails = JSON.parse(localStorage.getItem('viewRecency'));
  $scope.configdata = JSON.parse(localStorage.getItem('GlobalConfig'));
  $scope.announcement = JSON.parse(localStorage.getItem('Announcement')); 
  $scope.mandatoryData = JSON.parse(localStorage.getItem('MandatoryData'));
  $scope.facilityData= JSON.parse(localStorage.getItem('FacilityData'));
  $scope.facilityTestData= JSON.parse(localStorage.getItem('TestingFacilityData'));  
  $scope.riskpopulations= JSON.parse(localStorage.getItem('RiskPopulations'));
  $scope.optionalFieldsFlag = JSON.parse(localStorage.getItem('OptionalData'));

  $scope.recency = $scope.recencyDetails;
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
   // console.log($scope.testkitlotObj1)
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
  $scope.recency.location[0] = $scope.recency.location_one;
  $scope.recency.location[1] = $scope.recency.location_two;
  $scope.recency.location[2] = $scope.recency.location_three;
   if($scope.recency.location_one){
    var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
    var result = localDistrict.filter(obj => {
      return obj.province_id === $scope.recency.location_one
    })
    $scope.districtData = result;
    $scope.recency.location[1] = $scope.recency.location_two;
    if($scope.recency.location[0]!=""||$scope.recency.location[0]!=null){
      var districtlen = ($scope.districtData.length+1).toString();
      $scope.districtData.push({
       "district_id": districtlen,
       "district_name":"Other"
     })
    }
  }else{
    $scope.districtData = [];
    $scope.cityData = [];
    $scope.recency.otherDistrict ="";
    $scope.showotherdistrict = false;
    $scope.recency.otherCity ="";
  $scope.showothercity = false;
  }
  if($scope.recency.location_two){
    var localCity = JSON.parse(localStorage.getItem('CityData'));
    var cityresult = localCity.filter(obj => {
      return obj.district_id === $scope.recency.location_two
    })
    $scope.cityData = cityresult;
    if($scope.recency.location[1]!=""||$scope.recency.location[1]!=null){
      var citylen = ($scope.cityData.length+1).toString();
      $scope.cityData.push({
       "city_id": citylen,
       "city_name":"Other"
     })
    }
  }else{
    $scope.cityData = [];
    $scope.recency.otherCity ="";
  $scope.showothercity = false;
  }

  if($scope.recency.vlLoadResult==null){
    $scope.recency.vlLoadResult="";
  }else if($scope.recency.vlLoadResult==$scope.recency.vlLoadResultDropdown){
    $scope.recency.vlLoadResult="";
  }
  
 // console.log( $scope.recency.location)
  $scope.doRefresh = function() {
    $preLoader.show();
    $window.location.reload(true);
    $preLoader.hide(); 
  }
  $scope.testerNameAutoComplete = function(){
    $scope.testerNameObj = JSON.parse(localStorage.getItem('testerName'));
    //console.log($scope.testerNameObj)
    $( "#testerName").autocomplete({
      source: $scope.testerNameObj,
    })
  }
  $scope.GetDistrictValue = function(province){

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
  localDistrict = result;
 //Display recent district on top of dropdown
   $scope.alldistrict =localDistrict;
   for(i=0;i<localarrsize;i++){
     $scope.freq_district.unshift({
       "district_id":localarr[i]['location_two'],
       "district_name":localarr[i]['location_two_name']
     })
     //console.log($scope.freq_district)
   } 
   for(i =0;i<Object.keys($scope.freq_district).length;i++){  
     $scope.alldistrict.unshift($scope.freq_district[i]);
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

}else{
  var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
  var result = localDistrict.filter(obj => {
  return obj.province_id === province
})
$scope.districtData = result;
}
  if(province!=null && province!=""){
    var districtlen = ($scope.districtData.length+1).toString();
    $scope.districtData.push({
     "district_id": districtlen,
     "district_name":"Other"
   })

  }
  $scope.recency.location[1] ="";
  $scope.recency.otherDistrict ="";
  $scope.showotherdistrict = false;
  $scope.recency.location[2] ="";
  $scope.recency.otherCity ="";
  $scope.showothercity = false;
 
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
      localCity = result;
       //Display recent district on top of dropdown
  
       $scope.allcity =localCity;
       for(i=0;i<localarrsize;i++){
         $scope.freq_city.unshift({
           "city_id":localarr[i]['location_three'],
           "city_name":localarr[i]['location_three_name']
         })
         //console.log($scope.freq_city)
       } 
       for(i =0;i<Object.keys($scope.freq_city).length;i++){  
         $scope.allcity.unshift($scope.freq_city[i]);  
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
      // console.log($scope.cityData);
    }else{
      var localCity = JSON.parse(localStorage.getItem('CityData'));
      var cityresult = localCity.filter(obj => {
        return obj.district_id === district
      })
      $scope.cityData = cityresult;
    }
    if(district!=null && district !=""){
      var citylen = ($scope.cityData.length+1).toString();
      $scope.cityData.push({
       "city_id": citylen,
       "city_name":"Other"
     })
    } 
    $scope.recency.location[2] ="";
  $scope.recency.otherCity ="";
  $scope.showothercity = false;
  }
//console.log($scope.recency.location[0])
if( $scope.recency.facility_name =="Other" && ($scope.recency.otherfacility != undefined ||$scope.recency.otherfacility!="")){
  $scope.showotherfacility = true;
  $scope.recency.facility_name="Other"
 }
 if( $scope.recency.testing_facility_name =="Other" && ($scope.recency.othertestingfacility != undefined ||$scope.recency.othertestingfacility!="")){
  $scope.showothertestfacility = true;
  $scope.recency.testing_facility_name="Other"
 }
 if( $scope.recency.districtname =="Other" && $scope.recency.location[1]!="" && ($scope.recency.otherDistrict != undefined ||$scope.recency.otherDistrict!="")){
  $scope.showotherdistrict = true;

  $scope.recency.location_two_name=$scope.recency.districtname;
 }
 if( $scope.recency.cityname =="Other" &&  $scope.recency.location[2]!="" && ($scope.recency.otherCity != undefined ||$scope.recency.otherCity!="")){
  $scope.showothercity = true;
  $scope.recency.location_three_name=$scope.recency.cityname;
 }
 if( $scope.recency.riskPopulationName =="Other" && ($scope.recency.otherriskPopulation != undefined ||$scope.recency.otherriskPopulation!="")){
  $scope.otherpopulation = true;
  $scope.recency.riskPopulationName="Other"
 }
 //Term Outcome
 if($scope.recency.recencyOutcome=='Invalid-Please Verify'){
  $scope.recency.showtermOutcome = true;
  $scope.setoutcomecolor='red';
}
else if($scope.recency.recencyOutcome =='Assay Negative'){
  $scope.recency.showtermOutcome = true;
  $scope.setoutcomecolor='blue';
}else if($scope.recency.recencyOutcome=='Assay Recent' || $scope.recency.recencyOutcome=='Assay Long Term'){
  $scope.recency.showtermOutcome = true;
  $scope.setoutcomecolor='black';
}else{
  $scope.recency.showtermOutcome = false;
}
//Final Outcome
if($scope.recency.finalOutcome=='Inconclusive' || $scope.recency.finalOutcome=='RITA Recent'){
  $scope.recency.showFinalOutcome = true;
  $scope.setfinalcolor='blue';
}
else if($scope.recency.finalOutcome =='Assay Negative'){
  $scope.recency.showFinalOutcome = true;
  $scope.setfinalcolor='black';
}else if($scope.recency.finalOutcome=='Long Term' || $scope.recency.finalOutcome=='RITA Long Term'){
  $scope.recency.showFinalOutcome = true;
  $scope.setfinalcolor='black';
}else{
  $scope.recency.showFinalOutcome = false;

}

  $scope.index = $scope.recency.index;
  $(document).ready(function(){
     $scope.recencydisplay=true;
      $("#main-recency").addClass("active");

    });

  $scope.setmainactive = function(){
    $scope.recencydisplay=true;
    if($("#main-recency").hasClass('active')){
     // $("#main-recency").removeClass('active')
  } else {
      $("#main-recency").addClass('active')
      $("#other-recency").removeClass('active')
  }

  }
  $scope.setothersactive = function(){
    $scope.recencydisplay=false;
    if($("#other-recency").hasClass('active')){
   //   $("#other-recency").removeClass('active')
  } else {
      $("#other-recency").addClass('active')
      $("#main-recency").removeClass('active')
  }
  }

    document.addEventListener("online", ononline, false);
    document.addEventListener("offline", onoffline, false);
    
    function ononline() {

      var isOnline = $cordovaNetwork.isOnline();
    //  console.log("isOnline",isOnline);
      $localStorage.set('online',isOnline);
      $localStorage.set('offline','false');

    }
    function onoffline() {
      var isOnline = $cordovaNetwork.isOnline();
      //console.log("isOnline",isOnline);
      $localStorage.set('online',isOnline);
      $localStorage.set('offline','true');
      $scope.riskpopulations = JSON.parse(localStorage.getItem('RiskPopulations'));
      $scope.configdata = JSON.parse(localStorage.getItem('GlobalConfig'));
      var localarr = [];
      var localfacility =[];
      var localtestfacility =[];
      $scope.freq_facilities = [];
      $scope.freq_testfacilities = [];
      $scope.allfacilities = new Array();
      $scope.facilityData = new Array();
      $scope.facilityTestData = new Array();
      localarr = JSON.parse(localStorage.getItem('RecencyData'));
      localfacility =JSON.parse(localStorage.getItem('FacilityData'));
      localtestfacility =JSON.parse(localStorage.getItem('TestingFacilityData'));
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

          //Display Recent Testing Facilities dropdown
            
          $scope.alltestfacilities =localtestfacility;
          for(i=0;i<localarrsize;i++){
            $scope.freq_testfacilities.unshift({
              "facility_id":localarr[i]['facilityId'],
              "facility_name":localarr[i]['facility_name']
            })
          } 
          for(i =0;i<Object.keys($scope.freq_testfacilities).length;i++){  
            $scope.alltestfacilities.unshift($scope.freq_testfacilities[i]);
          }
          var trimmedArray2 = [];
          var values2 = [];
          var value2;
          for(var i = 0; i < $scope.alltestfacilities.length; i++) {
            value2 = $scope.alltestfacilities[i]['facility_id'];
            if(values2.indexOf(value2) === -1) {
              trimmedArray2.push($scope.alltestfacilities[i]);
              values2.push(value2);
            }
          }
          $scope.facilityTestData = trimmedArray2;
          //console.log( $scope.facilityTestData);
          //Display recent province on top of dropdown

          $scope.allprovinces =localprovince;
          for(i=0;i<localarrsize;i++){
            $scope.freq_provinces.unshift({
              "province_id":localarr[i]['location_one'],
              "province_name":localarr[i]['location_one_name']
            })
          } 
          for(i =0;i<Object.keys($scope.freq_provinces).length;i++){  
            $scope.allprovinces.unshift($scope.freq_provinces[i]);
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
          //console.log($scope.provinceData);
   
      }else{
        $scope.facilityData =localfacility;
        $scope.provinceData =localprovince;
      //  console.log( $scope.facilityData)
      }
    }
    $scope.getTestKitExpDate = function(lotNo){
      if(lotNo!=""){
        for(i=0;i<$scope.TestKitLotList.length;i++){
          if(lotNo==$scope.TestKitLotList[i].testKitLotNo){
            $scope.ExpDate = $scope.TestKitLotList[i].testKitExpDate
            $scope.ManufacturerName = $scope.TestKitLotList[i].testKitManufacturerName;         
         }
        }
        $scope.recency.testKitExpDate = $scope.ExpDate;
        $scope.recency.ManufacturerName = $scope.ManufacturerName;            
      }else{
        $scope.recency.testKitExpDate=""; 
        $scope.recency.ManufacturerName="";
      }
    }

    $scope.getLatLong = function(){
      var options = {maximumAge: 20000,timeout: 30000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        $scope.recency.latitude=position.coords.latitude;
        $scope.recency.longitude=position.coords.longitude;
       // console.log( $scope.recency.latitude)
       // console.log( $scope.recency.longitude)
        $scope.gis = true;
        $scope.giserror = false;
    },
    function(error){
      //console.log(error); 
      // $scope.gis = "GIS Information is Not Available";
      $scope.recency.latitude ="";
      $scope.recency.longitude = "";
      $scope.gis = false;
      $scope.giserror = true;
      $preLoader.hide();
      })
    }
    $scope.getLatLong();
    $scope.onLoadMandatoryCheck = function(){

      for(i=0;i<$scope.mandatoryData.length;i++){
        var id ="#"+$scope.mandatoryData[i];
        var mandatoryname = $(id).attr("name");
        var mandatorytitle = $(id).attr("title");
        var mandatoryField=$scope.mandatoryData[i];
       // console.log(mandatoryField);
               
      if($scope.mandatoryData[i]=='sampleId' && $scope.recency.sampleId==""){
        $scope.showRecencyTick = false;
        return false;
      }
       if($scope.mandatoryData[i]=='patientId' && $scope.recency.patientId==""){
        $scope.showRecencyTick = false;
        return false;
      }
      if( $scope.recency.patientId=="" && $scope.recency.sampleId==""){
        $ionicPopup.alert({title:'Alert!',template:'Please Choose Either Sample ID or Patient ID'});
        $scope.showRecencyTick = false;
        return false;
      }
       if($scope.mandatoryData[i]=='facilityId' && $scope.recency.facilityId==""){
        $scope.showRecencyTick = false;
        return false;
      }
      if($scope.mandatoryData[i]=='location_one' && $scope.recency.location_one==""){
        $scope.showRecencyTick = false;
        return false;
      }
      if($scope.mandatoryData[i]=='location_two' && $scope.recency.location_two==""){
        $scope.showRecencyTick = false;
        return false;
      }
    //   if($scope.mandatoryData[i]=='location_two' && $scope.recency.location[1]!="" && $scope.recency.districtname == 'Other' && $scope.recency.otherDistrict==""){
    //     $scope.showRecencyTick = false;
    // }
      if($scope.mandatoryData[i]=='location_three' && $scope.recency.location_three==""){
        $scope.showRecencyTick = false;
        return false;
      }
    //   if($scope.mandatoryData[i]=='location_three' && $scope.recency.location[2]!="" && $scope.recency.cityname == 'Other' && $scope.recency.otherCity==""){
    //     $scope.showRecencyTick = false;
    // }
       if($scope.mandatoryData[i]=='hivDiagnosisDate' && $scope.recency.hivDiagnosisDate==""){
        $scope.showRecencyTick = false;
        return false;
      }
  
      if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.pastHivTesting==""){
        $scope.showRecencyTick = false;
        return false;
      }
      if($scope.recency.pastHivTesting=='yes' || $scope.recency.pastHivTesting==''){
        if($scope.mandatoryData[i]=='testLast12Month' && $scope.recency.testLast12Month==""){
          $scope.showRecencyTick = false;
          return false;
        }
      }
      if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.pastHivTesting == 'yes' && $scope.recency.lastHivStatus==""){
        $scope.showRecencyTick = false;
        return false;
      }
      if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.lastHivStatus == 'positive' && $scope.recency.patientOnArt==""){
        $scope.showRecencyTick = false;
        return false;
      }
      if($scope.mandatoryData[i]=='testKitLotNo' && $scope.recency.testKitLotNo==""){
        $scope.showRecencyTick = false;
        return false;
      } 
       if($scope.mandatoryData[i]=='testKitExpDate' && $scope.recency.testKitExpDate==""){
        $scope.showRecencyTick = false;
        return false;
      } 
       if($scope.mandatoryData[i]=='testerName' && $scope.recency.testerName==""){
        $scope.showRecencyTick = false;
        return false;
      }
      if($scope.mandatoryData[i]=='testingFacility' && $scope.recency.testingFacility==""){
        $scope.showRecencyTick = false;
        return false;
      }
      if($scope.recency.testNotPerformed==true){
        if( $scope.recency.recencyreason==""){
          $scope.showRecencyTick = false;
          return false;
        }
        if( $scope.recency.recencyreason=="other" &&  $scope.recency.otherreason==""){
          $scope.showRecencyTick = false;
          return false;
        }
      }
      if($scope.recency.testNotPerformed!=true){
      if($scope.mandatoryData[i]=='hivRecencyDate' && $scope.recency.hivRecencyDate==""){
        $scope.showRecencyTick = false;
        return false;
      }
       if($scope.mandatoryData[i]=='ctrlLine' && $scope.recency.ctrlLine==""){
        $scope.showRecencyTick = false;
        return false;
      }
        if($scope.mandatoryData[i]=='positiveLine' && $scope.recency.positiveLine==""){
        $scope.showRecencyTick = false;
        return false;
      } 
       if($scope.mandatoryData[i]=='longTermLine' && $scope.recency.longTermLine==""){
        $scope.showRecencyTick = false;
        return false;
      }
   
    if($scope.mandatoryData[i]=='vlTestDate' && $scope.recency.vlTestDate=="" && $scope.recency.recencyOutcome=="Assay Recent"){
      $scope.showRecencyTick = false;
      return false;
    }
    if($scope.mandatoryData[i]=='vlLoadResult' && $scope.recency.recencyOutcome=="Assay Recent" &&  $scope.recency.vlLoadResult=="" && $scope.recency.vlLoadResultDropdown==""){
      $scope.showRecencyTick = false;
      return false;
    }
  }
    if($scope.mandatoryData[i]==mandatoryname && $scope.recency[mandatoryField]==""){
      $scope.showBehaviourTick = false;
      return false;
    }
    if($scope.mandatoryData[i]=='riskPopulation' && $scope.recency.riskPopulationName == 'Other' && $scope.recency.otherriskPopulation==""){
      $scope.showBehaviourTick = false; 
      return false;
    }
      if($scope.recency.sampleId!="" || $scope.recency.patientId!="" || $scope.recency.facilityId!="" ||$scope.recency.hivDiagnosisDate!="" ||
      $scope.recency.hivRecencyDate!=""||$scope.recency.ctrlLine!="" ||$scope.recency.positiveLine!="" || $scope.recency.longTermLine!="" ||
      $scope.recency.pastHivTesting!="" || $scope.recency.lastHivStatus!=""|| $scope.recency.patientOnArt!=""||$scope.recency.location_one!=""||
      $scope.recency.location_two!="" ||$scope.recency.location_three!="" || $scope.recency.testKitLotNo !=""|| $scope.recency.testKitExpDate !=""|| $scope.recency.testerName !="")
      {
      $scope.showRecencyTick = true;
  
      }
      if($scope.showBehaviourTick != false){
        $scope.showBehaviourTick = true;
  
      }
    }
  
    }
    $scope.onLoadMandatoryCheck ();
    $scope.recencyNotPerformed = function(testNotPerformed){
     // console.log(testNotPerformed)
      if(testNotPerformed==true){
        $scope.recency.hivRecencyDate="";
        $scope.recency.ctrlLine="";
        $scope.recency.positiveLine="";
        $scope.recency.longTermLine="";
        $scope.recency.recencyOutcome="";
        $scope.recencyOutcomeDisplay="";
        $scope.recency.vlTestDate="";
        $scope.recency.vlLoadResult="";
        $scope.recency.vlLoadResultDropdown="";
        $scope.recency.finalOutcome="";
      }
    }
      //On Viral Load Change
      $scope.OnVlLoadChange =  function(vlLoadResultDropdown){
        if(vlLoadResultDropdown==""){
          $scope.recency.showFinalOutcome = false;
         $scope.recency.finalOutcome="";
        }
     
        if(vlLoadResultDropdown=='TND' && ($scope.recency.recencyOutcome=='Assay Recent'|| $scope.recency.recencyOutcome=='Assay Long Term')){
          $scope.recency.finalOutcome="RITA Recent";
          $scope.recencyOutcomeDisplay="";
          $scope.recency.showFinalOutcome = true;
          $scope.setfinalcolor = 'blue';
        }else if((vlLoadResultDropdown =='< 20' || vlLoadResultDropdown =='< 40'|| vlLoadResultDropdown =='BDL') && ($scope.recency.recencyOutcome=='Assay Recent'|| $scope.recency.recencyOutcome=='Assay Long Term')){
          $scope.recency.finalOutcome="RITA Long Term";
          $scope.recencyOutcomeDisplay="";
          $scope.recency.showFinalOutcome = true;
          $scope.setfinalcolor = 'black';
        }else if(vlLoadResultDropdown =='Failed'&& ($scope.recency.recencyOutcome=='Assay Recent'|| $scope.recency.recencyOutcome=='Assay Long Term') ){
         $scope.recency.finalOutcome="Inconclusive";
        $scope.recencyOutcomeDisplay="";
         $scope.setfinalcolor = 'blue';
         $scope.recency.showFinalOutcome = true;
        }
        if(vlLoadResultDropdown==''&& $scope.recency.recencyOutcome=='Assay Recent'){
          $scope.recencyOutcomeDisplay = "- Please ensure you add Viral Load Result"; 
        }
     }

// Term Outcome 
$scope.getOutcome = function(controlLine,positiveLine,longTermLine){
  if((controlLine=='absent'&& positiveLine=='absent'&& longTermLine=='absent')||
  (controlLine=='absent'&& positiveLine=='absent'&& longTermLine=='present')||
  (controlLine=='absent'&& positiveLine=='present'&& longTermLine=='absent')||
  (controlLine=='absent'&& positiveLine=='present'&& longTermLine=='present'))
  {
   $scope.recency.recencyOutcome="Invalid-Please Verify";
   $scope.recencyOutcomeDisplay ="";
   $scope.recency.showtermOutcome = true;
   $scope.recency.showFinalOutcome = false;
   $scope.setoutcomecolor = 'red';
   $scope.recency.finalOutcome="";
   $scope.recency.vlTestDate="";
   $scope.recency.vlLoadResult="";
   $scope.recency.vlLoadResultDropdown="";
  }
  if((controlLine=='present'&& positiveLine=='absent'&& longTermLine=='present')){
    $scope.recency.showFinalOutcome = true;
    $scope.setfinalcolor = 'blue';
    $scope.recency.recencyOutcome="Invalid-Please Verify";
    $scope.recencyOutcomeDisplay ="";
    $scope.recency.showtermOutcome = true;
    $scope.setoutcomecolor = 'red';
    $scope.recency.finalOutcome="Inconclusive";
    $scope.recency.vlTestDate="";
    $scope.recency.vlLoadResult="";
    $scope.recency.vlLoadResultDropdown="";
  }
  if(controlLine=='present'&& positiveLine=='absent'&& longTermLine=='absent'){
    $scope.recency.recencyOutcome="Assay Negative";
    $scope.recencyOutcomeDisplay ="";
    $scope.recency.showtermOutcome = true;
    $scope.setoutcomecolor = 'blue';
    $scope.recency.finalOutcome="Inconclusive";
    $scope.setfinalcolor = 'blue';
    $scope.recency.showFinalOutcome = true;
    $scope.recency.vlTestDate="";
    $scope.recency.vlLoadResult="";
    $scope.recency.vlLoadResultDropdown="";

  }
  if(controlLine=='present'&& positiveLine=='present'&& longTermLine=='absent'){
    $scope.recency.recencyOutcome="Assay Recent";
    $scope.recencyOutcomeDisplay = "- Please ensure you add Viral Load Result";
    $scope.recency.showtermOutcome = true;
    $scope.setoutcomecolor = 'black';
    $scope.recency.finalOutcome="";
    $scope.recency.showFinalOutcome = false;          
  }
  if(controlLine=='present'&& positiveLine=='present'&& longTermLine=='present'){
    $scope.recency.recencyOutcome="Assay Long Term";
    $scope.recencyOutcomeDisplay ="";
    $scope.recency.showtermOutcome = true;
    $scope.setoutcomecolor = 'black';
    $scope.recency.finalOutcome="Long Term";
    $scope.setfinalcolor = 'black';
    $scope.recency.showFinalOutcome = true;
  }
  if(controlLine==""|| positiveLine==""||longTermLine==""){
    $scope.recency.recencyOutcome="";
    $scope.recency.finalOutcome="";
    $scope.recencyOutcomeDisplay ="";
    $scope.recency.vlTestDate="";
    $scope.recency.vlLoadResult="";
    $scope.recency.vlLoadResultDropdown="";
    $scope.recency.showFinalOutcome = false;
    $scope.recency.showtermOutcome = false;
  }
}
  // Final Outcome
$scope.getFinalOutcome = function(termOutcome,vlLoadResult){
 // console.log(vlLoadResult )
  if(termOutcome=="Assay Recent" && vlLoadResult >1000){
    $scope.recencyOutcomeDisplay ="";
    $scope.recency.finalOutcome="RITA Recent";
    $scope.recency.showFinalOutcome = true;
    $scope.setfinalcolor = 'blue';
  }
  else if(termOutcome=="Assay Recent" && (vlLoadResult <=1000 && vlLoadResult !="" && vlLoadResult!=null) ){
    $scope.recency.finalOutcome="RITA Long Term";
    $scope.recencyOutcomeDisplay ="";
    $scope.recency.showFinalOutcome = true;
    $scope.setfinalcolor = 'black';
  } 
  else if(termOutcome=="Assay Recent" && ( vlLoadResult =="" || vlLoadResult==null))
  {
    $scope.recency.finalOutcome="";
    $scope.recency.vlTestDate="";
    $scope.recency.vlLoadResult="";
    $scope.recency.vlLoadResultDropdown="";
    $scope.recencyOutcomeDisplay = "- Please ensure you add Viral Load Result";
    $scope.recency.showFinalOutcome = false;
  }
  else if(termOutcome=="Assay Long Term" && ( vlLoadResult =="" || vlLoadResult==null))
  {
    $scope.recency.finalOutcome="Long Term";
    $scope.recency.showFinalOutcome = true;
    $scope.setfinalcolor = 'black';
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
    }

    $scope.getFacility=function(facilityid){
     // console.log(facilityid)
      if($scope.recency.facilityId!=""){
        $scope.recency.facility_name = $("#facilityId option:selected").text();

        var facilityData = $scope.facilityData
        function isfacility(item) { 
           return item.facility_id === $scope.recency.facilityId;
        }
        var selectedfacility = facilityData.find(isfacility)
      $scope.recency.location[0] = selectedfacility.province;
      $scope.recency.location[1] = selectedfacility.district;
      $scope.recency.location[2] = selectedfacility.city;

      if($scope.recency.location[0]){
        var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
        var result = localDistrict.filter(obj => 
          {
          return obj.province_id === $scope.recency.location[0]
        })
        $scope.districtData = result;
        $scope.recency.location[1] = $scope.recency.location[1];
       // console.log( $scope.districtData)
        if($scope.recency.location[0]!=""||$scope.recency.location[0]!=null){
          var districtlen = ($scope.districtData.length+1).toString();
          $scope.districtData.push({
           "district_id": districtlen,
           "district_name":"Other"
         })
        }
      }
      else{
        $scope.districtData =[];
        $scope.cityData =[];
      }
      if($scope.recency.location[1]){
        var localCity = JSON.parse(localStorage.getItem('CityData'));
        var cityresult = localCity.filter(obj => {
          return obj.district_id === $scope.recency.location[1]
        })
        $scope.cityData = cityresult;

        if($scope.recency.location[1]!=""||$scope.recency.location[1]!=null){
          var citylen = ($scope.cityData.length+1).toString();
          $scope.cityData.push({
           "city_id": citylen,
           "city_name":"Other"
         })
        }

      }else{
        $scope.cityData =[];
      }
    }else{
        $scope.recency.location[0] = "";
        $scope.recency.location[1] = "";
        $scope.recency.location[2] = "";
        $scope.districtData =[];
        $scope.cityData =[];
      }
      if($scope.recency.facility_name =='-- Select --' || facilityid=="" ){
        $scope.showotherfacility = false;
        $scope.recency.facility_name = "";
       }
      if($scope.recency.facility_name=='Other'){
        $scope.showotherfacility = true;
         } else{
        $scope.showotherfacility = false;
         }
  
    }
    $scope.getTestingFacility=function(facilityid){
 
       if(facilityid!=""){
         $scope.recency.testing_facility_name = $("#testingFacility option:selected").text();
       }
       if($scope.recency.testing_facility_name =='-- Select --' || facilityid=="" ){
        $scope.showothertestfacility = false;
        $scope.recency.testing_facility_name = "";
       }
       if($scope.recency.testing_facility_name=='Other'){
         $scope.showothertestfacility = true;
       }
      else
      {
        $scope.showothertestfacility = false;
      }
     
     }
     $scope.checkotherdistrict = function(districtid){
      if(districtid!=null){
        var cityData = $scope.cityData
        function isCity(item) { 
           return item.city_name === 'Other';
        }
        var othercityData = cityData.find(isCity)
        $scope.recency.districtname = $("#location_two").find("option:selected").text();
      }
      //console.log(othercityData.city_id); 
     
      if($scope.recency.districtname=='Other'){
        $scope.showotherdistrict = true;
        $scope.recency.otherDistrict="";
        $scope.recency.location[2]=othercityData.city_id;
        $scope.recency.otherCity="";
        $scope.showothercity = true;
      }
      else if($scope.recency.districtname=='-- Select --'){
        $scope.showotherdistrict = false;
        $scope.recency.districtname="";
        $scope.recency.location[2]="";
        $scope.showothercity = false;
      }else{
        $scope.showotherdistrict = false;
        $scope.recency.location[2]="";
        $scope.showothercity = false;
      }
     
    }
    $scope.checkothercity = function(cityid){
      $scope.recency.cityname = $("#location_three").find("option:selected").text();
     // console.log($scope.recency.cityname);
      if($scope.recency.cityname=='Other'){
        $scope.showothercity = true;
        $scope.recency.otherCity="";
      }
      else if($scope.recency.cityname=='-- Select --'){
        $scope.showothercity = false;
        $scope.recency.cityname="";
        $scope.recency.otherCity="";
      }else{
        $scope.showothercity = false;

      }
    }
    $scope.checkriskpopulation = function(riskpopulation){

     // console.log(riskpopulation)
      $scope.recency.riskPopulationName = $("#riskPopulation option:selected").text();
      // console.log( $scope.recency.riskPopulationName);
       if($scope.recency.riskPopulationName=='Other'){
        $scope.otherpopulation = true;
         }
       else{
        $scope.otherpopulation = false;
      $scope.recency.otherriskPopulation="";

         }
     }
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
        callback: function (val) {  //Mandatory
          var hivDiagnosisDate = new Date(val);
         // console.log(hivDiagnosisDate);
          $scope.recency.hivDiagnosisDate =  $filter('date')(hivDiagnosisDate , "dd-MMM-yyyy");
        },
    to: new Date(),
      }; 
        ionicDatePicker.openDatePicker(ipObj1);
     
    }
    
    $scope.setRecencyDate = function(val){
      var ipObj2 = {
        callback: function (val) {  //Mandatory
          var hivRecencyDate = new Date(val);
         // console.log(hivRecencyDate);
          $scope.recency.hivRecencyDate =  $filter('date')(hivRecencyDate , "dd-MMM-yyyy");
        },
        to: new Date(),
      }; 
        ionicDatePicker.openDatePicker(ipObj2);
    }
    $scope.setVlTestDate = function(val){
      var ipObj2 = {
        callback: function (val) { 
       
        var viralLoadTestDate = new Date(val);
        $scope.recency.vlTestDate =  $filter('date')(viralLoadTestDate , "dd-MMM-yyyy");

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
        $scope.recency.testKitExpDate =  $filter('date')(testKitExpDate , "dd-MMM-yyyy");
        }
       
      }; 
      ionicDatePicker.openDatePicker(ipObj3);
    }
    $scope.setDob = function(val){
      var ipObj3 = {
        callback: function (val) {  //Mandatory
          var dob = new Date(val);
          var ageDifMs = Date.now() - dob.getTime();
          var ageDate = new Date(ageDifMs); // miliseconds from epoch
          $scope.recency.dob =  $filter('date')(dob , "dd-MMM-yyyy");
          $scope.recency.age = Math.abs(ageDate.getUTCFullYear() - 1970);
        },
        to: new Date(),
      }; 
        ionicDatePicker.openDatePicker(ipObj3);
    }

    $scope.cleardob = function(age){
      if(age!= null || age!=undefined ){
        $scope.recency.dob ="";
      }else{
        $scope.recency.age ="";
      }
      }
    $scope.clearTestKitExpDate= function(){
      $scope.recency.testKitExpDate ='';
      $('#testKitExpDate').val("")

    }


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
  // console.log($scope.recency)

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
         // console.log( $scope.recency[keyname])     
      }
  } 
  if($scope.mandatoryData.length>0){
    for(i=0;i<$scope.mandatoryData.length;i++){
      var id ="#"+$scope.mandatoryData[i];
      var mandatoryname = $(id).attr("name");
      var mandatorytitle = $(id).attr("title");
      var mandatoryField=$scope.mandatoryData[i];
 //   console.log(mandatoryField);
       
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
        if($scope.mandatoryData[i]=='location_two' && $scope.recency.districtname == 'Other' && $scope.recency.otherDistrict==""){
          $scope.showRecencyTick = false;
          var mandatorytitle = $("#otherDistrict").attr("title");
          $scope.showToastAlert(mandatorytitle); 
        return false;
      }
        if($scope.mandatoryData[i]=='location_three' && $scope.recency.location_three==""){
            $scope.showRecencyTick = false;
           $scope.showToastAlert(mandatorytitle); 
          return false;
        }
        if($scope.mandatoryData[i]=='location_three' && $scope.recency.cityname == 'Other' && $scope.recency.otherCity==""){
          $scope.showRecencyTick = false;
          var mandatorytitle = $("#otherCity").attr("title");
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
          if($scope.mandatoryData[i]=='testingFacility' && $scope.recency.testingFacility==""){
            $scope.showRecencyTick = false;
            $scope.showToastAlert(mandatorytitle); 
          return false;
          } 
          if($scope.mandatoryData[i]=='testingFacility' && $scope.recency.testing_facility_name == 'Other' && $scope.recency.othertestingfacility==""){
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Enter Other Testing Facility';
            $scope.showToastAlert(mandatorytitle); 
          return false;
        }
        if($scope.recency.testNotPerformed==true){
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
     
      if($scope.mandatoryData[i]=='vlTestDate' && $scope.recency.vlTestDate=="" && ($scope.recency.recencyOutcome!='Assay Negative'&& $scope.recency.recencyOutcome!='Invalid-Please Verify' && $scope.recency.recencyOutcome!='')){
        $scope.showRecencyTick = false;
        $scope.showToastAlert(mandatorytitle); 
      return false;
      }
      if($scope.mandatoryData[i]=='vlLoadResult' && ($scope.recency.vlLoadResult=="" || $scope.recency.vlLoadResult==null) && $scope.recency.vlLoadResultDropdown=="" && ($scope.recency.recencyOutcome!='Assay Negative'&& $scope.recency.recencyOutcome!='Invalid-Please Verify' && $scope.recency.recencyOutcome!='')){
        $scope.showRecencyTick = false;
        $scope.showToastAlert(mandatorytitle); 
      return false;
      }
    }
    if($scope.recency.sampleId!="" || $scope.recency.patientId!="" || $scope.recency.facilityId!="" ||$scope.recency.hivDiagnosisDate!="" ||
        $scope.recency.hivRecencyDate!=""||$scope.recency.ctrlLine!="" ||$scope.recency.positiveLine!="" || $scope.recency.longTermLine!="" ||
        $scope.recency.pastHivTesting!="" || $scope.recency.lastHivStatus!=""|| $scope.recency.patientOnArt!=""||$scope.recency.location_one!=""||
        $scope.recency.location_two!="" ||$scope.recency.location_three!="" || $scope.recency.testKitLotNo !=""|| $scope.recency.testKitExpDate !=""||
         $scope.recency.testerName !="" || $scope.recency.testingFacility !="" || $scope.recency.vlTestDate !="" || $scope.recency.vlLoadResult !="")
        {
          $scope.showRecencyTick = true;
              // $("#other-recency").addClass('active')
              // $("#main-recency").removeClass('active')
        }
    }  
  }

  }
  $scope.behaviourValidation = function(){
    if($scope.mandatoryData.length>0){
      for(i=0;i<$scope.mandatoryData.length;i++){
        var id ="#"+$scope.mandatoryData[i];
        var mandatoryname = $(id).attr("name");
        var mandatorytitle = $(id).attr("title");
        var mandatoryField=$scope.mandatoryData[i];
        
       // console.log(mandatoryField)

        if(($scope.mandatoryData[i]=='dob' && $scope.recency.dob=="" &&  ( $scope.recency.age=="" || $scope.recency.age == null))){
          var mandatorytitle = 'Please Enter Date Of Birth or Age';
           $scope.showBehaviourTick = false;
           $scope.showToastAlert(mandatorytitle); 
           return false;
         }

         if(($scope.mandatoryData[i]=='age' && $scope.recency.dob=="" &&  ( $scope.recency.age=="" || $scope.recency.age == null))){
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
    $scope.editRecency = function(){
      $scope.clientLocation =[];
    
       for(i=0;i<$scope.configdata.length;i++){
        var key=$scope.configdata[i].global_name;
        var  keyname = key +"_name";
        var  keyId = "#" +$scope.configdata[i].global_name;
        if($scope.configdata[i].global_name){
          $scope.clientLocation[i] = $scope.configdata[i].global_value;
        }
        if($scope.recency.location[i]==undefined || $scope.recency.location[i]==""){
          $scope.recency[key] ="";
          $scope.recency[keyname] = "";
        }else{
          $scope.recency[key] =$scope.recency.location[i];
          $scope.recency[keyname] =   $(keyId).find("option:selected").text();
        }
      }   

      for(i=0;i<$scope.mandatoryData.length;i++){
        var id ="#"+$scope.mandatoryData[i];
        var mandatoryname = $(id).attr("name");
        var mandatorytitle = $(id).attr("title");
        var mandatoryField=$scope.mandatoryData[i];
        //console.log(id)
        if($scope.mandatoryData[i]=='sampleId' && $scope.recency.sampleId==""){
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Enter Sample ID';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
         if($scope.mandatoryData[i]=='patientId' && $scope.recency.patientId==""){
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Enter Patient ID';
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
            var mandatorytitle = 'Please Enter Facility ID';
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
           var globalval = $scope.clientLocation[0];
            var mandatorytitle = 'Please Enter '+ globalval;
           $scope.showToastAlert(mandatorytitle); 
          return false;
        }
        if($scope.mandatoryData[i]=='location_two' && $scope.recency.location_two==""){
            $scope.showRecencyTick = false;
           var globalval = $scope.clientLocation[1];
            var mandatorytitle = 'Please Enter '+ globalval;
           $scope.showToastAlert(mandatorytitle); 
          return false;
        }
        if($scope.mandatoryData[i]=='location_two' && $scope.recency.districtname == 'Other' && $scope.recency.otherDistrict==""){
          $scope.showRecencyTick = false;
          var globalval = $scope.clientLocation[1];
            var mandatorytitle = 'Please Enter Other '+ globalval;
          $scope.showToastAlert(mandatorytitle); 
        return false;
      }
        if($scope.mandatoryData[i]=='location_three' && $scope.recency.location_three==""){
            $scope.showRecencyTick = false;
            var globalval = $scope.clientLocation[2];
            var mandatorytitle = 'Please Enter '+ globalval;
           $scope.showToastAlert(mandatorytitle); 
          return false;
        }
        if($scope.mandatoryData[i]=='location_three' && $scope.recency.cityname == 'Other' && $scope.recency.otherCity==""){
          $scope.showRecencyTick = false;
          var globalval = $scope.clientLocation[2];
          var mandatorytitle = 'Please Enter Other '+ globalval;
          $scope.showToastAlert(mandatorytitle); 
        return false;
         }
         if($scope.mandatoryData[i]=='hivDiagnosisDate' && $scope.recency.hivDiagnosisDate==""){
            $scope.showRecencyTick = false;
           var mandatorytitle = 'Please Enter HIV Diagnosis Date';
            $scope.showToastAlert(mandatorytitle);  
          return false;
        }
  
        if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.pastHivTesting==""){
            $scope.showRecencyTick = false;
           var mandatorytitle = 'Please Choose Past HIV Testing';
           $scope.showToastAlert(mandatorytitle);  
          return false;
        }
        if($scope.recency.pastHivTesting=='yes' || $scope.recency.pastHivTesting==''){
          if($scope.mandatoryData[i]=='testLast12Month' && $scope.recency.testLast12Month==""){
              $scope.showRecencyTick = false;
           var mandatorytitle = 'Please Choose Tested in last 12Months';
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
        if($scope.mandatoryData[i]=='testKitLotNo' && $scope.recency.testKitLotNo==""){
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Choose Test Kit Lot Number';
          $scope.showToastAlert(mandatorytitle); 
          return false;
          }
          if($scope.mandatoryData[i]=='testKitExpDate' && $scope.recency.testKitExpDate==""){
            $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Enter Test Kit Expiry Date';
            $scope.showToastAlert(mandatorytitle); 
          return false;
          }
          if($scope.mandatoryData[i]=='testerName' && $scope.recency.testerName==""){
            $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Enter Tester Name';
            $scope.showToastAlert(mandatorytitle); 
          return false;
          } 
          if($scope.mandatoryData[i]=='testingFacility' && $scope.recency.testingFacility==""){
            $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Choose Testing Facility';
            $scope.showToastAlert(mandatorytitle); 
          return false;
          } 
          if($scope.mandatoryData[i]=='testingFacility' && $scope.recency.testing_facility_name == 'Other' && $scope.recency.othertestingfacility==""){
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Enter Other Testing Facility';
            $scope.showToastAlert(mandatorytitle); 
          return false;
        }
        if($scope.recency.testNotPerformed==true){
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
        var mandatorytitle = 'Please Enter HIV+ Recency Date';
        $scope.showToastAlert(mandatorytitle); 
        return false;
      }
       if($scope.mandatoryData[i]=='ctrlLine' && $scope.recency.ctrlLine==""){
        $scope.showRecencyTick = false;
        var mandatorytitle = 'Please Enter Control Line';
        $scope.showToastAlert(mandatorytitle); 
        return false;
      }
        if($scope.mandatoryData[i]=='positiveLine' && $scope.recency.positiveLine==""){
          $scope.showRecencyTick = false;
        var mandatorytitle = 'Please Enter Positive Line';
          $scope.showToastAlert(mandatorytitle); 
        return false;
      }  if($scope.mandatoryData[i]=='longTermLine' && $scope.recency.longTermLine==""){
        $scope.showRecencyTick = false;
        var mandatorytitle = 'Please Enter Long Term Line';
        $scope.showToastAlert(mandatorytitle); 
        return false;
      }
     
      if($scope.mandatoryData[i]=='vlTestDate' && $scope.recency.vlTestDate=="" && ($scope.recency.recencyOutcome!='Assay Negative'&& $scope.recency.recencyOutcome!='Invalid-Please Verify' && $scope.recency.recencyOutcome!='')){
        $scope.showRecencyTick = false;
      var mandatorytitle = 'Please Enter Viral Load Test Date';
        $scope.showToastAlert(mandatorytitle); 
      return false;
      }
      if($scope.mandatoryData[i]=='vlLoadResult' && ($scope.recency.vlLoadResult=="" || $scope.recency.vlLoadResult==null) && $scope.recency.vlLoadResultDropdown=="" && ($scope.recency.recencyOutcome!='Assay Negative'&& $scope.recency.recencyOutcome!='Invalid-Please Verify' && $scope.recency.recencyOutcome!='')){
        $scope.showRecencyTick = false;
      var mandatorytitle = 'Please Enter Viral Load Result';
        $scope.showToastAlert(mandatorytitle); 
      return false;
      }
    }
      if(($scope.mandatoryData[i]=='dob' && $scope.recency.dob=="" && ($scope.recency.age=="" || $scope.recency.age==null))){
        var mandatorytitle = 'Please Enter Date Of Birth or Age';
         $scope.showBehaviourTick = false;
         $scope.showToastAlert(mandatorytitle); 
         return false;
       }

       if(($scope.mandatoryData[i]=='age' && $scope.recency.dob=="" && ($scope.recency.age=="" || $scope.recency.age==null))){
        var mandatorytitle = 'Please Enter Date Of Birth or Age';
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
      if($scope.mandatoryData[i]==mandatoryname && $scope.recency[mandatoryField]==""){
        $scope.showBehaviourTick = false;
        $scope.showToastAlert(mandatorytitle);
        return false;
      }
    
      }
      $scope.recency.addedBy = localStorage.getItem('userId');
      var currentdate = new Date();
      $scope.recency.formSavedDateTime = currentdate.getFullYear() + "-"
      + (currentdate.getMonth()+1)  + "-" 
      + currentdate.getDate() + " "
      + currentdate.getHours() + ":"  
      + currentdate.getMinutes() + ":" 
      + currentdate.getSeconds();
      if($scope.recency.vlLoadResult=="" && $scope.recency.vlLoadResultDropdown!=""){
        $scope.recency.vlLoadResult = $scope.recency.vlLoadResultDropdown;
      }
        $scope.chkrecency = JSON.parse(localStorage.getItem('RecencyData'))
        $scope.chkrecency[$scope.index] = $scope.recency;
        //  console.log($scope.chkrecency)
           localStorage.setItem('RecencyData',JSON.stringify($scope.chkrecency));
            $scope.recency ={};
           $scope.recencydisplay=true;

           $cordovaToast.show('Edited Successfully', 'long', 'center')
           .then(function(success) {
             // success
           }, function (error) {
             // error
           });
           $("#main-recency").addClass("active");
           $("#other-recency").removeClass('active');
           $window.location.reload(true);

           $location.path('/app/viewRecency');
         $preLoader.hide();

  
    }
})


.filter('underscorefilter', function () {
return function (input) {
    return input.replace(/_/g, ' ');
};
});