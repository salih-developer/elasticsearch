var app = angular.module('sites', ['infinite-scroll']);
app.controller("MenuController", function ($scope, $http, Reddit) {
    $scope.menus = [
              {
                  "key": 6003,
                  "value": "Emlak"
              },
              {
                  "key": 6007,
                  "value": "Vasıta"
              }];

    $scope.sendPost = function (id) {
        $http.get("/home/GetCategoryById?id=" + id).success(function (data) {
            $scope.menus = data;
        });
    }
    $scope.reddit = new Reddit();
});


// Reddit constructor function to encapsulate HTTP and pagination logic
app.factory('Reddit', function ($http) {
    var Reddit = function () {
        this.items = [];
        this.busy = false;
        this.after = '';
    };

    Reddit.prototype.nextPage = function () {
        if (this.busy) return;
        this.busy = true;
        var url = "http://api.reddit.com/hot?after=" + this.after + "&jsonp=JSON_CALLBACK";
        $http.jsonp(url).success(function (data) {
            var items = data.data.children;
            for (var i = 0; i < items.length; i++) {
                this.items.push(items[i].data);
            }
            this.after = "t3_" + this.items[this.items.length - 1].id;
            this.busy = false;
        }.bind(this));
    };

    return Reddit;
});