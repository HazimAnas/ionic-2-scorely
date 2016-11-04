import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {StatisticPage} from '../statistic/statistic';
import {AccountPage} from '../account/account';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'tabs-page',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = StatisticPage;
  tab3Root: any = AccountPage;

  constructor(private navCtrl : NavController, private as : AuthService, public af: AngularFire) {

  }

  ionViewWillEnter() {
    console.log("Current user");
    console.log(this.as.user);
    if(this.as.checkAuth()){
        console.log('Logged in: ' + this.as.user);
        console.log(this.as.user);
    }
    else{
        console.log("Not logged in please log in.");
        this.navCtrl.setRoot(LoginPage);
        this.navCtrl.push(LoginPage);
    }/*
    this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        console.log("Success "+ user);
        console.log(user);
      }
      else {
        // user not logged in
        console.log("Fail "+ user);
        this.navCtrl.push(LoginPage);
      }
    });*/
  }
}
