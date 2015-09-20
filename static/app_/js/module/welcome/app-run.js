
/*
* File: app/js/app.config.headersjs
*
* Use the $httpProvider to configure headers for every request
* Based on ng-book --> page: 184
*
* */

(function () {
    'use strict';

    ///////////////////////
    // Initialize Services
    ///////////////////////
    angular.module('app').run(['$injector', 'SendMessageFactory',
        function($injector, SendMessageFactory) {
            SendMessageFactory.init();
        }]);

})();