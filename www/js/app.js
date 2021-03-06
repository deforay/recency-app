// Recency Mobile App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic',
    'ionic-datepicker',
    'ngCordova',
    'starter.controllers',
    'starter.services',
    'starter.loginCtrl',
    'starter.addQcAssuranceCtrl',
    'starter.addQcSettingsCtrl',
    'starter.editTesterInfoCtrl',
    'starter.editSampleInfoCtrl',
    'starter.editLotInfoCtrl',
    'starter.recencyDataCtrl',
    'starter.tatRecencyReportCtrl',
    'starter.techSupportCtrl',
    'starter.recencyDataWithVlCtrl',
    'starter.pendingRecencyResultCtrl',
    'starter.serverQcDataCtrl',
    'starter.addRecencyCtrl',
    'starter.viewRecencyCtrl',
    'starter.viewQcAssuranceCtrl',
    'starter.viewRecencyDetailCtrl',
    'starter.viewQcAssuranceDetailCtrl',
    'starter.editRecencyCtrl'
  ])
  .run(function ($ionicPlatform, $ionicHistory, $refresh, $localStorage, $ionicPopup, $state, $cordovaBadge) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs).
      // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
      // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
      // useful especially with forms, though we would prefer giving the user a little more room
      // to interact with the app.


      if (window.cordova && window.Keyboard) {
        // console.log("hi")
        window.Keyboard.hideKeyboardAccessoryBar(true);
      }

      if (window.StatusBar) {
        // Set the statusbar to use the default style, tweak this to
        // remove the status bar on iOS or change it to use white instead of dark colors.
        StatusBar.styleDefault();
      }



    });
    // When the app becomes Inactive 
    $ionicPlatform.on('pause', function () {
      if ($localStorage.get('ServerRecencyData') == 'login') {
        $state.go('app.addRecency');
        $localStorage.set('ServerRecencyData', 'logout');
        $refresh.page();
      }
    })

  })

  .config(function ($stateProvider, $urlRouterProvider, ionicDatePickerProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        cache: false,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('login', {
        url: '/login',
        cache: false,
        templateUrl: 'templates/login.html',
        controller: "loginCtrl"
      })

      .state('app.addRecency', {
        url: '/addRecency',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/addRecency.html',
            controller: "addRecencyCtrl"
          }
        }
      })
      .state('app.editRecency', {
        url: '/editRecency/:patientId',
        views: {
          'menuContent': {
            templateUrl: 'templates/editRecency.html',
            controller: "editRecencyCtrl"
          }
        }
      })
      .state('app.viewRecency', {
        url: '/viewRecency',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/viewRecency.html',
            controller: "viewRecencyCtrl"
          }
        }
      })
      .state('app.viewQcAssurance', {
        url: '/viewQcAssurance',
        cache: false,
        views: {
          'menuContent': {
            templateUrl: 'templates/viewQcAssurance.html',
            controller: "viewQcAssuranceCtrl"
          }
        }
      })
      .state('app.recencyData', {
        url: '/recencyData',
        views: {
          'menuContent': {
            templateUrl: 'templates/recencyData.html',
            controller: "recencyDataCtrl"
          }
        }
      })
      .state('app.tatRecencyReport', {
        url: '/tatRecencyReport',
        views: {
          'menuContent': {
            templateUrl: 'templates/tatRecencyReport.html',
            controller: "tatRecencyReportCtrl"
          }
        }
      })
      .state('app.recencyDataWithVl', {
        url: '/recencyDataWithVl',
        views: {
          'menuContent': {
            templateUrl: 'templates/recencyDataWithVl.html',
            controller: "recencyDataWithVlCtrl"
          }
        }
      })
      .state('app.pendingRecencyResult', {
        url: '/pendingRecencyResult',
        views: {
          'menuContent': {
            templateUrl: 'templates/pendingRecencyResult.html',
            controller: "pendingRecencyResultCtrl"
          }
        }
      })
      .state('app.serverQcData', {
        url: '/serverQcData',
        views: {
          'menuContent': {
            templateUrl: 'templates/serverQcData.html',
            controller: "serverQcDataCtrl"
          }
        }
      })

      .state('app.addQcAssurance', {
        url: '/addQcAssurance',
        cache: false,

        views: {
          'menuContent': {
            templateUrl: 'templates/addQcAssurance.html',
            controller: "addQcAssuranceCtrl"
          }
        }
      })
      .state('app.addQcSettings', {
        url: '/addQcSettings',
        views: {
          'menuContent': {
            templateUrl: 'templates/addQcSettings.html',
            controller: "addQcSettingsCtrl"
          }
        }
      })
      .state('app.editTesterInfo', {
        url: '/editTesterInfo/:testerName',
        views: {
          'menuContent': {
            templateUrl: 'templates/editTesterInfo.html',
            controller: "editTesterInfoCtrl"
          }
        }
      })
      .state('app.editSampleInfo', {
        url: '/editSampleInfo/:qcSampleId',
        views: {
          'menuContent': {
            templateUrl: 'templates/editSampleInfo.html',
            controller: "editSampleInfoCtrl"
          }
        }
      })
      .state('app.editLotInfo', {
        url: '/editLotInfo/:testKitLotNo',
        views: {
          'menuContent': {
            templateUrl: 'templates/editLotInfo.html',
            controller: "editLotInfoCtrl"
          }
        }
      })


      .state('app.viewQcAssuranceDetail', {
        url: '/viewQcAssuranceDetail/:patientID',
        views: {
          'menuContent': {
            templateUrl: 'templates/viewQcAssuranceDetail.html',
            controller: "viewQcAssuranceDetailCtrl"
          }
        }
      })
      .state('app.viewRecencyDetail', {
        url: '/viewRecencyDetail/:patientID',
        views: {
          'menuContent': {
            templateUrl: 'templates/viewRecencyDetail.html',
            controller: "viewRecencyDetailCtrl"
          }
        }
      })
      .state('app.techSupport', {
        url: '/techSupport',
        views: {
          'menuContent': {
            templateUrl: 'templates/techSupport.html',
            controller: "techSupportCtrl"
          }
        }
      })

    // Ionic Datepicker Configuration
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Select a Date',
      setLabel: 'Set',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: [],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(1900, 0, 1),
      to: new Date(2040, 11, 31),
      showTodayButton: false,
      dateFormat: 'MMMM yyyy',
      closeOnSelect: false,
      disableWeekdays: []
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj); -
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');

  });
