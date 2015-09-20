'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    // Configurable paths for the app
    var appConfig = {
        app: 'app',
        dist: 'dist'
    };

    // Grunt configuration
    grunt.initConfig({

        // Project settings
        gae: appConfig,

        // The grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= gae.dist %>'
                }
            }
        },
        // Compile less to css
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    "app/css/style.css": "<%= gae.app %>/less/style.less"
                }
            }
        },
        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['app/less/**/*.less'],
                tasks: ['less', 'copy:styles'],
                options: {
                    nospawn: true,
                    livereload: '<%= connect.options.livereload %>'
                },
            },
            js: {
                files: ['<%= gae.app %>/{,*/}*.js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= gae.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= gae.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        // If you want to turn on uglify you will need write your angular code with string-injection based syntax
        // For example this is normal syntax: function exampleCtrl ($scope, $rootScope, $location, $http){}
        // And string-injection based syntax is: ['$scope', '$rootScope', '$location', '$http', function exampleCtrl ($scope, $rootScope, $location, $http){}]
        uglify: {
            options: {
                mangle: false
            }
        },
        // Clean dist folder
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= gae.dist %>/{,*/}*',
                        '!<%= gae.dist %>/.git*'
                    ]
                }]
            },
            tmp: '.tmp',
            static: '<%= gae.dist %>/static' // Note: please read note on task useminPrepare
        },
        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= gae.app %>',
                        dest: '<%= gae.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'views/{,*/}*.html',
                            'css/patterns/*.*',
                            'img/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= gae.dist %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= gae.dist %>'
                    },
                ]
            },
            from_templates: {
                expand: true,
                cwd: '../templates/',
                src: 'index.html',
                dest: '<%= gae.app %>'
            },
            to_production: {
                expand: true,
                cwd: '<%= gae.dist %>',
                src: 'index.html',
                dest: '../templates/',
                rename: function(dest) {
                    return dest + 'index_dist.html';
                }
            },
            static: {
                expand: true,
                cwd: '<%= gae.dist %>/static/dist', // Note: please read note on task useminPrepare
                src: ['css/{,*/}*.*','lib/{,*/}*.*','js/*.js'],
                dest: '<%= gae.dist %>'
            },
            styles: {
                expand: true,
                cwd: '<%= gae.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= gae.dist %>/static/dist/js/{,*/}*.js',
                    '<%= gae.dist %>/static/dist/css/{,*/}*.css',
                    '<%= gae.dist %>/static/dist/lib/{,*/}*.{js,css}'
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= gae.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= gae.dist %>'
                }]
            }
        },
        useminPrepare: {
            html: '<%= gae.app %>/index.html'
            // Note: with these options active filerev does not work, alternative is to move the folder static/dist/static
            // after the all usemin job is done... refer to tasks copy:static and clean:static
            //
            //options: {
            //    dest: '../' // note: minify and copy all directory structure under .tmp/static to default/
            //    //dest: 'dist'
            //}
        },
        usemin: {
            html: ['<%= gae.dist %>/index.html'] // note: destination file
        }
    });

    // Run live version of app
    grunt.registerTask('live', [
        'clean:tmp',
        'copy:styles',
        'connect:livereload',
        'watch'
    ]);

    // Run build version of app
    grunt.registerTask('server', [
        'build',
        'connect:dist:keepalive'
    ]);

    // Compile less into css
    grunt.registerTask('styles', ['less']);

    // Build version ready for production
    grunt.registerTask('build', [
        'clean:dist',
        'clean:tmp',
        'copy:from_templates', // note: this will copy templates/index.html to app/index.html
        'less',
        'useminPrepare',
        'concat',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin',
        'copy:static', // note: please read note on task useminPrepare
        //'clean:static', // note: please read note on task useminPrepare
        'copy:to_production', // note: this will copy and rename dist/index.html to templates/index_dist.html
        //'clean:tmp'
    ]);

};
