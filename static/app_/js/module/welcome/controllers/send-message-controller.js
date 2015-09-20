/*
* File: app/js/module/a/controllers/nav-controller.js
*
* */

(function () {
    'use strict';
    angular.module('welcome.controllers').controller('SendMessageController',

        ['$scope','$state','$location','$controller','MESSAGES', 'URLS',
            function ($scope, $state, $location, $controller, MESSAGES, URLS) {

                var messages = MESSAGES;
                var _self = this;

                $controller('BaseController', {$scope: $scope});

                ///////////////////////
                // Handlers Methods
                ///////////////////////
                var _onCreateSendMessageComplete = function(message){
                    console.log('_onCreateSendMessageComplete', message)

                    toastr.success('Awesome! Your SOAPBOX is on the way!')

                };
                var _onCreateSendMessageFailed = function(){
                    console.log('_onCreateSendMessageFailed')
                };
                ///////////////////////
                // Public methods
                ///////////////////////
                this.onSubmit = function(valid){

                    console.log(valid, _self.twilio)

                    if(valid){
                        $scope.publish(messages.topic._CREATE_SEND_MESSAGE_, [_self.twilio]);
                    }
                };
                this.onPreview = function(pet_category_id, color){
                    //$state.go($scope.URLS._PETS_.state, { category: pet_category_id, color: color })
                };
                ///////////////////////
                // Initialize
                ///////////////////////
                var init = function() {
                    $scope.subscribe(messages.topic._CREATE_SEND_MESSAGE_COMPLETE_, _onCreateSendMessageComplete);
                    $scope.subscribe(messages.topic._CREATE_SEND_MESSAGE_FAILED_, _onCreateSendMessageFailed);
                };
                init();


    }]);
})();
