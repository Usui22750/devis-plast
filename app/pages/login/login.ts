import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { AuthData } from '../../providers/auth-data/auth-data';
import { DevisPage } from '../devis/devis';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { SignupPage } from '../signup/signup';

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [AuthData]
})
export class LoginPage {
	public loginForm: any;
 
	constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
		this.loginForm = formBuilder.group({
		  	email: ['', Validators.required],
		 	password: ['', Validators.required]
		})
	}

	loginUser(){
	    if (!this.loginForm.valid){
	      	console.log(this.loginForm.value);
	    } else {
		      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
		        this.nav.setRoot(DevisPage);
		      }, error => {
		        let alert = this.alertCtrl.create({
		          message: error.message,
		          buttons: [
		            {
		              text: "Ok",
		              role: 'cancel'
		            }
		          ]
		        });
		        alert.present();
		      });
		      // prevent the user with a loading visual
		      let loading = this.loadingCtrl.create({
		        dismissOnPageChange: true,
		      });
		      loading.present();
	    }
  	}

	goToSignup(){
	  this.nav.push(SignupPage);
	}
	 
	goToResetPassword(){
	  this.nav.push(ResetPasswordPage);
	}

}
