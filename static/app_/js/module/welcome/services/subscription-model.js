/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('welcome.services').factory('SubscriptionModel',

        ['ModelTransformerFactory', function(ModelTransformerFactory) {

            var modelTransformer = ModelTransformerFactory;
            ///////////////////////
            // Constructor
            ///////////////////////
            var SubscriptionModel = function () {
                var _self = this;
                _self.self_url = null;
                _self.name = null;
                _self.email = null;
                _self.message = null;
            };
            ///////////////////////
            // Static Methods
            ///////////////////////
            SubscriptionModel.build = function (data) {
                return modelTransformer.transform(data, SubscriptionModel);
            };
            ///////////////////////
            // Public Methods
            ///////////////////////
            SubscriptionModel.prototype = {
                // setters
                // getters
                getId: function () {
                    return this.id;
                },
                getName: function () {
                    return this.name;
                }
            };

            ///////////////////////
            // API
            ///////////////////////
            return SubscriptionModel;

        }]);

})();