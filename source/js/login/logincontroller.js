(function () {
    'use strict';
     

    function LoginController($location, $http, $window, API, qlmaService) {
        var login = this;
    
        login.doLogin = function () {
            var username = login.username;
            var password = login.password;
            var credentials = {"username": username, "password": password};

            $http.post(API.URL + '/login', credentials)
                .success(function (data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    var user = {
                        firstname: "Seppo",
                        lastname: "Sepikka"
                    }
                    qlmaService.set(
                        user                       
                    );
                    $location.path("/frontpage")

                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
                });

        };
    }

    var myApp = angular.module('app');
    myApp
    .constant("API", {
        "URL": "http://localhost:3000", 
    })
    .controller("LoginController", LoginController);
    LoginController.$inject = ['$location', '$http', '$window', 'API', 'qlmaService'];

})();