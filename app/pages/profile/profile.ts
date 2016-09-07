import { NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, ControlGroup } from '@angular/common';
import { Component } from '@angular/core';
import { ProfileData } from '../../providers/profile-data/profile-data';
import { AuthData } from '../../providers/auth-data/auth-data';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'build/pages/profile/profile.html',
  providers: [ProfileData, AuthData]
})

export class ProfilePage {
	  public userProfile: any;
  	  public profileForm: any;


    constructor(public nav: NavController, public profileData: ProfileData, public formBuilder: FormBuilder,
    			public authData: AuthData, public alertCtrl: AlertController) {

    	this.profileData.getUserProfile().on('value', (data) => { this.userProfile = data.val(); console.log(this.userProfile);
    		this.profileForm.controls['firstName'].updateValue(this.userProfile.firstName !==  undefined ? this.userProfile.firstName : '')
    		this.profileForm.controls['lastName'].updateValue(this.userProfile.lastName !==  undefined ? this.userProfile.lastName : '')
    		this.profileForm.controls['email'].updateValue(this.userProfile.email !==  undefined ? this.userProfile.email : '')
		});

    	this.profileForm = formBuilder.group({
    		firstName: ['', Validators.required],
    		lastName: ['', Validators.required],
		  	email: ['', Validators.required]
		})
  	}

  	updateProfile() {
		if (!this.profileForm.valid){
		  	console.log(this.profileForm.value);
		} else {
		  	this.profileData.updateProfile(this.profileForm.value.firstName, this.profileForm.value.lastName, this.profileForm.value.email).then(() => {
			      	let alert = this.alertCtrl.create({
			        message: "Profile has been updated",
			        buttons: [
			          {
			            text: "Ok",
			            role: 'cancel'
			          }
			        ]
			      	});
			      	alert.present();
		      	}, (error) => {
			    	var errorMessage: string = error.message;
			      	let alert = this.alertCtrl.create({
			        message: errorMessage,
			        buttons: [
			          {
			            text: "Ok",
			            role: 'cancel'
			          }
			        ]
				    });
				    alert.present();
		  		}
		  	);
		}
  	}
}