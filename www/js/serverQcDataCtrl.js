
app=angular.module('starter.serverQcDataCtrl', ['starter.services'])

.controller('serverQcDataCtrl', function($scope,$rootScope,$cordovaToast,$localStorage,$http,$preLoader, $ionicPopup, $location,$window, $stateParams) {
   
  // $scope.displaybadge = false;

        $rootScope.apiUrl = localStorage.getItem('apiUrl');
    var lastQCDatas =   localStorage.getItem('lastTenQcData');
  if(lastQCDatas != null){
    lastQCDatas    = JSON.parse(lastQCDatas);
    var result = Object.keys(lastQCDatas).map(function(key,value) {
      return [(key), lastQCDatas[value]];
      });
      
      $scope.lastQCDatas =[];
      for(i=0;i<result.length;i++){
        $scope.lastQCDatas.push(result[i][1])
        }
        $scope.displaymessage = false;        
  }else{
    $scope.displaymessage = true;

  }
 
console.log($scope.lastQCDatas)
        $scope.init = function(){
          if(localStorage.getItem('ServerRecencyData')=='logout' || localStorage.getItem('ServerRecencyData')=='success' ){
            $scope.showauth = true;
          }else
          {
   
            $preLoader.show();
          $http({
            url: $rootScope.apiUrl+"/api/login",
            method: "POST",
            data: { "email": $localStorage.get('email'), "password" : $localStorage.get('serverpassword') }
        }).then(function successCallback(response) {
               console.log(response.data);
               if(response.data.status =="success"){
                  $localStorage.set('authToken',response.data.userDetails['authToken']);
                  
                 $http.get($localStorage.get('apiUrl')+'/api/recency?authToken='+$localStorage.get('authToken'))
                 .then(function(response) {
                   if(response.data.status =="success"){
                    $localStorage.set('ServerRecencyData','login');
                    $preLoader.hide();
                      $scope.showauth = false;   
                      console.log( response.data.recency) 
                      $preLoader.show();
                      $scope.recencyDatas =response.data.recency;
                      for(i=0;i<$scope.recencyDatas.length;i++)
                      {
                        $scope.recencyDatas[i].patient_id = "Xx" + $scope.recencyDatas[i].patient_id.slice(2);
                      }
                      $preLoader.hide()
                   }
                   else{
                    $preLoader.hide();
                    $scope.showauth = true;
                    $ionicPopup.alert({title:"Authentication Failed !",template:'<center>'+response.data.message+'</center>'});
                       }
                 })
               }
               else{
                console.log(response.data);
                $preLoader.hide();
                $ionicPopup.alert({title:'Authentication Failed!',template:response.data.message});

               }
        });
            $scope.showauth = false;
          }
         console.log( $scope.showauth)
        }
        $scope.init();
        $scope.doRefresh = function() {
          $preLoader.show();
          $window.location.reload(true);
          $preLoader.hide(); 
        }


})


.filter('replace', [function () {

  return function (input, from, to) {
    
    if(input === undefined) {
      return;
    }

    var regex = new RegExp(from, 'g');
    input.replace(regex, to);
    return  input.replace(regex, to);
  
     
  };


}]);