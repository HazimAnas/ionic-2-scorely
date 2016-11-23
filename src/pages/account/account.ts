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
  public user: any;

  constructor(private navCtrl: NavController, private as: AuthService, private app : App) {
    this.user = as.getUser();
  }

  logout() {
    this.as.logout().then(res => {
      if(res) {
        this.app.getRootNav().push(LoginPage);
      }
      else {
        console.log("Error loggin out.");
      }
    });
    //this.app.getRootNav().setRoot(LoginPage);

  }
}
