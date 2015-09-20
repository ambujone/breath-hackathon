myDirectives.directive('dirSensor', ['$window','$sce', function ($window, $sce) {
        "use strict";
        return {
            restrict : 'EAC',
            replace : true,
            scope :{
                sensorData:'=?'
            },
            template: '<div><div>sensor: {{ sensorData.values }}</div>',
            link: function (scope, element, attribute) {

                var sock = null;
                var wsuri;
                if ($window.location.protocol === "file:") {
                   wsuri = "ws://localhost:9000";
                } else {
                   wsuri = "ws://" + $window.location.hostname + ":9000";
                }
                if ("WebSocket" in $window) {
                   sock = new WebSocket(wsuri);
                } else if ("MozWebSocket" in $window) {
                   sock = new MozWebSocket(wsuri);
                } else {
                   console.log("Browser does not support WebSocket!");
                   $window.location = "http://autobahn.ws/unsupportedbrowser";
                }

                if (sock) {
                   sock.onopen = function() {
                      console.log("Connected to " + wsuri);
                   };

                   sock.onclose = function(e) {
                      console.log("Connection closed (wasClean = " + e.wasClean + ", code = " + e.code + ", reason = '" + e.reason + "')");
                      sock = null;
                   };

                   sock.onmessage = function(e) {
                       //console.log("Got echo: " + e.data);
                       scope.sensorData = JSON.parse(e.data);
                       scope.$apply();
                   }
                }

            }
        }
    }]);
