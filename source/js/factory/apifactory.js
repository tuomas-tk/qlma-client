(function () {
    'use strict';

    var myApp = angular.module('app');
    myApp
        .factory('ApiFactory', ApiFactory);

    function ApiFactory($http, $window, API, $q) {
        var config = { headers:  {
            'Authorization': 'Token ' + $window.sessionStorage.token,
            }
        };

        this.getMessages = function() {            
            return $http.get(API.URL + '/messages', config)
                .success(function (data, status, headers, config) {
                    return data;                
               })
                .error(function (data, status, headers, config) {
                    return data                   
                });          
        }

        this.getProfile = function() {
            return $http.get(API.URL + '/profile', config)
                .success(function (data, status, headers, config) {
                    return data;                
               })
                .error(function (data, status, headers, config) {
                    return data                   
            }); 
        }

        this.createMessage = function(data) {
            $http.post(API.URL + '/messages', data, config)
                .success(function (data, status, headers, config) {
                    console.log(data)
                    console.log("success");
                })
                .error(function (data, status, headers, config) {
                    console.log(data)
                    console.log("failed");
                });
        }

        return this;
    };



})();