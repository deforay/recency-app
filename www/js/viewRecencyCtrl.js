
app=angular.module('starter.viewRecencyCtrl', ['starter.services'])

.controller('viewRecencyCtrl', function($scope,$rootScope,$http,$preLoader, $ionicPopup, $cordovaToast, $location,$window, $stateParams,$ionicPlatform,$cordovaLocalNotification, $cordovaBadge) {
    $rootScope.apiUrl = localStorage.getItem('apiUrl');
    var recencyList =   localStorage.getItem('RecencyData');
   // console.log(recencyList)

//document.addEventListener('deviceready', function () {

    // $cordovaBadge.hasPermission().then(function(result) {
    //     $cordovaBadge.set(5);
    //     console.log($cordovaBadge.set(5));
    //     console.log("hi")
    // }, function(error) {
    //     alert(error);
    // });
// console.log(cordova.plugins.notification.badge.set(5));
// console.log(cordova.plugins.notification.local.getDefaults());
// cordova.plugins.notification.local.setDefaults({
//    badge:5,
//     vibrate: false
// });
// $cordovaLocalNotification.schedule({
//     id: 1,
//     badge:10,
//     title: 'Title here',
//     text: 'Text here',
//     data: {
//       customProperty: 'custom value'
//     }
//   }).then(function (result) {
//       console.log(result)
// cordova.plugins.notification.badge.set(10);
//   });
// }, false);

   if(recencyList != null){
     recencyList    = JSON.parse(recencyList);
     console.log(recencyList);
     var unsyncount = Object.keys(recencyList).length;
     $scope.unSyncCount ="("+unsyncount+")";
     var result = Object.keys(recencyList).map(function(key,value) {
     return [(key), recencyList[value]];
     });
     $scope.recencyList =[];
     for(i=0;i<result.length;i++){
        $scope.recencyList.push(result[i][1])
        }
    $scope.displaymessage = false;        
    }  
    else{
        $scope.unSyncCount ="";
        $scope.syncCount =   localStorage.getItem('syncCount');
        if($scope.syncCount== undefined || $scope.syncCount == ""){
              $scope.syncCount = 0;
            //  localStorage.setItem('syncCount', $scope.syncCount);
            // console.log($scope.syncCount);
        }
    $scope.displaymessage = true;
    }   
  var recencydatas = $scope.recencyList;
      //  console.log(recencydatas)
        $scope.doRefresh = function() {
            $preLoader.show();
            $window.location.reload(true);
            $preLoader.hide();
            
          }
        $scope.syncnow = function(){
            console.log($scope.recencyList)
            if($scope.displaymessage== true){
                $ionicPopup.alert({title:'Alert!',template:'<center>No Records to Sync </center>'});
            }
            $http.post( $rootScope.apiUrl+"/api/recency",{
                "form":$scope.recencyList
  
            })
            .success(function(data){
               console.log(data.syncData.response);
                $scope.response =data.syncData.response;
                $scope.syncCount =data.syncCount.response[0].Total;
                localStorage.setItem('syncCount', $scope.syncCount)
               // console.log(data.syncCount.response[0].Total);

                for(i=0;i< $scope.response.length;i++){
                  //  console.log($scope.recencyList[i])
                  $scope.recencyList.splice(i);
                }
             //   console.log( $scope.recencyList)
                localStorage.setItem('RecencyData',$scope.recencyList);
                         if(localStorage.getItem('RecencyData')=="")
                          {
                         localStorage.removeItem('RecencyData');
                          } 
                 localStorage.setItem('counter',0);
                 $cordovaToast.show('Data has been Successfully Synced', 'long', 'bottom')
                 .then(function(success) {
                      // success
                  }, function (error) {
                      // error
                  });
                 $window.location.reload(true);
            })
            .error(function(){
                console.log(data);
                $ionicPopup.alert({title:data.response});
            });
        }
        

$scope.viewRecency = function(recency,index){
    console.log(recency,index);
    $rootScope.recencyDetail = recency;
    recency.index = index;
    localStorage.setItem('viewRecency',JSON.stringify(recency));
    $window.location.href = '#/app/viewRecencyDetail/'+recency.patientId;

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