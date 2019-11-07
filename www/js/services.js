angular.module('starter.services', [])

  .factory('$localStorage', ['$window', function ($window) {
    return {
      set: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      setObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key) {
        return JSON.parse($window.localStorage[key] || '{}');
      },
      remove: function (key) {
        $window.localStorage.removeItem(key);

      }
    }
  }])

  .factory('$todo', function ($http) {
    return {
      getAll: function (url) {
        return $http.get(url, {
          headers: {
            //'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            //'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
          }
        });
      },
      get: function (url, id) {
        return $http.get(url + '/' + id, {
          headers: {
            //'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            //'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
          }
        });
      },
      create: function (url, data) {
        return $http.post(url, data, {
          headers: {
            //'X-Parse-Application-Id': 'xhTpJiNedJ7mmDj3LTTBUePqSVegcJHzEbh70Y0Q',
            //'X-Parse-REST-API-Key':'XCfQDPODgNB1HqmaCQgKLPWGxQ0lCUxqffzzURJY',
            'Content-Type': 'application/json'
          }
        });
      },
      edit: function (url, id, data) {
        return $http.put(url + '/' + id, data, {
          headers: {
            //'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            //'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            'Content-Type': 'application/json'
          }
        });
      },
      delete: function (id) {
        return $http.delete(url + '/' + id, {
          headers: {
            //'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
            //'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
            'Content-Type': 'application/json'
          }
        });
      }
    }
  })

  .factory('$preLoader', function ($ionicLoading) {
    return {
      show: function () {
        $ionicLoading.show({
          template: '<ion-spinner class="spinner-energized"></ion-spinner>'
        });
      },
      hide: function () {
        $ionicLoading.hide();
      }
    }
  })
  .factory('$refresh', function ($window) {
    return {

      page: function () {
        $window.location.reload(true);
        //navigator.splashscreen.show();
      }
    }
  })

  .factory('$syncDataLimit', function ($rootScope) {
    return {
      setSyncDataLimit: function () {
        return $rootScope.dataLimit=2;
      }
    }
  })
  .factory('$secretKey',  function ($window,$rootScope)  {
    return {
      getSecretKey: function () {
      //  return $rootScope.secretKey='secretkeyissecretphrasesecretphr';
        return $rootScope.secretKey = $window.localStorage.getItem('secretKey')
      }
    }
  })
