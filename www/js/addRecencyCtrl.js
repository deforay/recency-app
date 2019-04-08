app=angular.module('starter.addRecencyCtrl', ['starter.services'])


app.controller('addRecencyCtrl', function($scope,$rootScope, $http, $timeout, $stateParams,$cordovaToast, ionicDatePicker,  $ionicPopup,$preLoader,$localStorage, $cordovaGeolocation, $window,$filter,$cordovaNetwork) {
 

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
      $scope.announcement = JSON.parse(localStorage.getItem('Announcement'));
      $scope.optionalFieldsFlag = JSON.parse(localStorage.getItem('OptionalData'));
      $scope.mandatoryData = JSON.parse(localStorage.getItem('MandatoryData'));
      $scope.facilityData= JSON.parse(localStorage.getItem('FacilityData'));
      //console.log($scope.facilityData)
      $scope.facilityTestData= JSON.parse(localStorage.getItem('TestingFacilityData'));
      $scope.facilityTestTypeData= JSON.parse(localStorage.getItem('TestingFacilityTypeData'));
     // console.log($scope.facilityTestData)
      $scope.riskpopulations= JSON.parse(localStorage.getItem('RiskPopulations'));    

      $scope.$on("$ionicView.beforeEnter", function(event, data){
        $scope.recencydisplay=true; 
        $("#main-recency").addClass("active");
      });

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
      $scope.recency.sampleCollectionDate="";
      $scope.recency.sampleReceiptDate="";
      $scope.recency.receivedSpecimenType="";
      $scope.recency.facilityId="";
      $scope.recency.facility_name="";
      //$scope.recency.otherfacility="";
      $scope.recency.hivDiagnosisDate="";
      $scope.recency.hivRecencyTestDate="";
      $scope.recency.ctrlLine="";
      $scope.recency.ctrlLineName="";
      $scope.recency.positiveLine="";
      $scope.recency.positiveLineName=""
      $scope.recency.longTermLine="";
      $scope.recency.longTermLineName="";
      $scope.recency.recencyOutcome="";
      $scope.recencyOutcomeDisplay="";
      $scope.recency.recencyreason="";
      $scope.recency.recencyreasonName="";
      $scope.recency.otherreason="";
      $scope.recency.testKitLotNo = "";
      $scope.recency.ManufacturerName="";
      $scope.recency.testKitExpDate = "";
      $scope.recency.testerName = "";
      $scope.recency.testingFacility = "";
   //   $scope.recency.testing_facility_name = "";
      $scope.recency.testingModality = "";
      $scope.recency.testingModalityName = "";
      // $scope.recency.othertestingfacility = "";
      $scope.recency.othertestingmodality = "";
      $scope.recency.vlTestDate = "";
      $scope.recency.vlLoadResult = "";
      $scope.recency.vlLoadResultDropdown = "";
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
      $scope.recency.showFinalOutcome = false;
      $scope.recency.showtermOutcome = false;
      
      if($scope.recency.vlLoadResult==null){
        $scope.recency.vlLoadResult="";
      }

      var options = {maximumAge: 20000,timeout: 30000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        $scope.recency.latitude=parseFloat(position.coords.latitude).toFixed(3);
        $scope.recency.longitude= parseFloat(position.coords.longitude).toFixed(3);       
        var currentdate = new Date(); 
        $scope.gis = true;
        $scope.giserror = false;
       
        },
        function(error){
        //console.log(error); 
        $scope.gis = false;
        $scope.giserror = true;
        $preLoader.hide();
      })
    }
    else
    {
      $scope.recency = JSON.parse(localStorage.getItem('PartialRecencyData'));
     // console.log($scope.recency)

      //Other Text Field

      // if( $scope.recency.facility_name =="Other" ){
      //   $scope.showotherfacility = true;
      //   $scope.recency.facility_name="Other"
      //  }
      //  if( $scope.recency.testing_facility_name =="Other" && ($scope.recency.othertestingfacility != undefined)){
      //   $scope.showothertestfacility = true;
      //   $scope.recency.testing_facility_name="Other"
      //  }
       if( $scope.recency.testingModalityName =="Other" && ($scope.recency.othertestingmodality != undefined)){
        $scope.showothertestmodality = true;
        $scope.recency.testingModalityName="Other"
       }
       if( $scope.recency.location_two_name =="Other" && ($scope.recency.otherDistrict != undefined )){
        $scope.showotherdistrict = true;
        $scope.recency.location_two_name="Other"
       }
       if( $scope.recency.location_three_name =="Other" && ($scope.recency.otherCity != undefined )){
        $scope.showothercity = true;
        $scope.recency.location_three_name="Other"
       }
       if( $scope.recency.riskPopulationName =="Other" && ($scope.recency.otherriskPopulation != undefined && $scope.recency.otherriskPopulation!="")){
        $scope.otherpopulation = true;
        $scope.recency.riskPopulationName="Other"
       }
       //Term Outcome
       if($scope.recency.recencyOutcome=='Invalid-Please Verify'){
        $scope.recency.showtermOutcome = true;
        $scope.recencyOutcomeDisplay ="";
        $scope.setoutcomecolor='red';
      }
      else if($scope.recency.recencyOutcome =='Assay Negative'){
        $scope.recency.showtermOutcome = true;
        $scope.recencyOutcomeDisplay ="";
        $scope.setoutcomecolor='blue';
      }else if($scope.recency.recencyOutcome=='Assay Recent' || $scope.recency.recencyOutcome=='Assay Long Term'){
        $scope.recency.showtermOutcome = true;
        $scope.recencyOutcomeDisplay = "- Please ensure you add Viral Load Result";
        $scope.setoutcomecolor='black';
      }else{
        $scope.recency.showtermOutcome = false;
        $scope.recencyOutcomeDisplay ="";

      }

      if($scope.recency.recencyOutcome=="Assay Recent" && ( $scope.recency.vlLoadResult =="" || $scope.recency.vlLoadResult==null) && ( $scope.recency.vlLoadResultDropdown =="" || $scope.recency.vlLoadResultDropdown==null) )
      {
        $scope.recencyOutcomeDisplay = "- Please ensure you add Viral Load Result";
      }else{
        $scope.recencyOutcomeDisplay ="";
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
    
     // console.log($scope.recency.location)
       var localDistrictjson = localStorage.getItem('DistrictData');
      if($scope.recency.location[0]&& (localDistrictjson!="" && localDistrictjson!=null)){
        var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
        var districtresult = localDistrict.filter(obj => 
          {
          return obj.province_id === $scope.recency.location[0]
        })
        $scope.districtData = districtresult;
        $scope.recency.location[1] = $scope.recency.location[1];
       console.log( $scope.districtData)
        if($scope.recency.location[0]!=""||$scope.recency.location[0]!=null){
          if(districtresult.length==0){
              $scope.districtData.push({
               "district_id": districtresult.length.toString(),
               "district_name":"Other"
              })
          }
          else
          {
           var len = $scope.districtData.length - 1;
           var districtlen = $scope.districtData[len];  
           var districtid = (parseInt(districtlen['district_id'])+1).toString();
            $scope.districtData.push({
              "district_id": districtid,
              "district_name":"Other"
            })
          }
        }
      }
      else{
        $scope.districtData =[];
        $scope.cityData =[];
      }
      var localCityjson = localStorage.getItem('CityData');
      if($scope.recency.location[1] && (localCityjson!="" &&  localCityjson!=null)){
        var localCity = JSON.parse(localStorage.getItem('CityData'));
        var cityresult = localCity.filter(obj => {
          return obj.district_id === $scope.recency.location[1]
        })
        $scope.cityData = cityresult;
        if($scope.recency.location[1]!=""||$scope.recency.location[1]!=null){
          if(cityresult.length==0){
            $scope.cityData.push({
             "city_id": cityresult.length.toString(),
             "city_name":"Other"
           })
           }
           else
           {
             var len = $scope.cityData.length - 1;
             var citylen = $scope.cityData[len];  
             var cityid = (parseInt(citylen['facility_id'])+1).toString();
             $scope.cityData.push({
              "city_id": cityid,
              "city_name":"Other"
            })
           }
        }
      //  console.log($scope.cityData);
      }else{
        $scope.cityData =[];
      }
      console.log($scope.recency.location)
     // if($scope.recency.facilityId!='' && $scope.recency.facilityId!=null){
        if(($scope.recency.location[0]!=''||$scope.recency.location[0]!=null)
        &&($scope.recency.location[1]!=''||$scope.recency.location[1]!=null)
        &&($scope.recency.location[2]!=''||$scope.recency.location[2]!=null)){
         
          var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
          var fac_result = localfacility.filter(obj => 
            {
            return obj.city === $scope.recency.location[2]
          })
           $scope.facilityData = fac_result;
          //  var maxid = Math.max.apply(Math,localfacility.map(function(o){return o.facility_id;}))
          //  var facilityid = (maxid).toString(); 
          //  if(fac_result.length==0){
          //    $scope.facilityData.push({
          //     "facility_id": facilityid,
          //     "facility_name":"Other"
          //   })
          //   }
          //   else
          //   {
          //     var len = $scope.facilityData.length - 1;
          //     var facilitylen = $scope.facilityData[len];  
          //     $scope.facilityData.push({
          //        "facility_id": facilityid,
          //        "facility_name":"Other"
          //     })
          //   }
        }
       else  if(($scope.recency.location[0]!=''||$scope.recency.location[0]!=null)&&($scope.recency.location[1]!=''||$scope.recency.location[1]!=null)){
          var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
          var fac_result = localfacility.filter(obj => 
            {
            return obj.district === $scope.recency.location[1]
          })
           $scope.facilityData = fac_result;
          //  var maxid = Math.max.apply(Math,localfacility.map(function(o){return o.facility_id;}))
          //  var facilityid = (maxid).toString(); 
          //  if(fac_result.length==0){
          //    $scope.facilityData.push({
          //     "facility_id": facilityid,
          //     "facility_name":"Other"
          //   })
          //   }
          //   else
          //   {
          //     var len = $scope.facilityData.length - 1;
          //     var facilitylen = $scope.facilityData[len];  
          //     $scope.facilityData.push({
          //        "facility_id": facilityid,
          //        "facility_name":"Other"
          //     })
          //   }
        }
      else  if($scope.recency.location[0]!=''||$scope.recency.location[0]!=null){
          var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
          var fac_result = localfacility.filter(obj => 
           { 
            return obj.province === $scope.recency.location[0]
          })
          $scope.facilityData = fac_result;
          // var maxid = Math.max.apply(Math,localfacility.map(function(o){return o.facility_id;}))
          // var facilityid = (maxid).toString();
          
          // if(fac_result.length==0){
          //   $scope.facilityData.push({
          //    "facility_id": facilityid,
          //    "facility_name":"Other"
          //  })
          //  }else{
          //   var len = $scope.facilityData.length - 1;
          //   var facilitylen = $scope.facilityData[len];  
          //   $scope.facilityData.push({
          //    "facility_id": facilityid,
          //    "facility_name":"Other"
          //  })
          //  }
        }
      // }else{
      //  $scope.facilityData = JSON.parse(localStorage.getItem('FacilityData'));
      // }
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
   // console.log( $scope.optionalFieldsFlag);
    }, 100);
    }
    $scope.getoptionField();

    document.addEventListener("deviceready", onDeviceReady, false);

    // To get Device Mac Address and Phone Number
 
    function onDeviceReady() {
       $scope.recency.macAddress = device.uuid;
      localStorage.setItem('MacAddress', $scope.recency.macAddress);
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

      if($scope.recency.vlLoadResult==undefined)
      {
        $scope.recency.vlLoadResult='';
        $("#vlLoadResult").val("");
      }
      var partialData = $scope.recency;
    if($scope.recency.formInitDateTime=='' || $scope.recency.formInitDateTime==null || $scope.recency.formInitDateTime==undefined){
      var currentdatetime = new Date();
      $scope.recency.formInitDateTime = currentdatetime.getFullYear() + "-"
      + (currentdatetime.getMonth()+1)  + "-" 
      + currentdatetime.getDate() + " "
      + currentdatetime.getHours() + ":"  
      + currentdatetime.getMinutes() + ":" 
      + currentdatetime.getSeconds();
  
    }
    else{
     // console.log($scope.recency.formInitDateTime);
    }
    $scope.recency.facility_name = $("#facilityId").find("option:selected").text();

    if($scope.recency.facility_name=='-- Select --'){
     $scope.recency.facility_name = "";
   }  
  // console.log($scope.recency.facility_name)
    if($scope.recency.vlLoadResult==null){
      $scope.recency.vlLoadResult="";
    }
      for(i=0;i<$scope.configdata.length;i++){
        var key=$scope.configdata[i].global_name;
        var  keyname = key +"_name";
        var  keyId = "#" +$scope.configdata[i].global_name;
        if( $scope.recency.location[i]!=undefined && $scope.recency.location[i]!=""){
          $scope.recency[key] =$scope.recency.location[i];
          $scope.recency[keyname] =   $(keyId).find("option:selected").text();
        }else{
          $scope.recency[key] =""
          $scope.recency[keyname] = "";
        }
      }   

       localStorage.setItem('PartialRecencyData',JSON.stringify(partialData)) ;
   }


    $scope.setmainactive = function(){
     $scope.recencydisplay=true;

      if($("#main-recency").hasClass('active')){
    } else {
        $("#main-recency").addClass('active')
        $("#other-recency").removeClass('active')
    }

    }
    $scope.setothersactive = function(){
       $scope.recencydisplay=false;

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
      if(lotNo!=""){
        for(i=0;i<$scope.TestKitLotList.length;i++){
          if(lotNo==$scope.TestKitLotList[i].testKitLotNo){
            $scope.ExpDate = $scope.TestKitLotList[i].testKitExpDate;
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


      // document.addEventListener("online",ononline, false);
      // document.addEventListener("offline", onoffline, false);
      
      function ononline() {

        var isOnline = $cordovaNetwork.isOnline();
        console.log("isOnline",isOnline);
        $localStorage.set('online',isOnline);
        $localStorage.set('offline','false');
      }
      // When Internet Connection is Disconnected
      function onoffline() {
        var isOnline = $cordovaNetwork.isOnline();
        //console.log("isOnline",isOnline);
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
        for(i=0;i<$scope.configdata.length;i++){
          $scope.recency.location[i]="";       
       } 

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
        localprovince = JSON.parse(localStorage.getItem('ProvinceData'));

        if(localarr !=null){
               //Display recent Facilities  in Facility dropdown
            var localarrsize = Object.keys(localarr).length;
            var obj = {};
            $scope.allfacilities =localfacility;
            for(i=0;i<localarrsize;i++){
              $scope.freq_facilities.unshift({
                "facility_id":localarr[i]['facilityId'],
                "facility_name":localarr[i]['facility_name']
              })
            } 
            for(i =0;i<Object.keys($scope.freq_facilities).length;i++){  
              $scope.allfacilities.unshift($scope.freq_facilities[i]);
            }
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
            $scope.facilityData = trimmedArray;
            //console.log( $scope.facilityData);

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
             var trimmedArray = [];
             var values = [];
             var value;
             for(var i = 0; i < $scope.alltestfacilities.length; i++) {
               value = $scope.alltestfacilities[i]['facility_id'];
               if(values.indexOf(value) === -1) {
                 trimmedArray.push($scope.alltestfacilities[i]);
                 values.push(value);
               }
             }
             $scope.facilityTestData = trimmedArray;
             //console.log( $scope.facilityTestData);
 
             //Display recent province in Province dropdown

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
          $scope.facilityTestData =localtestfacility;
          $scope.provinceData = localprovince;  
        }
      }
      $scope.recencyNotPerformed = function(testNotPerformed){
        if(testNotPerformed==true){
          $scope.recency.hivRecencyTestDate="";
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
        if(vlLoadResultDropdown=='' && $scope.recency.vlLoadResult==""&& $scope.recency.recencyOutcome=='Assay Recent'){
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
          $scope.recency.showtermOutcome = true;
          $scope.setoutcomecolor = 'black';
          $scope.recency.finalOutcome="";
          $scope.recency.showFinalOutcome = false; 
          if($scope.recency.vlLoadResult=="" &&  $scope.recency.vlLoadResultDropdown==""){
            $scope.recencyOutcomeDisplay = "- Please ensure you add Viral Load Result";
          }else{
            $scope.recencyOutcomeDisplay="";
          }
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
       
        if(termOutcome=="Assay Recent" && vlLoadResult >1000){
          $scope.recency.finalOutcome="RITA Recent";
          $scope.recencyOutcomeDisplay ="";
          $scope.recency.showFinalOutcome = true;
          $scope.setfinalcolor = 'blue';
        }
        else if(termOutcome=="Assay Recent" && (vlLoadResult <=1000   && vlLoadResult !="" && vlLoadResult!=null) ){
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
        console.log($scope.recency.recencyreasonName)
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
          callback: function (val) {  
          var hivDiagnosisDate = new Date(val);
            $scope.recency.hivDiagnosisDate =  $filter('date')(hivDiagnosisDate , "dd-MMM-yyyy");
            $scope.partialRecencyData();
           },
    to: new Date(),
          }; 
      ionicDatePicker.openDatePicker(ipObj1);
    }
    $scope.setSampleCollectionDate = function(){
      var ipObj2 = {
        callback: function (val) {  
        var sampleCollectionDate = new Date(val);
          $scope.recency.sampleCollectionDate =  $filter('date')(sampleCollectionDate , "dd-MMM-yyyy");
          $scope.partialRecencyData();
         },
         to: new Date(),
        }; 
    ionicDatePicker.openDatePicker(ipObj2);
    }
    $scope.setsampleReceiptDate = function(){
      var ipObj3 = {
        callback: function (val) {  
        var sampleReceiptDate = new Date(val);
          $scope.recency.sampleReceiptDate =  $filter('date')(sampleReceiptDate , "dd-MMM-yyyy");
          $scope.partialRecencyData();
         },
         to: new Date(),
        }; 
    ionicDatePicker.openDatePicker(ipObj3);
    }
  $scope.setRecencyDate = function(val){
    var ipObj4 = {
      callback: function (val) { 
     
      var hivRecencyTestDate = new Date(val);
      $scope.recency.hivRecencyTestDate =  $filter('date')(hivRecencyTestDate , "dd-MMM-yyyy");
       $scope.partialRecencyData();
      },
      to: new Date(),
    //   weeksList: [],
    // dateFormat: 'MMMM yyyy',
    }; 
    ionicDatePicker.openDatePicker(ipObj4);
  }
  $scope.setVlTestDate = function(val){
    var ipObj5 = {
      callback: function (val) { 
     
      var viralLoadTestDate = new Date(val);
      $scope.recency.vlTestDate =  $filter('date')(viralLoadTestDate , "dd-MMM-yyyy");
       $scope.partialRecencyData();
      },
      to: new Date(),
    //   weeksList: [],
    // dateFormat: 'MMMM yyyy',
    }; 
    ionicDatePicker.openDatePicker(ipObj5);
  }
  $scope.setTestKitExpDate = function(val){
    var ipObj6 = {
      callback: function (val) { 
     
      var testKitExpDate = new Date(val);
      $scope.recency.testKitExpDate =  $filter('date')(testKitExpDate , "dd-MMM-yyyy");
      },
    }; 
    ionicDatePicker.openDatePicker(ipObj6);
  }
  $scope.setDob = function(val){
   var ipObj7 = {
     callback: function (val) {  //Mandatory
      var dob = new Date(val);
      //console.log(dob);
      var ageDifMs = Date.now() - dob.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      $scope.recency.dob =  $filter('date')(dob , "dd-MMM-yyyy");
      $scope.recency.age = Math.abs(ageDate.getUTCFullYear() - 1970);
      $scope.partialRecencyData();
    },
    to: new Date(),
  }; 
    ionicDatePicker.openDatePicker(ipObj7);
  }
  
  $scope.cleardob = function(age){
    if(age!= null ){
    $scope.recency.dob ="";
    }
  }

// Get District Dropdown based on Province
$scope.GetDistrictValue = function(province){
console.log(province)
  if((localStorage.getItem('DistrictData'))!="" ){ 
      if(province!=null){
        var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
        var districtresult = localDistrict.filter(obj => {
        return obj.province_id === province
        })
        $scope.districtData = districtresult;
       // console.log($scope.districtData)
          if(districtresult.length==0){
            $scope.districtData.push({
            "district_id": districtresult.length.toString(),
            "district_name":"Other"
            })
          }
          else
          {
            var len = $scope.districtData.length - 1;
            var districtlen = $scope.districtData[len];  
            var districtid = (parseInt(districtlen['district_id'])+1).toString();
            $scope.districtData.push({
              "district_id": districtid,
              "district_name":"Other"
            })
          }
      }
   }
   if(province!=null){
    var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
    var fac_result = localfacility.filter(obj => 
      {
       
      return obj.province === province
    })
    $scope.facilityData = fac_result;
    $scope.recency.facilityId ="";    
    //  var maxid = Math.max.apply(Math,localfacility.map(function(o){return o.facility_id;}))
    //  var facilityid = (maxid).toString();
    // if(fac_result.length==0){
    //   $scope.facilityData.push({
    //    "facility_id": facilityid,
    //    "facility_name":"Other"
    //  })
    //  $scope.recency.facilityId ="";
    //  }else{
    //   var len = $scope.facilityData.length - 1;
    //   var facilitylen = $scope.facilityData[len];  
    //   $scope.facilityData.push({
    //    "facility_id": facilityid,
    //    "facility_name":"Other"
    //  })
    //  $scope.recency.facilityId ="";
    //  }
   }else{
    $scope.facilityData = JSON.parse(localStorage.getItem('FacilityData')); 
    $scope.recency.facilityId ="";
    //$scope.showotherfacility = false;
   }  
  $scope.recency.location[1] ="";
  $scope.recency.otherDistrict ="";
  $scope.showotherdistrict = false;
  $scope.recency.location[2] ="";
  $scope.recency.otherCity ="";
  $scope.showothercity = false;
}
// Get City Dropdown based on District

$scope.GetCityValue = function(district){

if((localStorage.getItem('CityData'))!="" ){ 
  if(district!=null){
    var localCity = JSON.parse(localStorage.getItem('CityData'));
    var cityresult = localCity.filter(obj => {
      return obj.district_id === district
    })
    $scope.cityData = cityresult;
   //  console.log(cityresult)
     if(cityresult.length==0){
        $scope.cityData.push({
        "city_id": cityresult.length.toString(),
        "city_name":"Other"
        })
      }
      else
      {
        var len = $scope.cityData.length - 1;
        var citylen = $scope.cityData[len];  
        var cityid = (parseInt(citylen['city_id'])+1).toString();
        $scope.cityData.push({
           "city_id": cityid,
           "city_name":"Other"
        })
      }
   //   console.log( $scope.cityData)
  } else{
    $scope.showotherdistrict = false;
    $scope.recency.otherDistrict="";
  }
}
if(district!=null){
  var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
  var fac_result = localfacility.filter(obj => 
    {
    return obj.district === district
  })
   $scope.facilityData = fac_result;
   $scope.recency.facilityId ="";
  //  var maxid = Math.max.apply(Math,localfacility.map(function(o){return o.facility_id;}))
  //  var facilityid = (maxid).toString();
  //  if(fac_result.length==0){
  //    $scope.facilityData.push({
  //     "facility_id": facilityid,
  //     "facility_name":"Other"
  //   })
  //   $scope.recency.facilityId ="";
  //   }
  //   else
  //   {
  //     var len = $scope.facilityData.length - 1;
  //     var facilitylen = $scope.facilityData[len];  
  //     $scope.facilityData.push({
  //        "facility_id": facilityid,
  //        "facility_name":"Other"
  //     })
  //   $scope.recency.facilityId ="";
  //   }
 }
 else
 {
    var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
    var fac_result = localfacility.filter(obj => 
      {      
      return obj.province === $scope.recency.location[0]
      })
    $scope.facilityData = fac_result;
    $scope.recency.facilityId ="";
    // var maxid = Math.max.apply(Math,localfacility.map(function(o){return o.facility_id;}))
    // var facilityid = (maxid).toString();
    // if(fac_result.length==0){
    //   $scope.facilityData.push({
    //     "facility_id": facilityid,
    //     "facility_name":"Other"
    //   })
    //   $scope.recency.facilityId ="";
    // }
    // else
    // {
    //   var len = $scope.facilityData.length - 1;
    //   var facilitylen = $scope.facilityData[len];  
    //   //var facilityid = (parseInt(facilitylen['facility_id'])+1).toString();
    //   $scope.facilityData.push({
    //     "facility_id": facilityid,
    //     "facility_name":"Other"
    //   })
    //   $scope.recency.facilityId ="";
    // }
 }
  $scope.recency.location[2] ="";
  $scope.recency.otherCity ="";
  $scope.showothercity = false;
}
$scope.checkothercity = function(city){
  $scope.recency.cityname = $("#location_three").find("option:selected").text();
//  console.log($scope.recency.cityname);
  if($scope.recency.cityname=='Other'){
    $scope.showothercity = true;
  }
  else if($scope.recency.cityname=='-- Select --'){
    $scope.showothercity = false;
    $scope.recency.cityname="";
  }else{
    $scope.showothercity = false;

  }
  if(city!=null){
    var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
    var fac_result = localfacility.filter(obj => 
      {
      return obj.city === city
    })
     $scope.facilityData = fac_result;
     $scope.recency.facilityId ="";
    //  var maxid = Math.max.apply(Math,localfacility.map(function(o){return o.facility_id;}))
    //    var facilityid = (maxid).toString();
    //  if(fac_result.length==0){
    //    $scope.facilityData.push({
    //     "facility_id": facilityid,
    //     "facility_name":"Other"
    //   })
    //   $scope.recency.facilityId ="";
    //   }
    //   else
    //   {
    //     var len = $scope.facilityData.length - 1;
    //     var facilitylen = $scope.facilityData[len];  
    //   //  var facilityid = (parseInt(facilitylen['facility_id'])+1).toString();
    //     $scope.facilityData.push({
    //        "facility_id": facilityid,
    //        "facility_name":"Other"
    //     })
    //   $scope.recency.facilityId ="";
    //   }
  }
  else
  {
     var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
     var fac_result = localfacility.filter(obj => 
       {      
       return obj.district === $scope.recency.location[1]
       })
     $scope.facilityData = fac_result;
     $scope.recency.facilityId ="";
    //  var maxid = Math.max.apply(Math,localfacility.map(function(o){return o.facility_id;}))
    //  var facilityid = (maxid).toString();
    //  if(fac_result.length==0){
    //    $scope.facilityData.push({
    //      "facility_id": facilityid,
    //      "facility_name":"Other"
    //    })
    //    $scope.recency.facilityId ="";
    //  }
    //  else
    //  {
    //    var len = $scope.facilityData.length - 1;
    //    var facilitylen = $scope.facilityData[len];  
    //    $scope.facilityData.push({
    //      "facility_id": facilityid,
    //      "facility_name":"Other"
    //    })
    //    $scope.recency.facilityId ="";
    //  }
  }
}
    $scope.checkriskpopulation = function(){
     $scope.recency.riskPopulationName = $("#riskPopulation").find("option:selected").text();
      //console.log( $scope.recency.riskPopulationName);
      if($scope.recency.riskPopulationName=='Other'){
       $scope.otherpopulation = true;
        }
      else if($scope.recency.riskPopulationName=='-- Select --'){
          $scope.otherpopulation = false;
          $scope.recency.riskPopulationName = "";
        }
      else{
       $scope.otherpopulation = false;
        }
    }

    $scope.checkotherfacility = function(){
    //   $scope.recency.facility_name = $("#facilityId").find("option:selected").text();

    //   if($scope.recency.facility_name=='-- Select --'){
    //  //  $scope.showotherfacility = false;
    //    $scope.recency.facility_name = "";
    //    $scope.facilityData = JSON.parse(localStorage.getItem('FacilityData'));
    //  }
    if($scope.recency.facilityId!="" ){
        var facilityData = $scope.facilityData
        function isfacility(item) { 
           return item.facility_id === $scope.recency.facilityId;
        }
        var selectedfacility = facilityData.find(isfacility)
        console.log(selectedfacility)
      $scope.recency.location[0] = selectedfacility.province;
      $scope.recency.location[1] = selectedfacility.district;
      $scope.recency.location[2] = selectedfacility.city;
     
      var localDistrictjson = localStorage.getItem('DistrictData');
      if($scope.recency.location[0] && (localDistrictjson!="" && localDistrictjson!=null)){
        var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
        var districtresult = localDistrict.filter(obj => 
          {
          return obj.province_id === $scope.recency.location[0]
        })
        $scope.districtData = districtresult;
        $scope.recency.location[1] = $scope.recency.location[1];
        if($scope.recency.location[0]!=""||$scope.recency.location[0]!=null){
          if(districtresult.length==0){
            $scope.districtData.push({
            "district_id": districtresult.length.toString(),
            "district_name":"Other"
            })
          }
          else
          {
            var len = $scope.districtData.length - 1;
            var districtlen = $scope.districtData[len];  
            var districtid = (parseInt(districtlen['district_id'])+1).toString();
            $scope.districtData.push({
              "district_id": districtid,
              "district_name":"Other"
            })
          }
        }
      }
      else{
        $scope.districtData =[];
        $scope.cityData =[];
      }
      var localCityjson = localStorage.getItem('CityData');
      if($scope.recency.location[1]&& ( localCityjson!="" && localCityjson!=null)){
        var localCity = JSON.parse(localStorage.getItem('CityData'));
        var cityresult = localCity.filter(obj => {
          return obj.district_id === $scope.recency.location[1]
        })
        $scope.cityData = cityresult;
       // console.log($scope.cityData )
       
        if($scope.recency.location[1]!=""||$scope.recency.location[1]!=null){
          if(cityresult.length==0){
            $scope.cityData.push({
              "city_id": cityresult.length.toString(),
              "city_name":"Other"
            })
          }
         else{
          var len = $scope.cityData.length - 1;
          var citylen = $scope.cityData[len];  
          var cityid = (parseInt(citylen['facility_id'])+1).toString();
          $scope.cityData.push({
           "city_id": cityid,
           "city_name":"Other"
         })
         }
        }

      }else{
        $scope.cityData =[];
      }
    }
    // else if ($scope.recency.facility_name=='Other'){
    //   $scope.showotherfacility = true;
    //   $scope.recency.otherfacility="";
    // }
    
    else{
        $scope.recency.location[0] = "";
        $scope.recency.location[1] = "";
        $scope.recency.location[2] = "";
        $scope.districtData =[];
        $scope.cityData =[];
        $scope.showothercity = false;
        $scope.showotherdistrict=false;
      }
      $scope.recency.otherDistrict = "";
      $scope.recency.otherCity="";
    }

    // Facility Autocomplete Hide This function
    // $scope.facilityautocomplete = function(){

    //   var src = $scope.facilityData;
    // src = $.map(src, function (value, key) {
    //   return {
    //       label: value.facility_name,
    //       value: value.facility_id,
    //       province:value.province,
    //       district:value.district,
    //       city:value.city,
    //       facility_type_id:value.facility_type_id
    //   }
    // })

    //   $("#searchfacility").autocomplete({
    //     source: src,
    //     minLength:0,
    //     autoFocus: true,
    //     select: function (event, ui) {
    //         event.preventDefault();
            
    //         this.value = ui.item.label;
    //         $(this).next().val(ui.item.value);
    //       $scope.recency.facilityId = ui.item.value;
    //       $scope.recency.facility_name = ui.item.label
    //      // console.log(ui.item);
    //       if($scope.recency.facility_name=='Other'){
    //         $scope.showotherfacility = true;
    //        }else{
    //         $scope.showotherfacility = false;

    //        }
    //       if($scope.recency.facilityId !=''){         
    //         sr2= $.map(ui.item, function (value, key) {
    //           return {
    //            facility_name: key.label,
    //            facility_id :key.value,
    //            province:key.province,
    //            district:key.district,
    //            city:key.city,
    //            facility_type_id:key.facility_type_id
    //           }
    //         })
    //         $scope.checkotherfacility();
    //         $scope.partialRecencyData();
    //       }     
    //     }
    
    //   })
    // }
    $scope.checkotherdistrict = function(districtid){
      if(districtid!=null){
        var cityData = $scope.cityData
        function isCity(item) { 
           return item.city_name === 'Other';
        }
        var othercityData = cityData.find(isCity)

        $scope.recency.districtname = $("#location_two").find("option:selected").text();
      }else{
        $scope.showotherdistrict = false;
        $scope.recency.districtname="-- Select --";
      }
     
      if($scope.recency.districtname=='Other'){
        $scope.showotherdistrict = true;
        $scope.recency.otherDistrict="";
        $scope.recency.location[2]=othercityData.city_id;
        $scope.recency.otherCity="";
        $scope.showothercity = true;
     //   $scope.showotherfacility = false;
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

    // $scope.checkOtherTestingFacility = function(){
    //   $scope.recency.testing_facility_name = $("#testingFacility").find("option:selected").text();
    //   if($scope.recency.testing_facility_name=='Other'){
    //    $scope.showothertestfacility = true;
    //     }
    //   else if($scope.recency.testing_facility_name =='-- Select --'){
    //    $scope.showothertestfacility = false;
    //    $scope.recency.testing_facility_name = "";
    //   }else{
    //    $scope.showothertestfacility = false;
    //     }
    // }
    $scope.checkOthertestingModality = function(){
      $scope.recency.testingModalityName = $("#testingModality").find("option:selected").text();
      if($scope.recency.testingModalityName=='Other'){
       $scope.showothertestmodality = true;
        }
      else if($scope.recency.testingModalityName =='-- Select --'){
       $scope.showothertestmodality = false;
       $scope.recency.testingModalityName = "";
      }else{
       $scope.showothertestmodality = false;
        }
    }
    $scope.showToastAlert = function(mandatorytitle){
   //$ionicPopup.alert({title:'Alert!',template:mandatorytitle});
    $cordovaToast.show(mandatorytitle, 'long', 'center')
              .then(function(success) {
                // success
              }, function (error) {
                // error
              });
    }

    // Section 1 Mandatory Data Validation
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
        }
    } 
  if($("#other-recency").hasClass('active')){
  }else{
    if($scope.mandatoryData.length>0){
      
      for(i=0;i<$scope.mandatoryData.length;i++){
        var id ="#"+$scope.mandatoryData[i];
        var mandatoryname = $(id).attr("name");
        var mandatorytitle = $(id).attr("title");

         
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
          if($scope.mandatoryData[i]=='sampleCollectionDate' && $scope.recency.sampleCollectionDate==""){
            $scope.showRecencyTick = false;
            $scope.showToastAlert(mandatorytitle);  
          return false;
          }
          if($scope.mandatoryData[i]=='sampleReceiptDate' && $scope.recency.sampleReceiptDate==""){
            $scope.showRecencyTick = false;
            $scope.showToastAlert(mandatorytitle);  
          return false;
          }
          if($scope.mandatoryData[i]=='receivedSpecimenType' && $scope.recency.receivedSpecimenType==""){
            $scope.showRecencyTick = false;
            $scope.showToastAlert(mandatorytitle);  
          return false;
          }
           if($scope.mandatoryData[i]=='facilityId' && $scope.recency.facilityId==""){
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle); 
            return false;
          }
        //   if($scope.mandatoryData[i]=='facilityId' && $scope.recency.facility_name == 'Other' && $scope.recency.otherfacility==""){
        //      $scope.showRecencyTick = false;
        //      var mandatorytitle = 'Please Enter Other Facility';
        //      $scope.showToastAlert(mandatorytitle); 
        //    return false;
        //  }
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
            if($scope.mandatoryData[i]=='testingModality' && $scope.recency.testingModality==""){
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle); 
            return false;
            } 
            if($scope.mandatoryData[i]=='testingModality' && $scope.recency.testingModalityName == 'Other' && $scope.recency.othertestingmodality==""){
              $scope.showRecencyTick = false;
              var mandatorytitle = 'Please Enter Other Testing Modality';
              $scope.showToastAlert(mandatorytitle); 
            return false;
          }

          //   if($scope.mandatoryData[i]=='testingFacility' && $scope.recency.testing_facility_name == 'Other' && $scope.recency.othertestingfacility==""){
          //     $scope.showRecencyTick = false;
          //     var mandatorytitle = 'Please Enter Other Testing Facility';
          //     $scope.showToastAlert(mandatorytitle); 
          //   return false;
          // }

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
        if($scope.mandatoryData[i]=='testingFacility' && $scope.recency.testingFacility==""){
          $scope.showRecencyTick = false;
          $scope.showToastAlert(mandatorytitle); 
        return false;
        } 
        if($scope.mandatoryData[i]=='hivRecencyTestDate' && $scope.recency.hivRecencyTestDate==""){
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
        if($scope.mandatoryData[i]=='vlLoadResult' && ($scope.recency.vlLoadResult==""|| $scope.recency.vlLoadResult==null ) && $scope.recency.vlLoadResultDropdown=="" && ($scope.recency.recencyOutcome!='Assay Negative'&& $scope.recency.recencyOutcome!='Invalid-Please Verify' && $scope.recency.recencyOutcome!='')){
          $scope.showRecencyTick = false;
          $scope.showToastAlert(mandatorytitle); 
        return false;
        }
      }
      if($scope.recency.sampleId!="" || $scope.recency.patientId!="" || $scope.recency.facilityId!="" ||$scope.recency.hivDiagnosisDate!="" ||
          $scope.recency.hivRecencyTestDate!=""||$scope.recency.ctrlLine!="" ||$scope.recency.positiveLine!="" || $scope.recency.longTermLine!="" ||
          $scope.recency.pastHivTesting!="" || $scope.recency.lastHivStatus!=""|| $scope.recency.patientOnArt!=""||$scope.recency.location_one!=""||
          $scope.recency.location_two!="" ||$scope.recency.location_three!="" || $scope.recency.testKitLotNo !=""|| $scope.recency.testKitExpDate !=""|| 
          $scope.recency.testerName !="" || $scope.recency.testingFacility !="" || $scope.recency.vlTestDate !="" || $scope.recency.vlLoadResult !="")
          {
            $scope.showRecencyTick = true;

          }
      }  
    }


  }
    }
    // Section 2 Mandatory Data Validation

    $scope.behaviourValidation = function(){
    if($scope.mandatoryData.length>0){
      for(i=0;i<$scope.mandatoryData.length;i++){
        var id ="#"+$scope.mandatoryData[i];
        var mandatoryname = $(id).attr("name");
        var mandatorytitle = $(id).attr("title");
        var mandatoryField=$scope.mandatoryData[i];
        
        //console.log(mandatoryField)
        if(($scope.mandatoryData[i]=='dob' && $scope.recency.dob=="" && ( $scope.recency.age=="" || $scope.recency.age == null))){
          var mandatorytitle = 'Please Enter Date Of Birth or Age';
           $scope.showBehaviourTick = false;
           $scope.showToastAlert(mandatorytitle); 
           return false;
         }

         if(($scope.mandatoryData[i]=='age' && $scope.recency.dob=="" && ($scope.recency.age=="" || $scope.recency.age == null))){
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
        $scope.clientLocation =[];
       // console.log($scope.recency);
        $scope.recency.appVersion = localStorage.getItem('AppVersion');      
        $scope.recency.addedBy = localStorage.getItem('userId');
        for(i=0;i<$scope.configdata.length;i++){
          var key=$scope.configdata[i].global_name;
          var  keyname = key +"_name";
          var  keyId = "#" +$scope.configdata[i].global_name;
          var  keyId = "#" +$scope.configdata[i].global_name;
          if($scope.configdata[i].global_name){
            $scope.clientLocation[i] = $scope.configdata[i].global_value;
          }
          if( $scope.recency.location[i]==undefined || $scope.recency.location[i]==""){
              $scope.recency[key] =""
              $scope.recency[keyname] = "";
          }else{
              $scope.recency[key] =$scope.recency.location[i];
              $scope.recency[keyname] =   $(keyId).find("option:selected").text();
             // console.log( $scope.recency[keyname])     
          }
      }
      //console.log($scope.clientLocation)

      for(i=0;i<$scope.mandatoryData.length;i++){
        var id ="#"+$scope.mandatoryData[i];
        var mandatoryname = $(id).attr("name");
        var mandatorytitle = $(id).attr("title");
        var mandatoryField=$scope.mandatoryData[i];

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
          if($scope.mandatoryData[i]=='sampleCollectionDate' && $scope.recency.sampleCollectionDate==""){
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Enter Sample Collection Date from the Client';
            $scope.showToastAlert(mandatorytitle);  
          return false;
          }
          if($scope.mandatoryData[i]=='sampleReceiptDate' && $scope.recency.sampleReceiptDate==""){
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Enter Sample Receipt Date at the Recency Testing Site';
            $scope.showToastAlert(mandatorytitle);  
          return false;
          }
          if($scope.mandatoryData[i]=='receivedSpecimenType' && $scope.recency.receivedSpecimenType==""){
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Choose Received Specimen Type';
            $scope.showToastAlert(mandatorytitle);  
          return false;
          }
           if($scope.mandatoryData[i]=='facilityId' && $scope.recency.facilityId==""){
              $scope.showRecencyTick = false;
              var mandatorytitle = 'Please Enter Facility ID';
              $scope.showToastAlert(mandatorytitle); 
            return false;
          }
        //   if($scope.mandatoryData[i]=='facilityId' && $scope.recency.facility_name == 'Other' && $scope.recency.otherfacility==""){
        //      $scope.showRecencyTick = false;
        //      var mandatorytitle = 'Please Enter Other Facility';
        //      $scope.showToastAlert(mandatorytitle); 
        //    return false;
        //  }
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
            if($scope.mandatoryData[i]=='testingModality' && $scope.recency.testingModality==""){
              $scope.showRecencyTick = false;
              var mandatorytitle = 'Please Choose Testing Modality';           
              $scope.showToastAlert(mandatorytitle); 
            return false;
            } 
            if($scope.mandatoryData[i]=='testingModality' && $scope.recency.testingModalityName == 'Other' && $scope.recency.othertestingmodality==""){
              $scope.showRecencyTick = false;
              var mandatorytitle = 'Please Enter Other Testing Modality';
              $scope.showToastAlert(mandatorytitle); 
            return false;
          }

          //   if($scope.mandatoryData[i]=='testingFacility' && $scope.recency.testing_facility_name == 'Other' && $scope.recency.othertestingfacility==""){
          //     $scope.showRecencyTick = false;
          //     var mandatorytitle = 'Please Enter Other Testing Facility';
          //     $scope.showToastAlert(mandatorytitle); 
          //   return false;
          // }

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
        if($scope.mandatoryData[i]=='testingFacility' && $scope.recency.testingFacility==""){
          $scope.showRecencyTick = false;
        var mandatorytitle = 'Please Choose Testing Facility';
          $scope.showToastAlert(mandatorytitle); 
        return false;
        } 
        if($scope.mandatoryData[i]=='hivRecencyTestDate' && $scope.recency.hivRecencyTestDate==""){
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Enter HIV Recency Test Date';
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
        if($scope.mandatoryData[i]=='vlLoadResult' && ($scope.recency.vlLoadResult==""|| $scope.recency.vlLoadResult==null) && $scope.recency.vlLoadResultDropdown=="" && ($scope.recency.recencyOutcome!='Assay Negative'&& $scope.recency.recencyOutcome!='Invalid-Please Verify' && $scope.recency.recencyOutcome!='')){
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

        var count = localStorage.getItem('counter');
        $scope.counter  = parseInt(count) + 1;

        var currentdate = new Date();
        $scope.recency.formSavedDateTime = currentdate.getFullYear() + "-"
        + (currentdate.getMonth()+1)  + "-" 
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();


        //Generate Unique Alphanumeric ID 
          var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
          var string_length = 12;
          var randomstring = '';
          for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
          }
         $scope.recency.unique_id = randomstring;     
         $scope.recency.macAddress = localStorage.getItem('MacAddress');
         $scope.recency.phoneNumber =  localStorage.getItem('PhoneNumber');

         if($scope.recency.vlLoadResult=="" && $scope.recency.vlLoadResultDropdown!=""){
           $scope.recency.vlLoadResult = $scope.recency.vlLoadResultDropdown;
         }
         //console.log($scope.recency);
        $preLoader.show();
        var recency = $scope.recency;
           if(JSON.parse(localStorage.getItem('RecencyData'))!=null){
            $scope.recencyData =JSON.parse(localStorage.getItem('RecencyData'));
            }       
            $scope.recencyData[$scope.counter-1] =recency;        
            localStorage.setItem('RecencyData',JSON.stringify($scope.recencyData)) 
            localStorage.removeItem('PartialRecencyData');
            localStorage.setItem('counter', $scope.counter);
            $scope.facilityData= JSON.parse(localStorage.getItem('FacilityData'));
           // $scope.showotherfacility = false;        
          //  $scope.showothertestfacility = false; 
            $scope.showothertestmodality = false; 

            $scope.showotherdistrict = false;        
            $scope.showothercity = false;        
             $scope.recency ={};
             $scope.districtData =[];
             $scope.cityData =[];

             $scope.recencydisplay=true;
       
              //Hide Toast During Debugging 
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
            $preLoader.hide();
      }
})


app.filter('underscorefilter', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
});

