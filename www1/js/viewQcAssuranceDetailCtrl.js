
app=angular.module('starter.viewQcAssuranceDetailCtrl', ['starter.services'])

.controller('viewQcAssuranceDetailCtrl', function($scope,  $window,$rootScope, $stateParams) {
 // console.log( $rootScope.viewqcDetail);
  
  $scope.displaybadge = false;

    $scope.doRefresh = function() {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
    };
  
    $scope.viewqcDetail = JSON.parse(localStorage.getItem('viewQcAssurance'));
    console.log($scope.viewqcDetail)

  //   $scope.editRecency = function(recency){
  //     //console.log(viewRecency);
  //     $scope.viewqcDetail = recency;
  //   //  console.log($scope.viewqcDetail)
  //     $window.location.href = '#/app/editRecency/'+recency.patientId;
  
  // }

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