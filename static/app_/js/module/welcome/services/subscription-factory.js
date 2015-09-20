/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('welcome.services').factory('SubscriptionFactory',

        ['$http','MessagingFactory','MESSAGES','SubscriptionModel','SubscriptionResourceFactory','URLS',

        function($http,MessagingFactory, MESSAGES, SubscriptionModel, SubscriptionResourceFactory, URLS){

            var messaging = MessagingFactory;
            var messages = MESSAGES;
            var subscriptionResource = SubscriptionResourceFactory;

            ///////////////////////
            // _QUERY_SUBSCRIPTIONS_
            ///////////////////////

            var _querySubscriptions = function (filter) {
                return subscriptionResource.query(filter, _querySubscriptionsSuccess, _queryPetsFailure);
            };

            var _querySubscriptionsSuccess = function (response, headerFn) {
                var result = [];
                if (response.length > 0) {
                    // NOTE: just send the response... for demo proposes
                    //angular.forEach(response, function (subscription) {
                    //    result.push(SubscriptionModel.build(subscription));
                    //});
                    messaging.publish(messages.topic._QUERY_SUBSCRIPTIONS_COMPLETE_, [response]);
                }
                else {
                    _queryPetsFailure();
                }
            };

            var _queryPetsFailure = function () {
                messaging.publish(messages.topic._QUERY_SUBSCRIPTIONS_FAILED_);
            };

            messaging.subscribe(messages.topic._QUERY_SUBSCRIPTIONS_, _querySubscriptions);

            ///////////////////////
            // _CREATE_SUBSCRIPTION_
            ///////////////////////

            var _createSubscription = function (data) {
                return subscriptionResource.create(data, _createSubscriptionSuccess, _createSubscriptionFailure);
            };

            var _createSubscriptionSuccess = function (response, headerFn) {
                if (response){
                    messaging.publish(messages.topic._CREATE_SUBSCRIPTION_COMPLETE_, [SubscriptionModel.build(response)]);
                }
                else {
                    _createSubscriptionFailure();
                }
            };

            var _createSubscriptionFailure = function () {
                messaging.publish(messages.topic._CREATE_SUBSCRIPTION_FAILED_);
            };

            messaging.subscribe(messages.topic._CREATE_SUBSCRIPTION_, _createSubscription);

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