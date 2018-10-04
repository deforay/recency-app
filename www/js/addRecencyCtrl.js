app=angular.module('starter.addRecencyCtrl', ['starter.services'])
.controller('addRecencyCtrl', function($scope, $http, $stateParams,$cordovaToast, ionicDatePicker,  $ionicPopup,$preLoader,$localStorage, $cordovaGeolocation, $window,$filter,$cordovaNetwork) {
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
        // $("#other-recency").removeClass('active')
    } else {
        $("#other-recency").addClass('active')
        $("#main-recency").removeClass('active')
    }
    }
    $scope.doRefresh = function() {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
      
    }
      document.addEventListener("online", ononline, false);
      document.addEventListener("offline", onoffline, false);
      
      function ononline() {

        var isOnline = $cordovaNetwork.isOnline();
        console.log("isOnline",isOnline);
        $localStorage.set('online',isOnline);
        $localStorage.set('offline','false');
        $http.get($localStorage.get('apiUrl')+'/api/facility')
        .success(function(data) {
         $scope.facilityData =data;
         localStorage.setItem('FacilityData',JSON.stringify($scope.facilityData)) 
        
        });
  
     
      }
  
      
      function onoffline() {
        var isOnline = $cordovaNetwork.isOnline();
        console.log("isOnline",isOnline);
        $localStorage.set('online',isOnline);
        $localStorage.set('offline','true');
        $scope.riskpopulations = JSON.parse(localStorage.getItem('RiskPopulations'));
        $scope.configdata = JSON.parse(localStorage.getItem('GlobalConfig'));
        $scope.provinceData =  JSON.parse(localStorage.getItem('ProvinceData'))      
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
        $scope.allfacilities = new Array();
        $scope.facilityData = new Array();
        localarr = JSON.parse(localStorage.getItem('RecencyData'));
        localfacility =JSON.parse(localStorage.getItem('FacilityData'));
      
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
             console.log($scope.provinceData)


        }else{
          $scope.facilityData =localfacility;
          $scope.provinceData = localprovince;  
          console.log($scope.provinceData)

          console.log( $scope.facilityData)
        }
      }
  
      $http.get($localStorage.get('apiUrl')+'/api/facility')
      .success(function(data) {
       $scope.facilityData =data;
       localStorage.setItem('FacilityData',JSON.stringify($scope.facilityData)) 
       console.log( $scope.facilityData)           
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
      $http.get($localStorage.get('apiUrl')+'/api/global-config')
      .success(function(data) {
       $scope.configdata =data.config;
       localStorage.setItem('GlobalConfig',JSON.stringify($scope.configdata)) 
        //  for(i=0;i<$scope.configdata.length;i++){
        //     $scope.recency.location[i]="";       
        //  } 
        });
      $http.get($localStorage.get('apiUrl')+'/api/risk-populations')
      .success(function(data) {
       $scope.riskpopulations =data;
       localStorage.setItem('RiskPopulations',JSON.stringify($scope.riskpopulations))       
      });

      // If Internet Connection Disconnected
   
   
      $scope.getLatLong = function(){
        var options = {maximumAge: 20000,timeout: 30000, enableHighAccuracy: true};
        $scope.recency.latitude="";
        $scope.recency.longitude="";
        $cordovaGeolocation.getCurrentPosition(options).then(function(position){

          $scope.recency.latitude=position.coords.latitude;
          $scope.recency.longitude=position.coords.longitude;
          console.log( $scope.recency.latitude)
          console.log( $scope.recency.longitude)
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
      }
      $scope.getLatLong();
 $scope.setDiagDate = function(val){
  var ipObj1 = {
    callback: function (val) {  //Mandatory
     // console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      var hivDiagnosisDate = new Date(val);
      console.log(hivDiagnosisDate);
      $scope.recency.hivDiagnosisDate =  $filter('date')(hivDiagnosisDate , "dd-MM-yyyy");
    },
  }; 
    ionicDatePicker.openDatePicker(ipObj1);
 
}

$scope.setRecencyDate = function(val){
  var ipObj2 = {
    callback: function (val) {  //Mandatory
     // console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      var hivRecencyDate = new Date(val);
      console.log(hivRecencyDate);
      $scope.recency.hivRecencyDate =  $filter('date')(hivRecencyDate , "dd-MM-yyyy");
    },
  }; 
    ionicDatePicker.openDatePicker(ipObj2);
}
$scope.setDob = function(val){
  var ipObj3 = {
    callback: function (val) {  //Mandatory
      var dob = new Date(val);
      console.log(dob);
      var ageDifMs = Date.now() - dob.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
     // console.log( Math.abs(ageDate.getUTCFullYear() - 1970));
      $scope.recency.dob =  $filter('date')(dob , "dd-MM-yyyy");
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

$scope.GetFacilityValue = function(facility){
  if( $localStorage.set('offline')!=false){
    var facilityid = $scope.recency.facilityId;
    console.log(facilityid)
    $scope.recency.facility_name = $.grep($scope.facilityData, function (facility) {
      return facility.facility_id == facilityid;
    })[0].facility_name;
    console.log("Selected Value: " + facilityid + "\nSelected Text: " + $scope.recency.facility_name);
  }
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
    //$scope.districtData = result;
    localDistrict = result;
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
  }
  
}
    $scope.checkriskpopulation = function(populationid){
      console.log(populationid)
      if(populationid=='Other'){
       $scope.otherpopulation = true;
        }
      else{
       $scope.otherpopulation = false;
        }
    }
    $scope.OnPositiveLineChange = function(positiveline){
      if(positiveline == "absent"){
        $scope.recency.longTermLine ="";
        $scope.showLongTermLine = false;
      }
      else{
        $scope.showLongTermLine = true;

      }

    }
    // if($scope.facilityData== undefined ||  $scope.riskpopulations == undefined ||  $scope.configdata ==undefined ){
    //   onoffline();
    // }
    $scope.patientvalidation = function(sampleId,patientId,facilityId,hivDiagnosisDate,hivRecencyDate,dob,age,gender,location){
      console.log(sampleId,patientId,facilityId,hivDiagnosisDate,hivRecencyDate,dob,age,gender,location)
      if(sampleId == undefined & patientId == undefined){
        $ionicPopup.alert({title:'Alert!',template:'Please Enter atleast Sample ID or Patient ID'});        
        return false;
      }
       if(facilityId == undefined){
       $ionicPopup.alert({title:'Alert!',template:'Please Select Facility'});       
         return false;
      }
       if(hivDiagnosisDate == undefined){
        $ionicPopup.alert({title:'Alert!',template:'Please Enter HIV Diagnosis Date'});        
         return false;
      }
       if(hivRecencyDate == undefined){
        $ionicPopup.alert({title:'Alert!',template:'Please Enter HIV Recency Date'});        
         return false;
      }
      //  if(hivRecencyResult == undefined){
      //   $ionicPopup.alert({title:'Alert!',template:'Please Enter HIV Recency Result'});        
      //    return false;
      // }
      if(dob == undefined & age == undefined){
        $ionicPopup.alert({title:'Alert!',template:'Please Atleast Enter Date Of Birth or Age'});
        return false;
      }
      if((sampleId == undefined & patientId == undefined) || facilityId == undefined || hivDiagnosisDate == undefined || hivRecencyDate == undefined ||(dob == undefined & age == undefined))
      {
      $scope.recencydisplay=true;
      }
      else{
        $scope.recencydisplay=false;
      }
      if($("#other-recency").hasClass('active')){
        $("#other-recency").removeClass('active')
    } else {
        $("#other-recency").addClass('active')
        $("#main-recency").removeClass('active')
    }
    
    }
      $scope.addRecency = function(sampleId,patientId,facilityId,hivDiagnosisDate,hivRecencyDate,ctrlLine,positiveLine,longTermLine,dob,age,gender,location,maritalStatus,residence,educationLevel,riskPopulation,otherriskPopulation,pregnancyStatus,currentSexualPartner,pastHivTesting,testLast12Month)
      {
        var count = localStorage.getItem('counter');
        var selectfacilityname = $("#facility").find("option:selected").text();
        console.log(location)
        var selectfacilityid = $("#facility").val();
        console.log("Selected Text: " + selectfacilityname + " Value: " + selectfacilityid);
        $scope.counter  = parseInt(count) + 1;
        if(sampleId == undefined & patientId == undefined){
          $ionicPopup.alert({title:'Alert!',template:'Please Enter atleast Sample ID or Patient ID'});
          return false;
        }
        if(sampleId == undefined){
          sampleId ="";
        }
         if(patientId == undefined){
          patientId ="";
        }
         if(facilityId == undefined){
         $ionicPopup.alert({title:'Alert!',template:'Please Select Facility'});
           return false;
        }
         if(hivDiagnosisDate == undefined){
          $ionicPopup.alert({title:'Alert!',template:'Please Enter HIV+ Diagnosis Date'});
           return false;
        }
         if(hivRecencyDate == undefined){
          $ionicPopup.alert({title:'Alert!',template:'Please Enter HIV+ Recency Date'});
           return false;
        }
        //  if(hivRecencyResult == undefined){
        //   $ionicPopup.alert({title:'Alert!',template:'Please Choose HIV+ Recency Result'});
        //    return false;
        // }
        if(dob == undefined & age == undefined){
          $ionicPopup.alert({title:'Alert!',template:'Please Atleast Enter Date Of Birth or Age'});
          return false;
        }
        if(dob == undefined ){
          dob ="";
        }
        if(age == undefined ){
          age ="";
        }
        if(gender == undefined){
          gender ="";
        }
        if(maritalStatus == undefined){
          maritalStatus ="";
        }
         if(residence == undefined){
          residence ="";
        }
         if(educationLevel == undefined){
          educationLevel ="";
        }
         if(riskPopulation == undefined){
          riskPopulation ="";
        }
         if(pregnancyStatus == undefined){
          pregnancyStatus ="";
        }
         if(currentSexualPartner == undefined){
          currentSexualPartner ="";
        }
        if(pastHivTesting == undefined){
          pastHivTesting ="";
        }
        if(testLast12Month == undefined){
          testLast12Month ="";
        }
               $scope.recency.userId = localStorage.getItem('userId');
               $scope.recency.sampleId =sampleId;
               $scope.recency.patientId =patientId;
               $scope.recency.facilityId =facilityId;  
               $scope.recency.facility_name = selectfacilityname;
                console.log( $scope.recency.facility_name)
                console.log( $scope.configdata)
                for(i=0;i<$scope.configdata.length;i++){
                  var key=$scope.configdata[i].global_name;
                  if(location==undefined){
                    $scope.recency[key] =""
                

                  }else if( location[i]==undefined){
                      $scope.recency[key] =""
                    }else{
                      $scope.recency[key] =location[i];
                    }
                  
                 
                } 
        $scope.recency.hivDiagnosisDate =  $filter('date')(hivDiagnosisDate , "dd-MM-yyyy");
        $scope.recency.hivRecencyDate =  $filter('date')(hivRecencyDate, "dd-MM-yyyy");
        if(dob =="" ){
          $scope.recency.dob =""
         }else{
          $scope.recency.dob =  $filter('date')(dob, "dd-MM-yyyy");
        }
        console.log(ctrlLine)
        if(ctrlLine=="" || ctrlLine==undefined){
          $scope.recency.ctrlLineName ="";
        }else{
          $scope.recency.ctrlLineName =   $("#ctrlLine option:selected").text();
        }
        if(positiveLine=="" || positiveLine==undefined){
          $scope.recency.positiveLineName=""
        }else{
          $scope.recency.positiveLineName =   $("#positiveLine option:selected").text();

        }
        if(longTermLine=="" ||longTermLine==undefined){
          $scope.recency.longTermLineName=""
        }else{
          $scope.recency.longTermLineName =   $("#longTermLine option:selected").text();

        }
        $scope.recency.location_one_name =   $("#province option:selected").text();
        $scope.recency.location_two_name =   $("#district option:selected").text();
        $scope.recency.location_three_name =   $("#city option:selected").text();
        $scope.recency.age = age;
        $scope.recency.gender = gender;
        $scope.recency.ctrlLine =ctrlLine;
        $scope.recency.positiveLine =positiveLine;
        $scope.recency.longTermLine =longTermLine;
        $scope.recency.maritalStatus =maritalStatus;
        $scope.recency.residence =residence;
        $scope.recency.educationLevel =educationLevel;
        $scope.recency.riskPopulation =riskPopulation;
        $scope.recency.pregnancyStatus =pregnancyStatus;
        $scope.recency.currentSexualPartner =currentSexualPartner;
        $scope.recency.pastHivTesting =pastHivTesting;
        $scope.recency.testLast12Month =testLast12Month;
        if( $scope.recency.riskPopulation == 'Other'){
          $scope.recency.riskPopulation =otherriskPopulation;
         }
        console.log($scope.recency)
     
        var recency = $scope.recency;
           if(JSON.parse(localStorage.getItem('RecencyData'))!=null){
            $scope.recencyData =JSON.parse(localStorage.getItem('RecencyData'));
            }       
            $scope.recencyData[$scope.counter-1] =recency;        
            localStorage.setItem('RecencyData',JSON.stringify($scope.recencyData)) 
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
              $("#main-recency").addClass("active");
              $("#other-recency").removeClass('active')
             // $window.location.reload(true);
            $preLoader.hide();


      }
})


.filter('underscorefilter', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
});