var app = angular.module('demo', ['ngSanitize', 'jsonFormatter']);

app.controller('MainCtrl', function ($scope, $http, JSONFormatterConfig) {

    $scope.hoverPreviewEnabled = true;
    $scope.hoverPreviewArrayCount = 1000;
    $scope.hoverPreviewFieldCount = 1000;
  $scope.complex = {
    numbers: [
      1,
      2,
      3
    ],
    boolean: true,
    'null': null,
    number: 123,
    anObject: {
      a: 'b',
      c: 'd',
      e: 'f\"'
    },
    string: 'Hello World',
    url: 'https://github.com/mohsen1/json-formatter',
    date: 'Sun Aug 03 2014 20:46:55 GMT-0700 (PDT)',
    func: function add(a,b){return a + b; }
  };
});
