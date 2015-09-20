/*
* File: app/js/module/core/controllers/base-controller.js
*
* */

(function () {
    'use strict';
    angular.module('core.controllers').controller('BaseController',
        ['$scope', '$location', 'MessagingFactory','URLS',

        function($scope, $location, MessagingFactory, URLS) {

            var messaging = MessagingFactory;
            $scope.URLS = URLS;

            ///////////////////////
            // Messaging methods
            ///////////////////////
            $scope.messagingHandles = [];

            $scope.subscribe = function(topic, callback) {
                var handle = messaging.subscribe(topic, callback);

                if (handle) {
                    $scope.messagingHandles.push(handle);
                }
            };

            $scope.publish = function(topic, data){
                messaging.publish(topic, data);
            };

            $scope.$on('$destroy', function() {
                angular.forEach($scope.messagingHandles, function(handle) {
                    messaging.unsubscribe(handle);
                });
            });

            ///////////////////////
            // Form Validation methods
            ///////////////////////
            $scope.errorMessage = function(name) {
                var result = [];
                _.each($scope.form[name].$error, function(key, value) {
                    if (key){ result.push(value); }
                });
                return result.join(", ");
            };
            ///////////////////////
            // General Helper Methods
            ///////////////////////
            $scope.convertDefaultsToList = function(defaults){
                var list = [];
                _.each(defaults, function(obj){
                    list.push(obj)
                });
                return list
            };
            $scope.getDefaultByValue = function(defaults, value){
                return _.find(defaults, function(obj){
                    return obj.value == value;
                });
            };

        }]);
})();
