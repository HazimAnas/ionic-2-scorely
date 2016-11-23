import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, AlertController, Platform } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';
import { TabsPage } from '../../pages/tabs/tabs';
import { LoginPage } from '../../pages/login/login';
import {GooglePlus} from 'ionic-native';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  public user = null;
  userProfile: any = null;

  constructor(public http: Http, public af: AngularFire, public alertController : AlertController, private platform: Platform) {
  }

  checkAuth(): boolean{
    /*this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = user;
        console.log("Success "+ user);
        console.log(this.user);
        return true;
      }
      else {
        // user not logged in
        console.log("Fail "+ user);
        return false;
      }
    });
    return this.user;
    */
    if(this.user) {
      return true;
    }
    else {
      return false;
    }
  };

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  login() {
    //this.af.auth.login();
    GooglePlus.login({})
  .then(
  (res) => {
    console.log('good');
    this.user = res;
  },
  (err) => {
    console.log('error');
    console.log(err);
  });
  }

  logout(): Promise <any> {
    return new Promise((resolve, reject) => {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("Logged out");
        resolve(true);
      }, function(error) {
        // An error happened.
        console.log("Error logging out " + error);
        reject(false);
      });
    });

    /*this.user = null;
    //this.af.auth.logout();
    this.platform.ready().then(() => {
      GooglePlus.logout().then(() => {
        this.user = null
        console.log("Logged out");
      });
    });
    this.af.auth.logout();
    GooglePlus.logout().then(() => {
      this.user = null
      //this.navCtrl.setRoot(LoginPage);
      //this.navCtrl.push(LoginPage);
    });*/

  }

  googlePlusLogin()
  {
      //this.af.auth.subscribe((user: FirebaseAuthState) => {

        //console.log("in auth subscribe", user)

        this.platform.ready().then(() => {
           GooglePlus.login({
             'webClientId' : '66757883024-005nu01t82hk7mcac3jqrt7prt3m6onh.apps.googleusercontent.com','offline': true}).then((userData) => {

                var provider = firebase.auth.GoogleAuthProvider.credential(userData.idToken);

                 firebase.auth().signInWithCredential(provider)
                  .then((success) => {
                    console.log("Firebase success: " + JSON.stringify(success)+ " url "+`/user/${this.encodeAsFirebaseKey(success.email)}/`);
                    //this.displayAlert(success,"signInWithCredential successful")
                    this.userProfile = userData;
                    this.user = success;
                    this.af.database.object(`/user/${this.encodeAsFirebaseKey(success.email)}/`)
                    .set({
                      name : success.displayName,
                       uid : this.user.uid,
                       email : success.email
                     });
                  })
                  .catch((error) => {
                    console.log("Firebase failure 1: " + error);
                    //this.displayAlert(error,"signInWithCredential failed")
                  });

                 })
             .catch((error) => {
                    console.log("Firebase failure 2: " + error);
                        //this.displayAlert(error,"signInWithCredential failed")
                  });

            })
            //this.af.auth.unsubscribe()
       //})
     }

  encodeAsFirebaseKey(string) {
    return string.replace(/\./g, '%2E')
      .replace(/\%/g, '%25')
      .replace(/\#/g, '%23')
      .replace(/\$/g, '%24')
      .replace(/\//g, '%2F')
      .replace(/\[/g, '%5B')
      .replace(/\]/g, '%5D');
  }

}
