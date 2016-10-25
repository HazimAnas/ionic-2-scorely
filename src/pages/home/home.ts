import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service/auth-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController, private as : AuthService) {

  }

}
