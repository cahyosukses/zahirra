angular.module('starter.controllers', ['ionic']).controller('AppCtrl', function($scope) {

}).controller('HomeCtrl', function($scope, $http, $ionicLoading) {

}).controller('ProductsCtrl', function($scope, $http, $ionicLoading, $ionicPopup) {
//    $scope.reddit = new Reddit();
//    $ionicLoading.show({
//        template: 'Loading...'
//    });
//    $http.get("http://zahirra.com/android/products/load_lists").success(function(result) {
//        $scope.products = result;
//        $scope.$broadcast("scroll.refreshComplete");
//        $ionicLoading.hide();
//    });

    var page = 10;
    var start = 0;
    $scope.commits = [];
    $scope.more = true;

    $scope.loadProducts = function() {

        // Load the data from server zahirra
        $http.get('http://zahirra.com/android/products/load_lists?page=' + page)
                .success(function(commits, status, headers) {

            // Check Link header to determine if more pages are available.
            // If not, disable infinite scroll.

            if (commits.length < 0) {
                $scope.more = false;
            }

            // Push all of the commits from response into model.
            angular.forEach(commits, function(commit) {
                $scope.commits.push(commit);
            });
        }).error(function(data, status, headers) {

            // Disable infinite scroll since we've got an error.
            $scope.more = false;

        }). finally(function() {
            // On finish, increment to next page and alert infiniteScroll to close.
            page = (page + 10);
            $scope.$broadcast('scroll.infiniteScrollComplete');
        });
    };


}).controller('ProductCtrl', function($http, $scope, $stateParams, $ionicLoading) {
    var id = $stateParams.productId;
    $ionicLoading.show({
        template: 'Loading...'
    });
    $http.get("http://zahirra.com/android/products/getDetailProduct/" + id).success(function(result) {
        $scope.product = result;
        $ionicLoading.hide();
    });
}).controller('ProductToCart', function($http, $scope, $stateParams, $ionicLoading) {
    var id = $stateParams.productId;
    $ionicLoading.show({
        template: 'Loading...'
    });
    $http.get("http://zahirra.com/android/products/add_to_cart/" + id).success(function(result) {
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

        $http.get($scope.url + '?q=' + keywords).success(function(result) {
            $scope.products = result;
            $ionicLoading.hide();
        }).error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
        });
    };
}