
app=angular.module('starter.viewRecencyCtrl', ['starter.services'])

.controller('viewRecencyCtrl', function($scope,$rootScope,$http,$preLoader,$state, $ionicPopup, $cordovaToast, $location,$window, $stateParams,$ionicPlatform,$cordovaLocalNotification, $cordovaBadge) {
   $scope.onLoadRecency = function(){
     $scope.recencyList =[];
     $scope.unSyncCount ='';

    $rootScope.apiUrl = localStorage.getItem('apiUrl');
    var recencyList =   localStorage.getItem('RecencyData');
  //console.log(recencyList)
   if(recencyList != null){
     recencyList    = JSON.parse(recencyList);
    console.log(recencyList);
     var unsyncount = Object.keys(recencyList).length;
     var ss = '-'
     $scope.unSyncCount = ss+unsyncount;
     $scope.unSyncCount1 ='(2)';
     console.log($scope.unSyncCount1)

     var result = Object.keys(recencyList).map(function(key,value) {
     return [(key), recencyList[value]];
     });
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
}
$scope.$on("$ionicView.beforeEnter", function(event, data){
    $scope.recencyList =[];
    $scope.unSyncCount ='';

    $rootScope.apiUrl = localStorage.getItem('apiUrl');
    var recencyList =   localStorage.getItem('RecencyData');
//  console.log(recencyList)
   if(recencyList != null){
     recencyList    = JSON.parse(recencyList);
    console.log(recencyList);
     var unsyncount = Object.keys(recencyList).length;
     var ss = '-'
     $scope.unSyncCount = ss+unsyncount;
     $scope.unSyncCount1 ='(2)';
     console.log($scope.unSyncCount1)
     var result = Object.keys(recencyList).map(function(key,value) {
     return [(key), recencyList[value]];
     });
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
});

$scope.$on('$ionicView.afterEnter', function(){
  // Anything you can think of
  $scope.unSyncCount1 ='(2)';
console.log($scope.unSyncCount1)
});
  var recencydatas = $scope.recencyList;
    //   console.log(recencydatas)
        $scope.doRefresh = function() {
            $preLoader.show();
            $window.location.reload(true);
            $preLoader.hide();
            
          }
        $scope.syncnow = function(){
           if($scope.displaymessage== true){
                $ionicPopup.alert({title:'Alert!',template:'<center>No Records to Sync </center>'});
            }
            console.log($scope.recencyList)

            // for(i=0;i<$scope.recencyList.length;i++){
            //     $scope.noOfItemsToSync = 2;
            //     $scope.recencyList.slice()
            // }
         
            $http.post( $rootScope.apiUrl+"/api/recency",{
                "form":$scope.recencyList
  
            })
            .success(function(data){
               console.log(data);
               if(data.status=='failed'){
                $ionicPopup.alert({title:'Failed!',template:data.message});
               }
               else{
                $scope.response =data.syncData.response;
                    $scope.syncCount =data.syncCount.response[0].Total;
                    localStorage.setItem('syncCount', $scope.syncCount)

                    for(i=0;i< $scope.response.length;i++){
                      $scope.recencyList.splice(i);
                    }
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
                 
                    $scope.onLoadRecency();
                    //Do not use Reload
                     // $window.location.reload(true);
                    
               }
                    
            })
            .error(function(){
                console.log(data);
                $ionicPopup.alert({title:data.response});
            });
        }
        

$scope.viewRecency = function(recency,index){
   // console.log(recency,index);
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