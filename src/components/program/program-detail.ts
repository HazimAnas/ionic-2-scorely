import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';
import { Program } from './program';
import { Activity } from '../activity/activity';
import { Team } from '../team/team';
import { TeamService } from '../../providers/team-service/team-service';
import { ActivityService } from '../../providers/activity-service/activity-service';
import { TeamDetail } from '../team/team-detail';
import { ActivityAdd } from '../activity/activity-add';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'program-detail',
  templateUrl: 'program-detail.html'
})
export class ProgramDetail {

  public program: Program;
  public programId: string;
  public activities: FirebaseListObservable <Activity[]>;
  public teams: Team[];

  constructor(private navCtrl: NavController, param: NavParams, private teamService: TeamService, private activityService: ActivityService) {
  	this.program = param.get('program');
    this.programId = param.get('programId');
    this.getTeams();
    this.getActivites();
  }

  getActivites(): void {
      this.activityService.getActivities(this.programId);
      this.activities = this.activityService.activityList;
  }

  getTeams(): void {
    this.teamService.getTeams().then(teams => this.teams = teams);
  }

  teamDetail(team) {
    this.navCtrl.push(TeamDetail, {
            team: team
          });
  }

  activityAdd() {
    this.navCtrl.push(ActivityAdd);
  }

}
