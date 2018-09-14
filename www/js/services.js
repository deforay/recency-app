angular.module('starter.services', [])

.factory('$localStorage', ['$window', function($window) {
        return {
            set: function(key, value) {
                $window.localStorage[key] = value;
            },
            get: function(key, defaultValue) {
                return $window.localStorage[key] || defaultValue;
            },
            setObject: function(key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function(key) {
                return JSON.parse($window.localStorage[key] || '{}');
            },
            remove:function(key) {
              $window.localStorage.removeItem(key);
              //$window.localStorage.removeItem[key] = '';
            }
        }
}])

.factory('backcallFactory', ['$state','$ionicPlatform','$ionicHistory','$timeout','$window','$ionicNavBarDelegate', function($state,$ionicPlatform,$ionicHistory,$timeout,$window,$ionicNavBarDelegate) {
        var obj={}
        
        //obj.backcallfun=function(){
                
                var backbutton=0;
                $ionicPlatform.registerBackButtonAction(function (){
                        
                        if($state.current.name=="app.featured-products"){
                        
                        if(backbutton==0){
                        backbutton++;
                        $window.plugins.toast.showShortCenter('Press again to exit');
                        $timeout(function(){backbutton=0;},5000);
                        }else{
                            navigator.app.exitApp();
                        }
                        }else{
                                $ionicNavBarDelegate.back();
                        }
                },100)
        //}
        return obj;
}])

.factory('$commonService', function($http,$rootScope,$q) {
        return {
                checkNameValidation: function($tableName,$fieldName,$value,$fnct) {
                        // the $http API is based on the deferred/promise APIs exposed by the $q service
                        // so it returns a promise for us by default
                        return $http.post($rootScope.Url+'api/common', {
                                'tableName':$tableName,'fieldName':$fieldName,'value':$value,'fnct':$fnct
                        })
                        //return $http.get($rootScope.Url+'api/branch-sales-list/3')
                        .then(function(response) {
                            if (typeof response.data === 'object') {
                                return response.data;
                            } else {
                                // invalid response
                                return $q.reject(response.data);
                            }
                        }, function(response) {
                            // something went wrong
                            return $q.reject(response.data);
                        });
                }
        };
  })

.factory('$todo',function($http){
    return {
        getAll:function(url){
            return $http.get(url,{
                headers:{
                    //'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    //'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        get:function(url,id){
            return $http.get(url+'/'+id,{
                headers:{
                    //'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    //'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        create:function(url,data){
            return $http.post(url,data,{
                headers:{
                    //'X-Parse-Application-Id': 'xhTpJiNedJ7mmDj3LTTBUePqSVegcJHzEbh70Y0Q',
                    //'X-Parse-REST-API-Key':'XCfQDPODgNB1HqmaCQgKLPWGxQ0lCUxqffzzURJY',
                    'Content-Type':'application/json'
                }
            });
        },
        edit:function(url,id,data){
            return $http.put(url+'/'+id,data,{
                headers:{
                    //'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    //'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        delete:function(id){
            return $http.delete(url+'/'+id,{
                headers:{
                    //'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    //'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        }
    }
})

.factory('$preLoader', function($ionicLoading) {
        return {
                show: function() {
                        $ionicLoading.show({
                        template: '<ion-spinner class="spinner-energized"></ion-spinner>'
                        });
                },
                hide: function() {
                        $ionicLoading.hide();
                }
        }      
})
.factory('$refresh', function($window) {
    return {
            
            page: function() {
                    $window.location.reload(true);
                    //navigator.splashscreen.show();
            }
    }
    
})

  
  


