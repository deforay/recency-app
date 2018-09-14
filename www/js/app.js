// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//angular.module('starter', ['ionic', 'starter.controllers'])
angular.module('starter', ['ionic',
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
.run(function($ionicPlatform,$rootScope) {
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
})

.config(function($stateProvider, $urlRouterProvider) {
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
  //   .state('app.playlists', {
  //     url: '/playlists',
  //     views: {
  //       'menuContent': {
  //         templateUrl: 'templates/playlists.html',
         
  //       }
  //     }
  //   })

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
