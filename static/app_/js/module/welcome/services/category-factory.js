/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('welcome.services').factory('CategoryFactory',

        ['$http','MessagingFactory','MESSAGES','CategoryModel','CategoryResourceFactory','URLS',

        function($http,MessagingFactory, MESSAGES, CategoryModel, CategoryResourceFactory, URLS){

            var messaging = MessagingFactory;
            var messages = MESSAGES;
            var categoryResource = CategoryResourceFactory;


            ///////////////////////
            // _QUERY_CATEGORIES_
            ///////////////////////

            var _queryCategories = function (filter) {
                return categoryResource.query(filter, _queryCategoriesSuccess, _queryCategoriesFailure);
            };

            var _queryCategoriesSuccess = function (response, headerFn) {
                var result = [];
                if (response.length > 0) {
                    angular.forEach(response, function (user) {
                        result.push(UserModel.build(user));
                    });
                    messaging.publish(messages.topic._QUERY_CATEGORIES_COMPLETE_, [result]);
                }
                else {
                    _queryCategoriesFailure();
                }
            };

            var _queryCategoriesFailure = function () {
                messaging.publish(messages.topic._QUERY_CATEGORIES_FAILED_);
            };

            messaging.subscribe(messages.topic._QUERY_CATEGORIES_, _queryCategories);

            ///////////////////////
            // _GET_CATEGORY_
            ///////////////////////

            var _getCategory = function (data) {
                return categoryResource.create(data, _getCategorySuccess, _getCategoryFailure);
            };

            var _getCategorySuccess = function (response, headerFn) {
                if (response){
                    messaging.publish(messages.topic._GET_CATEGORY_COMPLETE_, [CategoryModel.build(response)]);
                }
                else {
                    _getCategoryFailure();
                }
            };

            var _getCategoryFailure = function () {
                messaging.publish(messages.topic._GET_CATEGORY_FAILED_);
            };

            messaging.subscribe(messages.topic._GET_CATEGORY_, _getCategory);

            ///////////////////////
            // _CREATE_CATEGORY_
            ///////////////////////

            var _createCategory = function (data) {
                return categoryResource.create(data, _createCategorySuccess, _createCategoryFailure);
            };

            var _createCategorySuccess = function (response, headerFn) {
                if (response){
                    messaging.publish(messages.topic._CREATE_CATEGORY_COMPLETE_, [CategoryModel.build(response)]);
                }
                else {
                    _createCategoryFailure();
                }
            };

            var _createCategoryFailure = function () {
                messaging.publish(messages.topic._CREATE_CATEGORY_FAILED_);
            };

            messaging.subscribe(messages.topic._CREATE_CATEGORY_, _createCategory);

            ///////////////////////
            // _UPDATE_CATEGORY_
            ///////////////////////
            var _updateCategory = function (data) {
                return categoryResource.update({ id: data.id }, data, _updateCategorySuccess, _updateCategoryFailure);
            };

            var _updateCategorySuccess = function (response) {
                if (response){
                    messaging.publish(messages.topic._UPDATE_CATEGORY_COMPLETE_,[CategoryModel.build(response)]);
                }
                else {
                    _updateCategoryFailure();
                }
            };

            var _updateCategoryFailure = function () {
                messaging.publish(messages.topic._UPDATE_CATEGORY_FAILED_);
            };

            messaging.subscribe(messages.topic._UPDATE_CATEGORY_, _updateCategory);

            ///////////////////////
            // _DELETE_CATEGORY_
            ///////////////////////
            var _deleteCategory = function (category) {
                return categoryResource.delete({ id: category.id }, _deleteCategorySuccess, _deleteCategoryFailure);
            };

            var _deleteCategorySuccess = function (response) {
                if (angular.equals(response, {})){
                    messaging.publish(messages.topic._DELETE_CATEGORY_COMPLETE_);
                }
                else {
                    _deleteCategoryFailure();
                }
            };

            var _deleteCategoryFailure = function () {
                messaging.publish(messages.topic._DELETE_CATEGORY_FAILED_);
            };

            messaging.subscribe(messages.topic._DELETE_CATEGORY_, _deleteCategory);

            ///////////////////////
            // Initialize
            ///////////////////////
            var init = function(){

            };

            ///////////////////////
            // API
            ///////////////////////
            var api = {
                init: init

            };
            return api;
    }]);
})();