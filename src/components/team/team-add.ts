import {Component, Input} from '@angular/core';
import {NavController} from 'ionic-angular';
import { Team } from './team';
import {TeamService } from '../../providers/team-service/team-service';

@Component({
  selector: 'team-add',
  templateUrl: 'team-add.html'
})
export class TeamAdd {
  public newTeam: Team;

  constructor(private navCtrl: NavController, public teamService: TeamService) {
    this.newTeam = new Team;
  }

  submitAddForm() {
    this.teamService.addTeam(this.newTeam);
  }

  logForm(form) {
    console.log(form.value)
  }
}
