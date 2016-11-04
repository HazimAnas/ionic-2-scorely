import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import { AuthService } from '../../providers/auth-service/auth-service';
import { TabsPage } from '../tabs/tabs';
import { AngularFire } from 'angularfire2';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public as: AuthService, public af: AngularFire, private viewCtrl: ViewController) {

  }

  ngOnInit() {
    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        console.log("Success "+ user);
        console.log("login "+user);
        this.as.setUser(user);
        this.navCtrl.push(TabsPage);
      }
      else {
        // user not logged in
        console.log("Fail "+ user);
      }
    });
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    /*if(this.as.checkAuth()){
        console.log('Logged in: ' + this.as.user);
        console.log(this.as.user);
        this.navCtrl.setRoot(TabsPage);
        this.navCtrl.push(TabsPage);
    }
    else{
        console.log("Not logged in please log in.");
    }*/

  }

  loginGoogle() {
    //this.as.login();
    this.as.googlePlusLogin();
    //this.navCtrl.push(TabsPage).catch(()=> console.log('should I stay or should I go now
  }

}
