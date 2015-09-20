
/*
* File: app/js/routes.js
*
* Defines the main routes in the application.
* The routes you see here will be anchors '#/' unless specifically configured otherwise.
*
* */

(function () {
    'use strict';
    angular.module('app').config(['$routeProvider','$stateProvider','$urlRouterProvider','ACCESS_LEVELS','URLS',
        function ($routeProvider, $stateProvider, $urlRouterProvider, ACCESS_LEVELS, URLS) {

            $urlRouterProvider.otherwise("/welcome");

            $stateProvider.state(URLS._WELCOME_.state, {
                url: URLS._WELCOME_.path,
                templateUrl: URLS._WELCOME_.template,
                access_level: ACCESS_LEVELS.pub,
                controller: 'WelcomeController as ctrl',
                data: { pageTitle: 'Welcome' }
            });
            $stateProvider.state(URLS._SEND_MESSAGE_.state, {
                url: URLS._SEND_MESSAGE_.path,
                templateUrl: URLS._SEND_MESSAGE_.template,
                access_level: ACCESS_LEVELS.pub,
                controller: 'SendMessageController as ctrl',
                data: { pageTitle: 'SendMessage' }
            });
        }
    ]);

})();