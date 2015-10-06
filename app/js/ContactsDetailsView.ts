import Handlebars from 'handlebars';
import * as tmpl from 'text!../views/contactsDetailsView.html';
import {_shim} from './shims';
import {Contact} from "./Contact";

export class ContactsDetailsView{

    public el="";
    public contacts=[];
    public db;

    constructor(options){
        this.el= options.el;
        this.render();
    }

    template(model){
        return (Handlebars.compile(tmpl))(model);
    }

    render(){
        var self= this;
        this.getAllContacts()
        .done(function(){
            _shim.$(self.el).html(self.template({contacts:self.contacts}));
            self.postRender();
        }).fail(function(err){
           console.log(err);
        });
    }

    postRender(){
        this.attachEvenListeners();
    }

    attachEvenListeners(){
        _shim.$('.delBtn').on('click', _shim.$.proxy(this.deleteContact, this));
    }

    getAllContacts(){
        var self= this;
        var dfd= _shim.$.Deferred();
        this.db = window.sqlitePlugin.openDatabase({name: "phonebook.db"}); //, createFromLocation: 1
        this.contacts = [];
        this.db.transaction(function(tx) {
            //tx.executeSql('drop table if exists tblphonebook;');
            //tx.executeSql('CREATE TABLE IF NOT EXISTS tblphonebook (id integer primary key, fname text, lname text, email text, mobile integer)');

            tx.executeSql("select * from tblphonebook;", [], function (_db, res) {
                console.log("Records found: ", res.rows.length);
                for(let i=0, len=res.rows.length; i<len; i++){
                    let contact = new Contact(res.rows.item(i).id, res.rows.item(i).fname, res.rows.item(i).lname, res.rows.item(i).email, res.rows.item(i).mobile);
                    self.contacts.push(contact);
                }
                dfd.resolve();
            }, function (_db, err) {
                dfd.reject(err);
            });
        });

        return dfd.promise();
    }

    deleteContact(e){
        var id=parseInt(_shim.$(e.target).data('rowid'),10);
        var self= this;
        this.db.transaction(function(tx) {
            tx.executeSql("delete from tblphonebook where id=?", [id], function (_db, res) {
                if(res.rowsAffected>=1){
                    alert("Contact Deleted!");
                    self.render();
                }
            }, function (_db, err) {
                console.log(err);
            });
        });
    }

}
