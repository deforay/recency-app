
app=angular.module('starter.loginCtrl', ['starter.services'])

.controller('loginCtrl', function($scope,$ionicPopup,$state, $cordovaToast,$filter,$timeout,$localStorage,$rootScope,$todo,$window,$location,$preLoader,$http) {
  $scope.loginData = {};
  // if(window.cordova && window.cordova.plugins.Keyboard) {
  //   window.cordova.plugins.Keyboard.disableScroll(true);
  // }

    $('.authWrapper  .loginFields  .input-field input')
    .focus(function() {
      
        $('.authWrapper .loginFields').addClass('focused');
    })
    .blur(function() {
        $('.authWrapper .loginFields').removeClass('focused');
    });
 
 
  if($localStorage.get('logout')=='true' || $localStorage.get('login')=='success' && $localStorage.get('apppassword')!=null){
   $scope.viewLogin = false;
   $scope.viewAddPassword = false;
   $scope.viewConfirmPassword = false;
   $scope.viewLoginPassword =true;
  }else{
    $scope.viewLogin = true;
    $scope.viewAddPassword = false;
    $scope.viewConfirmPassword = false;
    $scope.viewLoginPassword =false;
  }
  
  $scope.doRefresh = function() {
    $preLoader.show();
    $window.location.reload(true);
  }
  
    $scope.doPasswordLogin = function(password){

      if(password!=$localStorage.get('apppassword')){
        $ionicPopup.alert({title: 'Password Failed',template: "Invalid App Password."});

      }else{
        $location.path('/app/addRecency');
      }
    }

    $scope.password ={};
    $scope.createpassword ={};
    $scope.confirmpassword ={};
    $scope.initAppLogin = function() {
      $scope.passcode = "";
      $scope.disablebtn = true;
    }
    $scope.initCreateApp= function() {
      $scope.createpasscode = "";
    }
    $scope.initConfirmApp= function() {
      $scope.confirmpasscode = "";
    }

    $scope.createApp = function(value){
      if($scope.createpasscode.length < 4) {
        
        $scope.createpasscode = $scope.createpasscode + value;
     // console.log($scope.createpasscode)
        if($scope.createpasscode.length == 1){
          $scope.createpassword.one = value;
        } else if($scope.createpasscode.length == 2){
          $scope.createpassword.two = value;
        } else if($scope.createpasscode.length == 3){
          $scope.createpassword.three = value;
        }
      else {
          $scope.createpassword.four = value;
      // console.log($scope.createpasscode)

          $timeout(function() {
            $scope.viewAddPassword = false;
           $scope.viewConfirmPassword = true;
            $preLoader.hide();
        }, 500);
         
      } 
    }
    }
    $scope.ConfirmApp = function(value){
      if($scope.confirmpasscode.length < 4) {
        
        $scope.confirmpasscode = $scope.confirmpasscode + value;
      //console.log($scope.confirmpasscode)
        if($scope.confirmpasscode.length == 1){
          $scope.confirmpassword.one = value;
        } else if($scope.confirmpasscode.length == 2){
          $scope.confirmpassword.two = value;
        } else if($scope.confirmpasscode.length == 3){
          $scope.confirmpassword.three = value;
        }
      else {
          $scope.confirmpassword.four = value;
        if($scope.confirmpasscode!= $scope.createpasscode){
          $(".view-passcode-col").addClass('error')
          $(".view-passcode-col").removeClass('valid');
          $scope.confirmpassword.one="";
          $scope.confirmpassword.two = "";
          $scope.confirmpassword.three = "";
          $scope.confirmpassword.four = "";
          $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 4);
          $ionicPopup.alert({title:'Login Failed!',template:'Wrong App Password'});
        }else{
          $(".view-passcode-col").addClass('valid')
          $(".view-passcode-col").removeClass('error')
          $localStorage.set('apppassword',$scope.confirmpasscode);
          
          $preLoader.show();
          $cordovaToast
          .show('App Password Created Successfully', 'long', 'center')
          .then(function(success) {
            // success
          }, function (error) {
            // error
          });
          $timeout(function() {
            $location.path('/app/addRecency');
            $preLoader.hide();
        }, 500);
        }
         
      } 
    }
    }
    $scope.deleteCreate = function(){
      if($scope.createpasscode.length == 4){
        $scope.createpassword.four = "";
        $scope.createpasscode = $scope.createpasscode.substring(0, $scope.createpasscode.length - 1);
      } else if($scope.createpasscode.length == 3){
        $scope.createpassword.three = "";
        $scope.createpasscode = $scope.createpasscode.substring(0, $scope.createpasscode.length - 1);
      } else if($scope.createpasscode.length == 2){
        $scope.createpassword.two = "";
        $scope.createpasscode = $scope.createpasscode.substring(0, $scope.createpasscode.length - 1);
      } else {
        $scope.createpassword.one = "";
        $scope.createpasscode = $scope.createpasscode.substring(0, $scope.createpasscode.length - 1);
      }
     // console.log($scope.createpasscode)

    }
    $scope.backToCreate = function(){
      $scope.viewAddPassword = true;
      $scope.viewConfirmPassword = false;
      $scope.confirmpassword.four = "";
      $scope.confirmpassword.three = "";
      $scope.confirmpassword.two = "";
      $scope.confirmpassword.one = "";
    }
    $scope.deleteConfirm = function(){
      if($scope.confirmpasscode.length == 4){
        $scope.confirmpassword.four = "";
        $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 1);
      } else if($scope.confirmpasscode.length == 3){
        $scope.confirmpassword.three = "";
        $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 1);
      } else if($scope.confirmpasscode.length == 2){
        $scope.confirmpassword.two = "";
        $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 1);
      } else {
        $scope.confirmpassword.one = "";
        $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 1);
      }
      //console.log($scope.confirmpasscode)
    }
    

    $scope.add = function(value) {
      if($scope.passcode.length < 4) {      
        $scope.passcode = $scope.passcode + value;
        if($scope.passcode.length == 1){
          $scope.password.one = value;
        } else if($scope.passcode.length == 2){
          $scope.password.two = value;
        } else if($scope.passcode.length == 3){
          $scope.password.three = value;
        }
        else{
        }
        if($scope.passcode.length == 4) {
          $scope.password.four = value;
          $scope.disablebtn = false;
            if($scope.passcode != $localStorage.get('apppassword')){
            //  console.log("wrong app passcode");
              $scope.disablebtn = true;
              $(".passcode-col").addClass('error')
              $(".passcode-col").removeClass('valid');
              $scope.password.one="";
              $scope.password.two = "";
              $scope.password.three = "";
              $scope.password.four = "";
              $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 4);
              $ionicPopup.alert({title:'Login Failed!',template:'Wrong App Password'});

            }else{
              $(".passcode-col").addClass('valid')
              $(".passcode-col").removeClass('error');
                var noOfDays = localStorage.getItem('noOfDays');
                var QcStartDate = localStorage.getItem('QcStartDate');
                var QcAlertDate = localStorage.getItem('QcAlertDate');
                var LastQCDate = localStorage.getItem('LastQcDate');
                if(LastQCDate == null){
                  LastQCDate  = '';
                }else{
                  LastQCDate = new Date(LastQCDate);
                  LastQCDate = $filter('date')(LastQCDate , "dd-MMM-yyyy")
                }
                var QCDatas =  localStorage.getItem('QCData');

               if(QCDatas == null || noOfDays==null || noOfDays ==''|| noOfDays=='null' || noOfDays==0){
                // console.log("No Alert");
               }else{
                 if(QcStartDate!=null && QcAlertDate!= null){
                  var QcStartDate = new Date(QcStartDate);
                  var QcAlertDate = new Date(QcAlertDate);
                     if((Date.parse(QcStartDate)>=Date.parse(QcAlertDate))){
                        var currentDate =  new Date();
                        currentDate = $filter('date')(currentDate , "dd-MMM-yyyy");
                        if( currentDate == localStorage.getItem('TodayAlertDate')){
                        }else{
                            var today = new Date();
                            today = $filter('date')(today , "dd-MMM-yyyy");
                            localStorage.setItem('TodayAlertDate',today);
                            $ionicPopup.alert({title:'Alert!',template:'Last QC done was on ' + lastTestDate + ' by Tester '+   testerName +'. Please perform QC test as recommended in SOP'});
                          }              
                      }
                  }
                }
      
              
                if( QcStartDate!=null && QcAlertDate!= null && QCDatas != null && (noOfDays!=null && noOfDays!=0)){
                  var QcStartDate = new Date(QcStartDate);
                  var QcAlertDate = new Date(QcAlertDate);
                    if((Date.parse(QcStartDate)>=Date.parse(QcAlertDate))){
                      var currentDate =  new Date();
                      currentDate = $filter('date')(currentDate , "dd-MMM-yyyy");
                      if( currentDate == localStorage.getItem('TodayAlertDate')){
                      }else{
                        var today = new Date();
                         today = $filter('date')(today , "dd-MMM-yyyy");
                         localStorage.setItem('TodayAlertDate',today);
                        $ionicPopup.alert({title:'Alert!',template:'Last QC done was on ' + lastTestDate + ' by Tester '+   testerName +'. Please perform QC test as recommended in SOP'});
                      }              
                  } 
                  $location.path('/app/addRecency');

                }
                else{
                  $preLoader.show();
                  $timeout(function() {
                   
                    $location.path('/app/addRecency');
                    $preLoader.hide();
                }, 500);
                }

            }
        }else{
          $scope.disablebtn = true;
        }
    }
    }
  
    $scope.delete = function() {
      if($scope.passcode.length == 4){
        $scope.password.four = "";
        $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
      } else if($scope.passcode.length == 3){
        $scope.password.three = "";
        $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
      } else if($scope.passcode.length == 2){
        $scope.password.two = "";
        $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
      } else {
        $scope.password.one = "";
        $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
      }
    }
    $scope.getApiCalls = function(){
$scope.userId = JSON.parse(localStorage.getItem('userId'));

      if($localStorage.get('apiUrl')!=null)
      {
        $http.get($localStorage.get('apiUrl')+'/api/facility?userId='+$scope.userId)
           .success(function(data) {
            $scope.facilityData = data.facility;
            var len = $scope.facilityData.length - 1;
           var facilitylen = $scope.facilityData[len];  
           var facilityid = (parseInt(facilitylen['facility_id'])+1).toString();
            $scope.facilityData.push({
             "facility_id": facilityid,
             "facility_name":"Other"
           })
        localStorage.setItem('FacilityData',JSON.stringify($scope.facilityData))  
        
        $scope.facilityTestData = data.facilityTest;
        var testlen = $scope.facilityTestData.length - 1;
        var facilitytestlen = $scope.facilityTestData[testlen];  
        var facilitytestid = (parseInt(facilitytestlen['facility_id'])+1).toString();
         $scope.facilityTestData.push({
           "facility_id": facilitytestid,
           "facility_name":"Other"
         })
        localStorage.setItem('TestingFacilityData',JSON.stringify($scope.facilityTestData)) 
               
        });
 

      $http.get($localStorage.get('apiUrl')+'/api/global-config')
      .success(function(data) {
      // console.log(data.config);
      $scope.configdata =data.config;
      $scope.announcement ="";
         for(i=0;i<$scope.configdata.length;i++){  
          if($scope.configdata[i].global_name =="admin_message"){
            $scope.announcement = data.config[i].global_value;
          }  
        } 
         for(i=0;i<$scope.configdata.length;i++){  
            if($scope.configdata[i].global_name =="mandatory_fields" || $scope.configdata[i].global_name =="admin_email" || $scope.configdata[i].global_name =="admin_phone" || $scope.configdata[i].global_name =="display_fields"||$scope.configdata[i].global_name =="admin_message"  )   {
              $scope.configdata.splice(i);
            }    
         } 
       localStorage.setItem('GlobalConfig',JSON.stringify($scope.configdata)) 
       localStorage.setItem('Announcement',JSON.stringify($scope.announcement)) 
      
        });
      $http.get($localStorage.get('apiUrl')+'/api/recency-mandatory')
      .success(function(data) {
       $scope.mandatoryData =data.fields;
       //console.log(data)
       localStorage.setItem('MandatoryData',JSON.stringify($scope.mandatoryData)) 
      // console.log( $scope.mandatoryData);           
      });
      $http.get($localStorage.get('apiUrl')+'/api/recency-hide')
      .success(function(data) {
       $scope.optionalData =data.fields[0];
       $scope.optionalArr =[];
       $scope.optionalArr.location=[];
       angular.forEach($scope.optionalData, function(value, key) {
         $scope.optionalArr[key]=value;
       });
       if($scope.optionalArr.location_one==false){
          $scope.optionalArr.location[0]=false;
        }else{
          $scope.optionalArr.location[0]=true;
        }
        if($scope.optionalArr.location_two==false){
          $scope.optionalArr.location[1]=false;
        }else{
          $scope.optionalArr.location[1]=true;
        }
        if($scope.optionalArr.location_three==false){
          $scope.optionalArr.location[2]=false;
        }else{
          $scope.optionalArr.location[2]=true;
        }
     //  console.log(  $scope.optionalArr);

       var hideFields =  Object.assign({}, $scope.optionalArr);
       //console.log(hideFields)
      localStorage.setItem('OptionalData',JSON.stringify(hideFields))  
     
      });
      $http.get($localStorage.get('apiUrl')+'/api/province')
      .success(function(data) {
        if(data.status=="success"){
       $scope.provinceData =data.province;
       localStorage.setItem('ProvinceData',JSON.stringify(data.province))  
      }else{
        localStorage.setItem('ProvinceData','')
       }    
      });
      $http.get($localStorage.get('apiUrl')+'/api/district')
      .success(function(data) {
       if(data.status=="success"){
        $scope.districtData  = data.district;
        localStorage.setItem('DistrictData',JSON.stringify($scope.districtData))
       }else{
        localStorage.setItem('DistrictData','')
       }
    
      });
      $http.get($localStorage.get('apiUrl')+'/api/city')
      .success(function(data) {   
        if(data.status=="success"){
        $scope.cityData = data.city;
       localStorage.setItem('CityData',JSON.stringify($scope.cityData))     
        }else{
          localStorage.setItem('CityData','')
        }      
      });
  
      $scope.mandatoryData = JSON.parse(localStorage.getItem('MandatoryData'));
      $scope.configdata = JSON.parse(localStorage.getItem('GlobalConfig'));
      $scope.provinceData = JSON.parse(localStorage.getItem('ProvinceData'));
 
        $http.get($localStorage.get('apiUrl')+'/api/risk-populations')
        .success(function(data) {
          $scope.riskpopulations =data;
          var lastelement = $scope.riskpopulations.length-1;
          $scope.lastindex = (parseInt($scope.riskpopulations[lastelement]['rp_id'])+1).toString();
         // console.log($scope.lastindex)
          $scope.riskpopulations.push({
           "rp_id": $scope.lastindex,
           "name":"Other"
         }) 

        localStorage.setItem('RiskPopulations',JSON.stringify($scope.riskpopulations))       
          });
    }
     }
  $scope.doLogin = function(credentials) {
    if(!credentials.serverHost){
      $ionicPopup.alert({title: 'Login Failed',
        template:'Please Enter the Server Host'
    });
    }else if(!credentials.email){
      $ionicPopup.alert({title: 'Login Failed',template: 'Please Enter Valid Email ID'});
    }
    else if(!credentials.serverpassword){
      $ionicPopup.alert({title: 'Login Failed',template: 'Please Enter the Server Password'});

      }
      else{
         if(credentials.serverHost.indexOf("https://") == 0 || credentials.serverHost.indexOf("Https://") == 0){
          //console.log(credentials.serverHost);
          credentials.serverHost =credentials.serverHost;
         }
         else if(credentials.serverHost.indexOf("http://") == 0 ||  credentials.serverHost.indexOf("Http://") == 0 ){
          credentials.serverHost =credentials.serverHost;
         }
         else {
          credentials.serverHost ="https://"+credentials.serverHost;

         }
          $localStorage.set('apiUrl',credentials.serverHost);       
          $preLoader.show();      
       $http({
          url: credentials.serverHost+"/api/login",
          method: "POST",
          data: { "email": credentials.email, "password" : credentials.serverpassword }
      }).then(function successCallback(response) {
            // console.log(response.data);
             if(response.data.status =="success"){
              $preLoader.hide();
              $localStorage.set('login','success');
                $localStorage.set('authToken',response.data.userDetails['authToken']);
                $localStorage.set('ServerRecencyData','success');
                $localStorage.set('email',response.data.userDetails['userEmailAddress']);
                 $localStorage.set('noOfDays',response.data.userDetails['noOfDays']);
                // $localStorage.set('noOfDays','2');
              $localStorage.set('serverpassword',credentials.serverpassword);
                $localStorage.set('userId',response.data.userDetails['userId']);
                $localStorage.set('userName',response.data.userDetails['userName']); 

            $cordovaToast.show('Successfully Logged in', 'long', 'bottom')
              .then(function(success) {
                // success
              }, function (error) {
                // error
              });
              $scope.viewLogin = false;
              $scope.viewAddPassword = true;
              $scope.viewConfirmPassword = false;
             $scope.viewLoginPassword =false;
             $scope.getApiCalls();
             }
             else{
           //   console.log(response.data);
              $preLoader.hide();
              $ionicPopup.alert({title:'Login Failed!',template:response.data.message});
             }    
        
      }, function (error) {
        $preLoader.hide();
        $ionicPopup.alert({title:'Login Failed!',template:'Please Check Your Login Credentials'});
     }
    );
    }
  }
  

  
});
Response