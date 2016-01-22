(function () {
    'use strict';

    var myApp = angular.module('app');
    myApp
        .controller('FrontPageController', FrontPageController);

    FrontPageController.$inject = ['$rootScope', '$location','$http', '$window', 'API', 'qlmaService'];
    function FrontPageController($rootScope, $location, $http, $window, API, qlmaService) {
        var frontpage = this;
        console.log("Init FrontPageController");
        var user = qlmaService.get();
        frontpage.user = {}
        frontpage.user.firstname = user.firstname;
        frontpage.user.lastname = user.lastname;

    }

})();