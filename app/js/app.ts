import {Router} from "router";

    export class MyApp{

        constructor(){
            console.log("MyApp Intialized!");
        }

        init(){
            this.bindEvents();
            this.loadDB();
        }

        bindEvents(){
            var router = new Router();
            document.addEventListener('deviceready', this.onDeviceReady);
        }

        onDeviceReady(){
            console.log('device ready fired!');

            location.href="#/home";

        }

        loadDB(){
            var db = window.sqlitePlugin.openDatabase({name: "phonebook.db"});
            db.transaction(function(tx) {
                //tx.executeSql('drop table if exists tblphonebook;');
                tx.executeSql('CREATE TABLE IF NOT EXISTS tblphonebook (id integer primary key, fname text, lname text, email text, mobile integer)');
            });
        }
    }
