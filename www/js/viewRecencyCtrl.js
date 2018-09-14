
app=angular.module('starter.viewRecencyCtrl', ['starter.services'])

.controller('viewRecencyCtrl', function($scope,$rootScope,$http,$preLoader, $ionicPopup, $location,$window, $stateParams) {
    $rootScope.apiUrl = localStorage.getItem('apiUrl');
    var recencyList =   localStorage.getItem('RecencyData');
if(recencyList != null){
        recencyList    = JSON.parse(recencyList);
        console.log(recencyList);
        var result = Object.keys(recencyList).map(function(key,value) {
             return [(key), recencyList[value]];
        });
        $scope.recencyList =[];
    for(i=0;i<result.length;i++){
         $scope.recencyList.push(result[i][1])
      
    //      console.log( "Xx" + $scope.recencyList[i].patientId.slice(2));
    }
        var recencydatas = $scope.recencyList;
        console.log(recencydatas)
$scope.success =[];
        $scope.syncnow = function(){
            console.log($scope.recencyList)
            $http.post( $rootScope.apiUrl+"/api/recency",{
                "form":$scope.recencyList
  
            })
            .success(function(data){
                console.log(data.response);
                var responselen = Object.keys(data.response).length;
                console.log(responselen);
                $scope.success.push(data.response);
                console.log($scope.success);
                angular.forEach($scope.recencyList, function(recencyval, recencykey) {
                    angular.forEach($scope.success[0], function(resval, reskey) {
                        if (recencykey === reskey -1) {
                            console.log(recencykey,reskey -1);
                            if(reskey -1 .resval == "success"){
                                console.log( $scope.recencyList)

                            }
                            // condition or action
                        }
                    });
                    console.log( $scope.recencyList)
                })
            })
            .error(function(){
                console.log(data);
                $ionicPopup.alert({title:data.response});
            });
        }
        

        }
$scope.viewRecency = function(viewRecency){
    console.log(viewRecency);
    $rootScope.recencyDetail = viewRecency;
    $window.location.href = '#/app/viewRecencyDetail/'+viewRecency.patientId;

}

});