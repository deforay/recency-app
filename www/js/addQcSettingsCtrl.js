app=angular.module('starter.addQcSettingsCtrl', ['starter.services'])
.controller('addQcSettingsCtrl', function($scope, $http, $timeout, $stateParams,$cordovaToast, ionicDatePicker,  $ionicPopup,$preLoader,$localStorage, $cordovaGeolocation, $window,$filter,$cordovaNetwork) {
    $scope.qcTester = {};
    $scope.qcLotObj ={};
    $scope.TesterListData ={};
    $scope.LotListData ={};


    $scope.qcTesterInfo ={};
    $scope.qcLotInfo ={};

    $scope.recencydisplay = true;

    $("#main-addqcsetting").addClass("active");
    
    $(document).ready(function(){
   
      });

      $scope.$on("$ionicView.beforeEnter", function(event, data){
        
        $scope.recencydisplay=true;  
        $("#main-addqcsetting").addClass("active");
        $("#other-addqcsetting").removeClass("active");
        if(!localStorage.getItem('Testercounter')){
         $scope.Testercounter =0;
          localStorage.setItem('Testercounter',$scope.Testercounter);
        }
        if(!localStorage.getItem('Lotcounter')){
            $scope.Lotcounter =0;
             localStorage.setItem('Lotcounter',$scope.Lotcounter);
        }
        var TesterInfoList =   localStorage.getItem('TesterInfo');
   
        if(TesterInfoList == null || TesterInfoList.length==0 ){
          $scope.isVisibleTester = true;
        }else{
          TesterInfoList    = JSON.parse(TesterInfoList);
          $scope.isVisibleTester = false;
        $scope.TesterInfoList = TesterInfoList;

        }
      console.log(TesterInfoList)
          var LotInfoList =   localStorage.getItem('LotInfo');
      // console.log(LotInfoList)
        if(LotInfoList == null || LotInfoList==""){
          $scope.isVisibleLot = true;
        }else{
          LotInfoList  = JSON.parse(LotInfoList);
        $scope.LotInfoList =LotInfoList;

          $scope.isVisibleLot = false;
        }
       console.log(LotInfoList)
      });
      $scope.displayQcSettings = function(){
        var TesterInfoList =   localStorage.getItem('TesterInfo');
   
        if(TesterInfoList == null || TesterInfoList.length==0 ){
          $scope.isVisibleTester = true;
        }else{
          TesterInfoList    = JSON.parse(TesterInfoList);
          $scope.isVisibleTester = false;
        $scope.TesterInfoList = TesterInfoList;

        }
      console.log(TesterInfoList)
          var LotInfoList =   localStorage.getItem('LotInfo');
      // console.log(LotInfoList)
        if(LotInfoList == null || LotInfoList==""){
          $scope.isVisibleLot = true;
        }else{
          LotInfoList  = JSON.parse(LotInfoList);
        $scope.LotInfoList =LotInfoList;

          $scope.isVisibleLot = false;
        }
       console.log(LotInfoList)
      };
      $scope.displayQcSettings();
    $scope.testerinit = function(){
    $("#main-addqcsetting").addClass("active");
      $scope.qcTester.testerName = "";
      $scope.qcTester.available = true;   
      $scope.qcLotObj.testKitManufacturer="";
      $scope.qcLotObj.testKitManufacturerName="";
      $scope.qcLotObj.testKitLotNo ="";
      $scope.qcLotObj.LotNumber = "";
      $scope.qcLotObj.testKitExpDate = "";
      $scope.qcLotObj.available = true;     
    }
    $scope.testerinit();
  
    $scope.setmainactive = function(){
      $scope.recencydisplay=true;
      if($("#main-addqcsetting").hasClass('active')){
    } else {
        $("#main-addqcsetting").addClass('active')
        $("#other-addqcsetting").removeClass('active')
    }
    }

    $scope.setothersactive = function(){
      $scope.recencydisplay=false;
      if($("#other-addqcsetting").hasClass('active')){
    } else {
        $("#other-addqcsetting").addClass('active')
        $("#main-addqcsetting").removeClass('active')
    }
    }

    $scope.doRefresh = function() {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
      
    }

    $scope.setTestKitExpDate = function(val){
        var ipObj3 = {
           callback: function (val) { 
            var testKitExpDate = new Date(val);
         //   console.log(testKitExpDate);
            $scope.qcLotObj.testKitExpDate =  $filter('date')(testKitExpDate , "dd-MMM-yyyy");
            }
        }; 
         ionicDatePicker.openDatePicker(ipObj3);
    }
     $scope.gettestKitManufacturer   = function(manufacturer){
        if(manufacturer=='SED'){
          $scope.qcLotObj.testKitManufacturerName ="SEDIA Bioscience (SED)";
        }else
        if(manufacturer=='MAX'){
          $scope.qcLotObj.testKitManufacturerName ="Maxim Biomedical (MAX)";
        }else{
          $scope.qcLotObj.testKitManufacturerName="";
        }
      }

    $scope.addTesterName = function()
      { 
       if($scope.qcTester.available==true){
        $scope.qcTester.available = 'yes';    
       }else{
        $scope.qcTester.available = 'no';    
       }
       $scope.qcTester.label = $scope.qcTester.testerName;
       var count = localStorage.getItem('Testercounter');
       $scope.Testercounter  = parseInt(count) + 1;
      // console.log($scope.qcTester);

        var qcTester = $scope.qcTester;
        $preLoader.show();
        if(localStorage.getItem('TesterInfo')==null || (localStorage.getItem('TesterInfo'))==""){
       //   console.log(localStorage.getItem('TesterInfo'))
          }
          else{
          $scope.TesterListData =JSON.parse(localStorage.getItem('TesterInfo'));
        }
      //  if(JSON.parse(localStorage.getItem('TesterInfo'))!=null){
      //   $scope.TesterListData =JSON.parse(localStorage.getItem('TesterInfo'));
      //   }     

        $scope.TesterListData[$scope.Testercounter-1] = qcTester;      
        localStorage.setItem('TesterInfo',JSON.stringify($scope.TesterListData)) 
        localStorage.setItem('Testercounter',$scope.Testercounter);  
        $scope.qcTester.testerName = "";
        $scope.qcTester.available = true; 
        $scope.recencydisplay=true;
         $cordovaToast.show('Data Has Been Saved Successfully', 'long', 'center')
         .then(function(success) {
           // success
         }, function (error) {
           // error
         });
         $("#main-addqcsetting").addClass("active");
         $("#other-addqcsetting").removeClass('active')
        $scope.displayQcSettings();
         $preLoader.hide();
      }
      
      $scope.addLotInfo = function()
      { 
        console.log($scope.qcLotObj)
       if($scope.qcLotObj.available==true){
        $scope.qcLotObj.available = 'yes';    
       }else{
        $scope.qcLotObj.available = 'no';    
       }
       $scope.qcLotObj.label = $scope.qcLotObj.testKitLotNo;
       if($scope.qcLotObj.LotNumber!="" && $scope.qcLotObj.testKitManufacturer!=""){
        $scope.qcLotObj.testKitLotNo = $scope.qcLotObj.testKitManufacturer +" - " + $scope.qcLotObj.LotNumber;
       }else{
        $scope.qcLotObj.testKitLotNo="";
       }
       var lotcount = localStorage.getItem('Lotcounter');
       $scope.Lotcounter  = parseInt(lotcount) + 1;
       console.log($scope.qcLotObj);
        var qcLotObj = $scope.qcLotObj;
        $preLoader.show();        
        if(localStorage.getItem('LotInfo')==null || (localStorage.getItem('LotInfo'))==""){
          console.log(localStorage.getItem('LotInfo'))
          }
          else{
          $scope.LotListData =JSON.parse(localStorage.getItem('LotInfo'));
        }
        $scope.LotListData[$scope.Lotcounter-1] = qcLotObj;
     //   console.log($scope.LotListData)
        localStorage.setItem('LotInfo',JSON.stringify($scope.LotListData)) 
        localStorage.setItem('Lotcounter',$scope.Lotcounter);  
        $scope.qcLotObj.testKitLotNo = "";
        $scope.qcLotObj.testKitManufacturer="";
        $scope.qcLotObj.testKitManufacturerName="";
        $scope.qcLotObj.LotNumber = "";
        $scope.qcLotObj.testKitExpDate = "";
        $scope.qcLotObj.available = true;
        $scope.recencydisplay=false;
        $scope.displayQcSettings();

         $cordovaToast.show('Data Has Been Saved Successfully', 'long', 'center')
         .then(function(success) {
           // success
         }, function (error) {
           // error
         });
        $("#other-addqcsetting").addClass('active')
         $("#main-addqcsetting").removeClass("active");
         $preLoader.hide();
      }
      $scope.editTesterInfo = function(qc,index){
        console.log(qc);
        qc.index = index;
          $scope.qcTesterInfo = qc;
          localStorage.setItem('viewTesterInfo',JSON.stringify(qc));
          $window.location.href = '#/app/editTesterInfo/'+qc.testerName;
      
      }
      $scope.editLotInfo = function(lotInfo,index){
      //  console.log(lotInfo);
        lotInfo.index = index;
        $scope.qcLotInfo = lotInfo;
        localStorage.setItem('viewLotInfo',JSON.stringify(lotInfo));
        $window.location.href = '#/app/editLotInfo/'+lotInfo.testKitLotNo;
      
      }

    
      $scope.deleteTesterInfo = function(qc,index){
        $preLoader.show();
        $scope.testinfo =[];
        qc.index= index;
        $scope.qcTesterObj = JSON.parse(localStorage.getItem('TesterInfo'));
        for(i=0;i<Object.keys($scope.qcTesterObj).length;i++){
           $s$cordovaToast.show('Deleted Successfully', 'long', 'center')
           .then(function(success) {
             // success
           }, function (error) {
             // error
           });cope.testinfo.push({
            "testerName":$scope.qcTesterObj[i].testerName,
            "available":$scope.qcTesterObj[i].available,
           "label":$scope.qcTesterObj[i].label
           });
        }
        $scope.testinfo.splice(index,1);
    if($scope.testinfo.length==0){
      localStorage.setItem('TesterInfo','');

     localStorage.setItem('Testercounter',JSON.stringify( $scope.testinfo.length));
      $scope.testinfo = "";
    }else{
      localStorage.setItem('TesterInfo',JSON.stringify( $scope.testinfo));
      localStorage.setItem('Testercounter',JSON.stringify( $scope.testinfo.length));
    } 
   
$scope.TesterInfoList = [];
    $scope.displayQcSettings();

        $cordovaToast.show('Deleted Successfully', 'long', 'center')
        .then(function(success) {
          // success
        }, function (error) {
          // error
        });
        $preLoader.hide();
      //  $window.location.reload(true);
      }
      $scope.deleteLotInfo = function(lotInfo,index){
       // console.log(lotInfo);
        $scope.lotinfo =[];
        lotInfo.index= index;
        $scope.lotInfoObj = JSON.parse(localStorage.getItem('LotInfo'));
        for(i=0;i<Object.keys($scope.lotInfoObj).length;i++){
        $scope.lotinfo.push({
          "testKitManufacturer":$scope.lotInfoObj[i].testKitManufacturer,
          "testKitManufacturerName":$scope.lotInfoObj[i].testKitManufacturerName,
          "LotNumber":$scope.lotInfoObj[i].LotNumber,
          "testKitLotNo":$scope.lotInfoObj[i].testKitLotNo,
          "testKitExpDate":$scope.lotInfoObj[i].testKitExpDate,
          "available":$scope.lotInfoObj[i].available,
          "label":$scope.lotInfoObj[i].label
        });
    }
    $scope.lotinfo.splice(index,1);
 
    if($scope.lotinfo.length==0){
      localStorage.setItem('LotInfo','');

     localStorage.setItem('Lotcounter',JSON.stringify( $scope.lotinfo.length));
      $scope.lotinfo = "";
    }else{
      localStorage.setItem('LotInfo',JSON.stringify( $scope.lotinfo));
      localStorage.setItem('Lotcounter',JSON.stringify( $scope.lotinfo.length));
    } 
    $scope.LotInfoList = [];
    $scope.displayQcSettings();
  
    $cordovaToast.show('Deleted Successfully', 'long', 'center')
         .then(function(success) {
           // success
         }, function (error) {
           // error
         });
    $preLoader.hide();

    //  $window.location.reload(true);
     $("#other-addqcsetting").addClass('active')
     $("#main-addqcsetting").removeClass("active");
    }


})


.filter('underscorefilter', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
});