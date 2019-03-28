
app=angular.module('starter.viewQcAssuranceCtrl', ['starter.services'])

.controller('viewQcAssuranceCtrl', function($scope,$rootScope,$http,$q,$preLoader, $ionicPopup, $cordovaToast, $location,$window, $stateParams,$ionicPlatform,$cordovaLocalNotification, $cordovaBadge) {
   
 $scope.onLoadQc = function(){

  $rootScope.apiUrl = localStorage.getItem('apiUrl');
  var QCDataList =   localStorage.getItem('QCData');
  $scope.NewQcDataList = [];
  $scope.NewQcObj = [];
  $scope.limitTo = 2;
   if(QCDataList != null){
     QCDataList    = JSON.parse(QCDataList);
    var unSyncQcCount = Object.keys(QCDataList).length;
    if($rootScope.qcUnsynCount!= undefined){
   }else{
       $rootScope.qcUnsynCount = '(' + unSyncQcCount + ')';
   }
     var result = Object.keys(QCDataList).map(function(key,value) {
     return [(key), QCDataList[value]];
     });
     $scope.QCDataList =[];
     for(i=0;i<result.length;i++){
        $scope.QCDataList.push(result[i][1])
        }
    $scope.displaymessage = false;        
    var qclen = $scope.QCDataList.length
    }  
    else{
        $rootScope.qcUnsynCount ="";
        $scope.syncQcCount =   localStorage.getItem('syncQcCount');
        if($scope.syncQcCount== undefined || $scope.syncQcCount == ""){
              $scope.syncQcCount = 0;
        }
    $scope.displaymessage = true;
    }   
}

$scope.$on("$ionicView.beforeEnter", function(event, data){
    $rootScope.apiUrl = localStorage.getItem('apiUrl');
  var QCDataList =   localStorage.getItem('QCData');
  $scope.NewQcDataList = [];
  $scope.NewQcObj = [];
  $scope.limitTo = 2;
   if(QCDataList != null){
     QCDataList    = JSON.parse(QCDataList);
    //console.log(QCDataList);
    var unSyncQcCount = Object.keys(QCDataList).length;
     if($rootScope.qcUnsynCount!= undefined){
       // console.log($rootScope.qcUnsynCount)
    }else{
        $rootScope.qcUnsynCount = '(' + unSyncQcCount + ')';
    }
     var result = Object.keys(QCDataList).map(function(key,value) {
     return [(key), QCDataList[value]];
     });
     $scope.QCDataList =[];
     for(i=0;i<result.length;i++){
        $scope.QCDataList.push(result[i][1])
        }
    $scope.displaymessage = false;        
    var qclen = $scope.QCDataList.length
   // console.log($scope.QCDataList[qclen-1]);
    }  
    else{
        $rootScope.qcUnsynCount ="";
        $scope.syncQcCount =   localStorage.getItem('syncQcCount');
        if($scope.syncQcCount== undefined || $scope.syncQcCount == ""){
              $scope.syncQcCount = 0;

        }
    $scope.displaymessage = true;
    }   
});
  var qcdatas = $scope.QCDataList;


  
$scope.$on("$ionicView.Enter", function(event, data){
   // console.log($scope.unSyncQcCount)

});

$scope.doRefresh = function() {
  $preLoader.show();
  $window.location.reload(true);
  $preLoader.hide();  
}

          $scope.syncnow = function(){
            if($scope.displaymessage== true){
                $ionicPopup.alert({title:'Alert!',template:'<center>There are no records to sync.</center>'});
            }else{

            for(i=0;i<$scope.QCDataList.length;i++){
                $scope.QCDataList[i].syncedBy = localStorage.getItem('userId');
                var currentdatetime = new Date();
                $scope.QCDataList[i].formTransferDateTime = currentdatetime.getFullYear() + "-"
                + (currentdatetime.getMonth()+1)  + "-" 
                + currentdatetime.getDate() + " "
                + currentdatetime.getHours() + ":"  
                + currentdatetime.getMinutes() + ":" 
                + currentdatetime.getSeconds();
            }
            //console.log($scope.QCDataList);

           
            $preLoader.show();

                 $http.post( $rootScope.apiUrl+"/api/quality-check",{
                "qc":$scope.QCDataList
  
            })
            .success(function(data){
            
             //  console.log(data);
             if(data.status=='failed'){
                $preLoader.hide();

                $ionicPopup.alert({title:'Failed',template:data.message});                
             }
             else
             {
                $scope.response =data.syncData.response;
                $scope.syncQcCount =data.syncCount.response[0].Total;
                $scope.tenRecord = data.syncCount.tenRecord;
                localStorage.setItem('lastTenQcData',JSON.stringify($scope.tenRecord) )
                localStorage.setItem('syncQcCount', $scope.syncQcCount)
                var responselen = $scope.response.length ;
                var currentdate = new Date();
                localStorage.setItem('LastTesterName',$scope.QCDataList[responselen - 1].testerName)
                localStorage.setItem('LastTestDate',currentdate)
                console.log($scope.response);
                for(i=0;i< $scope.response.length;i++){
                          $scope.QCDataList.splice(i);
                }
                console.log( $scope.QCDataList)
                if($scope.QCDataList.length==0)
                {
                   localStorage.setItem('QCData',($scope.QCDataList));
                }
                else
                {
                   localStorage.setItem('QCData',JSON.stringify($scope.QCDataList));
                }
                if(localStorage.getItem('QCData')=="")
                    {
                       localStorage.removeItem('QCData');
                       localStorage.removeItem('QcStartDate');
                       localStorage.removeItem('QcAlertDate');
                    } 
                    localStorage.setItem('counter',$scope.QCDataList.length);
                    $preLoader.hide();

                  $cordovaToast.show('Data has been Successfully Synced', 'long', 'bottom')
                  .then(function(success) {
                       // success
                   }, function (error) {
                        // error
                   });
                    $scope.onLoadQc();
             }
            })
            .error(function(data){
                $preLoader.hide();

               // console.log(data);
                $ionicPopup.alert({title:data.response});
            });
        }
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