import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import {Team} from './team';

@Component({
  selector: 'team-detail',
  templateUrl: 'team-detail.html'
})
export class TeamDetail {

  team: Team;

  constructor(private navCtrl: NavController, param: NavParams) {
  	this.team = param.get('team');
  }
}
