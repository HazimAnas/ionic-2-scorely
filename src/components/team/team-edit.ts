import {Component, Input} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import { Team } from './team';
import { TeamService } from '../../providers/team-service/team-service';

@Component({
  selector: 'team-edit',
  templateUrl: 'team-edit.html'
})
export class TeamEdit {
  @Input() team: Team;

  constructor(private navCtrl: NavController, public param: NavParams, public alertCtrl: AlertController, public teamService: TeamService) {
  	this.team = param.get('team');
    console.log(this.team);
  }

  logForm(form) {
    console.log(form.value)
  }

  submitEditForm(key, team: Team) {
    if(this.teamService.editTeam(key, team)) {
      this.navCtrl.pop();
    }
    else {
      let alert = this.alertCtrl.create({
                                          title: 'Error',
                                          subTitle: 'Fail to update team information.',
                                          buttons: ['OK']
                                        });
      alert.present();
    }
  }
}
