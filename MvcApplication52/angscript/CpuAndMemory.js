app.controller("cpuandmemory", function ($scope, esService, $cookieStore,$interval) {

    $scope.allnodes = null;
    $scope.GetNodes = function () {
        esService.getNodes($cookieStore.get("ipaddres")).success(function (data) {
            $scope.allnodes = data;
        });
    };
    $scope.GetNodes();

    var data1 = [[[0, 10], [1, 5], [2, 2]]];

    $scope.data = data1;
    $scope.data1 = data1;

    //$scope.change = function (node) {
    //    $scope.timerData(node);
    //};


    $scope.timerData = function(node) {
        var interval = $interval(function () {
            esService.getcpuandmemory($cookieStore.get("ipaddres"), node).success(function (data) {
                $scope.data = data;
                console.log(data.toString());
            });
        }, 20000);

    };

    $scope.timerData1 = function (node) {
        var interval = $interval(function () {
            esService.getcpuandmemory($cookieStore.get("ipaddres"), node).success(function (data) {
                $scope.data1 = data;
                console.log(data.toString());
            });
        }, 20000);

    };
   
});


