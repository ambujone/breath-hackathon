/**
 * Created by paulo on 28/04/15.
 */
(function () {
    function _getLeadingZeros(n) {
        n = n || 0;
        var s = n.toString();
        for (var i = 0; s.length < 5; i++) {
            s = "0" + s;
        }
        return s
    }

    function _loadImages() {
        var files = [];
        for (var i = 0; i < 600; i++) {
            files.push("img/movie_png/dancersLoop_" + _getLeadingZeros(i) + ".png")
        }
        //console.log(files)
        return files;
    }
    function start() {
        var i = 0;
        var files = _loadImages();
        var myAnim = setInterval(function () {
            $("#movie-png").attr('src', files[i]);
            i++;
            if (i == 599) {
                i = 0
            }
        }, 60);
    }
    'use strict';

    $(document).ready(function () {
        start();
    });

})();