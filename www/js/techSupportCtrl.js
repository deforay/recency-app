
app=angular.module('starter.techSupportCtrl', ['starter.services'])

.controller('techSupportCtrl', function($scope,  $window,$rootScope, $stateParams) {


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