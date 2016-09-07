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

    	this.profileData.getUserProfile().on('value', (data) => { this.userProfile = data.val(); });

    	this.profileForm = formBuilder.group({
    		firstName: ['', Validators.required],
    		lastName: ['', Validators.required],
		  	email: ['', Validators.required],
		 	password: ['', Validators.compose([Validators.minLength(7), Validators.required])]
		})
  	}

  	updateProfile() {

  	}
}