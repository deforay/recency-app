app=angular.module('starter.editTesterInfoCtrl', ['starter.services'])
.controller('editTesterInfoCtrl', function($scope, $http, $timeout, $stateParams,$cordovaToast,  $location,$window, ionicDatePicker,  $ionicPopup,$preLoader,$localStorage, $cordovaGeolocation, $window,$filter,$cordovaNetwork) {
    $scope.qcTester = {};


    $scope.TesterListData ={};
    $scope.qcTester = JSON.parse(localStorage.getItem('viewTesterInfo'));
    // console.log($scope.qcTester)
     if($scope.qcTester.available=='yes'){
      $scope.qcTester.available = true;
     }
     else{
      $scope.qcTester.available = false;
     }
    $(document).ready(function(){
        if(!localStorage.getItem('Testercounter')){
         $scope.Testercounter =0;
          localStorage.setItem('Testercounter',$scope.Testercounter);
        }
     });


    $scope.doRefresh = function() {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
      
    }

    $scope.editTesterInfo = function(qc){
        $scope.qcTesterInfo = qc;
        if(qc.available=='yes'){
          $scope.qcTesterInfo.isavailable= true;
        }else{
          $scope.qcTesterInfo.isavailable= false;
        }
    }
    $scope.updateTesterName = function()
      { 
        $preLoader.show();
        $scope.index  = $scope.qcTester.index;
        $scope.qcTester.label = $scope.qcTester.testerName 
       if($scope.qcTester.available==true){
        $scope.qcTester.available = 'yes';    
       }else{
        $scope.qcTester.available = 'no';    
       }
       $scope.chkTesterInfo = JSON.parse(localStorage.getItem('TesterInfo'))
       $scope.chkTesterInfo[$scope.index] = $scope.qcTester;
       localStorage.setItem('TesterInfo',JSON.stringify($scope.chkTesterInfo));
       $scope.qcTester ={};

         $cordovaToast.show('Edited Successfully', 'long', 'center')
         .then(function(success) {
           // success
         }, function (error) {
           // error
         });
  
         $location.path('/app/addQcSettings');
        //  $window.location.reload(true);
         $preLoader.hide();

      }

})


.filter('underscorefilter', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
});