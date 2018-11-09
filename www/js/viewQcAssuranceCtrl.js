
app=angular.module('starter.viewQcAssuranceCtrl', ['starter.services'])

.controller('viewQcAssuranceCtrl', function($scope,$rootScope,$http,$preLoader, $ionicPopup, $cordovaToast, $location,$window, $stateParams,$ionicPlatform,$cordovaLocalNotification, $cordovaBadge) {
    $rootScope.apiUrl = localStorage.getItem('apiUrl');
    var QCDataList =   localStorage.getItem('QCData');
  console.log(QCDataList)

   if(QCDataList != null){
     QCDataList    = JSON.parse(QCDataList);
    // console.log(QCDataList);
     var unsyncount = Object.keys(QCDataList).length;
     $scope.unSyncQcCount ="("+unsyncount+")";
     var result = Object.keys(QCDataList).map(function(key,value) {
     return [(key), QCDataList[value]];
     });
     $scope.QCDataList =[];
     for(i=0;i<result.length;i++){
        $scope.QCDataList.push(result[i][1])
        }
    $scope.displaymessage = false;        
    }  
    else{
        $scope.unSyncQcCount ="";
        $scope.syncQcCount =   localStorage.getItem('syncQcCount');
        if($scope.syncQcCount== undefined || $scope.syncQcCount == ""){
              $scope.syncQcCount = 0;
            //  localStorage.setItem('syncQcCount', $scope.syncQcCount);
            // console.log($scope.syncQcCount);
        }
    $scope.displaymessage = true;
    }   
  var qcdatas = $scope.QCDataList;
    //   console.log(qcdatas)
        $scope.doRefresh = function() {
            $preLoader.show();
            $window.location.reload(true);
            $preLoader.hide();
            
          }
        $scope.syncnow = function(){
            console.log($scope.QCDataList)
            if($scope.displaymessage== true){
                $ionicPopup.alert({title:'Alert!',template:'<center>No Records to Sync </center>'});
            }
            $http.post( $rootScope.apiUrl+"/api/quality-check",{
                "qc":$scope.QCDataList
  
            })
            .success(function(data){
               console.log(data);
                 $scope.response =data.syncData.response;
                  $scope.syncQcCount =data.syncCount.response[0].Total;
                 localStorage.setItem('syncQcCount', $scope.syncQcCount)

                 for(i=0;i< $scope.response.length;i++){
                  $scope.QCDataList.splice(i);
                }
                localStorage.setItem('QCData',$scope.QCDataList);
                         if(localStorage.getItem('QCData')=="")
                          {
                         localStorage.removeItem('QCData');
                          } 
                 localStorage.setItem('qccounter',0);
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
        

$scope.viewqc = function(viewqc,index){
   // console.log(viewqc,index);
    $rootScope.viewqcDetail = viewqc;
    viewqc.index = index;
    localStorage.setItem('viewQcAssurance',JSON.stringify(viewqc));
    $window.location.href = '#/app/viewQcAssuranceDetail/'+viewqc.qcsampleId;

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