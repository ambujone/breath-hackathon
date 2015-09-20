/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('core.services').factory('ToastrFactory', ['$timeout','MessagingFactory','MESSAGES',
        function($timeout, MessagingFactory, MESSAGES){

        var messaging = MessagingFactory;
        var messages = MESSAGES;

        // type > error | info | warning

        ///////////////////////
        // _SHOW_TOASTR_
        ///////////////////////
        var _showToastr = function(title, msg, type) {
            toastr.options = {
                "closeButton": true,
                "debug": true,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "7000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut",
                "preventDuplicates": true
            }

            switch(type) {

                case 'error':
                    toastr.error(msg, title);
                    break;
                case 'warning':
                    toastr.warning(msg, title);
                    break;
                case 'success':
                    toastr.success(msg, title);
                    break;
                default:
                    toastr.info(msg, title);
            }

        };

        messaging.subscribe(messages.topic._SHOW_TOASTR_, _showToastr);

        ///////////////////////
        // Initialize
        ///////////////////////
        var init = function(){};

        var api = {
            init: init
        };

        return api;

    }]);
})();