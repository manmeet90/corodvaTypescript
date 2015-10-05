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
            var db = window.sqlitePlugin.openDatabase({name: "phonebook.db", createFromLocation: 1});
            console.log(db);
            db.transaction(function(tx) {
                db.executeSql("pragma table_info (tblphonebook);", [], function(res) {
                    console.log("PRAGMA res: " + JSON.stringify(res));
                });

                db.executeSql("select * from tblphonebook;", [], function (_db, res) {
                    console.log(_db);
                    console.log(res);
                }, function (err) {
                    console.log(err);
                });
            });
        }
    }
