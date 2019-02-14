
app=angular.module('starter.viewRecencyCtrl', ['starter.services'])

.controller('viewRecencyCtrl', function($scope,$rootScope,$http,$preLoader,$state, $ionicPopup, $cordovaToast, $location,$window, $stateParams,$ionicPlatform,$cordovaLocalNotification, $cordovaBadge) {
   $scope.onLoadRecency = function(){
     $scope.recencyList =[];
     $scope.unSyncCount ='';

    $rootScope.apiUrl = localStorage.getItem('apiUrl');
    var recencyList =   localStorage.getItem('RecencyData');
   if(recencyList != null){
     recencyList    = JSON.parse(recencyList);
     var unsyncount = Object.keys(recencyList).length;
     if($rootScope.recencyUnsyncCount!= undefined){    
    }else{
        $rootScope.recencyUnsyncCount = '(' + unsyncount + ')';
    }
     var result = Object.keys(recencyList).map(function(key,value) {
     return [(key), recencyList[value]];
     });
     for(i=0;i<result.length;i++){
        $scope.recencyList.push(result[i][1])
        }
    $scope.displaymessage = false;        
    }  
    else{
        $rootScope.recencyUnsyncCount ="";
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

   if(recencyList != null){
     recencyList    = JSON.parse(recencyList);
    console.log(recencyList)

     var unsyncount = Object.keys(recencyList).length;
        if($rootScope.recencyUnsyncCount!= undefined){
        }else{
    $rootScope.recencyUnsyncCount = '(' + unsyncount + ')';
        }
     var result = Object.keys(recencyList).map(function(key,value) {
     return [(key), recencyList[value]];
     });
     for(i=0;i<result.length;i++){
        $scope.recencyList.push(result[i][1])
        }
    $scope.displaymessage = false;        
    }  
    else{
        $rootScope.recencyUnsyncCount ="";
        $scope.syncCount =   localStorage.getItem('syncCount');
        if($scope.syncCount== undefined || $scope.syncCount == ""){
              $scope.syncCount = 0;
            //  localStorage.setItem('syncCount', $scope.syncCount);
            // console.log($scope.syncCount);
        }
    $scope.displaymessage = true;
    }   
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
            $preLoader.hide();

                $ionicPopup.alert({title:'Alert!',template:'<center>There are no records to sync.</center>'});
            }else{
           
                for(i=0;i<$scope.recencyList.length;i++){
                    $scope.recencyList[i].syncedBy = localStorage.getItem('userId');
                    var currentdatetime = new Date();
                    $scope.recencyList[i].formTransferDateTime = currentdatetime.getFullYear() + "-"
                    + (currentdatetime.getMonth()+1)  + "-" 
                    + currentdatetime.getDate() + " "
                    + currentdatetime.getHours() + ":"  
                    + currentdatetime.getMinutes() + ":" 
                    + currentdatetime.getSeconds();
                                    
                }
                $preLoader.show();
         
            $http.post( $rootScope.apiUrl+"/api/recency",{
                "form":$scope.recencyList
  
            })
            .success(function(data){
               if(data.status=='failed'){
                $preLoader.hide();

                $ionicPopup.alert({title:'Failed!',template:data.message});
               }
               else{
                    console.log(data)
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

                     $preLoader.hide();

                        //  $cordovaToast.show('Data has been Successfully Synced', 'long', 'bottom')
                        //  .then(function(success) {
                        //       // success
                        //   }, function (error) {
                        //       // error
                        //   });
                    
                   $scope.onLoadRecency();

                    
               }
                    
            })
            .error(function(){
                $preLoader.hide();

                $ionicPopup.alert({title:data.response});
            });
        }
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