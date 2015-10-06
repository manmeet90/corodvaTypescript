import Handlebars from 'handlebars';
import * as tmpl from 'text!../views/app.html';
import {_shim} from './shims';
import {Contact} from "./Contact";

export class EditContactView{
    el = "";
    contactId= null;

    constructor(options){
        this.el= options.el;
        this.contactId = options.contactId;

        this.getContactDetails(options.contactId)
            .done(_shim.$.proxy(function(contact){
                this.render({contact:contact});
            },this)).fail(function(err){
                console.log(err);
            });
    }

    template(model){
        return (Handlebars.compile(tmpl))(model);
    }

    render(contact){
        _shim.$(this.el).html(this.template(contact));
        this.postRender();
    }

    postRender(){
        this.attachEvenListeners();
    }

    attachEvenListeners(){
        _shim.$('#createBtn').on('click', _shim.$.proxy(this.editContact, this));
    }

    getContactDetails(contactId){
        var dfd = _shim.$.Deferred();
        this.db = window.sqlitePlugin.openDatabase({name: "phonebook.db"});
        this.db.transaction(function(tx) {
            tx.executeSql("select * from tblphonebook where id=?;", [contactId], function (_db, res) {
                console.log(res);
                console.log("Records found: ", res.rows.length);
                if(res.rows.length===1){
                    let contact = new Contact(res.rows.item(0).id, res.rows.item(0).fname, res.rows.item(0).lname, res.rows.item(0).email, res.rows.item(0).mobile);
                    dfd.resolve(contact);
                }
            }, function (_db, err) {
                dfd.reject(err);
            });
        });
        return dfd.promise();
    }

    editContact(e){
        e.preventDefault();
        var self= this;
        let fname= _shim.$('#fname').val(),
            lname= _shim.$('#lname').val(),
            emailid= _shim.$('#emailid').val(),
            mobile= parseInt(_shim.$('#mobile').val(),10);

        var db = window.sqlitePlugin.openDatabase({name: "phonebook.db"}); //, createFromLocation: 1
        db.transaction(function(tx) {
            //tx.executeSql('drop table if exists tblphonebook;');
            //tx.executeSql('CREATE TABLE IF NOT EXISTS tblphonebook (id integer primary key, fname text, lname text, email text, mobile integer)');

            tx.executeSql("update tblphonebook set fname=?, lname=?, email=?, mobile=? where id=?", [fname, lname, emailid, mobile, self.contactId], function(tx, res){
                console.log("Rows affected - ", res.rowsAffected);
                if(res.rowsAffected>=1){
                    _shim.$('.chip').toggleClass('hide');
                    setTimeout(function(){
                        _shim.$('.chip').toggleClass('hide');
                    },1000);
                }
            });
        });
    }
}
