angular.module('shifts.service', [])
  .factory('ShiftsService', function ($http, $q, LoginService, configuration) {

    /**
     * return a list of all my shifts by my api_key
     */
    var getMyShifts = function () {
      var defer = $q.defer();

      LoginService
        .getApiKey()
        .then(function (token) {
          $http
            .get(configuration.http + '/?p=shifts_json_export&key=' + token)
            .success(function (myShifts) {
              defer.resolve(myShifts);
            })
        });

      return defer.promise;

    };

    return {
      getMyShifts: getMyShifts
    }
  });
