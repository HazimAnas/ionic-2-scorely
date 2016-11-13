import {Component, Input} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import { Team } from './team';
import {TeamService } from '../../providers/team-service/team-service';

@Component({
  selector: 'team-add',
  templateUrl: 'team-add.html'
})
export class TeamAdd {
  public newTeam: Team;

  constructor(private navCtrl: NavController, public alertCtrl: AlertController, public teamService: TeamService) {
    this.newTeam = new Team;
  }

  submitAddForm() {
    if(this.teamService.addTeam(this.newTeam)) {
      this.navCtrl.pop();
    }
    else {
      let alert = this.alertCtrl.create({
                                          title: 'Error',
                                          subTitle: 'Fail to add new team.',
                                          buttons: ['OK']
                                        });
      alert.present();
    }
  }

  logForm(form) {
    console.log(form.value)
  }
}
