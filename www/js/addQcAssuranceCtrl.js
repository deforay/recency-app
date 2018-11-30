app=angular.module('starter.addQcAssuranceCtrl', ['starter.services'])
.controller('addQcAssuranceCtrl', function($scope,$rootScope,$http, $timeout, $stateParams,$cordovaToast, ionicDatePicker,  $ionicPopup,$preLoader,$localStorage, $cordovaGeolocation, $window,$filter,$cordovaNetwork) {
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
         
//console.log(qcList)
$scope.qcOutcomeCheck = function(){
  var qcLocalDatas = JSON.parse(localStorage.getItem('QCData'));
 // console.log(qcLocalDatas);
  if(qcLocalDatas !=null){
    $scope.termOutcome = [];
    var qcLocalDatasLen = Object.keys(qcLocalDatas).length;
    console.log(qcLocalDatas[qcLocalDatasLen - 1].testerName);
    for(i=0;i<qcLocalDatasLen;i++){
  $scope.termOutcome.push(qcLocalDatas[i].recencyOutcome);

    }
  //console.log($scope.termOutcome);

  for(i=0;i<$scope.termOutcome.length;i++){
    if($scope.termOutcome[i]=='Assay Recent'){
      $scope.firstConditon ='Assay Recent';
    }
    else if($scope.termOutcome[i]=='Assay HIV Negative'){
      $scope.secondConditon ='Assay HIV Negative';
    }else if($scope.termOutcome[i]=='Long Term'){
      $scope.thirdConditon ='Long Term';
    }
  }
  console.log($scope.firstConditon, $scope.secondConditon,$scope.thirdConditon)
  if($scope.firstConditon=='Assay Recent' &&  $scope.secondConditon =='Assay HIV Negative' && $scope.thirdConditon=='Long Term'){
    var lastQcDate = new Date();
    localStorage.setItem('LastQcDate',lastQcDate);
  }else{
      $scope.noOfDays = localStorage.getItem('noOfDays');
      if($scope.noOfDays == null || $scope.noOfDays == 'null' ||  $scope.noOfDays == 0 || $scope.noOfDays == ''){
       console.log("No alert")
      }
      else{
      var currentDate = new Date();
      localStorage.setItem('QcStartDate',currentDate);
      var alertdate = new Date(Date.now()+$scope.noOfDays *24*60*60*1000);
      localStorage.setItem('QcAlertDate',alertdate);
      //console.log("Current Date:" +currentDate+ " and Alert Date: " +alertdate);
     }  
  }
}
}
$scope.qcOutcomeCheck();
$scope.$on("$ionicView.beforeEnter", function(event, data){

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
      if(JSON.parse(localStorage.getItem('PartialQCData'))==null){
        $scope.qcAssurance.appVersion = localStorage.getItem('AppVersion');
        $scope.qcAssurance.addedBy = localStorage.getItem('userId');
        $scope.qcAssurance.qcsampleId ="";
        $scope.qcAssurance.referenceResult="";
        $scope.qcAssurance.qcTestDate ="";
        $scope.qcAssurance.testKitValueName="";
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
      }else{
        $scope.qcAssurance = JSON.parse(localStorage.getItem('PartialQCData'));
        if($scope.qcAssurance.recencyOutcome=='Invalid-Please Verify' || $scope.qcAssurance.recencyOutcome =='Assay HIV Negative'){
          $scope.outcomered = true;
          $scope.outcomeblack = false;
        }else if($scope.qcAssurance.recencyOutcome=='Assay Recent' || $scope.qcAssurance.recencyOutcome=='Long Term'){
          $scope.outcomeblack = true;
          $scope.outcomered = false;
        }else{
          $scope.outcomeblack = false;
          $scope.outcomered = false;
        }
         
        console.log($scope.qcAssurance);  
      }
     
   //   console.log($scope.qcAssurance);
   var qcList =   localStorage.getItem('QCData');
   //console.log(qcList)
   if(qcList != null){
     qcList    = JSON.parse(qcList);
     $rootScope.unSyncAddQcCount = "("+Object.keys(qcList).length+"  Not Synced)";
      console.log($scope.unSyncAddQcCount)
   }  else{
     $rootScope.unSyncAddQcCount="";
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
      if(JSON.parse(localStorage.getItem('PartialQCData'))==null){
        $scope.qcAssurance.appVersion = localStorage.getItem('AppVersion');
        $scope.qcAssurance.addedBy = localStorage.getItem('userId');
        $scope.qcAssurance.qcsampleId ="";
        $scope.qcAssurance.referenceResult="";
        $scope.qcAssurance.qcTestDate ="";
        $scope.qcAssurance.testKitValueName="";
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
      }else{
        $scope.qcAssurance = JSON.parse(localStorage.getItem('PartialQCData'));
        if($scope.qcAssurance.recencyOutcome=='Invalid-Please Verify' || $scope.qcAssurance.recencyOutcome =='Assay HIV Negative'){
          $scope.outcomered = true;
          $scope.outcomeblack = false;
        }else if($scope.qcAssurance.recencyOutcome=='Assay Recent' || $scope.qcAssurance.recencyOutcome=='Long Term'){
          $scope.outcomeblack = true;
          $scope.outcomered = false;
        }else{
          $scope.outcomeblack = false;
          $scope.outcomered = false;
        }
      }
   var qcList =   localStorage.getItem('QCData');
   //console.log(qcList)
  if(qcList != null){
     qcList    = JSON.parse(qcList);
     $rootScope.unSyncAddQcCount = "("+Object.keys(qcList).length+"  Not Synced)";
   }  else{
     $rootScope.unSyncAddQcCount="";
   }
    }

    $scope.doRefresh = function() {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
      
    }

    $scope.getOutcome = function(controlLine,positiveLine,longTermLine){
      if((controlLine=='absent'&& positiveLine=='absent'&& longTermLine=='absent')||
      (controlLine=='absent'&& positiveLine=='absent'&& longTermLine=='present')||
      (controlLine=='absent'&& positiveLine=='present'&& longTermLine=='absent')||
      (controlLine=='absent'&& positiveLine=='present'&& longTermLine=='present')||
      (controlLine=='present'&& positiveLine=='absent'&& longTermLine=='present'))
      {
        // $(".outcome").css("color","red");
        $scope.qcAssurance.recencyOutcome="Invalid-Please Verify";
        $scope.outcomered = true;
        $scope.outcomeblack = false;

      }
      if(controlLine=='present'&& positiveLine=='absent'&& longTermLine=='absent'){
        $scope.qcAssurance.recencyOutcome="Assay HIV Negative";
        // $(".outcome").css("color","red");
        $scope.outcomered = true;
        $scope.outcomeblack = false;


      }
      if(controlLine=='present'&& positiveLine=='present'&& longTermLine=='absent'){
        $scope.qcAssurance.recencyOutcome="Assay Recent";
        $scope.outcomeblack = true;
        $scope.outcomered = false;

      }
      if(controlLine=='present'&& positiveLine=='present'&& longTermLine=='present'){
        $scope.qcAssurance.recencyOutcome="Long Term";
        $scope.outcomeblack = true;
        $scope.outcomered = false;
      }
      if(controlLine==""|| positiveLine==""||longTermLine==""){
        $scope.qcAssurance.recencyOutcome="";
        $scope.outcomeblack = false;
        $scope.outcomered = false;
      }
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
        $scope.qcAssurance.testKitExpDate = $scope.ExpDate;
        $scope.qcAssurance.ManufacturerName = $scope.ManufacturerName;
      }else{
        $scope.qcAssurance.testKitExpDate=""; 
        $scope.qcAssurance.ManufacturerName="";
      }
    }

    $scope.getControlLine=function(controlline){
      if(controlline=='present'){
            $scope.qcAssurance.ctrlLineName = 'Present';  
          }
          if(controlline=='absent'){
            $scope.qcAssurance.ctrlLineName = 'Absent';
          }
    }
    $scope.OnPositiveLineChange = function(positiveline){
      if(positiveline=='present'){
        $scope.qcAssurance.positiveLineName = 'Present(Positive/P)';
      }
      if(positiveline=='absent'){
        $scope.qcAssurance.positiveLineName = 'Absent(Negative/N)';
      }  
    }
    $scope.OnLongtermChange = function(longterm){
      if(longterm!='present'){
        $scope.qcAssurance.longTermLineName = 'Present(Long Term/LT)';
      }
      if(longterm!='absent'){
        $scope.qcAssurance.longTermLineName = 'Absent(Recent/R)';
      }
    }
    $scope.getReasonName = function(reason){
      if(reason=='no_consent_from_the_client'){
        $scope.qcAssurance.recencyreasonName ="No consent from the Client";
      }else 
      if(reason=='sample_was_not_collected'){
        $scope.qcAssurance.recencyreasonName ="Sample was not collected (Phlebotomy failure)";
      }else
      if(reason=='not_newly_diagnosed'){
        $scope.qcAssurance.recencyreasonName ="Not newly diagnosed";
      }
      else
      if(reason=='other'){
        $scope.qcAssurance.recencyreasonName ="Other, please specify";
      }
      else{
        $scope.qcAssurance.recencyreasonName="";
      }
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
   
   




      $scope.setqcTestDate = function(val){
        var ipObj1 = {
          callback: function (val) { 
          var qcTestDate = new Date(val);
          console.log(qcTestDate);
          $scope.qcAssurance.qcTestDate =  $filter('date')(qcTestDate , "dd-MMM-yyyy");
          $scope.partialQcData();
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
      $scope.qcAssurance.hivRecencyDate =  $filter('date')(hivRecencyDate , "dd-MMM-yyyy");
      $scope.partialQcData();
      },
    to: new Date(),

    }; 
    ionicDatePicker.openDatePicker(ipObj2);
  }

  $scope.setTestKitExpDate = function(val){
    var ipObj3 = {
      callback: function (val) { 
     
      var testKitExpDate = new Date(val);
      console.log(testKitExpDate);
      $scope.qcAssurance.testKitExpDate =  $filter('date')(testKitExpDate , "dd-MMM-yyyy");
      $scope.partialQcData();
      },
    }; 
    ionicDatePicker.openDatePicker(ipObj3);
  }


  $scope.partialQcData = function(){
    console.log($scope.qcAssurance)
    var partialQCData = $scope.qcAssurance;

     localStorage.setItem('PartialQCData',JSON.stringify(partialQCData)) ;
     }
      $scope.addQcAssurance = function()
      {
        console.log($scope.qcAssurance);

        if($scope.qcAssurance.qcTestDate==""){
          $ionicPopup.alert({title:'Alert!',template:'Please Enter Date Of QC Test'});
          return false;
        }
        if($scope.qcAssurance.qcsampleId==""){
          $ionicPopup.alert({title:'Alert!',template:'Please Enter QC Sample ID'});
          return false;
        }
        if($scope.qcAssurance.referenceResult==""){
          $ionicPopup.alert({title:'Alert!',template:'Please Choose Reference Result'});
          return false;
        }
        if($scope.qcAssurance.testKitLotNo==""){
          $ionicPopup.alert({title:'Alert!',template:'Please Enter Test Kit Lot Number'});
          return false;
        }
        if($scope.qcAssurance.testKitExpDate==""){
          $ionicPopup.alert({title:'Alert!',template:'Please Enter Test Kit Expiry Date'});
          return false;
        }
         if($scope.qcAssurance.hivRecencyDate==""){
            $ionicPopup.alert({title:'Alert!',template:'Please Choose HIV+ Recency Date'});
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
        if($scope.qcAssurance.testerName==""){
          $ionicPopup.alert({title:'Alert!',template:'Please Enter Tester Name'});
          return false;
        }
        var currentdate = new Date();
        $scope.qcAssurance.addedOn = currentdate.getFullYear() + "-"
        + (currentdate.getMonth()+1)  + "-" 
        + currentdate.getDate() + " "
        + currentdate.getHours() + ":"  
        + currentdate.getMinutes() + ":" 
        + currentdate.getSeconds();

        console.log($scope.qcAssurance.addedOn);
         
        var count = localStorage.getItem('qccounter');
        $scope.counter  = parseInt(count) + 1;
     
        $preLoader.show();
        var qcAssurance = $scope.qcAssurance;
           if(JSON.parse(localStorage.getItem('QCData'))!=null){
            $scope.qcData =JSON.parse(localStorage.getItem('QCData'));
            }       
            $scope.qcData[$scope.counter-1] =qcAssurance;  
            console.log($scope.qcData)      

            localStorage.setItem('QCData',JSON.stringify($scope.qcData)) 
            localStorage.removeItem('PartialQCData');
            localStorage.setItem('qccounter', $scope.counter);
        
             $scope.qcAssurance ={};
              $cordovaToast.show('Data Has Been Saved Successfully', 'long', 'center')
              .then(function(success) {
                // success
              }, function (error) {
                // error
              });
              $scope.qcAssuranceinit();
              $scope.qcOutcomeCheck();


             // $window.location.reload(true);
            $preLoader.hide();
      }
})


.filter('underscorefilter', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
});