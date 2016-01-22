(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run)
        .factory('qlmaService', function() {
            var savedData = {}
            function set(data) {
                savedData = data;
            }
            function get() {
                return savedData;
            }

            return {
                set: set,
                get: get
            }
        });

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        console.log("Config");
        $routeProvider
           
            .when('/', {
                controller: 'LoginController',
                templateUrl: 'js/login/login.view.html',
                controllerAs: 'login'
            })

            .when('/frontpage', {
                controller: 'FrontPageController',
                templateUrl: 'js/frontpage/frontpage.view.html',
                controllerAs: 'frontpage'
            })

            .otherwise({ redirectTo: '/' });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'qlmaService'];
    function run($rootScope, $location, $cookieStore, $http, qlmaService) {
        console.log("Run");

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            console.log("locationChangeStart triggered");
        });       
    }

})();