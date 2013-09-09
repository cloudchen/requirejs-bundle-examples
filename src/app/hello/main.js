define(function(require){
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        template = require('text!./main.template.txt');

    var elm = $('body');
    elm.append(template);

    _.each([1,2,3], function(v){
        elm.append(v + '<br/>');
    });
});
