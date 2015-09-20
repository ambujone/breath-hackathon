/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('welcome.services').factory('PetModel',

        ['ModelTransformerFactory', function(ModelTransformerFactory) {

            var modelTransformer = ModelTransformerFactory;
            ///////////////////////
            // Constructor
            ///////////////////////
            var PetModel = function () {
                var _self = this;
                _self.id = null;
                _self.name = null;

            };
            ///////////////////////
            // Static Methods
            ///////////////////////
            PetModel.build = function (data) {
                return modelTransformer.transform(data, PetModel);
            };
            ///////////////////////
            // Public Methods
            ///////////////////////
            PetModel.prototype = {
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
            return PetModel;

        }]);

})();