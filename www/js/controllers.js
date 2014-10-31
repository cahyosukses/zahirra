angular.module('starter.controllers', ['ionic'])

.controller('AppCtrl', function($scope) {
/*
    $scope.refresh = function(){
      getProducts($scope);      
    }    
*/
})

.controller('ProductsCtrl', function($scope, $http) {        
//    this.getProducts = function($scope){
      $http.get("http://zahirra.com/android/products/load_lists")
      .success(function(result){
          $scope.products = result;
          $scope.$broadcast("scroll.refreshComplete");
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
});

function RefreshLoadData($http, $log){
    
}