///<reference path="../../typings/require.d.ts" />
require.config({
    baseUrl: "js",
    paths:{
        "text" : "../libs/requirejs/text",
        "jquery" : "../libs/jquery/jquery.min",
        "underscore" : "../libs/underscorejs/underscore-min",
        "handlebars": "../libs/handlebars/handlebars.min",
        "path":"../libs/path/path"
    },
    shim:{
        "jquery":{
            exports:"$"
        },
        "underscore":{
            exports:"_"
        },
        "handlebars":{
            exports:"Handlebars"
        },
        'path': {
            exports: 'Path'
        }
    }
});

require(['app'], function(App){
   var app = new App.MyApp();
    app.init();
});