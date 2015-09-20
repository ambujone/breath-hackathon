/*
* File: app/js/module/a/controllers/nav-controller.js
*
* */

(function () {
    'use strict';
    angular.module('welcome.controllers').controller('WelcomeController',

        ['$scope','$state','$location','$controller','MESSAGES', 'URLS',
            function ($scope, $state, $location, $controller, MESSAGES, URLS) {

                var messages = MESSAGES;
                var _self = this;

                $controller('BaseController', {$scope: $scope});

                ///////////////////////
                // Handlers Methods
                ///////////////////////

                ///////////////////////
                // Public methods
                ///////////////////////
                this.onSubmit = function(valid){
                    console.log('onSubmit', valid);
                    if(valid){
                        //$scope.publish(messages.topic._CREATE_SEND_MESSAGE_, [_self.twilio]);
                    }
                };
                this.onPreview = function(pet_category_id, color){
                    //$state.go($scope.URLS._PETS_.state, { category: pet_category_id, color: color })
                };
                ///////////////////////
                // Initialize
                ///////////////////////
                var init = function() {

                };
                init();


    }]);
})();
