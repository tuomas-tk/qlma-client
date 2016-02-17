(function () {
    'use strict';

    var myApp = angular.module('app');
    myApp
        .controller('FrontPageController', FrontPageController);

    FrontPageController.$inject = ['$rootScope', '$location','$http', '$window', 'API', 'qlmaService', 'ApiFactory'];
    function FrontPageController($rootScope, $location, $http, $window, API, qlmaService, apiFactory) {
        console.log("Init FrontPageController");
        var frontpage = this;

        var user = qlmaService.get();

        var date = this;

        frontpage.doLogout = function(args) {
            $rootScope.$emit('doLogout', args);
        }

        frontpage.loadMessages = function() {
            console.log("Load messages");

            apiFactory.getMessages()
              .then(function(data){
                 $rootScope.messages = data.data.messages;
               });
        }

        frontpage.getProfile = function() {
            console.log("Load profile");

            apiFactory.getProfile()
                .then(function(data){
                    user.firstname = data.data.message.firstname;
                    user.lastname = data.data.message.lastname;
                    $rootScope.user = user;
                });
        }

        frontpage.getDate = function() {
            console.log("Get date");
            var currentDate = new Date();
            var days = ['sunnuntai','maanantai','tiistai','keskiviikko','torstai','perjantai','lauantai']
            date = days[currentDate.getDay()] + " " + currentDate.getDate() + "." + currentDate.getMonth() + 1 + "." + currentDate.getFullYear();

            $rootScope.date = date;
        }

        frontpage.gotoMessage = function(message) {
            $location.path('/messaging/' + message.id);
        };


        frontpage.loadMessages();
        frontpage.getProfile();
        frontpage.getDate();

    }

})();
