import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'account-page',
  templateUrl: 'account.html'
})
export class AccountPage {
  constructor(private navCtrl: NavController) {
  }
}
