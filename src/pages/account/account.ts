import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'account-page',
  templateUrl: 'account.html'
})
export class AccountPage {
  constructor(private navCtrl: NavController, private as: AuthService) {
  }

  logout() {
    this.as.logout();
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.push(LoginPage);
  }
}
