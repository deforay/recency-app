app=angular.module('starter.editRecencyCtrl', ['starter.services'])
.controller('editRecencyCtrl', function($scope, $http,$rootScope, $stateParams,ionicDatePicker,$cordovaToast,$location,  $ionicPopup,$preLoader,$localStorage, $cordovaGeolocation, $window,$filter,$cordovaNetwork) {
  $scope.recency = {};
  $scope.recencyData ={};
  $scope.recencydisplay=true;  
  $scope.displaybadge = false;
  $scope.provinceData = JSON.parse(localStorage.getItem('ProvinceData'));
  $scope.recencyDetails = JSON.parse(localStorage.getItem('viewRecency'));
  $scope.configdata = JSON.parse(localStorage.getItem('GlobalConfig'));
  $scope.mandatoryData = JSON.parse(localStorage.getItem('MandatoryData'));
  $scope.facilityData= JSON.parse(localStorage.getItem('FacilityData'));
  $scope.riskpopulations= JSON.parse(localStorage.getItem('RiskPopulations'))        

console.log( $scope.recencyDetails)

  // $("#main-recency").addClass("active");
  
  $scope.recency = $scope.recencyDetails;
  $scope.testkitlotObj1 =[];
  $scope.testkitlotObj2 =[];
  $scope.TestKitLotList = JSON.parse(localStorage.getItem('LotInfo'));
  if( $scope.TestKitLotList!=null){
    var TestKitLotListLen = Object.keys($scope.TestKitLotList).length;
    for(i=0;i<TestKitLotListLen;i++){
      if($scope.TestKitLotList[i].available!='yes'){
        $scope.testkitlotObj1.push({
          "testKitLotNo":$scope.TestKitLotList[i].testKitLotNo,
          "testKitExpDate":$scope.TestKitLotList[i].testKitExpDate,
          "label":$scope.TestKitLotList[i].label,
          "available":$scope.TestKitLotList[i].available,
        })
      }else{
        $scope.testkitlotObj2.push({
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
    console.log($scope.testkitlotObj1)
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
     console.log($scope.testerNameObj1)
     $scope.TesterNameList = $scope.testerNameObj1;
   }
  $scope.recency.location[0] = $scope.recency.location_one;
  $scope.recency.location[1] = $scope.recency.location_two;
  $scope.recency.location[2] = $scope.recency.location_three;

 console.log($scope.recency)

   if($scope.recency.location_two){
    var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
    var result = localDistrict.filter(obj => {
      return obj.province_id === $scope.recency.location_one
    })
    $scope.districtData = result;
    $scope.recency.location[1] = $scope.recency.location_two;
  }
  if($scope.recency.location_three){
    var localCity = JSON.parse(localStorage.getItem('CityData'));
    var cityresult = localCity.filter(obj => {
      return obj.district_id === $scope.recency.location_two
    })
    $scope.cityData = cityresult;
  }
 // console.log( $scope.recency.location)
  $scope.doRefresh = function() {
    $preLoader.show();
    $window.location.reload(true);
    $preLoader.hide(); 
  }
  $scope.testerNameAutoComplete = function(){
    $scope.testerNameObj = JSON.parse(localStorage.getItem('testerName'));
    console.log($scope.testerNameObj)
    $( "#testerName").autocomplete({
      source: $scope.testerNameObj,
    })

  }
  $scope.GetDistrictValue = function(province){
    var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
    var result = localDistrict.filter(obj => {
    return obj.province_id === province
  })
  $scope.districtData = result;
  $scope.recency.location[1] ="";
  $scope.recency.location[2] ="";
 
    // if($localStorage.get('offline') == true){
    //   var localarr = [];
    //   var localDistrict = [];
    //   $scope.freq_district = [];
    //   $scope.alldistrict = new Array();
  
    //   localarr = JSON.parse(localStorage.getItem('RecencyData'));  
    //   localDistrict =  JSON.parse(localStorage.getItem('DistrictData'))      
    //   var result = localDistrict.filter(obj => {
    //     return obj.province_id === province
    //   })
    //   //$scope.districtData = result;
    //   localDistrict = result;
    //    //Display recent district on top of dropdown
  
    //    $scope.alldistrict =localDistrict;
    //    for(i=0;i<localarrsize;i++){
    //      $scope.freq_district.unshift({
    //        "district_id":localarr[i]['location_two'],
    //        "district_name":localarr[i]['location_two_name']
    //      })
    //      console.log($scope.freq_district)
    //    } 
    //    for(i =0;i<Object.keys($scope.freq_district).length;i++){  
    //      $scope.alldistrict.unshift($scope.freq_district[i]);
    //      console.log($scope.alldistrict)
  
    //    }
    //    var trimmedArray2 = [];
    //    var values2 = [];
    //    var value2;
    //    for(var i = 0; i < $scope.alldistrict.length; i++) {
    //      value2 = $scope.alldistrict[i]['district_id'];
    //      if(values2.indexOf(value2) === -1) {
    //        trimmedArray2.push($scope.alldistrict[i]);
    //        values2.push(value2);
    //      }
    //    }
    //    $scope.districtData = trimmedArray2;  
    //    console.log($scope.districtData);
     
    // }else{
    //   var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
    //   var result = localDistrict.filter(obj => {
    //   return obj.province_id === province
    // })
    // $scope.districtData = result;
    // }
  
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
  $scope.recency.location[2] ="";

    }
    
  }
//console.log($scope.recency.location[0])
if( $scope.recency.facility_name =="Other" && ($scope.recency.otherfacility != undefined ||$scope.recency.otherfacility!="")){
  $scope.showotherfacility = true;
  $scope.recency.facility_name="Other"
 }
 if( $scope.recency.riskPopulationName =="Other" && ($scope.recency.otherriskPopulation != undefined ||$scope.recency.otherriskPopulation!="")){
  $scope.otherpopulation = true;
  $scope.recency.riskPopulationName="Other"
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
      console.log("isOnline",isOnline);
      $localStorage.set('online',isOnline);
      $localStorage.set('offline','false');
      // $http.get($localStorage.get('apiUrl')+'/api/facility')
      // .success(function(data) {
      //   var facilitylen = ($scope.facilityData.length+1).toString();
      //   $scope.facilityData.push({
      //      "facility_id": facilitylen,
      //      "facility_name":"Other"
      //    })
      //    localStorage.setItem('FacilityData',JSON.stringify($scope.facilityData)) 
      
     // });

   
    }
    function onoffline() {
      var isOnline = $cordovaNetwork.isOnline();
      console.log("isOnline",isOnline);
      $localStorage.set('online',isOnline);
      $localStorage.set('offline','true');
      $scope.riskpopulations = JSON.parse(localStorage.getItem('RiskPopulations'));
      $scope.configdata = JSON.parse(localStorage.getItem('GlobalConfig'));
      var localarr = [];
      var localfacility =[];
      $scope.freq_facilities = [];
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
          //Display recent province on top of dropdown

          $scope.allprovinces =localprovince;
          for(i=0;i<localarrsize;i++){
            $scope.freq_provinces.unshift({
              "province_id":localarr[i]['location_one'],
              "province_name":localarr[i]['location_one_name']
            })
            console.log($scope.freq_provinces)
          } 
          for(i =0;i<Object.keys($scope.freq_provinces).length;i++){  
            $scope.allprovinces.unshift($scope.freq_provinces[i]);
            console.log($scope.allprovinces)

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
          console.log($scope.provinceData);
   
      }else{
        $scope.facilityData =localfacility;
        $scope.provinceData =localprovince;
      //  console.log( $scope.facilityData)
      }
    }
    $scope.getTestKitExpDate = function(lotNo){
      console.log(lotNo)
      if(lotNo!=""){
        for(i=0;i<$scope.TestKitLotList.length;i++){
          if(lotNo==$scope.TestKitLotList[i].testKitLotNo){
            $scope.ExpDate = $scope.TestKitLotList[i].testKitExpDate
          }
        }
        $scope.recency.testKitExpDate = $scope.ExpDate
        console.log($scope.recency.testKitExpDate)
      }else{
        $scope.recency.testKitExpDate=""; 
      }
    }

    $scope.getLatLong = function(){
      var options = {maximumAge: 20000,timeout: 30000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){

        $scope.recency.latitude=position.coords.latitude;
        $scope.recency.longitude=position.coords.longitude;
        console.log( $scope.recency.latitude)
        console.log( $scope.recency.longitude)
        $scope.gis = true;
        $scope.giserror = false;
    },
    function(error){
      console.log(error); 
      // $scope.gis = "GIS Information is Not Available";
      $scope.recency.latitude ="";
      $scope.recency.longitude = "";
      $scope.gis = false;
      $scope.giserror = true;

        $preLoader.hide();
      })
    }
    $scope.getLatLong();
    $scope.getOutcome = function(controlLine,positiveLine,longTermLine){
      if((controlLine=='absent'&& positiveLine=='absent'&& longTermLine=='absent')||
      (controlLine=='absent'&& positiveLine=='absent'&& longTermLine=='present')||
      (controlLine=='absent'&& positiveLine=='present'&& longTermLine=='absent')||
      (controlLine=='absent'&& positiveLine=='present'&& longTermLine=='present')||
      (controlLine=='present'&& positiveLine=='absent'&& longTermLine=='present'))
      {
        $scope.recency.recencyOutcome="Invalid-Please Verify";
      }
      if(controlLine=='present'&& positiveLine=='absent'&& longTermLine=='absent'){
        $scope.recency.recencyOutcome="HIV Negative";
      }
      if(controlLine=='present'&& positiveLine=='present'&& longTermLine=='absent'){
        $scope.recency.recencyOutcome="Preliminary Recent";
      }
      if(controlLine=='present'&& positiveLine=='present'&& longTermLine=='present'){
        $scope.recency.recencyOutcome="Long Term";
      }
      if(controlLine==""|| positiveLine==""||longTermLine==""){
        $scope.recency.recencyOutcome="";
      }
      console.log($scope.recency.recencyOutcome); 
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

      if(facilityid!=""){
        $scope.recency.facility_name = $("#facilityId option:selected").text();
        console.log($scope.recency.facility_name)
      }
      if($scope.recency.facility_name=='Other'){
        $scope.showotherfacility = true;
         }
       else{
        $scope.showotherfacility = false;
        $scope.recency.otherfacility="";
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
            $scope.recency.ctrlLineName = 'Present(Positive/P)';  
          }
          if(controlline=='absent'){
            $scope.recency.ctrlLineName = 'Absent(Negative/N)';
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
      }; 
        ionicDatePicker.openDatePicker(ipObj1);
     
    }
    
    $scope.setRecencyDate = function(val){
      var ipObj2 = {
        callback: function (val) {  //Mandatory
         // console.log('Return value from the datepicker popup is : ' + val, new Date(val));
          var hivRecencyDate = new Date(val);
         // console.log(hivRecencyDate);
          $scope.recency.hivRecencyDate =  $filter('date')(hivRecencyDate , "dd-MMM-yyyy");
        },
      }; 
        ionicDatePicker.openDatePicker(ipObj2);
    }
    $scope.setTestKitExpDate = function(val){
      var ipObj3 = {
        callback: function (val) { 
       
        var testKitExpDate = new Date(val);
        console.log(testKitExpDate);
        $scope.recency.testKitExpDate =  $filter('date')(testKitExpDate , "dd-MMM-yyyy");
        }
       
      }; 
      ionicDatePicker.openDatePicker(ipObj3);
    }
    $scope.setDob = function(val){
      var ipObj3 = {
        callback: function (val) {  //Mandatory
          var dob = new Date(val);
          console.log(dob);
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
      if(age!= null ){
        $scope.recency.dob ="";
      }
      }
    $scope.clearTestKitExpDate= function(){
      $scope.recency.testKitExpDate ='';
      $('#testKitExpDate').val("")

    }
  
  $scope.patientvalidation = function(){
  //  console.log($scope.recency)
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
        //  console.log( $scope.recency[keyname])     
      }
  }
    for(i=0;i<$scope.mandatoryData.length;i++){
      var id ="#"+$scope.mandatoryData[i];
      var mandatoryname = $(id).attr("name");
      var mandatorytitle = $(id).attr("title");
      var mandatoryField=$scope.mandatoryData[i];
    //  console.log(mandatoryField);
             
    if($scope.mandatoryData[i]=='sampleId' && $scope.recency.sampleId==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
     if($scope.mandatoryData[i]=='patientId' && $scope.recency.patientId==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
    if( $scope.recency.patientId=="" && $scope.recency.sampleId==""){
      $ionicPopup.alert({title:'Alert!',template:'Please Choose Either Sample ID or Patient ID'});
      return false;
    }
     if($scope.mandatoryData[i]=='facilityId' && $scope.recency.facilityId==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
    if($scope.mandatoryData[i]=='location_one' && $scope.recency.location_one==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
    if($scope.mandatoryData[i]=='location_two' && $scope.recency.location_two==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
    if($scope.mandatoryData[i]=='location_three' && $scope.recency.location_three==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
     if($scope.mandatoryData[i]=='hivDiagnosisDate' && $scope.recency.hivDiagnosisDate==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }

    if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.pastHivTesting==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
    if($scope.recency.pastHivTesting=='yes' || $scope.recency.pastHivTesting==''){
      if($scope.mandatoryData[i]=='testLast12Month' && $scope.recency.testLast12Month==""){
        $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
        $scope.recencydisplay=true;
        return false;
      }
    }
    if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.pastHivTesting == 'yes' && $scope.recency.lastHivStatus==""){
      $ionicPopup.alert({title:'Alert!',template:'Please Choose Last HIV Status'});
      $scope.recencydisplay=true;
      return false;
    }
    if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.lastHivStatus == 'positive' && $scope.recency.patientOnArt==""){
      $ionicPopup.alert({title:'Alert!',template:'Please Choose whether the Patient on ART'});
      $scope.recencydisplay=true;
      return false;
    }
    if($scope.recency.testNotPerformed==true){
      if( $scope.recency.recencyreason==""){
        $ionicPopup.alert({title:'Alert!',template:"Please Choose Reason of Recency Test Not Performed"});
        $scope.recencydisplay=true;
        return false;
      }
      if( $scope.recency.recencyreason=="other" &&  $scope.recency.otherreason==""){
        $ionicPopup.alert({title:'Alert!',template:"Please Enter Other Reason"});
        $scope.recencydisplay=true;
        return false;
      }
    }
    if($scope.recency.testNotPerformed!=true){
    if($scope.mandatoryData[i]=='hivRecencyDate' && $scope.recency.hivRecencyDate==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
     if($scope.mandatoryData[i]=='ctrlLine' && $scope.recency.ctrlLine==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
      if($scope.mandatoryData[i]=='positiveLine' && $scope.recency.positiveLine==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }  if($scope.mandatoryData[i]=='longTermLine' && $scope.recency.longTermLine==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
  }
  if($scope.mandatoryData[i]=='testKitLotNo' && $scope.recency.testKitLotNo==""){
    $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
    $scope.recencydisplay=true;
    return false;
  }  if($scope.mandatoryData[i]=='testKitExpDate' && $scope.recency.testKitExpDate==""){
    $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
    $scope.recencydisplay=true;
    return false;
  }  if($scope.mandatoryData[i]=='testerName' && $scope.recency.testerName==""){
    $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
    $scope.recencydisplay=true;
    return false;
  }

    if($scope.recency.sampleId!="" || $scope.recency.patientId!="" || $scope.recency.facilityId!="" ||$scope.recency.hivDiagnosisDate!="" ||
    $scope.recency.hivRecencyDate!=""||$scope.recency.ctrlLine!="" ||$scope.recency.positiveLine!="" || $scope.recency.longTermLine!="" ||
    $scope.recency.pastHivTesting!="" || $scope.recency.lastHivStatus!=""|| $scope.recency.patientOnArt!=""||$scope.recency.location_one!=""||
    $scope.recency.location_two!="" ||$scope.recency.location_three!="" || $scope.recency.testKitLotNo !=""|| $scope.recency.testKitExpDate !=""|| $scope.recency.testerName !="")
    {
      $scope.recencydisplay=false;
    }
  }
    if($("#other-recency").hasClass('active')){
    }
    else
    {
      $("#other-recency").addClass('active')
      $("#main-recency").removeClass('active')
    }
  
  }
    $scope.editRecency = function(){
      console.log($scope.recency);
      // if( $scope.recency.riskPopulation != 'Other'){
      //   $scope.recency.otherriskPopulation = "";
      //  }else{
      //   $scope.recency.otherriskPopulation=$("#otherriskPopulation").val();

      //  }
       for(i=0;i<$scope.configdata.length;i++){
        var key=$scope.configdata[i].global_name;
        var  keyname = key +"_name";
        var  keyId = "#" +$scope.configdata[i].global_name;
        if($scope.recency.location[i]==undefined || $scope.recency.location[i]==""){
          $scope.recency[key] ="";
          $scope.recency[keyname] = "";
        }else{
          $scope.recency[key] =$scope.recency.location[i];
          $scope.recency[keyname] =   $(keyId).find("option:selected").text();
        }
      }   

      console.log($scope.recency)

      // if($scope.recency.facilityId!=""){
      //   $scope.recency.facility_name = $("#facilityId option:selected").text();
      // }
      // if($scope.recency.ctrlLine!=""){
      //   $scope.recency.ctrlLineName =   $("#ctrlLine option:selected").text();
      // }
      // if($scope.recency.positiveLine!=""){
      //   $scope.recency.positiveLineName =   $("#positiveLine option:selected").text();
      // }
      // if($scope.recency.longTermLine!=""){
      //   $scope.recency.longTermLineName =   $("#longTermLine option:selected").text();
      // }
      for(i=0;i<$scope.mandatoryData.length;i++){
        var id ="#"+$scope.mandatoryData[i];
        var mandatoryname = $(id).attr("name");
        var mandatorytitle = $(id).attr("title");
        var mandatoryField=$scope.mandatoryData[i];
     //   console.log(mandatoryField)
  
                    
    if($scope.mandatoryData[i]=='sampleId' && $scope.recency.sampleId==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
     if($scope.mandatoryData[i]=='patientId' && $scope.recency.patientId==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
    if( $scope.recency.patientId=="" && $scope.recency.sampleId==""){
      $ionicPopup.alert({title:'Alert!',template:'Please Choose Either Sample ID or Patient ID'});
      return false;
    }
     if($scope.mandatoryData[i]=='facilityId' && $scope.recency.facilityId==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
    if($scope.mandatoryData[i]=='location_one' && $scope.recency.location_one==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
    if($scope.mandatoryData[i]=='location_two' && $scope.recency.location_two==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
    if($scope.mandatoryData[i]=='location_three' && $scope.recency.location_three==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
     if($scope.mandatoryData[i]=='hivDiagnosisDate' && $scope.recency.hivDiagnosisDate==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }

    if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.pastHivTesting==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
    if($scope.recency.pastHivTesting=='yes' || $scope.recency.pastHivTesting==''){
      if($scope.mandatoryData[i]=='testLast12Month' && $scope.recency.testLast12Month==""){
        $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
        $scope.recencydisplay=true;
        return false;
      }
    }
    if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.pastHivTesting == 'yes' && $scope.recency.lastHivStatus==""){
      $ionicPopup.alert({title:'Alert!',template:'Please Choose Last HIV Status'});
      $scope.recencydisplay=true;
      return false;
    }
    if($scope.mandatoryData[i]=='pastHivTesting' && $scope.recency.lastHivStatus == 'positive' && $scope.recency.patientOnArt==""){
      $ionicPopup.alert({title:'Alert!',template:'Please Choose whether the Patient on ART'});
      $scope.recencydisplay=true;
      return false;
    }
    if($scope.recency.testNotPerformed==true){
      if( $scope.recency.recencyreason==""){
        $ionicPopup.alert({title:'Alert!',template:"Please Choose Reason of Recency Test Not Performed"});
        $scope.recencydisplay=true;
        return false;
      }
      if( $scope.recency.recencyreason=="other" &&  $scope.recency.otherreason==""){
        $ionicPopup.alert({title:'Alert!',template:"Please Enter Other Reason"});
        $scope.recencydisplay=true;
        return false;
      }
    }
    if($scope.recency.testNotPerformed!=true){
    if($scope.mandatoryData[i]=='hivRecencyDate' && $scope.recency.hivRecencyDate==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
     if($scope.mandatoryData[i]=='ctrlLine' && $scope.recency.ctrlLine==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
      if($scope.mandatoryData[i]=='positiveLine' && $scope.recency.positiveLine==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }  if($scope.mandatoryData[i]=='longTermLine' && $scope.recency.longTermLine==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      $scope.recencydisplay=true;
      return false;
    }
  }
     if($scope.mandatoryData[i]=='dob' && $scope.recency.dob==""){
    $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
    return false;
     }
     if($scope.mandatoryData[i]=='age' && $scope.recency.age==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      return false;
   }
    if( $scope.recency.age=="" && $scope.recency.dob==""){
    $ionicPopup.alert({title:'Alert!',template:'Please Enter Either Date Of Birth or Age'});
    return false;
    }
    if($scope.mandatoryData[i]=='gender' && $scope.recency.gender==""){
      $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
      return false;
    }
    if($scope.mandatoryData[i]=='residence' && $scope.recency.residence==""){
        $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
        return false;
     }
   if($scope.mandatoryData[i]=='educationLevel' && $scope.recency.educationLevel==""){
          $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
          return false;
    }
    if($scope.mandatoryData[i]=='riskPopulation' && $scope.recency.riskPopulation==""){
            $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
            return false;
    }
    if($scope.mandatoryData[i]=='riskPopulation' && $scope.recency.riskPopulation == 'Other' && $scope.recency.otherriskPopulation==""){
           $ionicPopup.alert({title:'Alert!',template:'Please Choose Other Risk Population'});         
          return false;
    }
    if($scope.recency.gender!='male'){
      if($scope.mandatoryData[i]=='pregnancyStatus' && $scope.recency.pregnancyStatus==""){
            $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
            return false;
      }
    }
    if($scope.mandatoryData[i]=='currentSexualPartner' && $scope.recency.currentSexualPartner==""){
          $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
          return false;
    }
    if($scope.mandatoryData[i]=='violenceLast12Month' && $scope.recency.violenceLast12Month==""){
          $ionicPopup.alert({title:'Alert!',template:mandatorytitle});
          return false;       
   }
  }
        console.log($scope.recency)
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