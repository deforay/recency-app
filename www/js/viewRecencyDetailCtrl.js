
app=angular.module('starter.viewRecencyDetailCtrl', ['starter.services'])

.controller('viewRecencyDetailCtrl', function($scope,$rootScope, $stateParams) {
    console.log( $rootScope.recencyDetail)
});