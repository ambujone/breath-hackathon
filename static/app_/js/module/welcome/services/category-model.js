/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('welcome.services').factory('CategoryModel',

        ['ModelTransformerFactory', function(ModelTransformerFactory) {

            var modelTransformer = ModelTransformerFactory;
            ///////////////////////
            // Constructor
            ///////////////////////
            var CategoryModel = function () {
                var _self = this;
                _self.id = null;
                _self.name = null;

            };
            ///////////////////////
            // Static Methods
            ///////////////////////
            CategoryModel.build = function (data) {
                return modelTransformer.transform(data, CategoryModel);
            };
            ///////////////////////
            // Public Methods
            ///////////////////////
            CategoryModel.prototype = {
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
            return CategoryModel;

        }]);

})();