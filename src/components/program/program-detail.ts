import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import { Program } from './program';
import { Team } from '../team/team';
import { TeamService } from '../../providers/team-service/team-service';
import { TeamDetail } from '../team/team-detail';

@Component({
  selector: 'program-detail',
  templateUrl: 'program-detail.html'
})
export class ProgramDetail {

  program: Program;
  teams: Team[];

  constructor(private navCtrl: NavController, param: NavParams, private teamService: TeamService) {
  	this.program = param.get('program');
    this.getTeams();
  }

  getTeams(): void {
    this.teamService.getTeams().then(teams => this.teams = teams);
  }

  teamDetail(team) {
    this.navCtrl.push(TeamDetail, {
            team: team
          });
  }

}
