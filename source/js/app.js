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
        })
        .constant("API", {
            "URL": "https://demo.qlma.fi/api",
        });

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        console.log("Config");
        $routeProvider

            .when('/', {
                controller: 'LoginController',
                templateUrl: 'views/login.view.html',
                controllerAs: 'login'
            })

            .when('/messaging', {
                controller: 'MessageListController',
                templateUrl: 'views/message_list.view.html',
                controllerAs: 'messageList'
            })

            .when('/messaging/create', {
                controller: 'MessageCreateController',
                templateUrl: 'views/message_create.view.html',
                controllerAs: 'messageCreate'
            })

            .when('/messaging/:id', {
                controller: 'MessageShowController',
                templateUrl: 'views/message_show.view.html',
                controllerAs: 'messageShow'
            })



            .when('/frontpage', {
                controller: 'FrontPageController',
                templateUrl: 'views/frontpage.view.html',
                controllerAs: 'frontpage'
            })

            .when('/profile', {
                controller: 'ProfileController',
                templateUrl: 'views/profile.view.html',
                controllerAs: 'profile'
            })

            .otherwise({ redirectTo: '/' });
            $locationProvider.html5Mode(true);
    }

    run.$inject = ['$rootScope', '$location', '$window', '$http', 'qlmaService'];
    function run($rootScope, $location, $window, $http, qlmaService) {
        console.log("Run");

        $rootScope.$on('$locationChangeStart', function (event, next, current) {

        });
    }

})();
