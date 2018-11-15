
app=angular.module('starter.viewQcAssuranceCtrl', ['starter.services'])

.controller('viewQcAssuranceCtrl', function($scope,$rootScope,$http,$q,$preLoader, $ionicPopup, $cordovaToast, $location,$window, $stateParams,$ionicPlatform,$cordovaLocalNotification, $cordovaBadge) {
    $rootScope.apiUrl = localStorage.getItem('apiUrl');
    var QCDataList =   localStorage.getItem('QCData');
  //console.log(QCDataList)
  $scope.NewQcDataList = [];
  $scope.NewQcObj = [];
  $scope.limitTo = 2;
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
var qclen = $scope.QCDataList.length
    console.log($scope.QCDataList[qclen-1]);



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

//   $scope.NewQcDataList = Object.assign({}, $scope.QCDataList);
//  console.log( $scope.QCDataList)
//  console.log( $scope.NewQcDataList)
  


        $scope.doRefresh = function() {
            $preLoader.show();
            $window.location.reload(true);
            $preLoader.hide();
            
          }

          $scope.syncnow = function(){
            if($scope.displaymessage== true){
                $ionicPopup.alert({title:'Alert!',template:'<center>No Records to Sync </center>'});
            }
            console.log($scope.QCDataList);
                 $http.post( $rootScope.apiUrl+"/api/quality-check",{
                "qc":$scope.QCDataList
  
            })
            .success(function(data){
               console.log(data);
             if(data.status=='failed'){
                $ionicPopup.alert({title:'Failed',template:data.message});                
             }
             else
             {
                $scope.response =data.syncData.response;
                $scope.syncQcCount =data.syncCount.response[0].Total;
                $scope.tenRecord = data.syncCount.tenRecord;
                console.log($scope.tenRecord)
                localStorage.setItem('lastTenQcData',JSON.stringify($scope.tenRecord) )
               localStorage.setItem('syncQcCount', $scope.syncQcCount)
               var responselen = $scope.response.length ;
               console.log($scope.QCDataList[responselen - 1].testerName);
               var currentdate = new Date();
               localStorage.setItem('LastTesterName',$scope.QCDataList[responselen - 1].testerName)
               localStorage.setItem('LastTestDate',currentdate)
 
                    for(i=0;i< $scope.response.length;i++){
                          $scope.QCDataList.splice(i);
                     }
                     console.log( $scope.QCDataList)
              localStorage.setItem('QCData',$scope.QCDataList);
                       if(localStorage.getItem('QCData')=="")
                        {
                       localStorage.removeItem('QCData');
                       localStorage.removeItem('QcStartDate');
                       localStorage.removeItem('QcAlertDate');
                        } 
               localStorage.setItem('qccounter',0);
                  $cordovaToast.show('Data has been Successfully Synced', 'long', 'bottom')
                  .then(function(success) {
                       // success
                   }, function (error) {
                        // error
                   });
                 $window.location.reload(true);
             }
            })
            .error(function(data){
                console.log(data);
                $ionicPopup.alert({title:data.response});
            });
          }


        $scope.syncnows = function(){
            if($scope.displaymessage== true){
                $ionicPopup.alert({title:'Alert!',template:'<center>No Records to Sync </center>'});
            }
            console.log($scope.QCDataList)
            var loopCount = Math.floor($scope.QCDataList.length / $scope.limitTo);
            var loopReminder = $scope.QCDataList.length % $scope.limitTo;
            console.log(loopReminder);
         for(i=0;i<=loopCount;i++){
           //  console.log(loopCount);  
           var deferred = $q.defer();
  
           if(loopReminder == $scope.QCDataList.length){
            $scope.NewQcObj = $scope.QCDataList.splice(0,loopReminder);
           }else{
            $scope.NewQcObj = $scope.QCDataList.splice(0,loopCount);
           }
            console.log($scope.NewQcObj);
            console.log($scope.QCDataList);

            $http.post( $rootScope.apiUrl+"/api/quality-check",{
                "qc":$scope.NewQcObj
            })
            .success(function(data){
                console.log(data);
            //console.log($scope.NewQcObj);

                // $scope.NewQcObj = [];
              if(data.status=='failed'){
                 $ionicPopup.alert({title:'Failed',template:data.message});                
              }
              else
              {
                 $scope.response =data.syncData.response;
                 $scope.syncQcCount =data.syncCount.response[0].Total;
                 deferred.resolve();

                localStorage.setItem('syncQcCount', $scope.syncQcCount);
                for(i=0;i<$scope.response.length;i++){
                    console.log("hi");
                }
              }
             })
             .error(function(data){
                 console.log(data);
                 $ionicPopup.alert({title:data.response});
             });
        }
        return deferred.promise;
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