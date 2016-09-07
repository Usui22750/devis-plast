import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data/auth-data';
import {LoginPage} from '../../pages/login/login';

/*
  Generated class for the LogoutPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthData]
})

export class LogoutPage {

  constructor(private navCtrl: NavController, private authData :AuthData) {
  	this.authData.logoutUser().then(() => {
    this.navCtrl.setRoot(LoginPage);
  });
  }

}
