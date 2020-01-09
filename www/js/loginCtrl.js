app = angular.module('starter.loginCtrl', ['starter.services'])

  .controller('loginCtrl', function ($scope, $ionicPopup, $state, $cordovaToast, $filter, $timeout, $localStorage, $rootScope, $todo, $window, $location, $preLoader, $http) {
    $scope.loginData = {};


    $('.authWrapper  .loginFields  .input-field input')
      .focus(function () {

        $('.authWrapper .loginFields').addClass('focused');
      })
      .blur(function () {
        $('.authWrapper .loginFields').removeClass('focused');
      });


    if ($localStorage.get('logout') == 'true' || $localStorage.get('login') == 'success' && $localStorage.get('apppassword') != null) {
      $scope.viewLogin = false;
      $scope.viewAddPassword = false;
      $scope.viewConfirmPassword = false;
      $scope.viewLoginPassword = true;
    } else {
      $scope.viewLogin = true;
      $scope.viewAddPassword = false;
      $scope.viewConfirmPassword = false;
      $scope.viewLoginPassword = false;
    }

    $scope.doRefresh = function () {
      $preLoader.show();
      $window.location.reload(true);
    }

    $scope.doPasswordLogin = function (password) {

      if (password != $localStorage.get('apppassword')) {
        $ionicPopup.alert({
          title: 'Password Failed',
          template: "Invalid App Password."
        });

      } else {
        $location.path('/app/addRecency');
      }
    }

    $scope.password = {};
    $scope.createpassword = {};
    $scope.confirmpassword = {};
    $scope.initAppLogin = function () {
      $scope.passcode = "";
      $scope.disablebtn = true;
    }
    $scope.initCreateApp = function () {
      $scope.createpasscode = "";
    }
    $scope.initConfirmApp = function () {
      $scope.confirmpasscode = "";
    }
    $scope.createApp = function (value) {
      if ($scope.createpasscode.length < 4) {
        $scope.createpasscode = $scope.createpasscode + value;
        if ($scope.createpasscode.length == 1) {
          $scope.createpassword.one = value;
        } else if ($scope.createpasscode.length == 2) {
          $scope.createpassword.two = value;
        } else if ($scope.createpasscode.length == 3) {
          $scope.createpassword.three = value;
        } else {
          $scope.createpassword.four = value;
          $timeout(function () {
            $scope.viewAddPassword = false;
            $scope.viewConfirmPassword = true;
            $preLoader.hide();
          }, 500);

        }
      }
    }
    $scope.ConfirmApp = function (value) {
      if ($scope.confirmpasscode.length < 4) {
        $scope.confirmpasscode = $scope.confirmpasscode + value;
        if ($scope.confirmpasscode.length == 1) {
          $scope.confirmpassword.one = value;
        } else if ($scope.confirmpasscode.length == 2) {
          $scope.confirmpassword.two = value;
        } else if ($scope.confirmpasscode.length == 3) {
          $scope.confirmpassword.three = value;
        } else {
          $scope.confirmpassword.four = value;
          if ($scope.confirmpasscode != $scope.createpasscode) {
            $(".view-passcode-col").addClass('error')
            $(".view-passcode-col").removeClass('valid');
            $scope.confirmpassword.one = "";
            $scope.confirmpassword.two = "";
            $scope.confirmpassword.three = "";
            $scope.confirmpassword.four = "";
            $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 4);
            $ionicPopup.alert({
              title: 'Login Failed!',
              template: 'Wrong App Password'
            });
          } else {
            $(".view-passcode-col").addClass('valid')
            $(".view-passcode-col").removeClass('error')
            $localStorage.set('apppassword', $scope.confirmpasscode);

            $preLoader.show();
            // Hide Toast During Debugging 
            // $cordovaToast
            //   .show('App Password Created Successfully', 'long', 'center')
            //   .then(function (success) {
            //     // success
            //   }, function (error) {
            //     // error
            //   });
            $timeout(function () {
              $location.path('/app/addRecency');
              $preLoader.hide();
            }, 500);
          }

        }
      }
    }
    $scope.deleteCreate = function () {
      if ($scope.createpasscode.length == 4) {
        $scope.createpassword.four = "";
        $scope.createpasscode = $scope.createpasscode.substring(0, $scope.createpasscode.length - 1);
      } else if ($scope.createpasscode.length == 3) {
        $scope.createpassword.three = "";
        $scope.createpasscode = $scope.createpasscode.substring(0, $scope.createpasscode.length - 1);
      } else if ($scope.createpasscode.length == 2) {
        $scope.createpassword.two = "";
        $scope.createpasscode = $scope.createpasscode.substring(0, $scope.createpasscode.length - 1);
      } else {
        $scope.createpassword.one = "";
        $scope.createpasscode = $scope.createpasscode.substring(0, $scope.createpasscode.length - 1);
      }
    }
    $scope.backToCreate = function () {
      $scope.viewAddPassword = true;
      $scope.viewConfirmPassword = false;
      $scope.confirmpassword.four = "";
      $scope.confirmpassword.three = "";
      $scope.confirmpassword.two = "";
      $scope.confirmpassword.one = "";
    }
    $scope.deleteConfirm = function () {
      if ($scope.confirmpasscode.length == 4) {
        $scope.confirmpassword.four = "";
        $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 1);
      } else if ($scope.confirmpasscode.length == 3) {
        $scope.confirmpassword.three = "";
        $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 1);
      } else if ($scope.confirmpasscode.length == 2) {
        $scope.confirmpassword.two = "";
        $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 1);
      } else {
        $scope.confirmpassword.one = "";
        $scope.confirmpasscode = $scope.confirmpasscode.substring(0, $scope.confirmpasscode.length - 1);
      }

    }


    $scope.add = function (value) {
      if ($scope.passcode.length < 4) {
        $scope.passcode = $scope.passcode + value;
        if ($scope.passcode.length == 1) {
          $scope.password.one = value;
        } else if ($scope.passcode.length == 2) {
          $scope.password.two = value;
        } else if ($scope.passcode.length == 3) {
          $scope.password.three = value;
        } else {}
        if ($scope.passcode.length == 4) {
          $scope.password.four = value;
          $scope.disablebtn = false;
          if ($scope.passcode != $localStorage.get('apppassword')) {

            $scope.disablebtn = true;
            $(".passcode-col").addClass('error')
            $(".passcode-col").removeClass('valid');
            $scope.password.one = "";
            $scope.password.two = "";
            $scope.password.three = "";
            $scope.password.four = "";
            $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 4);
            $ionicPopup.alert({
              title: 'Login Failed!',
              template: 'Wrong App Password'
            });

          } else {
            $(".passcode-col").addClass('valid')
            $(".passcode-col").removeClass('error');
            var noOfDays = localStorage.getItem('noOfDays');
            var QcStartDate = localStorage.getItem('QcStartDate');
            var QcAlertDate = localStorage.getItem('QcAlertDate');
            var LastQCDate = localStorage.getItem('LastQcDate');
            if (LastQCDate == null) {
              LastQCDate = '';
            } else {
              LastQCDate = new Date(LastQCDate);
              LastQCDate = $filter('date')(LastQCDate, "dd-MMM-yyyy")
            }
            var QCDatas = localStorage.getItem('QCData');

            if (QCDatas == null || noOfDays == null || noOfDays == '' || noOfDays == 'null' || noOfDays == 0) {

            } else {
              if (QcStartDate != null && QcAlertDate != null) {
                var QcStartDate = new Date(QcStartDate);
                var QcAlertDate = new Date(QcAlertDate);
                if ((Date.parse(QcStartDate) >= Date.parse(QcAlertDate))) {
                  var currentDate = new Date();
                  currentDate = $filter('date')(currentDate, "dd-MMM-yyyy");
                  if (currentDate == localStorage.getItem('TodayAlertDate')) {} else {
                    var today = new Date();
                    today = $filter('date')(today, "dd-MMM-yyyy");
                    localStorage.setItem('TodayAlertDate', today);
                    $ionicPopup.alert({
                      title: 'Alert!',
                      template: 'Last QC done was on ' + lastTestDate + ' by Tester ' + testerName + '. Please perform QC test as recommended in SOP'
                    });
                  }
                }
              }
            }


            if (QcStartDate != null && QcAlertDate != null && QCDatas != null && (noOfDays != null && noOfDays != 0)) {
              var QcStartDate = new Date(QcStartDate);
              var QcAlertDate = new Date(QcAlertDate);
              if ((Date.parse(QcStartDate) >= Date.parse(QcAlertDate))) {
                var currentDate = new Date();
                currentDate = $filter('date')(currentDate, "dd-MMM-yyyy");
                if (currentDate == localStorage.getItem('TodayAlertDate')) {} else {
                  var today = new Date();
                  today = $filter('date')(today, "dd-MMM-yyyy");
                  localStorage.setItem('TodayAlertDate', today);
                  $ionicPopup.alert({
                    title: 'Alert!',
                    template: 'Last QC done was on ' + lastTestDate + ' by Tester ' + testerName + '. Please perform QC test as recommended in SOP'
                  });
                }
              }
              $location.path('/app/addRecency');

            } else {
              $preLoader.show();
              $timeout(function () {

                $location.path('/app/addRecency');
                $preLoader.hide();
              }, 500);
            }

          }
        } else {
          $scope.disablebtn = true;
        }
      }
    }

    $scope.delete = function () {
      if ($scope.passcode.length == 4) {
        $scope.password.four = "";
        $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
      } else if ($scope.passcode.length == 3) {
        $scope.password.three = "";
        $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
      } else if ($scope.passcode.length == 2) {
        $scope.password.two = "";
        $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
      } else {
        $scope.password.one = "";
        $scope.passcode = $scope.passcode.substring(0, $scope.passcode.length - 1);
      }
    }
    $scope.getApiCalls = function () {
      $scope.userId = JSON.parse(localStorage.getItem('userId'));

      if ($localStorage.get('apiUrl') != null) {
        $http.get($localStorage.get('apiUrl') + '/api/facility?userId=' + $scope.userId)
          .success(function (data) {
            $scope.facilityData = data.facility;

            localStorage.setItem('FacilityData', JSON.stringify($scope.facilityData))

            $scope.facilityTestData = data.facilityTest;

            localStorage.setItem('TestingFacilityData', JSON.stringify($scope.facilityTestData))

            $scope.facilityTestTypeData = data.testingFacilityType;
            var testtypelen = $scope.facilityTestTypeData.length - 1;
            var facilitytesttypelen = $scope.facilityTestTypeData[testtypelen];
            var facilitytesttypeid = (parseInt(facilitytesttypelen['testing_facility_type_id']) + 1).toString();
            $scope.facilityTestTypeData.push({
              "testing_facility_type_id": facilitytesttypeid,
              "testing_facility_type_name": "Other"
            })

            localStorage.setItem('TestingFacilityTypeData', JSON.stringify($scope.facilityTestTypeData));
          });
          $http.get($localStorage.get('apiUrl') + '/api/sample')
          .success(function (resp) {
            $scope.sampleInfo = [];
            if(resp.status=='success'){
              var serverSampleInfo = resp.data;
              for(i=0;i<serverSampleInfo.length;i++){
          
                $scope.sampleInfo.push({
                  "index":i,
                  "qcSampleId":serverSampleInfo[i].qcSampleId,
                  "qcSampleNo": serverSampleInfo[i].qcSampleNo,
                  "qcSampleStatus":serverSampleInfo[i].qcSampleStatus,
                  "available": 'yes',                  
                  "isLocal":false
                })
              }
              if(localStorage.getItem('SampleIdInfo')){ 
                var sampleinfo =  JSON.parse(localStorage.getItem('SampleIdInfo'))
                for (i = 0; i < sampleinfo.length; i++) {
                  if(sampleinfo[i].isLocal==true){
                   $scope.sampleInfo.push({
                    "index":$scope.sampleInfo.length,
                    "qcSampleId":sampleinfo[i].qcSampleId,
                    "qcSampleNo": sampleinfo[i].qcSampleNo,
                    "qcSampleStatus":sampleinfo[i].qcSampleStatus,
                    "available": sampleinfo[i].available,                  
                    "isLocal":sampleinfo[i].isLocal
                    })
                  }
               }
              // console.log($scope.sampleInfo);
               }
               localStorage.setItem('SampleIdInfo', JSON.stringify($scope.sampleInfo));
               localStorage.setItem('Samplecounter', $scope.sampleInfo.length);
            }
          })
          // Get Recency Sample ID 
          $http.get($localStorage.get('apiUrl') + '/api/recency-sampleid')
          .success(function (data) {
            if (data.status == "success") {
              $scope.recencySampleData = data['sample-data'];
              localStorage.setItem('RecencySampleData', JSON.stringify(data['sample-data']))
            } else {
              localStorage.setItem('RecencySampleData', '')
            }
          });
          // End Recency sample ID
        $http.get($localStorage.get('apiUrl') + '/api/test-kit-info')
        .success(function (resp) {
        //  console.log(resp)
          $scope.testerLotInfo = [];
          
          if(resp.status=='success'){
            var serverLotInfo = resp.data;
            for(i=0;i<serverLotInfo.length;i++){
              var testKitLotNo = serverLotInfo[i].reference_result + ' - ' + serverLotInfo[i].kit_lot_no;
              var manufacturerName;
            if(serverLotInfo[i].reference_result=='SED'){
              manufacturerName = "SEDIA Bioscience (SED)";
            }
            else if (serverLotInfo[i].reference_result == 'MAX'){
              manufacturerName = "Maxim Biomedical (MAX)";
            }
              $scope.testerLotInfo.push({
                "testKitManufacturer":serverLotInfo[i].reference_result,
                "testKitManufacturerName": manufacturerName,
                "LotNumber":serverLotInfo[i].kit_lot_no,
                "testKitLotNo":testKitLotNo,
                "testKitExpDate":serverLotInfo[i].kit_expiry_date,
                "available": 'yes',
                "isLocal":false
              })
            }
            if(localStorage.getItem('LotInfo')){ 
             var lotinfo =  JSON.parse(localStorage.getItem('LotInfo'))
             for (i = 0; i < lotinfo.length; i++) {
               if(lotinfo[i].isLocal==true){
                $scope.testerLotInfo.push(lotinfo[i])
               }
            }
          //  console.log($scope.testerLotInfo);
            }
           localStorage.setItem('LotInfo', JSON.stringify($scope.testerLotInfo));
           localStorage.setItem('Lotcounter', $scope.testerLotInfo.length);
          }
        })
        $http.get($localStorage.get('apiUrl') + '/api/global-config')
          .success(function (data) {

            $scope.configdata = data.config;
            $scope.announcement = "";
            for (i = 0; i < $scope.configdata.length; i++) {
              if ($scope.configdata[i].global_name == "admin_message") {
                $scope.announcement = data.config[i].global_value;
              }
            }
            for (i = 0; i < $scope.configdata.length; i++) {
              if ($scope.configdata[i].global_name == "mandatory_fields" || $scope.configdata[i].global_name == "admin_email" || $scope.configdata[i].global_name == "admin_phone" || $scope.configdata[i].global_name == "display_fields" || $scope.configdata[i].global_name == "admin_message") {
                $scope.configdata.splice(i);
              }
            }
            localStorage.setItem('GlobalConfig', JSON.stringify($scope.configdata))
            localStorage.setItem('Announcement', JSON.stringify($scope.announcement))

          });
        $http.get($localStorage.get('apiUrl') + '/api/recency-mandatory')
          .success(function (data) {
            $scope.mandatoryData = data.fields;

            localStorage.setItem('MandatoryData', JSON.stringify($scope.mandatoryData))

          });
        $http.get($localStorage.get('apiUrl') + '/api/recency-hide')
          .success(function (data) {
            $scope.optionalData = data.fields[0];
            $scope.optionalArr = [];
            $scope.optionalArr.location = [];
            angular.forEach($scope.optionalData, function (value, key) {
              $scope.optionalArr[key] = value;
            });
            if ($scope.optionalArr.location_one == false) {
              $scope.optionalArr.location[0] = false;
            } else {
              $scope.optionalArr.location[0] = true;
            }
            if ($scope.optionalArr.location_two == false) {
              $scope.optionalArr.location[1] = false;
            } else {
              $scope.optionalArr.location[1] = true;
            }
            if ($scope.optionalArr.location_three == false) {
              $scope.optionalArr.location[2] = false;
            } else {
              $scope.optionalArr.location[2] = true;
            }


            var hideFields = Object.assign({}, $scope.optionalArr);

            localStorage.setItem('OptionalData', JSON.stringify(hideFields))

          });
        $http.get($localStorage.get('apiUrl') + '/api/technical-support')
          .success(function (data) {
            if (data.status == "success") {
              $scope.techSupportData = data.result;
              localStorage.setItem('TechSupportData', JSON.stringify(data.result))
            } else {
              localStorage.setItem('TechSupportData', '')
            }
          });
        $http.get($localStorage.get('apiUrl') + '/api/province')
          .success(function (data) {
            if (data.status == "success") {
              $scope.provinceData = data.province;
              localStorage.setItem('ProvinceData', JSON.stringify(data.province))
            } else {
              localStorage.setItem('ProvinceData', '')
            }
          });
        $http.get($localStorage.get('apiUrl') + '/api/district')
          .success(function (data) {
            if (data.status == "success") {
              $scope.districtData = data.district;
              localStorage.setItem('DistrictData', JSON.stringify($scope.districtData))
            } else {
              localStorage.setItem('DistrictData', '')
            }

          });
        $http.get($localStorage.get('apiUrl') + '/api/city')
          .success(function (data) {
            if (data.status == "success") {
              $scope.cityData = data.city;
              localStorage.setItem('CityData', JSON.stringify($scope.cityData))
            } else {
              localStorage.setItem('CityData', '')
            }
          });

        $scope.mandatoryData = JSON.parse(localStorage.getItem('MandatoryData'));
        $scope.configdata = JSON.parse(localStorage.getItem('GlobalConfig'));
        $scope.provinceData = JSON.parse(localStorage.getItem('ProvinceData'));

        $http.get($localStorage.get('apiUrl') + '/api/risk-populations')
          .success(function (data) {
            $scope.riskpopulations = data;
            var lastelement = $scope.riskpopulations.length - 1;
            $scope.lastindex = (parseInt($scope.riskpopulations[lastelement]['rp_id']) + 1).toString();

            $scope.riskpopulations.push({
              "rp_id": $scope.lastindex,
              "name": "Other"
            })

            localStorage.setItem('RiskPopulations', JSON.stringify($scope.riskpopulations))
          });
      }
    }
    $scope.doLogin = function (credentials) {
      if (!credentials.serverHost) {
        $ionicPopup.alert({
          title: 'Login Failed',
          template: 'Please Enter the Server Host'
        });
      } else if (!credentials.email) {
        $ionicPopup.alert({
          title: 'Login Failed',
          template: 'Please Enter Valid Email ID'
        });
      } else if (!credentials.serverpassword) {
        $ionicPopup.alert({
          title: 'Login Failed',
          template: 'Please Enter the Server Password'
        });

      } else {
        if (credentials.serverHost.indexOf("https://") == 0 || credentials.serverHost.indexOf("Https://") == 0) {

          credentials.serverHost = credentials.serverHost;
        } else if (credentials.serverHost.indexOf("http://") == 0 || credentials.serverHost.indexOf("Http://") == 0) {
          credentials.serverHost = credentials.serverHost;
        } else {
          credentials.serverHost = "https://" + credentials.serverHost;

        }
        $localStorage.set('apiUrl', credentials.serverHost);
        $preLoader.show();
        $http({
          url: credentials.serverHost + "/api/login",
          method: "POST",
          data: {
            "email": credentials.email,
            "password": credentials.serverpassword
          }
        }).then(function successCallback(response) {

          if (response.data.status == "success") {
            $preLoader.hide();
            $localStorage.set('login', 'success');
            $localStorage.set('authToken', response.data.userDetails['authToken']);
            $localStorage.set('ServerRecencyData', 'success');
            $localStorage.set('email', response.data.userDetails['userEmailAddress']);
            $localStorage.set('noOfDays', response.data.userDetails['noOfDays']);

            $localStorage.set('serverpassword', credentials.serverpassword);
            $localStorage.set('userId', response.data.userDetails['userId']);
            $localStorage.set('userName', response.data.userDetails['userName']);
          //  $localStorage.set('secretKey', 'secretkeyissecretphrasesecretphr');
          if(response.data.userDetails['secretKey']){
            $localStorage.set('secretKey', response.data.userDetails['secretKey']);
          }
         else{
          $localStorage.set('secretKey','');

         } 
            // Hide Debugging  
            // $cordovaToast
            // .show('Successfully Logged In', 'long', 'bottom')
            // .then(function (success) {
            //   // success
            // }, function (error) {
            //   // error
            // });
            $scope.viewLogin = false;
            $scope.viewAddPassword = true;
            $scope.viewConfirmPassword = false;
            $scope.viewLoginPassword = false;
            $scope.getApiCalls();
          } else {

            $preLoader.hide();
            $ionicPopup.alert({
              title: 'Login Failed!',
              template: response.data.message
            });
          }

        }, function (error) {
          $preLoader.hide();
          $ionicPopup.alert({
            title: 'Login Failed!',
            template: 'Please Check Your Login Credentials'
          });
        });
      }
    }
  });

