/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('welcome.services').factory('SendMessageFactory',

        ['$http','MessagingFactory','MESSAGES','SendMessageModel','SendMessageResourceFactory','URLS',

        function($http,MessagingFactory, MESSAGES, SendMessageModel, SendMessageResourceFactory, URLS){

            var messaging = MessagingFactory;
            var messages = MESSAGES;
            var sendMessageResource = SendMessageResourceFactory;

            ///////////////////////
            // _CREATE_SEND_MESSAGE_
            ///////////////////////

            var _createSendMessage = function (data) {
                return sendMessageResource.create(data, _createSendMessageSuccess, _createSendMessageFailure);
            };

            var _createSendMessageSuccess = function (response, headerFn) {
                if (response){
                    messaging.publish(messages.topic._CREATE_SEND_MESSAGE_COMPLETE_, [SendMessageModel.build(response)]);
                }
                else {
                    _createSendMessageFailure();
                }
            };

            var _createSendMessageFailure = function () {
                messaging.publish(messages.topic._CREATE_SEND_MESSAGE_FAILED_);
            };

            messaging.subscribe(messages.topic._CREATE_SEND_MESSAGE_, _createSendMessage);

            ///////////////////////
            // Initialize
            ///////////////////////
            var init = function(){};

            ///////////////////////
            // API
            ///////////////////////
            var api = {
                init: init
            };
            return api;
    }]);
})();