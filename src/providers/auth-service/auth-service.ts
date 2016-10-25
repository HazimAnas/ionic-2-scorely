import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AngularFire } from 'angularfire2';
import { TabsPage } from '../../pages/tabs/tabs';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {
  public user = null;

  constructor(public http: Http, public af: AngularFire) {
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
    this.af.auth.login();
  }

  logout() {
    this.af.auth.logout();
    //this.navCtrl.setRoot(LoginPage);
    //this.navCtrl.push(LoginPage);
  }

}
