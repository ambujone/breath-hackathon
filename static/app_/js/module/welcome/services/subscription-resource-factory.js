/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('welcome.services').factory('SubscriptionResourceFactory',
        ['$resource','URLS', function($resource, URLS){

        return $resource(URLS.api._SUBSCRIPTION_, { id: '@id' },
            {
                query:   { method: 'GET',isArray: true, cache: false},
                //get:    { method: 'GET', cache: false },
                create:  { method: 'POST' }
                //update: { method: 'PUT' },
                //delete: { method: 'DELETE' }
            });
    }]);
})();
