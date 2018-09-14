app=angular.module('starter.addRecencyCtrl', ['starter.services'])
.controller('addRecencyCtrl', function($scope, $http, $stateParams,  $ionicPopup,$preLoader,$localStorage, $cordovaGeolocation, $window,$filter,$cordovaNetwork) {
    $scope.recency = {};
    $scope.recencyData ={};
    
    $(document).ready(function(){
       $scope.recencydisplay=true;
    
        $("#main-recency").addClass("active");
   

        $('.datepicker').datepicker();
        $('.tabs').tabs();
        if(!localStorage.getItem('counter')){
          $scope.counter =0;
          localStorage.setItem('counter', $scope.counter);
        }

      });
    $scope.setmainactive = function(){
      if($("#main-recency").hasClass('active')){
        $("#main-recency").removeClass('active')
    } else {
        $("#main-recency").addClass('active')
        $("#other-recency").removeClass('active')
    }

    }
    $scope.setothersactive = function(){
      if($("#other-recency").hasClass('active')){
        $("#other-recency").removeClass('active')
    } else {
        $("#other-recency").addClass('active')
        $("#main-recency").removeClass('active')
    }
    }
      document.addEventListener("online", ononline, false);
      document.addEventListener("offline", onoffline, false);
      function onDeviceReady(){
        
      }
      function ononline() {

        var isOnline = $cordovaNetwork.isOnline();
        console.log(isOnline);
        $localStorage.set('online',isOnline);
        $localStorage.set('offline','false');

     
      }
      function onoffline() {
        var isOnline = $cordovaNetwork.isOnline();
        console.log("true");
        $localStorage.set('online',isOnline);
        $localStorage.set('offline','true');
        var localarr =[];
        $scope.facilities=[];
        $scope.facilityData = new Array();
          localarr = JSON.parse(localStorage.getItem('RecencyData'));
        
          if(localarr !=null){
            var localarrsize = Object.keys(localarr).length;
            console.log(localarrsize);
            var obj = {};
            for(i=0;i<localarrsize;i++){
              
              $scope.facilities.push({
                "facility_id":localarr[i]['facilityId'],
                "facility_name":localarr[i]['facility_name']
        
              })
               obj[$scope.facilities[i]['facility_id']] = $scope.facilities[i];     
            }
          for ( var key in obj )
          $scope.facilityData =obj;
          console.log($scope.facilityData)
          }
      }
      $http.get($localStorage.get('apiUrl')+'/api/facility')
      .success(function(data) {
       $scope.facilityData =data;
       console.log( $scope.facilityData)     
       
                
      });
      $http.get($localStorage.get('apiUrl')+'/api/risk-populations')
      .success(function(data) {
       $scope.riskpopulations =data;
       console.log( $scope.riskpopulations)
                
      });
      // $scope.recency={gender:"female"};
      $scope.doRefresh = function() {
        $preLoader.show();
        $window.location.reload(true);
        $preLoader.hide();
        
      }
      $scope.genders = [
        { title: "Male",id:"male", checked: false },
        { title: "Female",id:"female", checked: false },
        { title: "Transgender",id:"transgender", checked: false }
       
    ];

    $scope.calculateAge = function calculateAge(birthday) { // birthday is a date
      var ageDifMs = Date.now() - birthday.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      console.log( Math.abs(ageDate.getUTCFullYear() - 1970));
      $scope.recency.age = Math.abs(ageDate.getUTCFullYear() - 1970);
  }
    //console.log($scope.recencyData)
    $scope.updateSelection = function(position, genders, title) {
        angular.forEach(genders, function(subscription, index) {
            if (position != index)
                subscription.checked = false;
                $scope.selected = title;
            }
        );
        if( $scope.selected == "Male"){
          $scope.recency.gender = "male"
        }else if($scope.selected == "Female"){
          $scope.recency.gender= "female"
        }else{
          $scope.recency.gender= "transgender"
        }
    }

$scope.GetValue = function(facility){
  if( $localStorage.set('offline')!=false){
    var facilityid = $scope.recency.facilityId;
    console.log(facilityid)
    $scope.recency.facility_name = $.grep($scope.facilityData, function (facility) {
      return facility.facility_id == facilityid;
    })[0].facility_name;
    console.log("Selected Value: " + facilityid + "\nSelected Text: " + $scope.recency.facility_name);
  }

}
      $scope.addRecency = function(sampleId,patientId,facilityId,hivDiagnosisDate,hivRecencyDate,hivRecencyResult,dob,age,locationOne,locationTwo,locationThree,maritalStatus,residence,educationLevel,riskPopulation,pregnancyStatus,currentSexualPartner,pastHivTesting,testLast12Month){
        var count = localStorage.getItem('counter');
    
        $scope.counter  = parseInt(count) + 1;
        if(sampleId == undefined){
          sampleId ="";
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
          $ionicPopup.alert({title:'Alert!',template:'Please Enter HIV Diagnosis Date'});
           return false;
        }
         if(hivRecencyDate == undefined){
          $ionicPopup.alert({title:'Alert!',template:'Please Enter HIV Recency Date'});
           return false;
        }
         if(hivRecencyResult == undefined){
          $ionicPopup.alert({title:'Alert!',template:'Please Enter HIV Recency Result'});
           return false;
        }
         if(dob == undefined){
          dob ="";
        }
         if(age == undefined){
          age ="";
        }
     
         if(locationOne == undefined){
          locationOne ="";
        }
         if(locationTwo == undefined){
          locationTwo ="";
        }
        if(locationThree == undefined){
          locationThree ="";
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
        console.log(hivDiagnosisDate,hivRecencyDate,dob)
        console.log($scope.facility_name)
      //   $scope.recency.sampleId =sampleId;
      //   $scope.recency.patientId =patientId;
      //   $scope.recency.facilityId =facilityId;
      //   $scope.hivDiagnosisDate=$("#hivDiagnosisDate").val();
      //   $scope.hivRecencyDate=$("#hivRecencyDate").val();
      //   $scope.dob=$("#dob").val();        
      //   $scope.recency.hivDiagnosisDate =  $filter('date')($scope.hivDiagnosisDate, "dd-MM-yyyy");
      //   $scope.recency.hivRecencyDate =  $filter('date')($scope.hivRecencyDate, "dd-MM-yyyy");
      //   $scope.recency.dob =  $filter('date')($scope.dob, "dd-MM-yyyy");
      //   $scope.recency.age = age;
      //   $scope.recency.hivRecencyResult =hivRecencyResult;
      //   $scope.recency.maritalStatus =maritalStatus;
      //   $scope.recency.residence =residence;
      //   $scope.recency.educationLevel =educationLevel;
      //   $scope.recency.riskPopulation =riskPopulation;
      //   $scope.recency.pregnancyStatus =pregnancyStatus;
      //   $scope.recency.currentSexualPartner =currentSexualPartner;
      //   $scope.recency.pastHivTesting =pastHivTesting;
      //   $scope.recency.testLast12Month =testLast12Month;
      //   $scope.recency.locationOne =locationOne;
      //   $scope.recency.locationTwo =locationTwo;
      //   $scope.recency.locationThree =locationThree;

       
      //     console.log($scope.recency);
      //   var recency = $scope.recency;
      //   if(JSON.parse(localStorage.getItem('RecencyData'))!=null){
      //     $scope.recencyData =JSON.parse(localStorage.getItem('RecencyData'));
      // }       
      //  $scope.recencyData[$scope.counter-1] =recency;
      //  console.log($scope.recencyData)
      //  for(i=0;i<$scope.genders.length;i++)
      //  {
      //   $scope.genders[i]['checked']=false;
      //  }         
      //   localStorage.setItem('RecencyData',JSON.stringify($scope.recencyData)) 

      //   localStorage.setItem('counter', $scope.counter);
      //   $scope.recency ={};
      //   $scope.recencydisplay=true;
      //   $("#main-recency").addClass("active");
      //   //$window.location.reload(true);
      //   $preLoader.hide();

        //Geolocation 


        var options = {maximumAge: 20000,timeout: 30000, enableHighAccuracy: true};
        $scope.recency.latitude="";
        $scope.recency.longitude="";
        $cordovaGeolocation.getCurrentPosition(options).then(function(position){
          var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
          console.log(latLng)
          var geocoder = new google.maps.Geocoder();
          geocoder.geocode({ 'latLng': latLng }, function(data, status)
         {
            if (status == google.maps.GeocoderStatus.OK)
            {
              console.log(data)
              if (data[0] != null)
              {
                console.log($scope.facility_name)

              $scope.recency.latitude=position.coords.latitude;
              $scope.recency.longitude=position.coords.longitude;
              $scope.address=data[0].formatted_address;
              console.log( $scope.recency.latitude)
              console.log( $scope.recency.longitude)
              $scope.recency.userId = localStorage.getItem('userId');
              $scope.recency.sampleId =sampleId;
              $scope.recency.patientId =patientId;
              $scope.recency.facilityId =facilityId;  
    
                var facilityid = $scope.recency.facilityId;
                console.log(facilityid)
                $scope.recency.facility_name = $.grep($scope.facilityData, function (facility) {
                  debugger
                  return facility.facility_id == facilityid;
                
                })[0].facility_name;
                debugger
                console.log("Selected Value: " + facilityid + "\nSelected Text: " + $scope.recency.facility_name);
              
              $scope.recency.hivDiagnosisDate =  $filter('date')(hivDiagnosisDate , "dd-MM-yyyy");
              $scope.recency.hivRecencyDate =  $filter('date')(hivRecencyDate, "dd-MM-yyyy");
              $scope.recency.dob =  $filter('date')(dob, "dd-MM-yyyy");
              $scope.recency.age = age;
              $scope.recency.hivRecencyResult =hivRecencyResult;
              $scope.recency.maritalStatus =maritalStatus;
              $scope.recency.residence =residence;
              $scope.recency.educationLevel =educationLevel;
              $scope.recency.riskPopulation =riskPopulation;
              $scope.recency.pregnancyStatus =pregnancyStatus;
              $scope.recency.currentSexualPartner =currentSexualPartner;
              $scope.recency.pastHivTesting =pastHivTesting;
              $scope.recency.testLast12Month =testLast12Month;
              $scope.recency.locationOne =locationOne;
              $scope.recency.locationTwo =locationTwo;
              $scope.recency.locationThree =locationThree;
              if($scope.recency.gender == undefined){
                $scope.recency.gender ="";
              }
              console.log($scope.recency);
              var recency = $scope.recency;
                 if(JSON.parse(localStorage.getItem('RecencyData'))!=null){
                  $scope.recencyData =JSON.parse(localStorage.getItem('RecencyData'));
                  }       
                  $scope.recencyData[$scope.counter-1] =recency;
                 for(i=0;i<$scope.genders.length;i++)
                 {
                   $scope.genders[i]['checked']=false;
                  }         
                  localStorage.setItem('RecencyData',JSON.stringify($scope.recencyData)) 
                  localStorage.setItem('counter', $scope.counter);
                  
              }
            }
          })
             $scope.recency ={};
              $scope.recencydisplay=true;
              $("#main-recency").addClass("active");
             //  $window.location.reload(true);
            $preLoader.hide();

        },
        function(error){
          console.log(error); 
            $ionicPopup.alert({title:"Please turn on your gps"});
            $preLoader.hide();
          });
     
       
       
      }

})
// .filter('removeSpaces', [function() {
//   return function(string) {
//       if (!angular.isString(string)) {
//           return string;
//       }
//       return string.replace(/[\s]/g, '');
//   };

// }])

.filter('underscorefilter', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
});