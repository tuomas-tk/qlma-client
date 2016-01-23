(function () {
    'use strict';

    var myApp = angular.module('app');
    myApp
        .controller('MessagesController', MessagesController);

    MessagesController.$inject = ['$rootScope', '$location', '$http', '$window', 'ApiFactory'];
    function MessagesController($rootScope, $location, $http, $window, apiFactory) {
        var messages = this;
        console.log("Init MessagesController");

        messages.createMessage = function() {
            var subject = messages.subject;
            var recipient = messages.recipient;
            var messagebody = messages.message;
            var data = { "to": parseInt(recipient, 10), "message": messagebody, "parent_id": 1};
             apiFactory.createMessage(data)
                .then(function(data){
                    console.log(data);
                });
        }

    }

  
})();