app = angular.module('starter.editRecencyCtrl', ['starter.services'])
  .controller('editRecencyCtrl', function ($scope, $http, $rootScope, $stateParams, ionicDatePicker, $cordovaToast, $location, $ionicPopup, $preLoader, $localStorage, $cordovaGeolocation, $window, $filter, $cordovaNetwork) {
    $scope.recency = {};
    $scope.recencyData = {};
    $scope.recencydisplay = true;
    $scope.displaybadge = false;
    $scope.showotherdistrict = false;
    $scope.showothercity = false;
    $scope.regex = '^[0-9]*$';

    $scope.recency.invalidControlLine = "";
    $scope.recency.invalidControlLineName = "";
    $scope.recency.invalidPositiveLine = "";
    $scope.recency.invalidPositiveLineName = ""
    $scope.recency.invalidLongTermLine = "";
    $scope.recency.invalidLongTermLineName = "";
    $scope.recency.invalidRecencyOutcome = "";
    $scope.recency.invalidRecencyOutcomeDisplay = "";
    
    $scope.provinceData = JSON.parse(localStorage.getItem('ProvinceData'));
    $scope.recencyDetails = JSON.parse(localStorage.getItem('viewRecency'));
    $scope.configdata = JSON.parse(localStorage.getItem('GlobalConfig'));
    $scope.announcement = JSON.parse(localStorage.getItem('Announcement'));
    $scope.mandatoryData = JSON.parse(localStorage.getItem('MandatoryData'));
    $scope.facilityData = JSON.parse(localStorage.getItem('FacilityData'));
    $scope.facilityTestData = JSON.parse(localStorage.getItem('TestingFacilityData'));
    $scope.riskpopulations = JSON.parse(localStorage.getItem('RiskPopulations'));
    $scope.optionalFieldsFlag = JSON.parse(localStorage.getItem('OptionalData'));

    $scope.recency = $scope.recencyDetails;
    $scope.TestKitLotList = [];
    $scope.testkitlotObj = JSON.parse(localStorage.getItem('LotInfo'));
    $scope.secretKey = $secretKey.getSecretKey();
    if ($scope.testkitlotObj != null) {
      var TestKitLotListLen = Object.keys($scope.testkitlotObj).length;
      for (i = 0; i < TestKitLotListLen; i++) {
        if ($scope.testkitlotObj[i].available == 'yes') {
          $scope.TestKitLotList.push({
            "testKitManufacturer": $scope.testkitlotObj[i].testKitManufacturer,
            "testKitManufacturerName": $scope.testkitlotObj[i].testKitManufacturerName,
            "LotNumber": $scope.testkitlotObj[i].LotNumber,
            "testKitLotNo": $scope.testkitlotObj[i].testKitLotNo,
            "testKitExpDate": $scope.testkitlotObj[i].testKitExpDate,
            "label": $scope.testkitlotObj[i].label,
            "available": $scope.testkitlotObj[i].available,
            "isLocal": $scope.testkitlotObj[i].isLocal
          })
        } 
      }
    }

 
    $scope.TesterNameList = [];
    $scope.testerNameObj = JSON.parse(localStorage.getItem('TesterInfo'));
    if ($scope.testerNameObj != null) {
      var TesterNameListLen = Object.keys($scope.testerNameObj).length;
      for (i = 0; i < TesterNameListLen; i++) {
        if ($scope.testerNameObj[i].available == 'yes') {
          $scope.TesterNameList.push({
            "testerName": $scope.testerNameObj[i].testerName,
            "label": $scope.testerNameObj[i].label,
            "available": $scope.testerNameObj[i].available,
          })
        }
      }
    }


    $scope.recency.location[0] = $scope.recency.location_one;
    $scope.recency.location[1] = $scope.recency.location_two;
    $scope.recency.location[2] = $scope.recency.location_three;
    var localDistrictjson = localStorage.getItem('DistrictData');
    if ($scope.recency.location_one && (localDistrictjson != "" && localDistrictjson != null)) {
      var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
      var districtresult = localDistrict.filter(obj => {
        return obj.province_id === $scope.recency.location_one
      })
      $scope.districtData = districtresult;
      $scope.recency.location[1] = $scope.recency.location_two;
      if ($scope.recency.location[0] != "" || $scope.recency.location[0] != null) {
        if (districtresult.length == 0) {
          $scope.districtData.push({
            "district_id": districtresult.length.toString(),
            "district_name": "Other"
          })
        } else {
          var len = $scope.districtData.length - 1;
          var districtlen = $scope.districtData[len];
          var districtid = (parseInt(districtlen['district_id']) + 1).toString();
          $scope.districtData.push({
            "district_id": districtid,
            "district_name": "Other"
          })
        }
      }
    } else {
      $scope.districtData = [];
      $scope.cityData = [];

    }
    var localCityjson = localStorage.getItem('CityData');
    if ($scope.recency.location_two && (localCityjson != "" && localCityjson != null)) {
      var localCity = JSON.parse(localStorage.getItem('CityData'));

      var cityresult = localCity.filter(obj => {
        return obj.district_id === $scope.recency.location_two
      })
      $scope.cityData = cityresult;
      if ($scope.recency.location[1] != "" || $scope.recency.location[1] != null) {
        if (cityresult.length == 0) {
          $scope.cityData.push({
            "city_id": cityresult.length.toString(),
            "city_name": "Other"
          })
        } else {
          var len = $scope.cityData.length - 1;
          var citylen = $scope.cityData[len];
          var cityid = (parseInt(citylen['city_id']) + 1).toString();
          $scope.cityData.push({
            "city_id": cityid,
            "city_name": "Other"
          })
        }
      }
    } else {
      $scope.cityData = [];

    }
    if (($scope.recency.location[0] != '' && $scope.recency.location[0] != null) &&
      ($scope.recency.location[1] != '' && $scope.recency.location[1] != null && $scope.recency.location[1] != 'null') &&
      ($scope.recency.location[2] != '' && $scope.recency.location[2] != null && $scope.recency.location[2] != 'null')) {
      var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
      var fac_result = localfacility.filter(obj => {
        return obj.city === $scope.recency.location[2]
      })
      $scope.facilityData = fac_result;

    } else if (($scope.recency.location[0] != '' && $scope.recency.location[0] != null) && ($scope.recency.location[1] != '' && $scope.recency.location[1] != null && $scope.recency.location[1] != 'null')) {
      var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
      var fac_result = localfacility.filter(obj => {
        return obj.district === $scope.recency.location[1]
      })
      $scope.facilityData = fac_result;
    } else if ($scope.recency.location[0] != '' && $scope.recency.location[0] != null) {
      var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
      var fac_result = localfacility.filter(obj => {
        return obj.province === $scope.recency.location[0]
      })
      $scope.facilityData = fac_result;
    }
    
    if ($scope.recency.vlLoadResult == null) {
      $scope.recency.vlLoadResult = "";
    } else if ($scope.recency.vlLoadResult == $scope.recency.vlLoadResultDropdown) {
      $scope.recency.vlLoadResult = "";
    }
    if ($scope.recency.testingModalityName == "Other" && ($scope.recency.othertestingmodality != undefined && $scope.recency.othertestingmodality != "")) {
      $scope.showothertestmodality = true;
      $scope.recency.testingModalityName = "Other"
    }
    if ($scope.recency.districtname == "Other" && $scope.recency.location[1] != "" && ($scope.recency.otherDistrict != undefined && $scope.recency.otherDistrict != "")) {
      $scope.showotherdistrict = true;
      $scope.recency.location_two_name = $scope.recency.districtname;
    }
    if ($scope.recency.cityname == "Other" && $scope.recency.location[2] != "" && ($scope.recency.otherCity != undefined && $scope.recency.otherCity != "")) {
      $scope.showothercity = true;
      $scope.recency.location_three_name = $scope.recency.cityname;
    }
    if ($scope.recency.riskPopulationName == "Other" && ($scope.recency.otherriskPopulation != undefined && $scope.recency.otherriskPopulation != "")) {
      $scope.otherpopulation = true;
      $scope.recency.riskPopulationName = "Other"
    }
    console.log($scope.recency.showTermOutcome);
    console.log($scope.recency.recencyOutcome);
    //Term Outcome
    if ($scope.recency.recencyOutcome == 'Invalid') {
      $scope.recency.showTermOutcome = true;
      $scope.recency.recencyOutcomeDisplay = "-Please Verify";
      $scope.setoutcomecolor = 'red';
    } else if ($scope.recency.recencyOutcome == 'Assay Negative') {
      $scope.recency.showTermOutcome = true;
      $scope.recency.recencyOutcomeDisplay = "";
      $scope.setoutcomecolor = 'blue';
    }
    else if ($scope.recency.recencyOutcome == "Assay Recent" && ($scope.recency.vlLoadResult == "" || $scope.recency.vlLoadResult == null) && ($scope.recency.vlLoadResultDropdown == "" || $scope.recency.vlLoadResultDropdown == null)) {
      $scope.recency.recencyOutcomeDisplay = "- Please ensure you add Viral Load Result";
      $scope.setoutcomecolor = 'black';
      $scope.recency.showTermOutcome = true;
    }
    else if ($scope.recency.recencyOutcome == "Assay Recent" || $scope.recency.recencyOutcome == 'Assay Long Term') {
    console.log($scope.recency.showTermOutcome);

      $scope.recency.showTermOutcome = true;
      $scope.recency.recencyOutcomeDisplay = "";
      $scope.setoutcomecolor = 'black';
    }
  
    else {
      $scope.recency.showTermOutcome = false;
      $scope.recency.recencyOutcomeDisplay = "";
    console.log($scope.recency.showTermOutcome);

    }
  
       //New Term Outcome
       if ($scope.recency.newRecencyOutcome == 'Invalid') {
        $scope.recency.showNewTermOutcome = true;
        $scope.recency.newRecencyOutcomeDisplay = "-Please Verify";
        $scope.newsetoutcomecolor = 'red';
      } else if ($scope.recency.newRecencyOutcome == 'Assay Negative') {
        $scope.recency.showNewTermOutcome = true;
        $scope.recency.newRecencyOutcomeDisplay = "";
        $scope.newsetoutcomecolor = 'blue';
      } 
      else  if ($scope.recency.newRecencyOutcome == "Assay Recent" && ($scope.recency.vlLoadResult == "" || $scope.recency.vlLoadResult == null) && ($scope.recency.vlLoadResultDropdown == "" || $scope.recency.vlLoadResultDropdown == null)) {
        $scope.recency.newRecencyOutcomeDisplay = "- Please ensure you add Viral Load Result";
        $scope.setoutcomecolor = 'black';
        $scope.recency.showNewTermOutcome = true;
      }
      else if ($scope.recency.newRecencyOutcome == 'Assay Recent' || $scope.recency.newRecencyOutcome == 'Assay Long Term') {
        $scope.recency.showNewTermOutcome = true;
        $scope.recency.newRecencyOutcomeDisplay = "";
        $scope.newsetoutcomecolor = 'black';
      }
   
     
     else {
        $scope.recency.showNewTermOutcome = false;
        $scope.recency.newRecencyOutcomeDisplay = "";
      }

  


    //Final Outcome
    if ($scope.recency.finalOutcome == 'Inconclusive' || $scope.recency.finalOutcome == 'RITA Recent') {
      $scope.recency.showFinalOutcome = true;
      $scope.setfinalcolor = 'blue';
    } else if ($scope.recency.finalOutcome == 'Assay Negative') {
      $scope.recency.showFinalOutcome = true;
      $scope.setfinalcolor = 'black';
    } else if ($scope.recency.finalOutcome == 'Long Term' || $scope.recency.finalOutcome == 'RITA Long Term') {
      $scope.recency.showFinalOutcome = true;
      $scope.setfinalcolor = 'black';
    } else {
      $scope.recency.showFinalOutcome = false;
    }

    $scope.index = $scope.recency.index;
    $(document).ready(function () {
      $scope.recencydisplay = true;
      $("#main-recency").addClass("active");

    });
    $scope.doRefresh = function () {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
    }
    $scope.testerNameAutoComplete = function () {
      $scope.testerNameObj = JSON.parse(localStorage.getItem('testerName'));
      $("#testerName").autocomplete({
        source: $scope.testerNameObj,
      })
    }
    $scope.GetDistrictValue = function (province) {
      if ((localStorage.getItem('DistrictData')) != "") {
        if (province != null && province != "") {
          var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
          var districtresult = localDistrict.filter(obj => {
            return obj.province_id === province
          })
          $scope.districtData = districtresult;
          if (districtresult.length == 0) {
            $scope.districtData.push({
              "district_id": districtresult.length.toString(),
              "district_name": "Other"
            })
          } else {
            var len = $scope.districtData.length - 1;
            var districtlen = $scope.districtData[len];
            var districtid = (parseInt(districtlen['district_id']) + 1).toString();
            $scope.districtData.push({
              "district_id": districtid,
              "district_name": "Other"
            })
          }
        }
      }
      if (province != null && province != "") {
        var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
        var fac_result = localfacility.filter(obj => {
          return obj.province === province
        })
        $scope.facilityData = fac_result;
        $scope.recency.facilityId = "";
      } else {
        $scope.facilityData = JSON.parse(localStorage.getItem('FacilityData'));
        $scope.recency.facilityId = "";
      }
      $scope.recency.location[1] = "";
      $scope.recency.otherDistrict = "";
      $scope.showotherdistrict = false;
      $scope.recency.location[2] = "";
      $scope.recency.otherCity = "";
      $scope.showothercity = false;
      $scope.recency.facility_name = $("#facilityId").find("option:selected").text();
      if ($scope.recency.facility_name == '-- Select --') {
        $scope.recency.facility_name = "";
      }
    }
    $scope.GetCityValue = function (district) {
      if ((localStorage.getItem('CityData')) != '') {
        if (district != null && district != "") {
          var localCity = JSON.parse(localStorage.getItem('CityData'));
          var cityresult = localCity.filter(obj => {
            return obj.district_id === district
          })
          $scope.cityData = cityresult;
          if (cityresult.length == 0) {
            $scope.cityData.push({
              "city_id": cityresult.length.toString(),
              "city_name": "Other"
            })
          } else {
            var len = $scope.cityData.length - 1;
            var citylen = $scope.cityData[len];
            var cityid = (parseInt(citylen['city_id']) + 1).toString();
            $scope.cityData.push({
              "city_id": cityid,
              "city_name": "Other"
            })
          }
        } else {
          $scope.showotherdistrict = false;
          $scope.recency.otherDistrict = "";
        }
      }
      if (district != null && district != "") {
        var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
        var fac_result = localfacility.filter(obj => {
          return obj.district === district
        })
        $scope.facilityData = fac_result;
        $scope.recency.facilityId = "";
      } else {
        var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
        var fac_result = localfacility.filter(obj => {
          return obj.province === $scope.recency.location[0]
        })
        $scope.facilityData = fac_result;
        $scope.recency.facilityId = "";
      }
      $scope.recency.location[2] = "";
      $scope.recency.otherCity = "";
      $scope.showothercity = false;
      $scope.recency.facility_name = $("#facilityId").find("option:selected").text();
      if ($scope.recency.facility_name == '-- Select --') {
        $scope.recency.facility_name = "";
      }
    }

    $scope.checkVlResult = function () {
      if ($scope.recency.vlLoadResult == undefined) {
        $scope.recency.vlLoadResult = '';
        $("#vlLoadResult").val("");
      }
    }
    $scope.setmainactive = function () {
      $scope.recencydisplay = true;
      if ($("#main-recency").hasClass('active')) {

      } else {
        $("#main-recency").addClass('active')
        $("#other-recency").removeClass('active')
      }

    }
    $scope.setothersactive = function () {
      $scope.recencydisplay = false;
      if ($("#other-recency").hasClass('active')) {

      } else {
        $("#other-recency").addClass('active')
        $("#main-recency").removeClass('active')
      }
    }

    function ononline() {

      var isOnline = $cordovaNetwork.isOnline();
      $localStorage.set('online', isOnline);
      $localStorage.set('offline', 'false');

    }

    function onoffline() {
      var isOnline = $cordovaNetwork.isOnline();
      $localStorage.set('online', isOnline);
      $localStorage.set('offline', 'true');
      $scope.riskpopulations = JSON.parse(localStorage.getItem('RiskPopulations'));
      $scope.configdata = JSON.parse(localStorage.getItem('GlobalConfig'));
      var localarr = [];
      var localfacility = [];
      var localtestfacility = [];
      $scope.freq_facilities = [];
      $scope.freq_testfacilities = [];
      $scope.allfacilities = new Array();
      $scope.facilityData = new Array();
      $scope.facilityTestData = new Array();
      localarr = JSON.parse(localStorage.getItem('RecencyData'));
      localfacility = JSON.parse(localStorage.getItem('FacilityData'));
      localtestfacility = JSON.parse(localStorage.getItem('TestingFacilityData'));
      localprovince = JSON.parse(localStorage.getItem('ProvinceData'));
      if (localarr != null) {
        var localarrsize = Object.keys(localarr).length;
        var obj = {};
        $scope.allfacilities = localfacility;
        for (i = 0; i < localarrsize; i++) {
          $scope.freq_facilities.unshift({
            "facility_id": localarr[i]['facilityId'],
            "facility_name": localarr[i]['facility_name']
          })
        }
        for (i = 0; i < Object.keys($scope.freq_facilities).length; i++) {
          $scope.allfacilities.unshift($scope.freq_facilities[i]);
        }
        var trimmedArray = [];
        var values = [];
        var value;
        for (var i = 0; i < $scope.allfacilities.length; i++) {
          value = $scope.allfacilities[i]['facility_id'];
          if (values.indexOf(value) === -1) {
            trimmedArray.push($scope.allfacilities[i]);
            values.push(value);
          }
        }
        $scope.facilityData = trimmedArray;

        //Display Recent Testing Facilities dropdown

        $scope.alltestfacilities = localtestfacility;
        for (i = 0; i < localarrsize; i++) {
          $scope.freq_testfacilities.unshift({
            "facility_id": localarr[i]['facilityId'],
            "facility_name": localarr[i]['facility_name']
          })
        }
        for (i = 0; i < Object.keys($scope.freq_testfacilities).length; i++) {
          $scope.alltestfacilities.unshift($scope.freq_testfacilities[i]);
        }
        var trimmedArray2 = [];
        var values2 = [];
        var value2;
        for (var i = 0; i < $scope.alltestfacilities.length; i++) {
          value2 = $scope.alltestfacilities[i]['facility_id'];
          if (values2.indexOf(value2) === -1) {
            trimmedArray2.push($scope.alltestfacilities[i]);
            values2.push(value2);
          }
        }
        $scope.facilityTestData = trimmedArray2;
        //Display recent province on top of dropdown

        $scope.allprovinces = localprovince;
        for (i = 0; i < localarrsize; i++) {
          $scope.freq_provinces.unshift({
            "province_id": localarr[i]['location_one'],
            "province_name": localarr[i]['location_one_name']
          })
        }
        for (i = 0; i < Object.keys($scope.freq_provinces).length; i++) {
          $scope.allprovinces.unshift($scope.freq_provinces[i]);
        }
        var trimmedArray1 = [];
        var values1 = [];
        var value1;
        for (var i = 0; i < $scope.allprovinces.length; i++) {
          value1 = $scope.allprovinces[i]['province_id'];
          if (values1.indexOf(value1) === -1) {
            trimmedArray1.push($scope.allprovinces[i]);
            values1.push(value1);
          }
        }
        $scope.provinceData = trimmedArray1;
      } else {
        $scope.facilityData = localfacility;
        $scope.provinceData = localprovince;
      }
    }
    $scope.getTestKitExpDate = function (lotNo) {
      if (lotNo != "") {
        for (i = 0; i < $scope.TestKitLotList.length; i++) {
          if (lotNo == $scope.TestKitLotList[i].LotNumber) {
            $scope.ExpDate = $scope.TestKitLotList[i].testKitExpDate
            $scope.ManufacturerName = $scope.TestKitLotList[i].testKitManufacturerName;
          }
        }
        $scope.recency.testKitExpDate = $scope.ExpDate;
        $scope.recency.ManufacturerName = $scope.ManufacturerName;
      } else {
        $scope.recency.testKitExpDate = "";
        $scope.recency.ManufacturerName = "";
      }
    }

    $scope.getLatLong = function () {
      var options = {
        maximumAge: 20000,
        timeout: 30000,
        enableHighAccuracy: true
      };
      $cordovaGeolocation.getCurrentPosition(options).then(function (position) {
          $scope.recency.latitude = position.coords.latitude;
          $scope.recency.longitude = position.coords.longitude;
          $scope.gis = true;
          $scope.giserror = false;
        },
        function (error) {
          $scope.recency.latitude = "";
          $scope.recency.longitude = "";
          $scope.gis = false;
          $scope.giserror = true;
          $preLoader.hide();
        })
    }
    $scope.getLatLong();

    // On load, Check if the mandatory fields are filled
    $scope.onLoadMandatoryCheck = function () {

      for (i = 0; i < $scope.mandatoryData.length; i++) {
        var id = "#" + $scope.mandatoryData[i];
        var mandatoryname = $(id).attr("name");
        var mandatorytitle = $(id).attr("title");
        var mandatoryField = $scope.mandatoryData[i];

        if ($scope.mandatoryData[i] == 'sampleId' && $scope.recency.sampleId == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'patientId' && $scope.recency.patientId == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.recency.patientId == "" && $scope.recency.sampleId == "") {
          $ionicPopup.alert({
            title: 'Alert!',
            template: 'Please Choose Either Sample ID or Patient ID'
          });
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'sampleCollectionDate' && $scope.recency.sampleCollectionDate == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'sampleReceiptDate' && $scope.recency.sampleReceiptDate == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'receivedSpecimenType' && $scope.recency.receivedSpecimenType == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'facilityId' && $scope.recency.facilityId == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'location_one' && $scope.recency.location_one == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'location_two' && $scope.recency.location_two == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'location_three' && $scope.recency.location_three == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'hivDiagnosisDate' && $scope.recency.hivDiagnosisDate == "") {
          $scope.showRecencyTick = false;
          return false;
        }

        if ($scope.mandatoryData[i] == 'pastHivTesting' && $scope.recency.pastHivTesting == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.recency.pastHivTesting == 'yes' || $scope.recency.pastHivTesting == '') {
          if ($scope.mandatoryData[i] == 'testLast12Month' && $scope.recency.testLast12Month == "") {
            $scope.showRecencyTick = false;
            return false;
          }
        }
        if ($scope.mandatoryData[i] == 'pastHivTesting' && $scope.recency.pastHivTesting == 'yes' && $scope.recency.lastHivStatus == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'pastHivTesting' && $scope.recency.lastHivStatus == 'positive' && $scope.recency.patientOnArt == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'testKitLotNo' && $scope.recency.testKitLotNo == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'testKitExpDate' && $scope.recency.testKitExpDate == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'testerName' && $scope.recency.testerName == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'testingModality' && $scope.recency.testingModality == "") {
          $scope.showRecencyTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'testingModality' && $scope.recency.testingModalityName == 'Other' && $scope.recency.othertestingmodality == "") {
          $scope.showRecencyTick = false;
          return false;
        }

        if ($scope.recency.testNotPerformed == true) {
          if ($scope.recency.recencyreason == "") {
            $scope.showRecencyTick = false;
            return false;
          }
          if ($scope.recency.recencyreason == "other" && $scope.recency.otherreason == "") {
            $scope.showRecencyTick = false;
            return false;
          }
        }
        if ($scope.recency.testNotPerformed != true) {
          if ($scope.mandatoryData[i] == 'testingFacility' && $scope.recency.testingFacility == "") {
            $scope.showRecencyTick = false;
            return false;
          }
          if ($scope.mandatoryData[i] == 'hivRecencyTestDate' && $scope.recency.hivRecencyTestDate == "") {
            $scope.showRecencyTick = false;
            return false;
          }
          if ($scope.mandatoryData[i] == 'ctrlLine' && $scope.recency.ctrlLine == "") {
            $scope.showRecencyTick = false;
            return false;
          }
          if ($scope.mandatoryData[i] == 'positiveLine' && $scope.recency.positiveLine == "") {
            $scope.showRecencyTick = false;
            return false;
          }
          if ($scope.mandatoryData[i] == 'longTermLine' && $scope.recency.longTermLine == "") {
            $scope.showRecencyTick = false;
            return false;
          }

          if ($scope.mandatoryData[i] == 'vlTestDate' && $scope.recency.vlTestDate == "" && $scope.recency.recencyOutcome == "Assay Recent") {
            $scope.showRecencyTick = false;
            return false;
          }
          if ($scope.mandatoryData[i] == 'vlLoadResult' && $scope.recency.recencyOutcome == "Assay Recent" && $scope.recency.vlLoadResult == "" && $scope.recency.vlLoadResultDropdown == "") {
            $scope.showRecencyTick = false;
            return false;
          }
        }
        if ($scope.mandatoryData[i] == mandatoryname && $scope.recency[mandatoryField] == "") {
          $scope.showBehaviourTick = false;
          return false;
        }
        if ($scope.mandatoryData[i] == 'riskPopulation' && $scope.recency.riskPopulationName == 'Other' && $scope.recency.otherriskPopulation == "") {
          $scope.showBehaviourTick = false;
          return false;
        }
        if ($scope.recency.sampleId != "" || $scope.recency.patientId != "" || $scope.recency.facilityId != "" || $scope.recency.hivDiagnosisDate != "" ||
          $scope.recency.hivRecencyTestDate != "" || $scope.recency.ctrlLine != "" || $scope.recency.positiveLine != "" || $scope.recency.longTermLine != "" ||
          $scope.recency.pastHivTesting != "" || $scope.recency.lastHivStatus != "" || $scope.recency.patientOnArt != "" || $scope.recency.location_one != "" ||
          $scope.recency.location_two != "" || $scope.recency.location_three != "" || $scope.recency.testKitLotNo != "" || $scope.recency.testKitExpDate != "" || $scope.recency.testerName != "") {
          $scope.showRecencyTick = true;

        }
        if ($scope.showBehaviourTick != false) {
          $scope.showBehaviourTick = true;

        }
      }

    }
    $scope.onLoadMandatoryCheck();


    $scope.recencyNotPerformed = function (testNotPerformed) {

      if (testNotPerformed == true) {
        $scope.recency.hivRecencyTestDate = "";
        $scope.recency.ctrlLine = "";
        $scope.recency.positiveLine = "";
        $scope.recency.longTermLine = "";
        $scope.recency.recencyOutcome = "";
        $scope.recency.recencyOutcomeDisplay = "";
        $scope.recency.vlTestDate = "";
        $scope.recency.vlLoadResult = "";
        $scope.recency.vlLoadResultDropdown = "";
        $scope.recency.finalOutcome = ""; 
        $scope.recency.newControlLine = "";
        $scope.recency.newControlLineName = "";
        $scope.recency.newPositiveLine = "";
        $scope.recency.newPositiveLineName = ""
        $scope.recency.newLongTermLine = "";
        $scope.recency.newLongTermLineName = "";
        $scope.recency.newRecencyOutcome = "";
        $scope.recency.newRecencyOutcomeDisplay = "";
        $scope.recency.showTermOutcome = false;
        $scope.recency.showNewTermOutcome = false;
        
      }
    }
    //On Viral Load Change
    $scope.OnVlLoadChange = function (vlLoadResultDropdown) {

      if($scope.recency.recencyOutcome=='Invalid'){
        if (vlLoadResultDropdown == '' && ($scope.recency.newRecencyOutcome=='Assay Recent' || $scope.recency.newRecencyOutcome == 'Assay Long Term')) {
          $scope.recency.showFinalOutcome = false;
          $scope.recency.finalOutcome = "";
        }
        if (vlLoadResultDropdown == 'TND' && ($scope.recency.newRecencyOutcome == 'Assay Recent' || $scope.recency.newRecencyOutcome == 'Assay Long Term')) {
          $scope.recency.finalOutcome = "RITA Recent";
          $scope.recency.newRecencyOutcomeDisplay = "";
          $scope.recency.showFinalOutcome = true;
          $scope.setfinalcolor = 'blue';
        } else if ((vlLoadResultDropdown == '< 20' || vlLoadResultDropdown == '< 40' || vlLoadResultDropdown == 'BDL') && ($scope.recency.newRecencyOutcome == 'Assay Recent' || $scope.recency.newRecencyOutcome == 'Assay Long Term')) {
          $scope.recency.finalOutcome = "RITA Long Term";
          $scope.recency.newRecencyOutcomeDisplay = "";
          $scope.recency.showFinalOutcome = true;
          $scope.setfinalcolor = 'black';
        } else if (vlLoadResultDropdown == 'Failed' && ($scope.recency.newRecencyOutcome == 'Assay Recent' || $scope.recency.newRecencyOutcome == 'Assay Long Term')) {
          $scope.recency.finalOutcome = "Inconclusive";
          $scope.recency.newRecencyOutcomeDisplay = "";
          $scope.setfinalcolor = 'blue';
          $scope.recency.showFinalOutcome = true;
        }
        if (vlLoadResultDropdown == '' && $scope.recency.vlLoadResult == "" && $scope.recency.newRecencyOutcome == 'Assay Recent') {
          $scope.recency.newRecencyOutcomeDisplay = "- Please ensure you add Viral Load Result";
        }
      }else{

      if (vlLoadResultDropdown == "") {
        $scope.recency.showFinalOutcome = false;
        $scope.recency.finalOutcome = "";
      }
      if (vlLoadResultDropdown == 'TND' && ($scope.recency.recencyOutcome == 'Assay Recent' || $scope.recency.recencyOutcome == 'Assay Long Term')) {
        $scope.recency.finalOutcome = "RITA Recent";
        $scope.recency.recencyOutcomeDisplay = "";
        $scope.recency.showFinalOutcome = true;
        $scope.setfinalcolor = 'blue';
      } else if ((vlLoadResultDropdown == '< 20' || vlLoadResultDropdown == '< 40' || vlLoadResultDropdown == 'BDL') && ($scope.recency.recencyOutcome == 'Assay Recent' || $scope.recency.recencyOutcome == 'Assay Long Term')) {
        $scope.recency.finalOutcome = "RITA Long Term";
        $scope.recency.recencyOutcomeDisplay = "";
        $scope.recency.showFinalOutcome = true;
        $scope.setfinalcolor = 'black';
      } else if (vlLoadResultDropdown == 'Failed' && ($scope.recency.recencyOutcome == 'Assay Recent' || $scope.recency.recencyOutcome == 'Assay Long Term')) {
        $scope.recency.finalOutcome = "Inconclusive";
        $scope.recency.recencyOutcomeDisplay = "";
        $scope.setfinalcolor = 'blue';
        $scope.recency.showFinalOutcome = true;
      }
      if (vlLoadResultDropdown == '' && $scope.recency.vlLoadResult == "" && $scope.recency.recencyOutcome == 'Assay Recent') {
        $scope.recency.recencyOutcomeDisplay = "- Please ensure you add Viral Load Result";
      }
      }
    }


    // Term Outcome 
    $scope.getOutcome = function (controlLine, positiveLine, longTermLine) {
      $scope.recency.newControlLine = "";
      $scope.recency.newControlLineName = "";
      $scope.recency.newPositiveLine = "";
      $scope.recency.newPositiveLineName = ""
      $scope.recency.newLongTermLine = "";
      $scope.recency.newLongTermLineName = "";
      $scope.recency.newRecencyOutcome = "";
      $scope.recency.newRecencyOutcomeDisplay = "";
      $scope.recency.showNewTermOutcome = false;
  
      if ((controlLine == 'absent' && positiveLine == 'absent' && longTermLine == 'absent') ||
        (controlLine == 'absent' && positiveLine == 'absent' && longTermLine == 'present') ||
        (controlLine == 'absent' && positiveLine == 'present' && longTermLine == 'absent') ||
        (controlLine == 'absent' && positiveLine == 'present' && longTermLine == 'present')) {
        $scope.recency.recencyOutcome = "Invalid";
        $scope.recency.recencyOutcomeDisplay = "-Please Verify";
        $scope.recency.showTermOutcome = true;
        $scope.recency.showFinalOutcome = false;
        $scope.setoutcomecolor = 'red';
        $scope.recency.finalOutcome = "";
        $scope.recency.vlTestDate = "";
        $scope.recency.vlLoadResult = "";
        $scope.recency.vlLoadResultDropdown = "";
      }
      if ((controlLine == 'present' && positiveLine == 'absent' && longTermLine == 'present')) {
        $scope.recency.showFinalOutcome = true;
        $scope.setfinalcolor = 'blue';
        $scope.recency.recencyOutcome = "Invalid";
        $scope.recency.recencyOutcomeDisplay = "-Please Verify";
        $scope.recency.showTermOutcome = true;
        $scope.setoutcomecolor = 'red';
        $scope.recency.finalOutcome = "Inconclusive";
        $scope.recency.vlTestDate = "";
        $scope.recency.vlLoadResult = "";
        $scope.recency.vlLoadResultDropdown = "";
      }
      if (controlLine == 'present' && positiveLine == 'absent' && longTermLine == 'absent') {
        $scope.recency.recencyOutcome = "Assay Negative";
        $scope.recency.recencyOutcomeDisplay = "";
        $scope.recency.showTermOutcome = true;
        $scope.setoutcomecolor = 'blue';
        $scope.recency.finalOutcome = "Inconclusive";
        $scope.setfinalcolor = 'blue';
        $scope.recency.showFinalOutcome = true;
        $scope.recency.vlTestDate = "";
        $scope.recency.vlLoadResult = "";
        $scope.recency.vlLoadResultDropdown = "";

      }
      if (controlLine == 'present' && positiveLine == 'present' && longTermLine == 'absent') {
        $scope.recency.recencyOutcome = "Assay Recent";
        $scope.recency.showTermOutcome = true;
        $scope.setoutcomecolor = 'black';
        $scope.recency.finalOutcome = "";
        $scope.recency.showFinalOutcome = false;
        if ($scope.recency.vlLoadResult == "" && $scope.recency.vlLoadResultDropdown == "") {
          $scope.recency.recencyOutcomeDisplay = "- Please ensure you add Viral Load Result";
        } else {
          $scope.recency.recencyOutcomeDisplay = "";
        }

      }
      if (controlLine == 'present' && positiveLine == 'present' && longTermLine == 'present') {
        $scope.recency.recencyOutcome = "Assay Long Term";
        $scope.recency.recencyOutcomeDisplay = "";
        $scope.recency.showTermOutcome = true;
        $scope.setoutcomecolor = 'black';
        $scope.recency.finalOutcome = "Long Term";
        $scope.setfinalcolor = 'black';
        $scope.recency.showFinalOutcome = true;
      }
      if (controlLine == "" || positiveLine == "" || longTermLine == "") {
        $scope.recency.recencyOutcome = "";
        $scope.recency.finalOutcome = "";
        $scope.recency.recencyOutcomeDisplay = "";
        $scope.recency.vlTestDate = "";
        $scope.recency.vlLoadResult = "";
        $scope.recency.vlLoadResultDropdown = "";
        $scope.recency.showFinalOutcome = false;
        $scope.recency.showTermOutcome = false;
      }

    }

// If new Recency Test is Taken
$scope.getNewOutcome = function (controlLine, positiveLine, longTermLine) {
  if($scope.recency.recencyOutcome=='Invalid'){
    if ((controlLine == 'absent' && positiveLine == 'absent' && longTermLine == 'absent') ||
      (controlLine == 'absent' && positiveLine == 'absent' && longTermLine == 'present') ||
      (controlLine == 'absent' && positiveLine == 'present' && longTermLine == 'absent') ||
      (controlLine == 'absent' && positiveLine == 'present' && longTermLine == 'present')) {
      $scope.recency.newRecencyOutcome = "Invalid";
      $scope.recency.newRecencyOutcomeDisplay = "-Please Verify";
      $scope.recency.showNewTermOutcome = true;
      $scope.recency.showFinalOutcome = false;
      $scope.newsetoutcomecolor = 'red';
      $scope.recency.finalOutcome = "";
      $scope.recency.vlTestDate = "";
      $scope.recency.vlLoadResult = "";
      $scope.recency.vlLoadResultDropdown = "";
    }
    if ((controlLine == 'present' && positiveLine == 'absent' && longTermLine == 'present')) {
      $scope.recency.showFinalOutcome = true;
      $scope.setfinalcolor = 'blue';
      $scope.recency.newRecencyOutcome = "Invalid";
      $scope.recency.newRecencyOutcomeDisplay = "-Please Verify";
      $scope.recency.showNewTermOutcome = true;
      $scope.newsetoutcomecolor = 'red';
      $scope.recency.finalOutcome = "Inconclusive";
      $scope.recency.vlTestDate = "";
      $scope.recency.vlLoadResult = "";
      $scope.recency.vlLoadResultDropdown = "";
    }
    if (controlLine == 'present' && positiveLine == 'absent' && longTermLine == 'absent') {
      $scope.recency.newRecencyOutcome = "Assay Negative";
      $scope.recency.newRecencyOutcomeDisplay = "";
      $scope.recency.showNewTermOutcome = true;
      $scope.newsetoutcomecolor = 'blue';
      $scope.recency.finalOutcome = "Inconclusive";
      $scope.setfinalcolor = 'blue';
      $scope.recency.showFinalOutcome = true;
      $scope.recency.vlTestDate = "";
      $scope.recency.vlLoadResult = "";
      $scope.recency.vlLoadResultDropdown = "";
    }
    if (controlLine == 'present' && positiveLine == 'present' && longTermLine == 'absent') {
      $scope.recency.newRecencyOutcome = "Assay Recent";
      $scope.recency.showNewTermOutcome = true;
      $scope.newsetoutcomecolor = 'black';
      $scope.recency.finalOutcome = "";
      $scope.recency.showFinalOutcome = false;
      if ($scope.recency.vlLoadResult == "" && $scope.recency.vlLoadResultDropdown == "") {
        $scope.recency.newRecencyOutcomeDisplay = "- Please ensure you add Viral Load Result";
      } else {
        $scope.recency.newRecencyOutcomeDisplay = "";
      }
    }

    if (controlLine == 'present' && positiveLine == 'present' && longTermLine == 'present') {
      $scope.recency.newRecencyOutcome = "Assay Long Term";
      $scope.recency.newRecencyOutcomeDisplay = "";
      $scope.recency.showNewTermOutcome = true;
      $scope.newsetoutcomecolor = 'black';
      $scope.recency.finalOutcome = "Long Term";
      $scope.setfinalcolor = 'black';
      $scope.recency.showFinalOutcome = true;
    }
    if (controlLine == "" || positiveLine == "" || longTermLine == "") {
      $scope.recency.newRecencyOutcome = "";
      $scope.recency.finalOutcome = "";
      $scope.recency.newRecencyOutcomeDisplay = "";
      $scope.recency.vlTestDate = "";
      $scope.recency.vlLoadResult = "";
      $scope.recency.vlLoadResultDropdown = "";
      $scope.recency.showFinalOutcome = false;
      $scope.recency.showNewTermOutcome = false;
    }

  }
  }



    // Final Outcome
    $scope.getFinalOutcome = function (termOutcome,newTermOutcome, vlLoadResult) {
      if(termOutcome=='Invalid'){
        if (newTermOutcome == "Assay Recent" && vlLoadResult > 1000) {
          $scope.recency.finalOutcome = "RITA Recent";
          $scope.recency.newRecencyOutcomeDisplay = "";
          $scope.recency.showFinalOutcome = true;
          $scope.setfinalcolor = 'blue';
        } else if (newTermOutcome == "Assay Recent" && (vlLoadResult <= 1000 && vlLoadResult != "" && vlLoadResult != null)) {
          $scope.recency.finalOutcome = "RITA Long Term";
          $scope.recency.newRecencyOutcomeDisplay = "";
          $scope.recency.showFinalOutcome = true;
          $scope.setfinalcolor = 'black';
        } else if (newTermOutcome == "Assay Recent" && (vlLoadResult == "" || vlLoadResult == null)) {
          $scope.recency.finalOutcome = "";
          // $scope.recency.vlTestDate = "";
          // $scope.recency.vlLoadResult = "";
          $scope.recency.newRecencyOutcomeDisplay = "- Please ensure you add Viral Load Result";
          $scope.recency.showFinalOutcome = false;
        } else if (newTermOutcome == "Assay Long Term" ) {
          $scope.recency.finalOutcome = "Long Term";
          $scope.recency.showFinalOutcome = true;
          $scope.recency.vlTestDate = "";
          $scope.recency.vlLoadResult = "";
          $scope.setfinalcolor = 'black';
        }

      }else{
      if (termOutcome == "Assay Recent" && vlLoadResult > 1000) {
        $scope.recency.recencyOutcomeDisplay = "";
        $scope.recency.finalOutcome = "RITA Recent";
        $scope.recency.showFinalOutcome = true;
        $scope.setfinalcolor = 'blue';
      } else if (termOutcome == "Assay Recent" && (vlLoadResult <= 1000 && vlLoadResult != "" && vlLoadResult != null)) {
        $scope.recency.finalOutcome = "RITA Long Term";
        $scope.recency.recencyOutcomeDisplay = "";
        $scope.recency.showFinalOutcome = true;
        $scope.setfinalcolor = 'black';
      } else if (termOutcome == "Assay Recent" && (vlLoadResult == "" || vlLoadResult == null)) {
        $scope.recency.finalOutcome = "";
        // $scope.recency.vlTestDate = "";
        // $scope.recency.vlLoadResult = "";
        $scope.recency.vlLoadResultDropdown = "";
        $scope.recency.recencyOutcomeDisplay = "- Please ensure you add Viral Load Result";
        $scope.recency.showFinalOutcome = false;
      } else if (termOutcome == "Assay Long Term") {
        $scope.recency.vlTestDate = "";
        $scope.recency.vlLoadResult = "";
        $scope.recency.vlLoadResultDropdown = "";
        $scope.recency.finalOutcome = "Long Term";
        $scope.recency.recencyOutcomeDisplay = "";
        $scope.recency.showFinalOutcome = true;
        $scope.setfinalcolor = 'black';
      }
    

    }
    }


    $scope.getReasonName = function (reason) {
      if (reason == 'no_consent_from_the_client') {
        $scope.recency.recencyreasonName = "No consent from the Client";
      } else
      if (reason == 'sample_was_not_collected') {
        $scope.recency.recencyreasonName = "Sample was not collected (Phlebotomy failure)";
      } else
      if (reason == 'not_newly_diagnosed') {
        $scope.recency.recencyreasonName = "Not newly diagnosed";
      } else
      if (reason == 'other') {
        $scope.recency.recencyreasonName = "Other, please specify";
      } else {
        $scope.recency.recencyreasonName = "";
      }
    }

    $scope.getFacility = function (facilityid) {

      $scope.recency.facility_name = $("#facilityId").find("option:selected").text();
      if ($scope.recency.facility_name == '' || facilityid == "") {
        $scope.recency.facility_name = "";
        $scope.facilityData = JSON.parse(localStorage.getItem('FacilityData'));
      }

      if ($scope.recency.facilityId != "") {
        var facilityData = $scope.facilityData

        function isfacility(item) {
          return item.facility_id === $scope.recency.facilityId;
        }
        var selectedfacility = facilityData.find(isfacility);
        $scope.recency.facility_name = selectedfacility.facility_name;
        $scope.recency.location[0] = selectedfacility.province;
        $scope.recency.location[1] = selectedfacility.district;
        $scope.recency.location[2] = selectedfacility.city;
        var localDistrictjson = localStorage.getItem('DistrictData');
        if ($scope.recency.location[0] && (localDistrictjson != "" && localDistrictjson != null)) {
          var localDistrict = JSON.parse(localStorage.getItem('DistrictData'));
          var districtresult = localDistrict.filter(obj => {
            return obj.province_id === $scope.recency.location[0]
          })
          $scope.districtData = districtresult;
          $scope.recency.location[1] = $scope.recency.location[1];

          if ($scope.recency.location[0] != "" || $scope.recency.location[0] != null) {
            if (districtresult.length == 0) {
              $scope.districtData.push({
                "district_id": districtresult.length.toString(),
                "district_name": "Other"
              })
            } else {
              var len = $scope.districtData.length - 1;
              var districtlen = $scope.districtData[len];
              var districtid = (parseInt(districtlen['district_id']) + 1).toString();
              $scope.districtData.push({
                "district_id": districtid,
                "district_name": "Other"
              })
            }
          }
        } else {
          $scope.districtData = [];
          $scope.cityData = [];
        }
        var localCityjson = localStorage.getItem('CityData');
        if ($scope.recency.location[1] && (localCityjson != "" && localCityjson != null)) {
          var localCity = JSON.parse(localStorage.getItem('CityData'));
          var cityresult = localCity.filter(obj => {
            return obj.district_id === $scope.recency.location[1]
          })
          $scope.cityData = cityresult;

          if ($scope.recency.location[1] != "" || $scope.recency.location[1] != null) {
            if (cityresult.length == 0) {
              $scope.cityData.push({
                "city_id": cityresult.length.toString(),
                "city_name": "Other"
              })
            } else {
              var len = $scope.cityData.length - 1;
              var citylen = $scope.cityData[len];
              var cityid = (parseInt(citylen['facility_id']) + 1).toString();
              $scope.cityData.push({
                "city_id": cityid,
                "city_name": "Other"
              })
            }
          }

        } else {
          $scope.cityData = [];
        }
      } else {
        $scope.recency.location[0] = "";
        $scope.recency.location[1] = "";
        $scope.recency.location[2] = "";
        $scope.districtData = [];
        $scope.cityData = [];
        $scope.showotherdistrict = false;
        $scope.showothercity = false;
      }
      $scope.recency.otherDistrict = "";
      $scope.recency.otherCity = "";
    }
    $scope.getTestingModality = function (facilitytypeid) {

      if (facilitytypeid != "") {
        $scope.recency.testingModalityName = $("#testingModality option:selected").text();
      }
      if ($scope.recency.testingModalityName == '-- Select --' || facilitytypeid == "") {
        $scope.showothertestmodality = false;
        $scope.recency.testingModalityName = "";
      }
      if ($scope.recency.testingModalityName == 'Other') {
        $scope.showothertestmodality = true;
      } else {
        $scope.showothertestmodality = false;
      }

    }
    $scope.checkotherdistrict = function (districtid) {
      if (districtid != null) {
        var cityData = $scope.cityData

        function isCity(item) {
          return item.city_name === 'Other';
        }
        var othercityData = cityData.find(isCity)
        $scope.recency.districtname = $("#location_two").find("option:selected").text();
      }
      if ($scope.recency.districtname == 'Other') {
        $scope.showotherdistrict = true;
        $scope.recency.otherDistrict = "";
        $scope.recency.location[2] = othercityData.city_id;
        $scope.recency.otherCity = "";
        $scope.showothercity = true;
      } else if ($scope.recency.districtname == '-- Select --') {
        $scope.showotherdistrict = false;
        $scope.recency.districtname = "";
        $scope.recency.location[2] = "";
        $scope.showothercity = false;
      } else {
        $scope.showotherdistrict = false;
        $scope.recency.location[2] = "";
        $scope.showothercity = false;
      }

    }
    $scope.checkothercity = function (city) {
      $scope.recency.cityname = $("#location_three").find("option:selected").text();
      if ($scope.recency.cityname == 'Other') {
        $scope.showothercity = true;
        $scope.recency.otherCity = "";
      } else if ($scope.recency.cityname == '-- Select --') {
        $scope.showothercity = false;
        $scope.recency.cityname = "";
        $scope.recency.otherCity = "";
      } else {
        $scope.showothercity = false;
      }
      if (city != null) {
        var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
        var fac_result = localfacility.filter(obj => {
          return obj.city === city
        })
        $scope.facilityData = fac_result;
        $scope.recency.facilityId = "";
      } {
        var localfacility = JSON.parse(localStorage.getItem('FacilityData'));
        var fac_result = localfacility.filter(obj => {
          return obj.district === $scope.recency.location[1]
        })
        $scope.facilityData = fac_result;
        $scope.recency.facilityId = "";
      }
    }
    $scope.checkriskpopulation = function (riskpopulation) {
      $scope.recency.riskPopulationName = $("#riskPopulation option:selected").text();
      if ($scope.recency.riskPopulationName == 'Other') {
        $scope.otherpopulation = true;
      } else {
        $scope.otherpopulation = false;
        $scope.recency.otherriskPopulation = "";
      }
    }
    $scope.getControlLine = function (controlline) {
      if (controlline == 'present') {
        $scope.recency.ctrlLineName = 'Present';
      }
      if (controlline == 'absent') {
        $scope.recency.ctrlLineName = 'Absent';
      }
    }
    $scope.OnPositiveLineChange = function (positiveline) {
      if (positiveline == 'present') {
        $scope.recency.positiveLineName = 'Present(Positive/P)';
      }
      if (positiveline == 'absent') {
        $scope.recency.positiveLineName = 'Absent(Negative/N)';
      }
    }
    $scope.OnLongtermChange = function (longterm) {
      if (longterm == 'present') {
        $scope.recency.longTermLineName = 'Present(Long Term/LT)';
      }
      if (longterm == 'absent') {
        $scope.recency.longTermLineName = 'Absent(Recent/R)';
      }
    }

      // On Next Recency Test

  $scope.getNewControlLine = function (controlline) {
    if (controlline == 'present') {
      $scope.recency.newControlLineName = 'Present';
    }
    if (controlline == 'absent') {
      $scope.recency.newControlLineName = 'Absent';
    }
  }
  $scope.OnNewPositiveLineChange = function (positiveline) {
    if (positiveline == 'present') {
      $scope.recency.newPositiveLineName = 'Present(Positive/P)';
    }
    if (positiveline == 'absent') {
      $scope.recency.newPositiveLineName = 'Absent(Negative/N)';
    }
  }
  $scope.OnNewLongtermChange = function (longterm) {
    if (longterm == 'present') {
      $scope.recency.newLongTermLineName = 'Present(Long Term/LT)';
    }
    if (longterm == 'absent') {
      $scope.recency.newLongTermLineName = 'Absent(Recent/R)';
    }
  }
    $scope.setDiagDate = function (val) {
      var ipObj1 = {
        callback: function (val) {
          var hivDiagnosisDate = new Date(val);
          $scope.recency.hivDiagnosisDate = $filter('date')(hivDiagnosisDate, "dd-MMM-yyyy");
        },
        to: new Date(),
      };
      ionicDatePicker.openDatePicker(ipObj1);
    }
    $scope.setSampleCollectionDate = function () {
      var ipObj2 = {
        callback: function (val) {
          var sampleCollectionDate = new Date(val);
          $scope.recency.sampleCollectionDate = $filter('date')(sampleCollectionDate, "dd-MMM-yyyy");
          $scope.recency.sampleReceiptDate='';
          $scope.recency.hivRecencyTestDate='';
        },
        to: new Date(),
      };
      ionicDatePicker.openDatePicker(ipObj2);
    }
    $scope.setsampleReceiptDate = function () {

      if($scope.recency.sampleCollectionDate!='' && $scope.recency.sampleCollectionDate!=null){
        var ipObj3 = {
          callback: function (val) {
            var sampleReceiptDate = new Date(val);
            $scope.recency.sampleReceiptDate = $filter('date')(sampleReceiptDate, "dd-MMM-yyyy");
            $scope.recency.hivRecencyTestDate='';
          },
          from:new Date($scope.recency.sampleCollectionDate),
          to: new Date(),
        };
      }else{
        var ipObj3 = {
          callback: function (val) {
            var sampleReceiptDate = new Date(val);
            $scope.recency.sampleReceiptDate = $filter('date')(sampleReceiptDate, "dd-MMM-yyyy");
            $scope.recency.hivRecencyTestDate='';
          },        
          to: new Date(),
        };
      }
  
      ionicDatePicker.openDatePicker(ipObj3);
    }
    $scope.setRecencyDate = function (val) {

      if(($scope.recency.sampleCollectionDate!=''&& $scope.recency.sampleCollectionDate!=null &&  $scope.recency.sampleReceiptDate!='' && $scope.recency.sampleReceiptDate!=null)
      ||(($scope.recency.sampleCollectionDate==''|| $scope.recency.sampleCollectionDate==null &&  $scope.recency.sampleReceiptDate!='' && $scope.recency.sampleReceiptDate!=null))){
        var ipObj4 = {
          callback: function (val) {
            var hivRecencyTestDate = new Date(val);
            $scope.recency.hivRecencyTestDate = $filter('date')(hivRecencyTestDate, "dd-MMM-yyyy");
          },
          from:new Date($scope.recency.sampleReceiptDate),
          to: new Date(),
        };
      }
      else if($scope.recency.sampleCollectionDate!=''&& $scope.recency.sampleCollectionDate!=null &&  $scope.recency.sampleReceiptDate==''|| $scope.recency.sampleReceiptDate==null){
        var ipObj4 = {
          callback: function (val) {
            var hivRecencyTestDate = new Date(val);
            $scope.recency.hivRecencyTestDate = $filter('date')(hivRecencyTestDate, "dd-MMM-yyyy");
          },
          from:new Date($scope.recency.sampleCollectionDate),
          to: new Date(),
        };
      }
      else{
        var ipObj4 = {
        callback: function (val) {
          var hivRecencyTestDate = new Date(val);
           $scope.recency.hivRecencyTestDate = $filter('date')(hivRecencyTestDate, "dd-MMM-yyyy");
         },
         to: new Date(),
        };
      }
    ionicDatePicker.openDatePicker(ipObj4);
    }
    $scope.setVlTestDate = function (val) {
      var ipObj5 = {
        callback: function (val) {

          var viralLoadTestDate = new Date(val);
          $scope.recency.vlTestDate = $filter('date')(viralLoadTestDate, "dd-MMM-yyyy");
        },
        to: new Date(),

      };
      ionicDatePicker.openDatePicker(ipObj5);
    }
    $scope.setTestKitExpDate = function (val) {
      var ipObj6 = {
        callback: function (val) {
          var testKitExpDate = new Date(val);
          $scope.recency.testKitExpDate = $filter('date')(testKitExpDate, "dd-MMM-yyyy");
        }

      };
      ionicDatePicker.openDatePicker(ipObj6);
    }
    $scope.setDob = function (val) {
      var currentYear = new Date().getFullYear();
      var currentDate = new Date().getDate();
      var fromYear = currentYear - 99;
      var toYear = currentYear - 15;
      var currentMonth = new Date().getMonth();
      var ipObj7 = {
        callback: function (val) { //Mandatory
          var dob = new Date(val);
          var ageDifMs = Date.now() - dob.getTime();
          var ageDate = new Date(ageDifMs); // miliseconds from epoch
          $scope.recency.dob = $filter('date')(dob, "dd-MMM-yyyy");
        $scope.recency.age = Math.abs(currentYear - dob.getUTCFullYear());

         // $scope.recency.age = Math.abs(ageDate.getUTCFullYear() - 1970);
        },
        from: new Date(fromYear,currentMonth,1),
        to: new Date(toYear,currentMonth,31),
        inputDate: new Date(toYear,currentMonth,currentDate)
      };
      ionicDatePicker.openDatePicker(ipObj7);
    }

    $scope.cleardob = function (age) {

      if (age != null || age != undefined) {
        $scope.recency.dob = "";
      } else {
        $scope.recency.age = "";
      }
        if(age.toString().length>1 && age<15){
          $scope.recency.age = "";
        }
        var agelen = age.toString();
      
        if(agelen.length>2){
          agelen=agelen.slice(0,2);
          $scope.recency.age=parseInt(agelen); 
        }
      
    }
    $scope.clearTestKitExpDate = function () {
      $scope.recency.testKitExpDate = '';
      $('#testKitExpDate').val("")

    }


    $scope.showToastAlert = function (mandatorytitle) {
       // $ionicPopup.alert({title:'Alert!',template:mandatorytitle});

     // Hide Debugging when debugging
      $cordovaToast.show(mandatorytitle, 'long', 'center')
        .then(function (success) {
          // success
        }, function (error) {
          // error
        });
    }

    // Section 1 Validation
    $scope.patientvalidation = function () {
      for (i = 0; i < $scope.configdata.length; i++) {
        var key = $scope.configdata[i].global_name;
        var keyname = key + "_name";
        var keyId = "#" + $scope.configdata[i].global_name;
        if ($scope.recency.location[i] == undefined || $scope.recency.location[i] == "") {
          $scope.recency[key] = ""
          $scope.recency[keyname] = "";
        } else {
          $scope.recency[key] = $scope.recency.location[i];
          $scope.recency[keyname] = $(keyId).find("option:selected").text();
        }
      }
      if ($("#other-recency").hasClass('active')) {} else {
        if ($scope.mandatoryData.length > 0) {
          for (i = 0; i < $scope.mandatoryData.length; i++) {
            var id = "#" + $scope.mandatoryData[i];
            var mandatoryname = $(id).attr("name");
            var mandatorytitle = $(id).attr("title");
            var mandatoryField = $scope.mandatoryData[i];

            if ($scope.mandatoryData[i] == 'sampleId' && $scope.recency.sampleId == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'patientId' && $scope.recency.patientId == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.recency.patientId == "" && $scope.recency.sampleId == "") {
              $scope.showRecencyTick = false;
              var mandatorytitle = 'Please Choose Either Sample ID or Patient ID';
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'sampleCollectionDate' && $scope.recency.sampleCollectionDate == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'sampleReceiptDate' && $scope.recency.sampleReceiptDate == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'receivedSpecimenType' && $scope.recency.receivedSpecimenType == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'facilityId' && $scope.recency.facilityId == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }

            if ($scope.mandatoryData[i] == 'location_one' && $scope.recency.location_one == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'location_two' && $scope.recency.location_two == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'location_two' && $scope.recency.districtname == 'Other' && $scope.recency.otherDistrict == "") {
              $scope.showRecencyTick = false;
              var mandatorytitle = $("#otherDistrict").attr("title");
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'location_three' && $scope.recency.location_three == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'location_three' && $scope.recency.cityname == 'Other' && $scope.recency.otherCity == "") {
              $scope.showRecencyTick = false;
              var mandatorytitle = $("#otherCity").attr("title");
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'hivDiagnosisDate' && $scope.recency.hivDiagnosisDate == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }

            if ($scope.mandatoryData[i] == 'pastHivTesting' && $scope.recency.pastHivTesting == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.recency.pastHivTesting == 'yes' || $scope.recency.pastHivTesting == '') {
              if ($scope.mandatoryData[i] == 'testLast12Month' && $scope.recency.testLast12Month == "") {
                $scope.showRecencyTick = false;
                $scope.showToastAlert(mandatorytitle);
                return false;
              }
            }

            if ($scope.mandatoryData[i] == 'pastHivTesting' && $scope.recency.pastHivTesting == 'yes' && $scope.recency.lastHivStatus == "") {
              var mandatorytitle = 'Please Choose Last HIV Status';
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'pastHivTesting' && $scope.recency.lastHivStatus == 'positive' && $scope.recency.patientOnArt == "") {
              var mandatorytitle = 'Please Choose whether the Patient on ART';
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'testKitLotNo' && $scope.recency.testKitLotNo == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'testKitExpDate' && $scope.recency.testKitExpDate == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'testerName' && $scope.recency.testerName == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'testingModality' && $scope.recency.testingModality == "") {
              $scope.showRecencyTick = false;
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.mandatoryData[i] == 'testingModality' && $scope.recency.testingModalityName == 'Other' && $scope.recency.othertestingmodality == "") {
              $scope.showRecencyTick = false;
              var mandatorytitle = 'Please Enter Other Testing Facility Type';
              $scope.showToastAlert(mandatorytitle);
              return false;
            }
            if ($scope.recency.testNotPerformed == true) {
              if ($scope.recency.recencyreason == "") {
                var mandatorytitle = 'Please Choose Reason of Recency Test Not Performed';
                $scope.showRecencyTick = false;
                $scope.showToastAlert(mandatorytitle);
                return false;
              }
              if ($scope.recency.recencyreason == "other" && $scope.recency.otherreason == "") {
                var mandatorytitle = 'Please Enter Other Reason';
                $scope.showRecencyTick = false;
                $scope.showToastAlert(mandatorytitle);
                return false;
              }
            }
            if ($scope.recency.testNotPerformed != true || $scope.recency.testNotPerformed == '') {
              if ($scope.mandatoryData[i] == 'testingFacility' && $scope.recency.testingFacility == "") {
                $scope.showRecencyTick = false;
                $scope.showToastAlert(mandatorytitle);
                return false;
              }
              if ($scope.mandatoryData[i] == 'hivRecencyTestDate' && $scope.recency.hivRecencyTestDate == "") {
                $scope.showRecencyTick = false;
                $scope.showToastAlert(mandatorytitle);
                return false;
              }
              if (($scope.mandatoryData[i] == 'ctrlLine' && $scope.recency.ctrlLine == "")
              ||($scope.mandatoryData[i] == 'ctrlLine' && $scope.recency.ctrlLine != "" && $scope.recency.recencyOutcome=='Invalid' && $scope.recency.newControlLine=='')) {
                $scope.showRecencyTick = false;
                $scope.showToastAlert(mandatorytitle);
                return false;
              }
              if (($scope.mandatoryData[i] == 'positiveLine' && $scope.recency.positiveLine == "")
              ||($scope.mandatoryData[i] == 'positiveLine' && $scope.recency.positiveLine != "" && $scope.recency.recencyOutcome=='Invalid' && $scope.recency.newPositiveLine=='')) {
                $scope.showRecencyTick = false;
                $scope.showToastAlert(mandatorytitle);
                return false;
              }
              if (($scope.mandatoryData[i] == 'longTermLine' && $scope.recency.longTermLine == "")
              ||($scope.mandatoryData[i] == 'longTermLine' && $scope.recency.longTermLine != "" && $scope.recency.recencyOutcome=='Invalid' && $scope.recency.newLongTermLine=='')) {
                $scope.showRecencyTick = false;
                $scope.showToastAlert(mandatorytitle);
                return false;
              }

              if ($scope.mandatoryData[i] == 'vlTestDate' && $scope.recency.vlTestDate == "" && 
              (($scope.recency.recencyOutcome != 'Assay Negative' && $scope.recency.recencyOutcome != 'Invalid' && $scope.recency.recencyOutcome != '')
             ||($scope.recency.recencyOutcome='Invalid' && $scope.recency.newRecencyOutcome != 'Assay Negative' && $scope.recency.newRecencyOutcome != 'Invalid' && $scope.recency.newRecencyOutcome != ''))) {
                $scope.showRecencyTick = false;
                $scope.showToastAlert(mandatorytitle);
                return false;
              }
              if ($scope.mandatoryData[i] == 'vlLoadResult' && ($scope.recency.vlLoadResult == "" || $scope.recency.vlLoadResult == null) && $scope.recency.vlLoadResultDropdown == "" 
              && (($scope.recency.recencyOutcome != 'Assay Negative' && $scope.recency.recencyOutcome != 'Invalid' && $scope.recency.recencyOutcome != '')
              || ($scope.recency.recencyOutcome='Invalid' && $scope.recency.newRecencyOutcome != 'Assay Negative' && $scope.recency.newRecencyOutcome != 'Invalid' && $scope.recency.newRecencyOutcome != ''))) {
                $scope.showRecencyTick = false;
                $scope.showToastAlert(mandatorytitle);
                return false;
              }
            }
            if ($scope.recency.sampleId != "" || $scope.recency.patientId != "" || $scope.recency.facilityId != "" || $scope.recency.hivDiagnosisDate != "" ||
              $scope.recency.hivRecencyTestDate != "" || $scope.recency.ctrlLine != "" || $scope.recency.positiveLine != "" || $scope.recency.longTermLine != "" ||
              $scope.recency.pastHivTesting != "" || $scope.recency.lastHivStatus != "" || $scope.recency.patientOnArt != "" || $scope.recency.location_one != "" ||
              $scope.recency.location_two != "" || $scope.recency.location_three != "" || $scope.recency.testKitLotNo != "" || $scope.recency.testKitExpDate != "" ||
              $scope.recency.testerName != "" || $scope.recency.testingFacility != "" || $scope.recency.vlTestDate != "" || $scope.recency.vlLoadResult != "" || ($scope.recency.recencyOutcome=='Invalid' && $scope.recency.newRecencyOutcome!='')) {
              $scope.showRecencyTick = true;

            }
          }
        }
      }
    }

    // Section 2 Validation
    $scope.behaviourValidation = function () {
      if ($scope.mandatoryData.length > 0) {
        for (i = 0; i < $scope.mandatoryData.length; i++) {
          var id = "#" + $scope.mandatoryData[i];
          var mandatoryname = $(id).attr("name");
          var mandatorytitle = $(id).attr("title");
          var mandatoryField = $scope.mandatoryData[i];


          if (($scope.mandatoryData[i] == 'dob' && $scope.recency.dob == "" && ($scope.recency.age == "" || $scope.recency.age == null|| $scope.recency.age<15))) {
            var mandatorytitle = 'Please Enter Date Of Birth or Age';
            $scope.showBehaviourTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }

          if (($scope.mandatoryData[i] == 'age' && $scope.recency.dob == "" && ($scope.recency.age == "" || $scope.recency.age == null|| $scope.recency.age<15))) {
            var mandatorytitle = 'Please Enter Date Of Birth or Age';
            $scope.showBehaviourTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if ($scope.mandatoryData[i] == 'gender' && $scope.recency.gender == "") {
            $scope.showBehaviourTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if ($scope.mandatoryData[i] == 'maritalStatus' && $scope.recency.maritalStatus == "") {
            $scope.showBehaviourTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if ($scope.mandatoryData[i] == 'residence' && $scope.recency.residence == "") {
            $scope.showBehaviourTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if ($scope.mandatoryData[i] == 'riskPopulation' && $scope.recency.riskPopulation == "") {
            $scope.showBehaviourTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if ($scope.mandatoryData[i] == 'riskPopulation' && $scope.recency.riskPopulationName == 'Other' && $scope.recency.otherriskPopulation == "") {
            var mandatorytitle = 'Please Choose Other Risk Population';
            $scope.showBehaviourTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if ($scope.mandatoryData[i] == 'pregnancyStatus' && $scope.recency.gender != 'male' && $scope.recency.pregnancyStatus == "") {
            $scope.showBehaviourTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if ($scope.mandatoryData[i] == 'currentSexualPartner' && $scope.recency.currentSexualPartner == "") {
            $scope.showBehaviourTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if ($scope.mandatoryData[i] == 'violenceLast12Month' && $scope.recency.violenceLast12Month == "") {
            $scope.showBehaviourTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if ($scope.mandatoryData[i] == 'notes' && $scope.recency.notes == "") {
            $scope.showBehaviourTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }

          if ($scope.recency.dob != "" || $scope.recency.gender != "" || $scope.recency.maritalStatus != "" || $scope.recency.residence != "" ||
            $scope.recency.riskPopulation != "" || $scope.recency.otherriskPopulation != "" || $scope.recency.pregnancyStatus != "" ||
            $scope.recency.currentSexualPartner != "" || $scope.recency.violenceLast12Month != "" || $scope.recency.notes != "") {
            $scope.showBehaviourTick = true;
          }
        }
      }

    }

    // Edit Recency Data
    $scope.editRecency = function () {
      $scope.clientLocation = [];

      for (i = 0; i < $scope.configdata.length; i++) {
        var key = $scope.configdata[i].global_name;
        var keyname = key + "_name";
        var keyId = "#" + $scope.configdata[i].global_name;
        if ($scope.configdata[i].global_name) {
          $scope.clientLocation[i] = $scope.configdata[i].global_value;
        }
        if ($scope.recency.location[i] == undefined || $scope.recency.location[i] == "") {
          $scope.recency[key] = "";
          $scope.recency[keyname] = "";
        } else {
          $scope.recency[key] = $scope.recency.location[i];
          $scope.recency[keyname] = $(keyId).find("option:selected").text();
        }
      }
      // Validate if all the mandatory fields are filled
      for (i = 0; i < $scope.mandatoryData.length; i++) {
        var id = "#" + $scope.mandatoryData[i];
        var mandatoryname = $(id).attr("name");
        var mandatorytitle = $(id).attr("title");
        var mandatoryField = $scope.mandatoryData[i];

        if ($scope.mandatoryData[i] == 'sampleId' && $scope.recency.sampleId == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Enter Sample ID';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'patientId' && $scope.recency.patientId == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Enter Patient ID';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.recency.patientId == "" && $scope.recency.sampleId == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Choose Either Sample ID or Patient ID';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'sampleCollectionDate' && $scope.recency.sampleCollectionDate == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Enter Sample Collection Date from the Client';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'sampleReceiptDate' && $scope.recency.sampleReceiptDate == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Enter Sample Receipt Date at the Recency Testing Site';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'receivedSpecimenType' && $scope.recency.receivedSpecimenType == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Choose Received Specimen Type';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'facilityId' && $scope.recency.facilityId == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Enter Facility ID';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'location_one' && $scope.recency.location_one == "") {
          $scope.showRecencyTick = false;
          var globalval = $scope.clientLocation[0];
          var mandatorytitle = 'Please Enter ' + globalval;
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'location_two' && $scope.recency.location_two == "") {
          $scope.showRecencyTick = false;
          var globalval = $scope.clientLocation[1];
          var mandatorytitle = 'Please Enter ' + globalval;
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'location_two' && $scope.recency.districtname == 'Other' && $scope.recency.otherDistrict == "") {
          $scope.showRecencyTick = false;
          var globalval = $scope.clientLocation[1];
          var mandatorytitle = 'Please Enter Other ' + globalval;
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'location_three' && $scope.recency.location_three == "") {
          $scope.showRecencyTick = false;
          var globalval = $scope.clientLocation[2];
          var mandatorytitle = 'Please Enter ' + globalval;
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'location_three' && $scope.recency.cityname == 'Other' && $scope.recency.otherCity == "") {
          $scope.showRecencyTick = false;
          var globalval = $scope.clientLocation[2];
          var mandatorytitle = 'Please Enter Other ' + globalval;
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'hivDiagnosisDate' && $scope.recency.hivDiagnosisDate == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Enter HIV Diagnosis Date';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }

        if ($scope.mandatoryData[i] == 'pastHivTesting' && $scope.recency.pastHivTesting == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Choose Past HIV Testing';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.recency.pastHivTesting == 'yes' || $scope.recency.pastHivTesting == '') {
          if ($scope.mandatoryData[i] == 'testLast12Month' && $scope.recency.testLast12Month == "") {
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Choose Tested in last 12Months';
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
        }

        if ($scope.mandatoryData[i] == 'pastHivTesting' && $scope.recency.pastHivTesting == 'yes' && $scope.recency.lastHivStatus == "") {
          var mandatorytitle = 'Please Choose Last HIV Status';
          $scope.showRecencyTick = false;
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'pastHivTesting' && $scope.recency.lastHivStatus == 'positive' && $scope.recency.patientOnArt == "") {
          var mandatorytitle = 'Please Choose whether the Patient on ART';
          $scope.showRecencyTick = false;
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'testKitLotNo' && $scope.recency.testKitLotNo == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Choose Test Kit Lot Number';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'testKitExpDate' && $scope.recency.testKitExpDate == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Enter Test Kit Expiry Date';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'testerName' && $scope.recency.testerName == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Enter Tester Name';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'testingModality' && $scope.recency.testingModality == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Choose Testing Modality';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'testingModality' && $scope.recency.testingModalityName == 'Other' && $scope.recency.othertestingmodality == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Enter Other Testing Modality';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'testingFacility' && $scope.recency.testingFacility == "") {
          $scope.showRecencyTick = false;
          var mandatorytitle = 'Please Choose Testing Facility';
          $scope.showToastAlert(mandatorytitle);
          return false;
        }

        if ($scope.recency.testNotPerformed == true) {
          if ($scope.recency.recencyreason == "") {
            var mandatorytitle = 'Please Choose Reason of Recency Test Not Performed';
            $scope.showRecencyTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if ($scope.recency.recencyreason == "other" && $scope.recency.otherreason == "") {
            var mandatorytitle = 'Please Enter Other Reason';
            $scope.showRecencyTick = false;
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
        }
        if ($scope.recency.testNotPerformed != true || $scope.recency.testNotPerformed == '') {
          // console.log($scope.recency.testNotPerformed)
          if ($scope.mandatoryData[i] == 'hivRecencyTestDate' && $scope.recency.hivRecencyTestDate == "") {
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Enter HIV Recency Test Date';
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if (($scope.mandatoryData[i] == 'ctrlLine' && $scope.recency.ctrlLine == "")
          ||($scope.mandatoryData[i] == 'ctrlLine' && $scope.recency.ctrlLine != "" && $scope.recency.recencyOutcome=='Invalid' && $scope.recency.newControlLine=='')) {
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Enter Control Line';
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if (($scope.mandatoryData[i] == 'positiveLine' && $scope.recency.positiveLine == "")
          ||($scope.mandatoryData[i] == 'positiveLine' && $scope.recency.positiveLine != "" && $scope.recency.recencyOutcome=='Invalid' && $scope.recency.newPositiveLine=='')) {
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Enter Positive Line';
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if (($scope.mandatoryData[i] == 'longTermLine' && $scope.recency.longTermLine == "")
          ||($scope.mandatoryData[i] == 'longTermLine' && $scope.recency.longTermLine != "" && $scope.recency.recencyOutcome=='Invalid' && $scope.recency.newLongTermLine=='')) {
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Enter Long Term Line';
            $scope.showToastAlert(mandatorytitle);
            return false;
          }

          if ($scope.mandatoryData[i] == 'vlTestDate' && $scope.recency.vlTestDate == "" && 
          (($scope.recency.recencyOutcome != 'Assay Negative' && $scope.recency.recencyOutcome != 'Invalid' && $scope.recency.recencyOutcome != '')
             ||($scope.recency.recencyOutcome='Invalid' && $scope.recency.newRecencyOutcome != 'Assay Negative' && $scope.recency.newRecencyOutcome != 'Invalid' && $scope.recency.newRecencyOutcome != ''))) {
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Enter Viral Load Test Date';
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
          if ($scope.mandatoryData[i] == 'vlLoadResult' && ($scope.recency.vlLoadResult == "" || $scope.recency.vlLoadResult == null) && $scope.recency.vlLoadResultDropdown == "" && 
          (($scope.recency.recencyOutcome != 'Assay Negative' && $scope.recency.recencyOutcome != 'Invalid' && $scope.recency.recencyOutcome != '')
          || ($scope.recency.recencyOutcome='Invalid' && $scope.recency.newRecencyOutcome != 'Assay Negative' && $scope.recency.newRecencyOutcome != 'Invalid' && $scope.recency.newRecencyOutcome != '')))  {
            $scope.showRecencyTick = false;
            var mandatorytitle = 'Please Enter Viral Load Result';
            $scope.showToastAlert(mandatorytitle);
            return false;
          }
        }
        if (($scope.mandatoryData[i] == 'dob' && $scope.recency.dob == "" && ($scope.recency.age == "" || $scope.recency.age == null|| $scope.recency.age<15))) {
          var mandatorytitle = 'Please Enter Date Of Birth or Age';
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle);
          return false;
        }

        if (($scope.mandatoryData[i] == 'age' && $scope.recency.dob == "" && ($scope.recency.age == "" || $scope.recency.age == null|| $scope.recency.age<15))) {
          var mandatorytitle = 'Please Enter Date Of Birth or Age';
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle);
          return false;
        }

        if ($scope.mandatoryData[i] == 'riskPopulation' && $scope.recency.riskPopulation == "") {
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == 'riskPopulation' && $scope.recency.riskPopulationName == 'Other' && $scope.recency.otherriskPopulation == "") {
          var mandatorytitle = 'Please Choose Other Risk Population';
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle);
          return false;
        }
        if ($scope.mandatoryData[i] == mandatoryname && $scope.recency[mandatoryField] == "") {
          $scope.showBehaviourTick = false;
          $scope.showToastAlert(mandatorytitle);
          return false;
        }

      }

      $scope.recency.addedBy = localStorage.getItem('userId');
      var currentdate = new Date();
      $scope.recency.formSavedDateTime = currentdate.getFullYear() + "-" +
        (currentdate.getMonth() + 1) + "-" +
        currentdate.getDate() + " " +
        currentdate.getHours() + ":" +
        currentdate.getMinutes() + ":" +
        currentdate.getSeconds();
      if ($scope.recency.vlLoadResult == "" && $scope.recency.vlLoadResultDropdown != "") {
        $scope.recency.vlLoadResult = $scope.recency.vlLoadResultDropdown;
      }

      $scope.chkrecency = JSON.parse(localStorage.getItem('RecencyData'))

      if($scope.chkrecency.unique_id || $scope.chkrecency.appVersion){
        var recency= CryptoJS.AES.encrypt(JSON.stringify($scope.recency),$scope.secretKey , {format: CryptoJSAesJson}).toString();
      }else{
        var recency = $scope.recency;
      }

      $scope.chkrecency[$scope.index] = recency;

      localStorage.setItem('RecencyData', JSON.stringify($scope.chkrecency));
      $scope.recency = {};
      $scope.recencydisplay = true;

    //  Hide Toast during debugging
      // $cordovaToast.show('Edited Successfully', 'long', 'center')
      //   .then(function (success) {
      //     // success
      //   }, function (error) {
      //     // error
      //   });

      $("#main-recency").addClass("active");
      $("#other-recency").removeClass('active');
      $location.path('/app/viewRecency');

    //  

      $preLoader.hide();
    }
  })


  .filter('underscorefilter', function () {
    return function (input) {
      return input.replace(/_/g, ' ');
    };
  });
