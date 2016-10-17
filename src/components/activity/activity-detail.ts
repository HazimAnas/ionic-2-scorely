import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {Activity} from './activity';

@Component({
  selector: 'activity-detail',
  templateUrl: 'activity-detail.html'
})
export class ActivityDetail {

  activity: Activity;

  constructor(private navCtrl: NavController, param: NavParams) {
  	//this.team = param.get('team');
  }
}
