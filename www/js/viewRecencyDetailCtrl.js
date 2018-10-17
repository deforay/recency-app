
app=angular.module('starter.viewRecencyDetailCtrl', ['starter.services'])

.controller('viewRecencyDetailCtrl', function($scope,  $window,$rootScope, $stateParams) {
   // console.log( $rootScope.recencyDetail);
  
  $scope.displaybadge = false;

    $scope.doRefresh = function() {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
    };
  
    $scope.recencyDetail = JSON.parse(localStorage.getItem('viewRecency'));
   // console.log($scope.recencyDetail)

    $scope.editRecency = function(recency){
      //console.log(viewRecency);
      $scope.recencyDetail = recency;
    //  console.log($scope.recencyDetail)
      $window.location.href = '#/app/editRecency/'+recency.patientId;
  
  }

})
.filter('replace', [function () {

    return function (input, from, to) {
      
      if(input === undefined) {
        return;
      }
  
      var regex = new RegExp(from, 'g');
      return   input.replace(regex, to);

       
    };
  
  
  }]);