angular.module('shifts.controller', [])
  .controller('ShiftsCtrl', function ($scope, ShiftsService) {
    ShiftsService
      .getMyShifts()
      .then(function (shifts) {
        $scope.shifts = shifts;
      });
  });
