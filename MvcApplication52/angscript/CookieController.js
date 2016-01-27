app.controller('CookieController', function ($rootScope, $scope, $cookies) {
    $scope.setcookie = function (key, value) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 365);
        $cookies.put(key, value, { 'expires': expireDate });
    };

    $scope.removecookie = function (key) {
        $cookies.remove(key);
    };
    $scope.getcookie = function (key) {
        $cookies.remove(key);
    };

    $scope.setIpAddress = function () {
        $scope.setcookie("ipaddres", $scope.ipadress.trim());
        location.reload();
    };

    $scope.getIpAddress = function () {
        $scope.ipadress = $cookies.get('ipaddres');
        if ($scope.ipadress == null) {
            $scope.ipadress = '"http://localhost:9200/"';
            $scope.setIpAddress();
        }
    };
    $scope.getIpAddress();
});