(function () {
    'use strict';

    
    function MessageShowController($rootScope, $location, $http, $window, API, qlmaService, apiFactory, $routeParams) {
        console.log("Init MessageShowController");
        var messageShow = this;
        
        var viesti = {};

        messageShow.getMessage = function() {
            console.log("Load message " + $routeParams.id);
            

            apiFactory.getMessage($routeParams.id)
                .then(function(data){
                    messageShow.message = data.data.message[0];
                });
                
            apiFactory.getReplies($routeParams.id)
                .then(function(data){
                    messageShow.replies = data.data.message;
                });
        }
        
        messageShow.createMessage = function() {
            var config = { headers:  {
                'Authorization': 'Token ' + $window.sessionStorage.token,
                }
            };

            var messagebody = messageShow.replyMessage;
            var data = { "to": messageShow.message.to_user_id, "message": messagebody, "parent_id": messageShow.message.id};
            
            $http.post(API.URL + '/messages', data, config)
                .success(function (data, status, headers, config) {
                    $rootScope.reply = "Viesti lähetetty!";
                })
                .error(function (data, status, headers, config) {
                    $rootScope.reply = "Viesti ei lähetetty, yritäthän uudestaan!";
                });

            
        }

        messageShow.getMessage();

    }
    
    
    var myApp = angular.module('app');
    myApp
        .controller('MessageShowController', MessageShowController);

    MessageShowController.$inject = ['$rootScope', '$location','$http', '$window', 'API', 'qlmaService', 'ApiFactory', '$routeParams'];

})();
