/*
* File: app/js/module/a/services/version.js
*
* */

(function () {
    'use strict';
    angular.module('welcome.services').factory('PetFactory',

        ['$http','MessagingFactory','MESSAGES','PetModel','PetResourceFactory','URLS',

        function($http,MessagingFactory, MESSAGES, PetModel, PetResourceFactory, URLS){

            var messaging = MessagingFactory;
            var messages = MESSAGES;
            var petResource = PetResourceFactory;

            ///////////////////////
            // _QUERY_PETS_
            ///////////////////////

            var _queryPets = function (filter) {
                return petResource.query(filter, _queryPetsSuccess, _queryPetsFailure);

                //console.log('_queryPets');
                //var t = $http.jsonp(URLS.api._PETS_).success(function(data){
                //    console.log('_queryPets', data);
                //});
                //console.log(t);
            };

            var _queryPetsSuccess = function (response, headerFn) {
                var result = [];
                if (response.length > 0) {
                    angular.forEach(response, function (user) {
                        result.push(PetModel.build(user));
                    });
                    messaging.publish(messages.topic._QUERY_PETS_COMPLETE_, [result]);
                }
                else {
                    _queryPetsFailure();
                }
            };

            var _queryPetsFailure = function () {
                messaging.publish(messages.topic._QUERY_PETS_FAILED_);
            };

            messaging.subscribe(messages.topic._QUERY_PETS_, _queryPets);

            ///////////////////////
            // _GET_PET_
            ///////////////////////

            var _getPet = function (data) {
                return petResource.create(data, _getPetSuccess, _getPetFailure);
            };

            var _getPetSuccess = function (response, headerFn) {
                if (response){
                    messaging.publish(messages.topic._GET_PET_COMPLETE_, [PetModel.build(response)]);
                }
                else {
                    _getPetFailure();
                }
            };

            var _getPetFailure = function () {
                messaging.publish(messages.topic._GET_PET_FAILED_);
            };

            messaging.subscribe(messages.topic._GET_PET_, _getPet);

            ///////////////////////
            // _CREATE_PET_
            ///////////////////////

            var _createPet = function (data) {
                return petResource.create(data, _createPetSuccess, _createPetFailure);
            };

            var _createPetSuccess = function (response, headerFn) {
                if (response){
                    messaging.publish(messages.topic._CREATE_PET_COMPLETE_, [PetModel.build(response)]);
                }
                else {
                    _createPetFailure();
                }
            };

            var _createPetFailure = function () {
                messaging.publish(messages.topic._CREATE_PET_FAILED_);
            };

            messaging.subscribe(messages.topic._CREATE_PET_, _createPet);

            ///////////////////////
            // _UPDATE_PET_
            ///////////////////////
            var _updatePet = function (data) {
                return petResource.update({ id: data.id }, data, _updatePetSuccess, _updatePetFailure);
            };

            var _updatePetSuccess = function (response) {
                if (response){
                    messaging.publish(messages.topic._UPDATE_PET_COMPLETE_,[PetModel.build(response)]);
                }
                else {
                    _updatePetFailure();
                }
            };

            var _updatePetFailure = function () {
                messaging.publish(messages.topic._UPDATE_PET_FAILED_);
            };

            messaging.subscribe(messages.topic._UPDATE_PET_, _updatePet);

            ///////////////////////
            // _DELETE_PET_
            ///////////////////////
            var _deletePet = function (pet) {
                return petResource.delete({ id: pet.id }, _deletePetSuccess, _deletePetFailure);
            };

            var _deletePetSuccess = function (response) {
                if (angular.equals(response, {})){
                    messaging.publish(messages.topic._DELETE_PET_COMPLETE_);
                }
                else {
                    _deletePetFailure();
                }
            };

            var _deletePetFailure = function () {
                messaging.publish(messages.topic._DELETE_PET_FAILED_);
            };

            messaging.subscribe(messages.topic._DELETE_PET_, _deletePet);

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