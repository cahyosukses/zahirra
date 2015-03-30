angular.module('starter.controllers', ['ionic']).controller('AppCtrl', function($scope) {

}).controller('HomeCtrl', function($scope, $http, $ionicPopup, $ionicPlatform, $state, $ionicLoading) {
    $ionicLoading.show({
        template: 'Loading...'
    });

    $http.get("http://zahirra.com/android/products/get_categories/").success(function(result) {
        $scope.products_per_categorie = result;
    });

    $http.get("http://zahirra.com/android/products/get_new_products/").success(function(result) {
        $scope.show_new_products = result;
        $ionicLoading.hide();
    });

    // An alert dialog
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Tentang kami',
            template: '<center><strong style="font-size: 20px;">Zahirra Online Shop</strong></br>Version 0.0.1</center>'
        });
        console.log('Alert Tentang Kami');
    };

}).controller('ProductsCtrl', function($scope, $http, $ionicLoading, $ionicPopup, $ionicModal, $timeout) {
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


    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };

}).controller('ProductPercategoriesCtrl', function($scope, $http, $ionicLoading, $ionicPopup, $ionicModal, $timeout, $stateParams) {
    var page = 10;
    var start = 0;
    var category_id = $stateParams.categoryId;
    var category_name = $stateParams.categoryName;
    $scope.commits = [];
    $scope.more = true;
    console.log('Show Products By Category ' + category_name);

    $scope.loadProducts = function() {

        // Load the data from server zahirra
        $http.get('http://zahirra.com/android/products/products_categories_lists?page=' + page + '&category_id=' + category_id + '&category_name=' + category_name)
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


    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login ', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };

}).controller('ProductCtrl', function($http, $scope, $stateParams, $ionicLoading, $ionicModal, $ionicPopup) {
    var id = $stateParams.productId;
    $ionicLoading.show({
        template: 'Loading...'
    });
    $http.get("http://zahirra.com/android/products/getDetailProduct/" + id).success(function(result) {
        $scope.product = result;
        $ionicLoading.hide();
        console.log('Show Detail Product By ID' + id);
    });


    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/share.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeShare = function() {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.share = function() {
        $scope.modal.show();
    };


    // An alert dialog
    $scope.showInfoThumbs = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Like',
            template: '<center><strong style="font-size: 20px;">Zahirra Online Shop</strong></br>Version 0.0.1</center>'
        });
        console.log('Like');
    };
    // An alert dialog
    $scope.showInfoDownload = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Download',
            template: '<center><strong style="font-size: 20px;">Zahirra Online Shop</strong></br>Version 0.0.1</center>'
        });
        console.log('Download Image');
    };

}).controller('ProductToCart', function($http, $scope, $stateParams, $ionicLoading) {
    var id = $stateParams.productId;
    $ionicLoading.show({
        template: 'Loading...'
    });
    $http.get("http://zahirra.com/android/products/add_to_cart/" + id).success(function(result) {
        $scope.carts = result;
        $ionicLoading.hide();
        console.log('Add to Cart By ID ' + id);
    });
}).controller('SearchCtrl', function($http, $scope, $stateParams, $ionicLoading, $rootScope) {
    $rootScope.products = [];
    $scope.url = 'http://zahirra.com/android/products/SearchProducts'; // The url of our search    
    // The function that will be executed on button click (ng-click="search()")
    $scope.search = function() {
        var keywords = $scope.keywords;
        $ionicLoading.show({
            template: 'Loading...'
        });

        $http.get($scope.url + '?q=' + keywords).success(function(result) {
            $rootScope.products = result;
            $ionicLoading.hide();
            console.log('Search Products By ' + keywords);
        }).error(function(data, status) {
            $scope.data = data || "Request failed";
            $scope.status = status;
        });
    }
});

//function SearchCtrls($scope, $http, $ionicLoading) {
//    $scope.url = 'http://zahirra.com/android/products/SearchProducts'; // The url of our search    
//    // The function that will be executed on button click (ng-click="search()")
//    $scope.search = function() {
//        var keywords = $scope.keywords;
//        $ionicLoading.show({
//            template: 'Loading...'
//        });
//
//        $http.get($scope.url + '?q=' + keywords).success(function(result) {
//            $scope.products = result;
//            $ionicLoading.hide();
//        }).error(function(data, status) {
//            $scope.data = data || "Request failed";
//            $scope.status = status;
//        });
//    };
//}