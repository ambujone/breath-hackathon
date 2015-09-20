
/*
* File: app/js/location.js
*
* // nb-book --> page: 223
*
* */

(function () {
    'use strict';
    angular.module('app').constant('ACCESS_LEVELS', {
            pub: 1,
            user: 2
        });
    angular.module('app').constant('URLS',
        {
            _WELCOME_ :{
                path:'/welcome',
                state:'welcome',
                template: 'static/partial/welcome/base.html'
            },
            _SEND_MESSAGE_ :{
                path:'/send-message',
                state:'send-message',
                template: 'static/partial/welcome/send_message.html'
            },

            api:{
                _SEND_MESSAGE_:'/api/send-message/'
            }
        });

})();