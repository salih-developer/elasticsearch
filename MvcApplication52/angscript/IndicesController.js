app.controller("indicesController", function ($scope, esService, $http, $cookieStore) {
    $scope.allindices = null;
    $scope.GetIndices = function () {
        esService.getallproperties($cookieStore.get("ipaddres")).success(function (data) {
            $scope.allindices = data;
        });
    };
    $scope.GetIndices();

    $scope.allnodes = null;
    $scope.GetNodes = function () {
        esService.getNodes($cookieStore.get("ipaddres")).success(function (data) {
            $scope.allnodes = data;
        });
    };
    $scope.GetNodes();
});