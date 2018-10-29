app=angular.module('starter.addQcSettingsCtrl', ['starter.services'])
.controller('addQcSettingsCtrl', function($scope, $http, $timeout, $stateParams,$cordovaToast, ionicDatePicker,  $ionicPopup,$preLoader,$localStorage, $cordovaGeolocation, $window,$filter,$cordovaNetwork) {
    $scope.qcTester = {};
    $scope.qcLotObj ={};
    $scope.TesterListData ={};
    $scope.LotListData ={};
    $scope.recencydisplay = true;
    $("#main-addqcsetting").addClass("active");
    
    $(document).ready(function(){
       $scope.recencydisplay=true;  
        $("#main-addqcsetting").addClass("active");
        if(!localStorage.getItem('Testercounter')){
         $scope.Testercounter =0;
          localStorage.setItem('Testercounter',$scope.Testercounter);
        }
        if(!localStorage.getItem('Lotcounter')){
            $scope.Lotcounter =0;
             localStorage.setItem('Lotcounter',$scope.Lotcounter);
        }

      });
      var TesterInfoList =   localStorage.getItem('TesterInfo');
      if(TesterInfoList != null){
         TesterInfoList    = JSON.parse(TesterInfoList);
      }
      console.log(TesterInfoList)

      var LotInfoList =   localStorage.getItem('LotInfo');
      if(LotInfoList != null){
         LotInfoList  = JSON.parse(LotInfoList);
      }
      console.log(LotInfoList)

    $scope.testerinit = function(){
    $("#main-addqcsetting").addClass("active");

      $scope.qcTester.testerName = "";
      $scope.qcTester.available = true   
      $scope.qcLotObj.testKitLotNo = "";
      $scope.qcLotObj.testKitExpDate = "";
      $scope.qcLotObj.available = true;     
    }

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
            console.log(testKitExpDate);
            $scope.qcLotObj.testKitExpDate =  $filter('date')(testKitExpDate , "dd-MMM-yyyy");
            }
        }; 
         ionicDatePicker.openDatePicker(ipObj3);
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
       console.log($scope.qcTester);

        var qcTester = $scope.qcTester;
        $preLoader.show();

       if(JSON.parse(localStorage.getItem('TesterInfo'))!=null){
        $scope.TesterListData =JSON.parse(localStorage.getItem('TesterInfo'));
        }     

        $scope.TesterListData[$scope.Testercounter-1] = qcTester;      
        localStorage.setItem('TesterInfo',JSON.stringify($scope.TesterListData)) 
        localStorage.setItem('Testercounter',$scope.Testercounter);  
        $scope.qcTester ={};
        $scope.recencydisplay=true;
         $cordovaToast.show('Data Has Been Saved Successfully', 'long', 'center')
         .then(function(success) {
           // success
         }, function (error) {
           // error
         });

         $("#main-addqcsetting").addClass("active");
         $("#other-addqcsetting").removeClass('active')
         $preLoader.hide();
      }
      $scope.addLotInfo = function()
      { 
       if($scope.qcLotObj.available==true){
        $scope.qcLotObj.available = 'yes';    
       }else{
        $scope.qcLotObj.available = 'no';    
       }
       $scope.qcLotObj.label = $scope.qcLotObj.testKitLotNo;

       var lotcount = localStorage.getItem('Lotcounter');
       $scope.Lotcounter  = parseInt(lotcount) + 1;
       console.log($scope.qcLotObj);

        var qcLotObj = $scope.qcLotObj;
        $preLoader.show();

       if(JSON.parse(localStorage.getItem('LotInfo'))!=null){
        $scope.LotListData =JSON.parse(localStorage.getItem('LotInfo'));
        }     

        $scope.LotListData[$scope.Lotcounter-1] = qcLotObj;      
        localStorage.setItem('LotInfo',JSON.stringify($scope.LotListData)) 
        localStorage.setItem('Lotcounter',$scope.Lotcounter);  
        $scope.qcLotObj ={};
        $scope.recencydisplay=false;
         $cordovaToast.show('Data Has Been Saved Successfully', 'long', 'center')
         .then(function(success) {
           // success
         }, function (error) {
           // error
         });

        //  $("#main-addqcsetting").addClass("active");
        //  $("#other-addqcsetting").removeClass('active')
         $preLoader.hide();
      }
})


.filter('underscorefilter', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
});