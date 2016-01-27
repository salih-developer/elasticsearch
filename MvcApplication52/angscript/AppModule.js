var app = angular.module('esapp', ['ngAnimate', 'ngTouch', 'ngSanitize', 'ngCookies', 'jsonFormatter', 'ngRoute']);

app.config(function (JSONFormatterConfigProvider, $httpProvider) {
    $httpProvider.defaults.withCredentials = true;
    JSONFormatterConfigProvider.hoverPreviewEnabled = true;
    JSONFormatterConfigProvider.hoverPreviewArrayCount = 1000;
    JSONFormatterConfigProvider.hoverPreviewFieldCount = 1000;
});

app.filter('trim', function () {
    return function (value) {
        if (!angular.isString(value)) {
            return value;
        }
        return value.replace(/^\s+|\s+$/g, ''); // you could use .trim, but it's not going to work in IE<9
    };
});

app.filter('isObject', function () {
    return function (value) {
        if (angular.isObject(value)) {
            return value[0];
        }
        return value;
    };
});

app.filter('unique', function () {
    return function (items, filterOn) {

        if (filterOn === false) {
            return items;
        }

        if ((filterOn || angular.isUndefined(filterOn)) && angular.isArray(items)) {
            var hashCheck = {}, newItems = [];

            var extractValueToCompare = function (item) {
                if (angular.isObject(item) && angular.isString(filterOn)) {
                    return item[filterOn];
                } else {
                    return item;
                }
            };

            angular.forEach(items, function (item) {
                var valueToCheck, isDuplicate = false;

                for (var i = 0; i < newItems.length; i++) {
                    if (angular.equals(extractValueToCompare(newItems[i]), extractValueToCompare(item))) {
                        isDuplicate = true;
                        break;
                    }
                }
                if (!isDuplicate) {
                    newItems.push(item);
                }

            });
            items = newItems;
        }
        return items;
    };
});

app.directive('loading', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div ng-show="loading" class="row text-center">'+
        '<img src="/Images/ajax-loader.gif" width="20px" height="20px" class="text-center" /> Yükleniyor...'+
        '<br /></div>',
        link: function (scope, element, attr) {
            scope.$watch('loading', function(val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    }
});

app.directive('jsondatamodal', function () {
    return {
        template: '<div class="modal fade">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header">' +
            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '<h4 class="modal-title">json data show</h4>' +
            '</div>' +
            '<div class="modal-body"><pre pretty-json><json-formatter json="complex" open="1"></json-formatter></pre></div>' +
            '</div>' +
            '</div>' +
            '</div>',
        restrict: 'E',
        transclude: true,
        replace: true,
        scope: true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function (value) {
                if (value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.jsondatamodal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.jsondatamodal', function () {
                scope.$apply(function () {
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});

app.directive('chart', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {

            var chart = null,
                opts = {};

            scope.$watch(attrs.ngModel, function (v) {
                if (!chart) {
                    chart = $.plot(elem, v, opts);
                    elem.show();
                } else {
                    chart.setData(v);
                    chart.setupGrid();
                    chart.draw();
                }
            });
        }
    };
});



app.controller('MainController', ['$scope', function ($scope) {

}]);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/Siparis',
            {
                templateUrl: '/Modules/Siparis/siparis.html',
                controller: 'SiparisController'
            })
            .
        when('/Detay',
            {
                templateUrl: '/Modules/Detay/detay.html',
                controller: 'DetayController'
            })
            .
        when('/ParameterPage/:id',
            {
                templateUrl: '/Modules/ParameterPage/ParameterPage.html',
                controller: 'ParameterPageController'
            })
            .
        when('/page4',
            {
                templateUrl: 'page4.html',
                controller: 'SiparisController'
            })
            .
        when('/page5',
            {
                templateUrl: 'page5.html',
                controller: 'DetayController'
            })
            .
        otherwise(
        {
            redirectTo: ''
        });
    }
]);