import Handlebars from 'handlebars';
import * as tmpl from 'text!../views/app.html';
import {_shim} from './shims';

export class HomePageView{

    el = "";

    constructor(options){
        this.el= options.el;
        this.render();
    }

    template(model){
        return (Handlebars.compile(tmpl))(model);
    }

    render(){
        _shim.$(this.el).html(this.template({}));
        this.postRender();
    }

    postRender(){
        this.attachEvenListeners();
    }

    attachEvenListeners(){
        _shim.$('#createBtn').on('click', _shim.$.proxy(this.createContact, this));
    }

    createContact(e){
        e.preventDefault();
        let fname= _shim.$('#fname').val(),
        lname= _shim.$('#lname').val(),
        emailid= _shim.$('#emailid').val(),
        mobile= parseInt(_shim.$('#mobile').val(),10);

        var db = window.sqlitePlugin.openDatabase({name: "phonebook.db"}); //, createFromLocation: 1
        db.transaction(function(tx) {
            //tx.executeSql('drop table if exists tblphonebook;');
            //tx.executeSql('CREATE TABLE IF NOT EXISTS tblphonebook (id integer primary key, fname text, lname text, email text, mobile integer)');

            tx.executeSql("insert into tblphonebook(fname, lname,email,mobile) values(?,?,?,?)", [fname, lname, emailid, mobile], function(tx, res){
               console.log("Rows affected - ", res.rowsAffected);
                if(res.rowsAffected>=1){
                    _shim.$('.chip').toggleClass('hide');
                    setTimeout(function(){
                        _shim.$('.chip').toggleClass('hide');
                    },1000);
                }
            });
            tx.executeSql("select * from tblphonebook;", [], function (_db, res) {
                console.log(_db);
                console.log(res);
                console.log("Records found: ", res.rows.length);

            }, function (_bd, err) {
                console.log(err);
            });
        });
    }
}
