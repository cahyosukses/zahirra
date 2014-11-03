angular.module('starter.controllers', ['ionic'])
        .controller('AppCtrl', function($scope) {
})
        .controller('ProductsCtrl', function($scope, $http, $ionicLoading) {
//    this.getProducts = function($scope){
    $ionicLoading.show({
        template: 'Loading...'
    });

    $http.get("http://zahirra.com/android/products/load_lists")
            .success(function(result) {
        $scope.products = result;
        $scope.$broadcast("scroll.refreshComplete");
        $ionicLoading.hide();
    });
//    }
})

        .controller('ProductCtrl', function($http, $scope, $stateParams, $ionicLoading) {
    var id = $stateParams.productId;
    $ionicLoading.show({
        template: 'Loading...'
    });

    $http.get("http://zahirra.com/android/products/getDetailProduct/" + id)
            .success(function(result) {
        $scope.product = result;
        $ionicLoading.hide();
    });
})

        .controller('SearchProductCtrl', function($http, $scope, $stateParams, $ionicLoading) {
    var id = $stateParams.productId;
    $ionicLoading.show({
        template: 'Loading...'
    });

    $http.get("http://zahirra.com/android/products/getDetailProduct/" + id)
            .success(function(result) {
        $scope.product = result;
        $ionicLoading.hide();
    });
});

function SearchCtrl($scope, $http, $ionicLoading) {
    $scope.url = 'http://zahirra.com/android/products/SearchProducts'; // The url of our search    
    // The function that will be executed on button click (ng-click="search()")
    $scope.search = function() {
        var keywords = $scope.keywords;
        $ionicLoading.show({
            template: 'Loading...'
        });

        // Create the http post request
        // the data holds the keywords
        // The request is a JSON request.
        $http.get($scope.url + '?q=' + keywords).success(function(result) {
            $scope.products = result;
//            $scope.status = status;
//            $scope.data = data;
//            $scope.result = data; // Show result from server in our <pre></pre> element
            $ionicLoading.hide();
        }).error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
        });
    };
}


