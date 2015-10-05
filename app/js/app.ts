/**
 * Created by mipl-80 on 10/1/2015.
 */

import Handlebars from 'handlebars';
import * as tmpl from 'text!../views/app.html';
import {_shim} from './shims';

    export class MyApp{

        constructor(){
            console.log("MyApp Intialized!");
        }

        init(){
            this.bindEvents();
        }

        bindEvents(){
            document.addEventListener('deviceready', this.onDeviceReady);
        }

        onDeviceReady(){
            console.log('device ready fired!');
            var fn = Handlebars.compile(tmpl);
            _shim.$('#main').html(fn({device:device}));
        }
    }
