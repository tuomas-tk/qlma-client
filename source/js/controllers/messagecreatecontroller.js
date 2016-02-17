(function () {
    'use strict';

    var myApp = angular.module('app');
    myApp
        .controller('MessageCreateController', MessageCreateController);

    MessageCreateController.$inject = ['$rootScope', '$location', '$http', 'API', '$window', 'ApiFactory'];
    function MessageCreateController($rootScope, $location, $http, API, $window, apiFactory) {
        var messageCreate = this;
        console.log("Init MessageCreateController");

        var reply = "";

        messageCreate.createMessage = function() {
            var config = { headers:  {
                'Authorization': 'Token ' + $window.sessionStorage.token,
                }
            };

            var subject = messageCreate.subject;
            var recipient = messageCreate.recipient;
            var messagebody = messageCreate.message;
            var data = { "to": parseInt(recipient, 10), "message": messagebody, "parent_id": null};
            
            $http.post(API.URL + '/messages', data, config)
                .success(function (data, status, headers, config) {
                    $rootScope.reply = "Viesti lähetetty!";
                })
                .error(function (data, status, headers, config) {
                    $rootScope.reply = "Viesti ei lähetetty, yritäthän uudestaan!";
                });

            
        }

    }

  
})();
