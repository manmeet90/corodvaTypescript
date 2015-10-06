import * as Path from 'path';
import {HomePageView} from 'homePageView';
import {ContactsDetailsView} from 'ContactsDetailsView';
import {EditContactView} from 'EditContactView';

export class Router{
    constructor(){
        this.mapRoutes();
    }

    mapRoutes(){
        this.homeRoute();
        this.showContactsRoute();
        this.editContactRoute();
        Path.root("#/home");
        Path.listen();
    }

    homeRoute(){
        Path.map("#/home").to(function () {
            var homeView = new HomePageView({el:"#main"});
        });
    }

    showContactsRoute(){
        Path.map("#/showcontacts").to(function () {
            var contactsDetailsView = new ContactsDetailsView({el:"#main"});
        });
    }

    editContactRoute(){
        Path.map("#/editcontact/:id").to(function () {
            var editContactView = new EditContactView({el:"#main", contactId: this.params.id});
        });
    }
}