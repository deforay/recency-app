app = angular.module('starter.viewRecencyDetailCtrl', ['starter.services'])

  .controller('viewRecencyDetailCtrl', function ($scope, $window, $rootScope, $stateParams) {
    console.log($rootScope.recencyDetail);

    $scope.displaybadge = false;

    $scope.doRefresh = function () {
      $preLoader.show();
      $window.location.reload(true);
      $preLoader.hide();
    };

    $scope.recencyDetail = JSON.parse(localStorage.getItem('viewRecency'));

    $scope.editRecency = function (recency) {
      $scope.recencyDetail = recency;
      $window.location.href = '#/app/editRecency/' + recency.unique_id;
    }

  })
  .filter('replace', [function () {

    return function (input, from, to) {
      if (input === undefined) {
        return;
      }

      var regex = new RegExp(from, 'g');
      return input.replace(regex, to);
    };

  }]);
