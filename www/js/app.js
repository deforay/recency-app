// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//angular.module('starter', ['ionic', 'starter.controllers'])
angular.module('starter',  ['ionic',
                            'ionic-datepicker',
                            'ngCordova',
                            'starter.controllers',
                            'starter.services',
                            'starter.loginCtrl',
                            'starter.authCtrl',
                            'starter.recencyDataCtrl',
                            'starter.addRecencyCtrl',
                            'starter.viewRecencyCtrl',
                            'starter.viewRecencyDetailCtrl',
                            'starter.editRecencyCtrl'
                           ])
.run(function($ionicPlatform,$ionicHistory, $localStorage,$ionicPopup,$state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    //$rootScope.apiUrl = 'http://recency.deforay.in/';
    //$rootScope.apiUrl='http://recency-web/';

    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
  // $ionicPlatform.registerBackButtonAction(function(e) {
  //   e.preventDefault();
  //   function showConfirm() {
  // var confirmPopup = $ionicPopup.confirm({
  //   title: 'Recency',
  //   template: '<center>Are you sure want to Exit App?<center>',
  //   buttons: [
  //     {
  //       text: '<b>Yes</b>',
  //       type: 'button-balanced',
  //       onTap: function(e) {
  //         $localStorage.set('logout',true);
  //         ionic.Platform.exitApp();
  //                          }
  //     },
  //     { text: 'Cancel', type: 'button-assertive',onTap: function(e) { return true; } },
  //   ]
  // })
  // };
  //   // Is there a page to go back to?
  //  if ($state.current.name == 'app.addRecency' || $state.current.name == 'app.viewRecency'|| $state.current.name == 'app.recencyData'){
  //     showConfirm();
  //   } else
  //    if ($ionicHistory.backView()) {
  //     // Go back in history
  //     $ionicHistory.backView().go();
  //    }
  //    else
  //   {
  //     showConfirm();
  //   }
  //   return false;
  //  }, 101);
})

.config(function($stateProvider, $urlRouterProvider,ionicDatePickerProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
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
    views: {
      'menuContent': {
        templateUrl: 'templates/addRecency.html',
        controller:"addRecencyCtrl"
      }
    }
  })
  .state('app.editRecency', {
    url: '/editRecency/:patientId',
    views: {
      'menuContent': {
        templateUrl: 'templates/editRecency.html',
        controller:"editRecencyCtrl"
      }
    }
  })
  .state('app.viewRecency', {
      url: '/viewRecency',
      views: {
        'menuContent': {
          templateUrl: 'templates/viewRecency.html',
          controller:"viewRecencyCtrl"
        }
      }
    })
    .state('app.recencyData', {
      url: '/recencyData',
      views: {
        'menuContent': {
          templateUrl: 'templates/recencyData.html',
          controller:"recencyDataCtrl"
        }
      }
    })
    .state('app.auth', {
      url: '/auth',
      views: {
        'menuContent': {
          templateUrl: 'templates/auth.html',
          controller:"authCtrl"
        }
      }
    })
  .state('app.viewRecencyDetail', {
    url: '/viewRecencyDetail/:patientID',
    views: {
      'menuContent': {
        templateUrl: 'templates/viewRecencyDetail.html',
        controller:"viewRecencyDetailCtrl"
      }
    }
  })

  var datePickerObj = {
    inputDate: new Date(),
    titleLabel: 'Select a Date',
    setLabel: 'Set',
    closeLabel: 'Close',
    mondayFirst: false,
    weeksList: ["S", "M", "T", "W", "T", "F", "S"],
    monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
    templateType: 'popup',
    from: new Date(1900, 1, 1),
    to:new Date(2040,12,31),
    showTodayButton: false,
    dateFormat: 'dd MMMM yyyy',
    closeOnSelect: false,
    disableWeekdays: []
  };
  ionicDatePickerProvider.configDatePicker(datePickerObj);
  // .state('app.single', {
  //   url: '/playlists/:playlistId',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/playlist.html',
       
  //     }
  //   }
  // });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');



});
