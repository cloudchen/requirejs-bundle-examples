require.config({
    baseUrl: 'app/bower_components',
    paths: {
        'jquery': 'jquery/jquery.min',
        'backbone': 'backbone/backbone-min',
        'underscore': 'underscore/underscore-min',
        'text': 'requirejs-text/text',

        'app': '..',
        'common': '../../common'
    },
    shim: {
        backbone: {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    },
    deps: ['require'],
    callback: function(require) {
        'use strict';

        var filename = location.pathname.match(/\/([^\/]*)$/),
            modulename;

        if (filename && filename[1] !== '') {
            modulename = ['app', filename[1].split('.')[0], 'main']
                         .join('/');

            require([modulename]);
        } else {
            if (window.console) {
                console.log('no modulename found via location.pathname');
            }
        }
    }
});
