app=angular.module('starter.addQcAssuranceCtrl', ['starter.services'])
.controller('addQcAssuranceCtrl', function($scope, $http, $timeout, $stateParams,$cordovaToast, ionicDatePicker,  $ionicPopup,$preLoader,$localStorage, $cordovaGeolocation, $window,$filter,$cordovaNetwork) {
    $scope.qcAssurance = {};
    $scope.qcData ={};
    $scope.showLongTermLine = true;
    $scope.displaybadge = false;
    
    $(document).ready(function(){

        if(!localStorage.getItem('qccounter')){
          $scope.counter =0;
          localStorage.setItem('qccounter', $scope.counter);
        }

      });

    $scope.qcAssuranceinit = function(){
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
             "testKitLotNo:":$scope.TestKitLotList[i].testKitLotNo,
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
      
      $scope.qcAssurance.userId = localStorage.getItem('userId');
      $scope.qcAssurance.qcsampleId ="";
      $scope.qcAssurance.referenceResult="";
      $scope.qcAssurance.testKitLotNo="";
      $scope.qcAssurance.testKitExpDate="";
      $scope.qcAssurance.testKitLotAvailability="";
      $scope.qcAssurance.hivRecencyDate="";
      $scope.qcAssurance.ctrlLine="";
      $scope.qcAssurance.ctrlLineName="";
      $scope.qcAssurance.positiveLine="";
      $scope.qcAssurance.positiveLineName=""
      $scope.qcAssurance.longTermLine="";
      $scope.qcAssurance.longTermLineName="";
      $scope.qcAssurance.recencyOutcome="";
      $scope.qcAssurance.testerName = "";
      $scope.qcAssurance.testerNameAvailability = "";
   //   console.log($scope.qcAssurance);
    }

    $scope.doRefresh = function() {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
      
    }

    $scope.testKitLotAutoComplete = function(){
      $scope.qcAssurance.testKitExpDate ="";
      $scope.qcAssurance.testKitLotAvailability ="";

      $( "#testKitLotNo").autocomplete({
        minLength: 0,
        source:
          $scope.TestKitLotList
        ,
        // focus: function( event, ui ) {
        //   $( "#testKitLotNo" ).val( ui.item.label );
        //   return false;
        // },
        select:function(event,ui){
          if(ui.item.testKitLotNo!=''){
            // $('#testKitLotNo').val(ui.item.testKitLotNo);
            $('#testKitExpDate').val(ui.item.testKitExpDate);
            // $('#testKitLotAvailability').val(ui.item.available);
            $scope.qcAssurance.testKitLotNo = ui.item.testKitLotNo;
            $scope.qcAssurance.testKitExpDate = ui.item.testKitExpDate;
            $scope.qcAssurance.testKitLotAvailability = ui.item.available;
          }
      
          console.log(ui.item)
         
        }
      })
      .autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( "<li>" )
          .append( "<div>" + item.label  + "</div>" )
          .appendTo( ul );
      };
    }
    $scope.testerNameAutoComplete = function(){
 

      $( "#testerName").autocomplete({
        minLength: 0,
        source:
          $scope.TesterNameList
        ,
        focus: function( event, ui ) {
          $( "#testerName" ).val( ui.item.label );
          return false;
        },
        select:function(event,ui){
          if(ui.item.testerName!=''){
            $('#testerName').val(ui.item.testerName);
            $('#testerNameId').val(ui.item.testerName);
            $scope.qcAssurance.testerNameAvailability = ui.item.available;
          }
          console.log(ui.item)
         
        }
      })
      .autocomplete( "instance" )._renderItem = function( ul, item ) {
        return $( "<li>" )
          .append( "<div>" + item.label  + "</div>" )
          .appendTo( ul );
      };
    }
    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onDeviceReady() {
       $scope.qcAssurance.macAddress = device.uuid;
      localStorage.setItem('MacAddress', $scope.qcAssurance.macAddress);
      // Comment during Development mode
      window.plugins.sim.getSimInfo(
        function(r) { $scope.out = r; $scope.$apply(); console.log(r);
       $scope.qcAssurance.phoneNumber =   $scope.out.phoneNumber;
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
       $scope.qcAssurance.phoneNumber =   $scope.out.phoneNumber;
          },
          function(r) { $scope.out3 = r; $scope.$apply(); console.log(r); }
        );
        window.plugins.sim.hasReadPermission(
          function(r) { $scope.out4 = r; $scope.$apply(); console.log(r); },
          function(r) { $scope.out4 = r; $scope.$apply(); console.log(r); }
        );
      }, 10000);
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
      }

 
      // If Internet Connection Disconnected
   
   

      $scope.getOutcome = function(controlLine,positiveLine,longTermLine){
        if((controlLine=='absent'&& positiveLine=='absent'&& longTermLine=='absent')||
        (controlLine=='absent'&& positiveLine=='absent'&& longTermLine=='present')||
        (controlLine=='absent'&& positiveLine=='present'&& longTermLine=='absent')||
        (controlLine=='absent'&& positiveLine=='present'&& longTermLine=='present')||
        (controlLine=='present'&& positiveLine=='absent'&& longTermLine=='present'))
        {
          $(".outcome").css("color","red");

          $scope.qcAssurance.recencyOutcome="Invalid-Please Verify";
        }
        if(controlLine=='present'&& positiveLine=='absent'&& longTermLine=='absent'){
          $scope.qcAssurance.recencyOutcome="HIV Negative";
          $(".outcome").css("color","red");
        }
        if(controlLine=='present'&& positiveLine=='present'&& longTermLine=='absent'){
          $scope.qcAssurance.recencyOutcome="Preliminary Recent";
        }
        if(controlLine=='present'&& positiveLine=='present'&& longTermLine=='present'){
          $scope.qcAssurance.recencyOutcome="Long Term";
        }
        if(controlLine==""|| positiveLine==""||longTermLine==""){
          $scope.qcAssurance.recencyOutcome="";
        }
      }
      // $scope.getReasonName = function(reason){
      //   if(reason=='no_consent_from_the_client'){
      //     $scope.qcAssurance.recencyreasonName ="No consent from the Client";
      //   }else 
      //   if(reason=='sample_was_not_collected'){
      //     $scope.qcAssurance.recencyreasonName ="Sample was not collected (Phlebotomy failure)";
      //   }else
      //   if(reason=='not_newly_diagnosed'){
      //     $scope.qcAssurance.recencyreasonName ="Not newly diagnosed";
      //   }
      //   else
      //   if(reason=='other'){
      //     $scope.qcAssurance.recencyreasonName ="Other, please specify";
      //   }
      //   else{
      //     $scope.qcAssurance.recencyreasonName="";
      //   }
      // }


  $scope.setRecencyDate = function(val){
    var ipObj2 = {
      callback: function (val) { 
     
      var hivRecencyDate = new Date(val);
      console.log(hivRecencyDate);
      $scope.qcAssurance.hivRecencyDate =  $filter('date')(hivRecencyDate , "dd-MMM-yyyy");
      },
    }; 
    ionicDatePicker.openDatePicker(ipObj2);
  }

  $scope.setTestKitExpDate = function(val){
    var ipObj3 = {
      callback: function (val) { 
     
      var testKitExpDate = new Date(val);
      console.log(testKitExpDate);
      $scope.qcAssurance.testKitExpDate =  $filter('date')(testKitExpDate , "dd-MMM-yyyy");
      },
    }; 
    ionicDatePicker.openDatePicker(ipObj3);
  }

      $scope.addQcAssurance = function()
      {
        console.log($scope.qcAssurance);
        if($scope.qcAssurance.referenceResult==""){
          $ionicPopup.alert({title:'Alert!',template:'Please Choose Reference Result'});
          return false;
        }
        if($scope.qcAssurance.hivRecencyDate==""){
          $ionicPopup.alert({title:'Alert!',template:'Please Choose HIV+ Recency Date'});
          return false;
        }
        if($scope.qcAssurance.testKitExpDate==""){
          $ionicPopup.alert({title:'Alert!',template:'Please Choose Test Kit Expiry Date'});
          return false;
        }
        if($scope.qcAssurance.ctrlLine!=""){
          $scope.qcAssurance.ctrlLineName =   $("#ctrlLine").find("option:selected").text();
        }
        else{
          $ionicPopup.alert({title:'Alert!',template:'Please Choose Control Line'});
          return false;
        }
        if($scope.qcAssurance.positiveLine!=""){
          $scope.qcAssurance.positiveLineName =   $("#positiveLine").find("option:selected").text();
        }
        else{
          $ionicPopup.alert({title:'Alert!',template:'Please Choose Positive Verification Line'});
          return false;
        }
        if($scope.qcAssurance.longTermLine!=""){
          $scope.qcAssurance.longTermLineName =   $("#longTermLine").find("option:selected").text();
        }
        else{
          $ionicPopup.alert({title:'Alert!',template:'Please Choose Long Term Line'});
          return false;
        }

        var currentdate = new Date();
        $scope.qcAssurance.formInitDateTime = currentdate.getFullYear() + "-"
        + (currentdate.getMonth()+1)  + "-" 
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();

        console.log($scope.qcAssurance.formInitDateTime);
        var count = localStorage.getItem('qccounter');
        $scope.counter  = parseInt(count) + 1;
     
        $preLoader.show();
        var qcAssurance = $scope.qcAssurance;
           if(JSON.parse(localStorage.getItem('QCData'))!=null){
            $scope.qcData =JSON.parse(localStorage.getItem('QCData'));
            }       
            $scope.qcData[$scope.counter-1] =qcAssurance;        
            localStorage.setItem('QCData',JSON.stringify($scope.qcData)) 
            localStorage.setItem('qccounter', $scope.counter);
        
             $scope.qcAssurance ={};
              $cordovaToast.show('Data Has Been Saved Successfully', 'long', 'center')
              .then(function(success) {
                // success
              }, function (error) {
                // error
              });
              $window.location.reload(true);
            $preLoader.hide();
      }
})


.filter('underscorefilter', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
});