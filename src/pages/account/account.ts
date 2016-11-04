import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular';

@Component({
  selector: 'account-page',
  templateUrl: 'account.html'
})
export class AccountPage {
  constructor(private navCtrl: NavController, private as: AuthService, private app : App) {
  }

  logout() {
    this.as.logout();
    //this.app.getRootNav().setRoot(LoginPage);
    this.app.getRootNav().push(LoginPage);
  }
}
