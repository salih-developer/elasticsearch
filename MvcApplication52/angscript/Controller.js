
app.controller("elasticsearchAll", function($scope, esService, $http, JSONFormatterConfig, $cookieStore) {

    $scope.pagingOptions = {
        enablePagination: true,
        pageSize: 50,
        pageSizes: [25, 50, 250, 500, 1000],
        currentPage: 1,
        sortfield: "id",
        sortby: "false",
        pages: []
    };

    $scope.setPagingData = function(data) {
        $scope.pagingOptions.data = null;
        $scope.pagingOptions.data = data.hits;
        $scope.pagingOptions.totalItems = data.total;
        $scope.pagingOptions.totalpages = 0;
        $scope.pagingOptions.enablePagination = true;
        $scope.range();
        if (!$scope.$$phase) {
            $scope.$apply();
        }
    };

    $scope.getPagedDataAsync = function(pageSize, page) {
        setTimeout(function() {
            $scope.loading = true;

            esService.getespaging((page - 1) * pageSize,
                pageSize,
                '',
                $scope.pagingOptions.sortfield,
                $scope.pagingOptions.sortby,
                $scope.elasticsearchindex,
                $cookieStore.get("ipaddres"),
                $scope.searchfields,
                $scope.searchfieldvalues
            ).success(function(data) {
                $scope.setPagingData(data);
                $scope.loading = false;
            });
        }, 100);
    };

    $scope.selectPage = function(pageindex) {
        $scope.pagingOptions.currentPage = pageindex;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    }
    $scope.selectPageSize = function(pagesize) {
        $scope.pagingOptions.pageSize = pagesize;
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    }

    $scope.range = function() {
        var rangeSize = 10;
        var start;
        start = $scope.pagingOptions.currentPage - 1;
        //if (start > $scope.pageCount() - rangeSize) {
        //    start = $scope.pageCount() - rangeSize + 1;
        //}
        $scope.pagingOptions.pages = [];
        for (var i = start; i < start + rangeSize; i++) {
            $scope.pagingOptions.pages.push(i);
        }
        return $scope.pagingOptions.pages;
    };

    $scope.prevPage = function() {
        if ($scope.pagingOptions.currentPage > 0) {
            $scope.pagingOptions.currentPage--;
        }
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    };

    $scope.DisablePrevPage = function() {
        return $scope.pagingOptions.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function() {
        return Math.ceil($scope.pagingOptions.totalItems / $scope.pagingOptions.pageSize) - 1;
    };

    $scope.nextPage = function() {
        if ($scope.pagingOptions.currentPage < $scope.pageCount()) {
            $scope.pagingOptions.currentPage++;
        }
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    };

    $scope.DisableNextPage = function() {
        return $scope.pagingOptions.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.Refresh = function(column) {
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    }

    $scope.sorted = function(column) {
        if ($scope.pagingOptions.sortfield == column) {
            $scope.pagingOptions.sortby = ($scope.pagingOptions.sortby == "false" ? "true" : "false");
        } else {
            $scope.pagingOptions.sortfield = column;
            $scope.pagingOptions.sortby = "true";
        }
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    }

    $scope.selectedCls = function(column) {
        if ($scope.pagingOptions.sortfield == column) {
            return ($scope.pagingOptions.sortby == "false" ? "fa fa-sort-desc" : "fa fa-sort-asc");
        }
        return "fa fa-sort-desc";
    };

    $scope.complex = null;
    $scope.jsonDataShow = function(data) {
        $scope.complex = data;
        $scope.showModal = !$scope.showModal;
    };


    $scope.elasticsearchindex = '';
    $scope.SetIndex = function(key) {
        $scope.elasticsearchindex = key;
        $scope.searchfields = '';
        $scope.searchfieldvalues = '';
        $scope.pagingOptions.sortby = 'false';
        $scope.pagingOptions.sortfield = 'id';
        $scope.pagingOptions.pageSize = 50;
        $scope.pagingOptions.currentPage = 1;

        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
    };

    $scope.allindices = null;
    $scope.allproperties = [];
    $scope.getallproperties = function() {
        esService.getallpropertiesv2($cookieStore.get("ipaddres")).success(function(data) {
            $scope.allindices = data;
            angular.forEach(data.indices, function(value1, key) {
                angular.forEach(value1.mappings, function(value2, key3) {
                    angular.forEach(value2.properties, function(value3, key4) {
                        $scope.allproperties.push({ name: key4 });
                    });
                });
            });
            $scope.elasticsearchindex = data.indices[0];
        });
    };

    $scope.searchfields = '';
    $scope.searchfieldvalues = '';
    $scope.searchAll = function(key, event) {
        $scope.searchfields = key;
        $scope.searchfieldvalues = $(event.target).val();
        $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
        event.preventDefault();
    };

    $scope.DeleteDoc = function (item) {
        if (confirm("Are you sure you want to delete doc")) {
            esService.getdeletedoc($cookieStore.get("ipaddres"), item._index, item._type, item._id).success(function (data) {
                $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);
            }); 
        }
    };

    $scope.getallproperties();
    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

});
//.directive('jsondatamodal', function () {
//    return {
//        template: '<div class="modal fade">' +
//            '<div class="modal-dialog">' +
//            '<div class="modal-content">' +
//            '<div class="modal-header">' +
//            '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
//            '<h4 class="modal-title">json data show</h4>' +
//            '</div>' +
//            '<div class="modal-body"><pre pretty-json><json-formatter json="complex" open="1"></json-formatter></pre></div>' +
//            '</div>' +
//            '</div>' +
//            '</div>',
//        restrict: 'E',
//        transclude: true,
//        replace: true,
//        scope: true,
//        link: function postLink(scope, element, attrs) {
//            scope.title = attrs.title;

//            scope.$watch(attrs.visible, function (value) {
//                if (value == true)
//                    $(element).modal('show');
//                else
//                    $(element).modal('hide');
//            });

//            $(element).on('shown.bs.jsondatamodal', function () {
//                scope.$apply(function () {
//                    scope.$parent[attrs.visible] = true;
//                });
//            });

//            $(element).on('hidden.bs.jsondatamodal', function () {
//                scope.$apply(function () {
//                    scope.$parent[attrs.visible] = false;
//                });
//            });
//        }
//    };
//});

