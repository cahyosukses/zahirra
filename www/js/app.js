var app = angular.module('zahirra', ['ionic', 'starter.controllers'])

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
});

app.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    }).state('app.search', {
        url: "/search",
        views: {
            'menuContent': {
                templateUrl: "templates/search.html"                
            }
        }
    }).state('app.cart', {
        url: "/cart/:productId",
        views: {
            'menuContent': {
                templateUrl: "templates/cart.html",
                controller: 'ProductToCart'
            }
        }
    }).state('app.products', {
        url: "/products",
        views: {
            'menuContent': {
                templateUrl: "templates/products.html",
                controller: 'ProductsCtrl'
            }
        }
    }).state('app.single', {
        url: "/products/:productId",
        views: {
            'menuContent': {
                templateUrl: "templates/product.html",
                controller: 'ProductCtrl'
            }
        }
    }).state('app.categories', {
        url: "/product_categories/:categoryId/:categoryName",
        views: {
            'menuContent': {
                templateUrl: "templates/product_categories.html",
                controller: 'ProductPercategoriesCtrl'
            }
        }
    }).state('app.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "templates/home.html",
                controller: 'HomeCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
});
