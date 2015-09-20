/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('welcome.services').factory('PetResourceFactory',
        ['$resource','URLS', function($resource, URLS){

        return $resource(URLS.api._PETS_, { id: '@id' },
            {
                query:   { method: 'GET',isArray: true, cache: false,
                    //transformResponse: function(data, headers){
                    //
                    //    console.log('transformResponse', data)
                    //    //console.log(JSON.parse(data));
                    //    //data = JSON.parse(data);
                    //    return data;
                    //}
                },
                get:    { method: 'GET', cache: false },
                create:  { method: 'POST' },
                update: { method: 'PUT' },
                delete: { method: 'DELETE' }
            });
    }]);
})();
