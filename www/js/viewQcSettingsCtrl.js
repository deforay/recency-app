app=angular.module('starter.viewQcSettingsCtrl', ['starter.services'])
.controller('viewQcSettingsCtrl', function($scope, $http, $timeout, $stateParams,$cordovaToast,$ionicModal, ionicDatePicker,  $ionicPopup,$preLoader,$localStorage, $cordovaGeolocation, $window,$filter,$cordovaNetwork) {
    $scope.qcTester = {};
    $scope.qcTesterInfo ={};
    $scope.qcLotInfo ={};
    $scope.isVisibleLot = false;
    $scope.isVisibleTester = false;
    $("#main-qcsetting").addClass("active");
    

     // Encryption data
   $scope.hash = CryptoJS.MD5('sasi').toString();
   console.log($scope.hash)
// Object Encryption Method 1
    var keySize = 256;
    var ivSize = 128;
    var iterations = 100;
    var message = "Hello World";
    var password = "Secret Password";

function encrypt (msg, pass) {
  var salt = CryptoJS.lib.WordArray.random(128/8);  
  var key = CryptoJS.PBKDF2(pass, salt, {
      keySize: keySize/32,
      iterations: iterations
    });
  var iv = CryptoJS.lib.WordArray.random(128/8); 
  var encrypted = CryptoJS.AES.encrypt(msg, key, { 
    iv: iv, 
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC   
  });
  // salt, iv will be hex 32 in length
  // append them to the ciphertext for use  in decryption
  var transitmessage = salt.toString()+ iv.toString() + encrypted.toString();
  return transitmessage;
}

var encrypted = encrypt(message, password);
console.log(encrypted);

//Object Encryption/Decryption Method 2
    $rootScope.base64Key = CryptoJS.enc.Hex.parse('0123456789abcdef0123456789abcdef')
    $rootScope.iv = CryptoJS.enc.Hex.parse('abcdef9876543210abcdef9876543210');

    var data = [{id: 1}, {id: 2}]
    var enciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      $rootScope.base64Key,
      { iv: $rootScope.iv }
      );
    //console.log(enciphertext)
    $scope.ciphertext = enciphertext.ciphertext.toString(CryptoJS.enc.Base64);
    //console.log( $scope.ciphertext)
    var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse($scope.ciphertext)
      });
    var decrypted = CryptoJS.AES.decrypt(
          cipherParams,
          $rootScope.base64Key,
          { iv: $rootScope.iv }
        );
        $scope.descrString = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    console.log( $scope.descrString)

//Object Encryption/Decryption Method 3

    var encyptData = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
    var bytes  = CryptoJS.AES.decrypt(encyptData.toString(), 'secret key 123');
    var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    console.log(decryptedData); 

    
    $(document).ready(function(){
       $scope.recencydisplay=true;  
        $("#main-qcsetting").addClass("active");
        if(!localStorage.getItem('Testercounter')){
         $scope.Testercounter =0;
          localStorage.setItem('Testercounter',$scope.Testercounter);
        }
        if(!localStorage.getItem('Lotcounter')){
            $scope.Lotcounter =0;
             localStorage.setItem('Lotcounter',$scope.Lotcounter);
        }

      });
     $scope.TesterInfoList =   localStorage.getItem('TesterInfo');
      if($scope.TesterInfoList != null){
         $scope.TesterInfoList    = JSON.parse($scope.TesterInfoList);
      }
      else{
        $scope.isVisibleTester = true;
      }
      console.log($scope.TesterInfoList)

      $scope.LotInfoList =   localStorage.getItem('LotInfo');
      if($scope.LotInfoList != null){
        $scope.LotInfoList  = JSON.parse($scope.LotInfoList);
      }else{
        $scope.isVisibleLot = true;

      }
      console.log($scope.LotInfoList)


    $scope.setmainactive = function(){
      $scope.recencydisplay=true;
      if($("#main-qcsetting").hasClass('active')){
    } else {
        $("#main-qcsetting").addClass('active')
        $("#other-qcsetting").removeClass('active')
    }
    }

    $scope.setothersactive = function(){
      $scope.recencydisplay=false;
      if($("#other-qcsetting").hasClass('active')){
    } else {
        $("#other-qcsetting").addClass('active')
        $("#main-qcsetting").removeClass('active')
    }
    }

    $scope.doRefresh = function() {
      $preLoader.show();
      $window.location.reload(true);
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
    console.log(lotInfo);
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
       $scope.testinfo.push({
        "testerName":$scope.qcTesterObj[i].testerName,
        "available":$scope.qcTesterObj[i].available,
       "label":$scope.qcTesterObj[i].label
       });
    }
    $scope.testinfo.splice(index,1);
    console.log( $scope.testinfo)
   
    localStorage.setItem('TesterInfo',JSON.stringify( $scope.testinfo));
    localStorage.setItem('Testercounter',JSON.stringify( $scope.testinfo.length));

    $preLoader.hide();
    $window.location.reload(true);
  }
  $scope.deleteLotInfo = function(lotInfo,index){
    console.log(lotInfo);
    $scope.lotinfo =[];
    lotInfo.index= index;
    $scope.lotInfoObj = JSON.parse(localStorage.getItem('LotInfo'));
    for(i=0;i<Object.keys($scope.lotInfoObj).length;i++){
    $scope.lotinfo.push({
       "testKitLotNo":$scope.lotInfoObj[i].testKitLotNo,
       "testKitExpDate":$scope.lotInfoObj[i].testKitExpDate,
       "available":$scope.lotInfoObj[i].available,
       "label":$scope.lotInfoObj[i].label
    });
}
$scope.lotinfo.splice(index,1);
console.log( $scope.lotinfo)
 localStorage.setItem('LotInfo',JSON.stringify( $scope.lotinfo));
 localStorage.setItem('Lotcounter',JSON.stringify( $scope.lotinfo.length));

$preLoader.hide();
 $window.location.reload(true);
}

})


.filter('underscorefilter', function () {
  return function (input) {
      return input.replace(/_/g, ' ');
  };
});