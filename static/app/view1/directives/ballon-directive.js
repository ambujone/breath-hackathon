myDirectives.directive('dirBallon', ['$window','$sce', function ($window, $sce) {
        "use strict";
        return {
            restrict : 'EAC',
            replace : true,
            scope :{
                sensorData:'=?'
            },
            template: '<div class="ballon" ng-bind-html="ballon"></div>',
            link: function (scope, element, attribute) {

                scope.$watch('sensorData', function(newVal, oldVal){
                    if (newVal !== oldVal){
                        scope.ballon = $sce.trustAsHtml(
                            '<svg width="100%" height="100%">' +
                            '<circle cx="50%" cy="100" r="'+Math.round(Math.abs(scope.sensorData.values))+'" stroke="green" stroke-width="0" fill="yellow" />'+
                            '</svg>');
                    }

                });
            }
        }
    }]);
