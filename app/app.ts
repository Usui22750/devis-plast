import {Component, ViewChild} from '@angular/core';
import {ionicBootstrap, Platform, MenuController, Nav} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {ClientsPage} from './pages/clients/clients';
import {DevisPage} from './pages/devis/devis';
import {FournisseursPage} from './pages/fournisseurs/fournisseurs';
import {LoginPage} from './pages/login/login';
import {LogoutPage} from './pages/logout/logout';
import {ProfilePage} from './pages/profile/profile';

import * as firebase from 'firebase';
import { AuthData } from './providers/auth-data/auth-data';


@Component({
  templateUrl: 'build/app.html',
  providers: [AuthData]
})

class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage: any = DevisPage;
  pages: Array<{title: string, icon: string, component: any}>;

  constructor( public platform: Platform, public menu: MenuController) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Clients', icon: 'people', component: ClientsPage },
      { title: 'Fournisseurs', icon: 'globe', component: FournisseursPage },
      { title: 'Devis', icon: 'paper', component: DevisPage },
      { title: 'Profile', icon: 'contact', component: ProfilePage },
      { title: 'Logout', icon: 'log-out', component: LogoutPage }
    ];

    var config = {
    apiKey: "AIzaSyBu4y3S5cWdidcXRCvdmKeo_HLO9fyz86A",
    authDomain: "devis-plast.firebaseapp.com",
    databaseURL: "https://devis-plast.firebaseio.com",
    storageBucket: "devis-plast.appspot.com",
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // If there's a user take him to the home page.
        this.rootPage = DevisPage;
      } else {
        // If there's no user logged in send him to the LoginPage
        this.rootPage = LoginPage;
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  logOut(){

  }
}

ionicBootstrap(MyApp);
