/*
* File: app/js/app.js
*
* */

 (function () {
    'use strict';
    angular.module('app', [
        // Angular modules
        'ngRoute',
        'ngCookies',
        'ngResource',
        'ngAnimate',
        'ngSanitize',
        //// 3rd party modules
        'ui.router',
        'ui.bootstrap',
        //// Custom modules
        'app.core',
        'app.welcome',
        //'app.user',
        //'app.authentication',
        //'app.layout',
        //'app.account',
        //'app.photo',
        //'app.event',
        //'app.booking',
        //'app.sale'
        //'app.home',
        //'app.alert',
        //

    ])

})();