/**
* This should come as no surprise, we need to import Injectable so we can use this provider as an injectable.
* We also need to import firebase so we can talk to our DB.
*/
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';


@Injectable()
export class ProfileData {
  public userProfile: any; // We'll use this to create a database reference to the userProfile node.
  public currentUser: any; // We'll use this to create an auth reference to the logged in user.


  constructor() {
    this.currentUser = firebase.auth().currentUser;
    this.userProfile = firebase.database().ref('/userProfile');

  }

  /**
  * This one should be really easy to follow, we are calling a function getUserProfile() that takes no parameters.
  * This function returns a DATABASE reference to the userProfile/uid of the current user
  * and we'll use it to get the user profile info in our page.
  */
  getUserProfile(): any {
    return this.userProfile.child(this.currentUser.uid);
  }

  updateProfile(firstName: string, lastName: string, newEmail: string): any {
    return this.userProfile.child(this.currentUser.uid).update({
      firstName: firstName,
      lastName: lastName,
    });
  }

  /**
  * Just like before this is changing the user's password, but remember, this has nothing to do with the database
  * this is the AUTH portion of Firebase.
  */
  updatePassword(newPassword: string): any {
    this.currentUser.updatePassword(newPassword).then(() => {
      console.log("Password Changed");
    }, (error) => {
      console.log(error);
    });
  }
}