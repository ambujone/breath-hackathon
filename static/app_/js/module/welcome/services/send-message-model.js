/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('welcome.services').factory('SendMessageModel',

        ['ModelTransformerFactory', function(ModelTransformerFactory) {

            var modelTransformer = ModelTransformerFactory;
            ///////////////////////
            // Constructor
            ///////////////////////
            var SendMessageModel = function () {
                var _self = this;
                _self.message_sid = null;
                _self.phone_number = null;
                _self.message_body = null;
            };
            ///////////////////////
            // Static Methods
            ///////////////////////
            SendMessageModel.build = function (data) {
                return modelTransformer.transform(data, SendMessageModel);
            };
            ///////////////////////
            // Public Methods
            ///////////////////////
            SendMessageModel.prototype = {
                // setters
                // getters
                getId: function () {
                    return this.message_sid;
                },
                getNumber: function () {
                    return this.phone_number;
                }
            };

            ///////////////////////
            // API
            ///////////////////////
            return SendMessageModel;

        }]);

})();