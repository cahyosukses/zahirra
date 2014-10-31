angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope) {
    $scope.search;    
})

.controller('ProductsCtrl', function($scope, $http, $ionicLoading) {        
//    this.getProducts = function($scope){
    $ionicLoading.show({
        template: 'Loading...'
    });
    
      $http.get("http://zahirra.com/android/products/load_lists")
      .success(function(result){
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
        .success(function(result){
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
        .success(function(result){
            $scope.product = result;
            $ionicLoading.hide();
    });
});