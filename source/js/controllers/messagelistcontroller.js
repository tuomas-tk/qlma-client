(function () {
    'use strict';

    var myApp = angular.module('app');
    myApp
        .controller('MessageListController', MessageListController);

    MessageListController.$inject = ['$rootScope', '$location', '$http', 'API', '$window', 'ApiFactory'];
    function MessageListController($rootScope, $location, $http, API, $window, apiFactory) {
        var messageList = this;
        console.log("Init MessageListController");

        messageList.loadMessages = function() {
            console.log("Load messages");

            apiFactory.getMessages()
              .then(function(data){
                 $rootScope.messages = data.data.messages;
               });
        }
        
        messageList.gotoMessage = function(message) {
            $location.path('/messaging/' + message.id);
        };
        
        
        messageList.loadMessages();

    }
    
    

  
})();
